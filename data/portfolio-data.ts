export interface Project {
  id: string;
  slug: string;
  title: string;
  category: "AI" | "SYSTEMS" | "CLOUD" | "DEVOPS";
  badgeBg: string;
  badgeText: string;
  thumbnailBg: string;
  iconName: "Brain" | "Cpu" | "Network" | "Layers" | "GitBranch" | "Database";
  description: string;
  duration: string;
  techStack: string[];
  featured: boolean;
  domain: string;
  level: "Production" | "Academic R&D" | "Academic Research" | "Open Source";
  
  // Case study specific details
  caseStudy?: {
    tagline: string;
    overview: string;
    keyAchievements: string[];
    specs: {
      label: string;
      value: string;
    }[];
    demoUrl?: string;
    githubUrl?: string;
    documentationUrl?: string;
    modules: {
      id: string;
      number: string;
      title: string;
      subtitle: string;
      content: string;
      highlights: string[];
    }[];
  };
}

export interface PortfolioData {
  name: string;
  title: string;
  headline: string;
  description: string;
  badge: string;
  stats: {
    icon: "FolderGit2" | "Award" | "Clock" | "BookOpen";
    value: string;
    label: string;
  }[];
  filters: {
    subjects: string[];
    skills: string[];
    levels: string[];
  };
  projects: Project[];
}

export const portfolioData: PortfolioData = {
  name: "Adley",
  title: "Technical Hub",
  badge: "AI & SYSTEMS ARCHITECTURE",
  headline: "Engineering Robust Systems at the Intersection of AI & Cloud",
  description:
    "Senior portfolio & engineering hub showcasing distributed infrastructure, AI application pipelines, and rigorous systems design. Built for high performance, fault tolerance, and human usability.",
  stats: [
    { icon: "BookOpen", value: "24+ Projects", label: "Production & R&D" },
    { icon: "Award", value: "6 Certificates", label: "Cloud & AI Verified" },
    { icon: "Clock", value: "4+ Years Exp", label: "Systems & Architecture" },
  ],
  filters: {
    subjects: ["All Subjects", "Artificial Intelligence", "Systems Architecture", "Cloud & DevOps", "Human-Centric UX"],
    skills: ["All Skills", "Python & PyTorch", "Go & Distributed Systems", "Kubernetes & Cloud", "TypeScript & Next.js"],
    levels: ["All Levels", "Production Grade", "Academic Research", "Open Source Core"],
  },
  projects: [
    {
      id: "proj-1",
      slug: "applied-prompt-engineering",
      title: "Applied Prompt Engineering & Agent Framework",
      category: "AI",
      badgeBg: "bg-[#C25E00]",
      badgeText: "text-white",
      thumbnailBg: "bg-[#FFF8F0]",
      iconName: "Brain",
      description: "Autonomous multi-agent orchestration engine featuring semantic memory, dynamic tool calling, and human-in-the-loop validation.",
      duration: "Q3 2026",
      techStack: ["PYTHON", "PYTORCH", "LLM AGENTS"],
      featured: true,
      domain: "Artificial Intelligence",
      level: "Production",
      caseStudy: {
        tagline: "Autonomous multi-agent coordination with low-latency tool execution",
        overview: "A research-backed framework designed to automate complex developer workflows while maintaining human oversight through ergonomic touchpoints.",
        keyAchievements: [
          "Reduced hallucination rates by 42% through deterministic tool-calling constraints and verification steps.",
          "Sub-80ms semantic cache lookup using vector embeddings and memory-mapped indexes.",
          "Integrated human-in-the-loop review interface inspired by hospitality service touchpoints.",
        ],
        specs: [
          { label: "Core Runtime", value: "Python 3.12 / AsyncIO" },
          { label: "Orchestration", value: "Custom DAG Engine" },
          { label: "Throughput", value: "1,200 req/sec" },
          { label: "License", value: "Apache 2.0" },
        ],
        demoUrl: "https://demo.adley.tech/agent-engine",
        githubUrl: "https://github.com/adley/agent-engine",
        documentationUrl: "https://docs.adley.tech/agent-engine",
        modules: [
          {
            id: "mod-1",
            number: "01",
            title: "Agent Core & Dynamic Prompting Engine",
            subtitle: "Recursive prompt compression and context window optimization",
            content: "Implements hierarchical prompt templates with token budgeting and automatic pruning to fit within context constraints without degrading reasoning.",
            highlights: ["Token consumption reduced by 35%", "Zero-shot fallback pipelines"],
          },
          {
            id: "mod-2",
            number: "02",
            title: "Deterministic Tool Execution & Sandboxing",
            subtitle: "Secure gRPC tool executor with strict JSON schema validation",
            content: "Isolates external side effects in lightweight containers with strict CPU/memory caps and cryptographic audit logs.",
            highlights: ["Sub-5ms IPC overhead", "Deterministic replayability"],
          },
        ],
      },
    },
    {
      id: "proj-2",
      slug: "computer-systems-lab",
      title: "Computer Systems Lab & Distributed Memory",
      category: "SYSTEMS",
      badgeBg: "bg-[#16A34A]",
      badgeText: "text-white",
      thumbnailBg: "bg-[#F0FDF4]",
      iconName: "Cpu",
      description: "Low-latency in-memory cache with lock-free concurrent hash tables, zero-copy serialization, and WAL durability.",
      duration: "Q2 2026",
      techStack: ["GO", "RUST", "CONCURRENCY"],
      featured: true,
      domain: "Systems Architecture",
      level: "Production",
      caseStudy: {
        tagline: "High-performance distributed memory architecture",
        overview: "Explores the limits of modern x86/ARM hardware cache hierarchies to deliver sub-microsecond key-value queries under heavy concurrent writes.",
        keyAchievements: [
          "99.9th percentile read latency under 120 microseconds on 10Gbps Ethernet.",
          "Custom lock-free ring buffer achieving 4.8M ops/second per CPU core.",
          "Crash recovery time under 800ms for 16GB datasets via parallel WAL replay.",
        ],
        specs: [
          { label: "Language", value: "Go 1.23 / Rust FFI" },
          { label: "Concurrency Model", value: "Lock-Free Ring Buffer" },
          { label: "P99 Read Latency", value: "< 120 μs" },
          { label: "Durability", value: "Append-Only WAL" },
        ],
        demoUrl: "https://demo.adley.tech/systems-lab",
        githubUrl: "https://github.com/adley/systems-lab",
        modules: [
          {
            id: "mod-1",
            number: "01",
            title: "Memory Hierarchy & NUMA-Aware Allocations",
            subtitle: "Cache-conscious data structures and zero-copy buffers",
            content: "Aligns memory buffers to 64-byte CPU cache lines to eliminate false sharing and maximize L1/L2 cache hit ratios.",
            highlights: ["98.4% L2 cache hit rate", "Zero garbage collection pauses on hot paths"],
          },
          {
            id: "mod-2",
            number: "02",
            title: "Write-Ahead Log & Segment Compaction",
            subtitle: "Sequential I/O optimization with CRC32 checksum verification",
            content: "Groups concurrent writes into batch sync intervals using kernel direct I/O (O_DIRECT) to bypass OS page cache bottlenecks.",
            highlights: ["Sustained 450MB/s NVMe write bandwidth", "Full ACID guarantees"],
          },
        ],
      },
    },
    {
      id: "proj-3",
      slug: "neural-networks-deep-learning",
      title: "Neural Networks & Cloud Training Pipeline",
      category: "AI",
      badgeBg: "bg-[#C25E00]",
      badgeText: "text-white",
      thumbnailBg: "bg-[#FFF8F0]",
      iconName: "Network",
      description: "Distributed deep learning training infrastructure on Kubernetes with spot-instance fault resilience and gradient sync.",
      duration: "Q1 2026",
      techStack: ["PYTORCH", "CUDA", "K8S"],
      featured: true,
      domain: "Artificial Intelligence",
      level: "Academic Research",
      caseStudy: {
        tagline: "Cost-efficient distributed deep learning on heterogeneous clusters",
        overview: "A research-driven cloud training orchestration platform that leverages AWS/GCP spot instances with automatic checkpointing and dynamic gradient accumulation.",
        keyAchievements: [
          "68% reduction in cloud training expenses utilizing transient spot instances.",
          "Zero lost training state upon spot eviction with asynchronous NVMe snapshotting.",
          "Linear scaling efficiency up to 64 GPUs across multi-node InfiniBand clusters.",
        ],
        specs: [
          { label: "Framework", value: "PyTorch DDP / DeepSpeed" },
          { label: "Orchestration", value: "Kubernetes Operator" },
          { label: "GPU Support", value: "NVIDIA A100 / H100" },
          { label: "Cluster Network", value: "RoCE v2 / InfiniBand" },
        ],
        demoUrl: "https://demo.adley.tech/neural-pipeline",
        githubUrl: "https://github.com/adley/neural-pipeline",
        modules: [
          {
            id: "mod-1",
            number: "01",
            title: "Elastic Training Operator for Kubernetes",
            subtitle: "Dynamic cluster rescheduling without job restarts",
            content: "Custom CRD operator monitors cloud spot preemption signals and triggers rapid checkpoint consolidation across worker pods.",
            highlights: ["Eviction recovery within 14 seconds", "Healthcheck telemetry via Prometheus"],
          },
        ],
      },
    },
    {
      id: "proj-4",
      slug: "operating-systems-design",
      title: "Operating Systems Design & Raft Consensus",
      category: "SYSTEMS",
      badgeBg: "bg-[#0284C7]",
      badgeText: "text-white",
      thumbnailBg: "bg-[#F0F9FF]",
      iconName: "Layers",
      description: "Distributed fault-tolerant state machine engine implementing full Raft protocol with dynamic cluster membership changes.",
      duration: "Q4 2025",
      techStack: ["GO", "RAFT", "DISTRIBUTED"],
      featured: true,
      domain: "Systems Architecture",
      level: "Production",
      caseStudy: {
        tagline: "Distributed fault-tolerant state machine with consensus guarantees",
        overview: "A production-grade implementation of the Raft consensus algorithm, engineered from first principles to guarantee linearizable consistency across distributed nodes.",
        keyAchievements: [
          "Zero split-brain occurrences under 500+ simulated partition chaos tests.",
          "Sub-15ms leader election convergence upon simulated primary node crash.",
          "Full Jepsen test suite validation for linearizability and strict serializability.",
        ],
        specs: [
          { label: "Consensus Algorithm", value: "Raft (etcd-compatible)" },
          { label: "Transport", value: "gRPC over HTTP/2" },
          { label: "Availability SLA", value: "99.999% Fault Tolerance" },
          { label: "Formal Testing", value: "Jepsen Test Verified" },
        ],
        demoUrl: "https://demo.adley.tech/raft-consensus",
        githubUrl: "https://github.com/adley/raft-consensus",
        documentationUrl: "https://docs.adley.tech/raft-consensus",
        modules: [
          {
            id: "mod-1",
            number: "01",
            title: "Core Consensus State Machine & Term Management",
            subtitle: "Leader election, heartbeat scheduling, and candidate voting logic",
            content: "Manages cluster state transitions between Follower, Candidate, and Leader states with randomized election timeouts to avoid split-vote deadlocks.",
            highlights: [
              "Randomized election jitter (150ms - 300ms)",
              "Persistent disk write of currentTerm & votedFor prior to RPC reply",
            ],
          },
          {
            id: "mod-2",
            number: "02",
            title: "Log Replication & Log Matching Property",
            subtitle: "Strict ordering guarantees and uncommitted entry rollback",
            content: "Implements AppendEntries RPC with index integrity checks. Ensures followers match leader logs exactly before advancing commit index.",
            highlights: [
              "Batch log replication for maximum pipeline throughput",
              "Fast recovery path for conflicting log terms",
            ],
          },
          {
            id: "mod-3",
            number: "03",
            title: "Joint Consensus & Dynamic Membership Changes",
            subtitle: "Safe single-server and multi-server cluster reconfiguration",
            content: "Allows nodes to be added or decommissioned dynamically without stopping the cluster by running a transitional joint consensus configuration.",
            highlights: [
              "Two-phase configuration entry committing",
              "Zero downtime cluster scale up/down",
            ],
          },
          {
            id: "mod-4",
            number: "04",
            title: "Log Compaction & Snapshotting Protocol",
            subtitle: "State snapshot serialization and install snapshot RPC",
            content: "Prevents unbounded log growth by periodic asynchronous state snapshots. Sends snapshot chunks to lagging nodes to bring them up to date.",
            highlights: [
              "Copy-on-write memory snapshots",
              "Streaming chunked snapshot transmission",
            ],
          },
        ],
      },
    },
  ],
};
