# Optimizing EF Core Queries: Slashing API Response Latency by 98.4%

**Author:** Mahmoud Ayman  
**Date:** July 2025  
**Category:** Backend Performance  
**Tags:** `ASP.NET Core`, `EF Core`, `PostgreSQL`, `SQL Performance`, `k6`

---

## Introduction

In enterprise application development, object-relational mapping (ORM) libraries like Entity Framework Core provide immense productivity gains. However, when unmanaged, ORM query generation can introduce hidden performance bottlenecks—such as **N+1 query problems**, **in-memory evaluation**, and **excessive data materialization**.

During the development of **MockAPIs** and **MechanicShop API**, I encountered endpoints with response times exceeding **800ms to 2.7s** under load. In this article, I outline the step-by-step diagnostic and optimization process that cut API latency down to **13.5ms (98.4% reduction)** under 50 concurrent virtual users using `k6`.

---

## 1. Diagnosing the Bottlenecks

### The Silent Killer: In-Memory Pagination

The original implementation of the resource list endpoint fetched all records from PostgreSQL into C# memory before slicing the requested page:

```csharp
// BAD: Fetches ALL records into memory, then applies Skip & Take
public async Task<List<ResourceDto>> GetResourcesBadAsync(int page, int pageSize)
{
    var allItems = await _dbContext.Resources.ToListAsync(); // Memory hog!
    return allItems
        .Skip((page - 1) * pageSize)
        .Take(pageSize)
        .Select(r => new ResourceDto(r.Id, r.Name))
        .ToList();
}
```

When tested with **10,000 seeded database records**, this approach resulted in:
- Excessive RAM allocation per request
- High garbage collection overhead
- Massive SQL payloads transferred over the network wire

---

## 2. The Solution: EF Core Projections & Server-Side Pushing

To solve this, we refactored the data access logic to ensure that:
1. Filtering and pagination (`OFFSET` and `LIMIT`) are pushed down to PostgreSQL.
2. EF Core projects directly into the target DTO, selecting **only** required columns.
3. Read-only queries bypass EF tracking overhead using `.AsNoTracking()`.

### The Optimized Implementation

```csharp
// GOOD: Executes Paged SQL direct in PostgreSQL, selects required columns only
public async Task<PagedResult<ResourceDto>> GetResourcesOptimizedAsync(int page, int pageSize)
{
    var query = _dbContext.Resources
        .AsNoTracking()
        .OrderBy(r => r.Id);

    var totalCount = await query.CountAsync();

    var items = await query
        .Skip((page - 1) * pageSize)
        .Take(pageSize)
        .Select(r => new ResourceDto 
        {
            Id = r.Id,
            Name = r.Name,
            CreatedAt = r.CreatedAt
        })
        .ToListAsync();

    return new PagedResult<ResourceDto>(items, totalCount, page, pageSize);
}
```

---

## 3. Results & Load Testing Verification

We benchmarked both implementations using **k6** with 50 concurrent virtual users executing requests over 2 minutes.

| Metric | Before Optimization | After Optimization | Delta |
| :--- | :--- | :--- | :--- |
| **Average Latency** | `859 ms` | `13.5 ms` | **-98.4%** |
| **P95 Response Time** | `1,240 ms` | `24.1 ms` | **-98.1%** |
| **Throughput (req/sec)** | `58 req/s` | `380 req/s` | **+555%** |
| **DB Memory Usage** | `420 MB` | `45 MB` | **-89.2%** |

```json
{
  "benchmark": "MockAPIs k6 Load Test",
  "concurrent_users": 50,
  "iterations": 10000,
  "p95_latency_ms": 24.1,
  "status": "PASS"
}
```

---

## Conclusion

Key takeaways for backend developers using EF Core:
- **Always use `AsNoTracking()`** for query-only endpoints.
- **Project into DTOs before `ToListAsync()`** to avoid loading unneeded relationships or columns.
- **Verify generated SQL** using logging or SQL profilers to confirm `LIMIT` and `OFFSET` are evaluated server-side.
