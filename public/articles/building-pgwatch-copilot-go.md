# Building pgwatch Copilot: Natural Language PostgreSQL Metrics with AST Safety in Go

**Author:** Mahmoud Ayman  
**Date:** June 2025  
**Category:** Go & DevOps  
**Tags:** `Golang`, `PostgreSQL`, `pgwatch`, `Cobra`, `LLM`, `AST Parsing`

---

## Overview

**pgwatch** is a premier open-source monitoring system for PostgreSQL databases, collecting rich system and database performance metrics into PostgreSQL repositories. However, analyzing complex metric schemas often requires composing tedious SQL queries across JSONB payloads.

To solve this, I built **pgwatch Copilot**, a Go-based CLI application that translates plain-English questions (e.g. *"Show me the top 5 query hashes with the highest CPU load over the past 24 hours"*) into precise SQL queries—while enforcing strict database safety via **PostgreSQL AST validation**.

---

## Architecture Pipeline

The system operates through an end-to-end pipeline designed to guarantee safety before execution:

```
[User Question] 
       │
       ▼
 [Schema Inspector] ──► Inspects metric tables & JSONB schema keys
       │
       ▼
  [LLM Generator]   ──► Produces SQL query (Gemini / Temperature 0)
       │
       ▼
 [AST Validator]    ──► Parses via pg_query (Native Postgres Parser)
       │                 - Rejects non-SELECT queries
       │                 - Rejects multi-statements
       │                 - Checks blocklisted functions
       ▼
[Safe Execution]   ──► Runs inside Read-Only Tx + Statement Timeout
       │
       ▼
[Output Formatter] ──► Formats as Table, JSON, or CSV
```

---

## 1. AST Validation with `pg_query`

Relying on regex or simple string checks to prevent SQL injection or destructive queries is fundamentally unsafe. In **pgwatch Copilot**, we embed `libpg_query` (PostgreSQL's actual C parser compiled to Cgo/Go bindings) to validate the Abstract Syntax Tree (AST):

```go
package validator

import (
	"fmt"
	pgquery "github.com/pganalyze/pg_query_go/v5"
)

// ValidateSQL inspects the AST of generated SQL query for strict read-only safety
func ValidateSQL(sqlString string) error {
	tree, err := pgquery.Parse(sqlString)
	if err != nil {
		return fmt.Errorf("SQL syntax error: %w", err)
	}

	// Rule 1: Ensure exactly 1 statement
	if len(tree.Stmts) != 1 {
		return fmt.Errorf("security violation: multiple SQL statements are forbidden")
	}

	stmt := tree.Stmts[0].Stmt
	// Rule 2: Enforce SELECT statement only
	if stmt.GetSelectStmt() == nil {
		return fmt.Errorf("security violation: only SELECT statements are permitted")
	}

	return nil
}
```

---

## 2. Dynamic JSONB Schema Introspection

pgwatch metric data is frequently stored inside semi-structured `jsonb` payloads. The CLI automatically inspects table schemas and feeds JSONB key definitions into the LLM prompt context:

```sql
-- Sample pgwatch metric table schema
SELECT key, pg_typeof(value) 
FROM pgwatch_metrics, jsonb_each(data) 
LIMIT 10;
```

This context allows the LLM to generate precise JSONB extraction queries:

```sql
SELECT 
    data->>'query' AS query_text,
    (data->>'total_exec_time')::float AS total_time_ms
FROM metric_store
WHERE metric = 'pg_stat_statements'
ORDER BY total_time_ms DESC
LIMIT 10;
```

---

## 3. Results & CLI Demo

By combining **Cobra CLI**, **pgx connection pooling**, **deterministic LLM generation**, and **native AST parsing**, `pgwatch Copilot` allows SREs and database administrators to gain rapid observability without risking database integrity.
