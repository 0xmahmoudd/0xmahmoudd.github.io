export const projectsData = [
  {
    id: "quiz-monitor",
    title: "Quiz Monitor",
    category: "Backend / AI",
    badge: "Graduation Project",
    shortDescription: "AI-driven exam proctoring backend with real-time violation logging, N-Tier architecture, and PostgreSQL transactions.",
    fullDescription: "Built the core backend for an AI-driven exam proctoring platform designed to prevent cheating in remote academic assessments. Designed an N-Tier architecture supporting both a web interface for students and a mobile app for instructors.",
    technologies: ["ASP.NET Core 9", "PostgreSQL", "EF Core", "Docker", "Supabase", "Railway"],
    github: "https://github.com/Quiz-Monitor/Backend",
    liveDemo: null,
    architecture: "N-Tier Architecture (API, Core Domain, Infrastructure, Data Access) with Unit of Work & Repository Patterns.",
    features: [
      "RESTful API with ASP.NET Core 9 managing full exam lifecycle from quiz creation to timed submissions.",
      "PostgreSQL database schema on Supabase with Unit of Work pattern for multi-entity transactional integrity.",
      "Append-only violation logging system recording real-time AI-detected events (gaze tracking anomalies, tab switching).",
      "Containerized with multi-stage Dockerfile for minimal image size and automated deployment on Railway."
    ],
    metrics: [
      { label: "Architecture", value: "N-Tier Clean Architecture" },
      { label: "Database", value: "Supabase Postgres" },
      { label: "Deploy", value: "Railway + Docker" }
    ],
    color: "#3daee9"
  },
  {
    id: "mockapis",
    title: "MockAPIs",
    category: "Full Stack / Cloud",
    badge: "Full Stack",
    shortDescription: "Instant stateful mock REST API builder with dynamic schema generator, $O(N)$ pagination fix, and AWS Well-Architected blueprint.",
    fullDescription: "A full-stack SaaS platform empowering frontend teams to design custom schemas and instantly instantiate stateful mock REST APIs. Features a 3-layer .NET backend, interactive React SPA, and a production AWS deployment architecture blueprint.",
    technologies: ["ASP.NET Core", "React", "PostgreSQL", "Docker", "Railway", "Vercel", "AWS"],
    github: "https://github.com/0xmahmoudd/MockAPIs",
    liveDemo: "https://mock-apis-nine.vercel.app/",
    architecture: "3-Layer .NET Backend + React SPA + AWS Multi-AZ Blueprint (EC2 Auto Scaling, ALB, RDS Postgres, CloudFront/S3, AWS WAF).",
    features: [
      "Management APIs & dynamic React explorer to configure resources, dynamic endpoints, and automated fake data generation.",
      "Fixed $O(N)$ in-memory pagination bottleneck by pushing OFFSET/LIMIT directly down to PostgreSQL engine.",
      "Benchmarked with k6 under 50 concurrent users on 10K records: cut latency by 98.4% (859ms -> 13.5ms) and boosted throughput by ~80%.",
      "Multi-cloud deployment across Railway (API), Supabase (Postgres), and Vercel (React frontend)."
    ],
    metrics: [
      { label: "Latency Cut", value: "859ms → 13.5ms (-98.4%)" },
      { label: "Seeded Dataset", value: "10,000 Records" },
      { label: "Throughput Boost", value: "+80% under k6" }
    ],
    color: "#2ecc71"
  },
  {
    id: "askfm-backend",
    title: "AskFm Backend System",
    category: "Backend / Realtime",
    badge: "Realtime API",
    shortDescription: "High-concurrency social Q&A backend with SignalR real-time notifications and sub-300ms query optimizations on 15k+ entities.",
    fullDescription: "A scalable backend for a social Q&A platform exposing REST APIs and real-time push notifications. Built using N-Tier architecture with EF Core projections and non-tracking queries for high read performance.",
    technologies: ["C#", "ASP.NET Core", "EF Core", "SignalR", "SQL Server", "xUnit"],
    github: "https://github.com/0xmahmoudd/AskFmBackend/tree/Develop",
    liveDemo: "https://youtu.be/MUeUZzyzSoA?si=2UQhasBaNozVdtMS",
    architecture: "N-Tier Architecture with SignalR WebSocket Hubs, EF Core Projections & AsNoTracking Read Optimization.",
    features: [
      "Real-time WebSocket notification pipeline using SignalR to broadcast user interaction events to active clients.",
      "Diagnosed and resolved N+1 query bottlenecks using EF Core projections and AsNoTracking() for read-heavy endpoints.",
      "Cut API response times from request timeouts down to sub-300ms on a seeded dataset of 15,000+ relational entities.",
      "Optimized bulk database operations with ExecuteUpdateAsync, eliminating unnecessary SQL Server round-trips."
    ],
    metrics: [
      { label: "Response Time", value: "< 300ms" },
      { label: "Seeded Entities", value: "15,000+" },
      { label: "Realtime Tech", value: "SignalR Hubs" }
    ],
    color: "#9b59b6"
  },
  {
    id: "pgwatch-copilot",
    title: "pgwatch Copilot Demo",
    category: "DevTools / Go / AI",
    badge: "Open Source CLI",
    shortDescription: "Go CLI that transforms plain-English questions into safe PostgreSQL queries for pgwatch monitoring data using real AST validation.",
    fullDescription: "A CLI tool built on top of open-source pgwatch database monitoring tool. Converts natural language questions into safe SQL queries, parses AST using Postgres native parser, and outputs structured Table/JSON/CSV results.",
    technologies: ["Golang", "PostgreSQL", "Cobra", "pgx", "pg_query", "Google Gemini API", "CLI"],
    github: "https://github.com/Mahmoud-Ayman-Saleh/pgwatch-copilot-demo",
    liveDemo: "https://youtu.be/7r7parBjPwE?si=UMDRcQQ76PhA8fgl",
    architecture: "Question -> Schema Inspect -> Prompt Construction -> LLM Generation -> AST Parsing (pg_query) -> Read-only Tx -> Output Formatter.",
    features: [
      "End-to-end CLI built in Go with Cobra and pgx for interactive natural language SQL querying.",
      "AST Safety Layer: Parses SQL with PostgreSQL's native parser (pg_query), blocks non-SELECT/multi-statement SQL, blocklists dangerous functions.",
      "Executes queries inside read-only transactions with strict statement timeouts and auto-LIMITs to guarantee safety.",
      "Live schema introspection discovering metric tables and JSONB keys for high-relevance prompt contexts.",
      "Deterministic LLM generation (temperature 0), dry-run mode, and explain results pass with synthetic 7-day metric data."
    ],
    metrics: [
      { label: "Safety Engine", value: "pg_query AST Parser" },
      { label: "Execution Mode", value: "Read-Only Tx + Timeout" },
      { label: "CLI Framework", value: "Go Cobra + pgx" }
    ],
    color: "#f1c40f"
  },
  {
    id: "mechanic-shop",
    title: "MechanicShop API",
    category: "Backend / Systems",
    badge: "Clean Architecture",
    shortDescription: "Auto repair shop management RESTful API with automated invoicing, JWT RBAC, and 98.9% query latency improvement under k6 load.",
    fullDescription: "A RESTful API designed with Clean Architecture for auto repair shop operations, managing repair task scheduling, inventory tracking, and automated invoice calculation with historical price preservation.",
    technologies: ["C#", "ASP.NET Core 9", "EF Core", "PostgreSQL", "xUnit", "k6", "JWT RBAC"],
    github: "https://github.com/0xmahmoudd/Mechanic-Shop",
    liveDemo: null,
    architecture: "Clean Architecture (Domain, Application, Infrastructure, API) with JWT Authentication & RBAC.",
    features: [
      "Built with ASP.NET Core 9 adhering strictly to Clean Architecture principles to keep domain logic decoupled.",
      "Optimized query performance by pushing pagination, filtering, and complex joins down to PostgreSQL engine.",
      "Cut average API response times by 98.9% (2.72s -> 28ms) and boosted throughput by 365% under k6 load testing on 10k records.",
      "Enforced transactional boundaries with Unit of Work for historical price consistency during automated invoicing."
    ],
    metrics: [
      { label: "Latency Cut", value: "2.72s → 28ms (-98.9%)" },
      { label: "Throughput Gain", value: "+365% under k6" },
      { label: "Auth Model", value: "JWT + RBAC" }
    ],
    color: "#e74c3c"
  }
];
