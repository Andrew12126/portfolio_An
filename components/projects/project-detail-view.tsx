"use client";

import React from "react";
import Link from "next/link";
import {
  ChevronRight,
  CheckCircle2,
  ExternalLink,
  Github,
  BookOpen,
  Server,
  ShieldCheck,
  Cpu,
  Layers,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Project } from "@/data/portfolio-data";

export function ProjectDetailView({ project }: { project: Project }) {
  const caseStudy = project.caseStudy || {
    tagline: project.description,
    overview: project.description,
    keyAchievements: [
      "Zero downtime architecture verified under continuous load testing.",
      "Optimized memory usage with cache-aligned data structures.",
      "Complete test coverage with automated CI/CD validation pipelines.",
    ],
    specs: [
      { label: "Architecture", value: "Microservices / Event-Driven" },
      { label: "Primary Runtime", value: "Go 1.23 / Python 3.12" },
      { label: "Target Availability", value: "99.99% SLA" },
      { label: "License", value: "MIT Open Source" },
    ],
    demoUrl: "https://demo.adley.tech",
    githubUrl: "https://github.com/adley",
    modules: [
      {
        id: "mod-1",
        number: "01",
        title: "Core Architecture & Data Ingestion",
        subtitle: "High-throughput data ingestion pipeline and validation schemas",
        content: "Detailed breakdown of the streaming engine and backpressure handling mechanism.",
        highlights: ["Sub-millisecond processing", "Zero data loss guarantee"],
      },
      {
        id: "mod-2",
        number: "02",
        title: "State Management & Observability",
        subtitle: "Distributed state coordination and OpenTelemetry instrumentation",
        content: "Telemetry collection, structured JSON audit logs, and Prometheus metrics export.",
        highlights: ["Distributed tracing integration", "Grafana alerts"],
      },
    ],
  };

  return (
    <article className="w-full bg-[#FFFFFF] py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-mono text-[#6B7280] mb-8 pb-4 border-b border-[#E5E7EB]">
          <Link href="/" className="hover:text-[#111827] transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-[#9CA3AF]" />
          <Link href="/#projects" className="hover:text-[#111827] transition-colors">
            Projects
          </Link>
          <ChevronRight className="w-3 h-3 text-[#9CA3AF]" />
          <span className="text-[#111827] font-medium truncate max-w-[200px] sm:max-w-none">
            {project.title}
          </span>
        </nav>

        {/* 2-Column Asymmetric Layout (2/3 Left, 1/3 Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* ================================================================
              LEFT COLUMN (2/3 - col-span-8): Project Architecture Deep-Dive
              ================================================================ */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Header / Title / Tagline */}
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <Badge variant={project.category === "AI" ? "default" : "systems"}>
                  {project.category}
                </Badge>
                <span className="font-mono text-xs text-[#9CA3AF]">
                  {project.duration}
                </span>
                <span className="text-[#D1D5DB]">•</span>
                <span className="font-mono text-xs text-[#6B7280] uppercase">
                  {project.level}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-[#111827] leading-tight tracking-tight mb-4">
                {project.title}
              </h1>

              <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed">
                {caseStudy.tagline}
              </p>

              {/* Tech Stack Tags */}
              <div className="flex flex-wrap items-center gap-2 mt-5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#F9FAFB] border border-[#E5E7EB] text-xs font-mono font-medium text-[#374151]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Overview Paragraph */}
            <div className="prose prose-slate max-w-none text-sm sm:text-base text-[#374151] leading-relaxed">
              <p>{caseStudy.overview}</p>
            </div>

            {/* ==============================================================
                KEY ACHIEVEMENTS BOX (Đóng khung nét đứt hoặc viền mảnh)
                ============================================================== */}
            <div className="bg-[#FAF9F6] border border-[#E5E7EB] rounded-lg p-6 sm:p-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-[#C25E00]">
                <ShieldCheck className="w-4 h-4 text-[#C25E00]" />
                <span>KEY ARCHITECTURAL ACHIEVEMENTS</span>
              </div>

              <ul className="space-y-3 pt-1">
                {caseStudy.keyAchievements.map((achievement, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-[#111827]">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                    <span className="leading-snug">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ==============================================================
                PROJECT STRUCTURE ACCORDION (Course Curriculum Style)
                ============================================================== */}
            <div className="pt-4">
              <div className="mb-4">
                <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#111827]">
                  System Architecture & Module Breakdown
                </h2>
                <p className="text-xs sm:text-sm text-[#6B7280] mt-1 font-mono">
                  Curriculum-style technical specification & execution logs
                </p>
              </div>

              <Accordion defaultExpanded={[caseStudy.modules[0]?.id || "mod-1"]}>
                {caseStudy.modules.map((mod) => (
                  <AccordionItem key={mod.id} id={mod.id}>
                    <AccordionTrigger id={mod.id}>
                      <div className="flex items-start gap-3.5">
                        <span className="font-mono text-xs font-bold text-[#C25E00] px-2 py-0.5 rounded bg-[#FFF8F0] border border-[#FBE3CC] mt-0.5">
                          {mod.number}
                        </span>
                        <div>
                          <div className="font-heading font-semibold text-sm sm:text-base text-[#111827]">
                            {mod.title}
                          </div>
                          <div className="text-xs text-[#6B7280] font-normal mt-0.5">
                            {mod.subtitle}
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent id={mod.id}>
                      <div className="py-2 pl-11 space-y-3">
                        <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                          {mod.content}
                        </p>
                        {mod.highlights && mod.highlights.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-1">
                            {mod.highlights.map((h, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center text-[11px] font-mono bg-white px-2 py-0.5 rounded border border-[#E5E7EB] text-[#374151]"
                              >
                                ✓ {h}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

          </div>

          {/* ================================================================
              RIGHT COLUMN (1/3 - col-span-4): Sticky Card with Specs & CTAs
              ================================================================ */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 space-y-6 shadow-none">
              
              <div>
                <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-[#6B7280] mb-4">
                  PROJECT ACTIONS & REPOSITORY
                </h3>

                {/* Primary & Secondary Action Buttons */}
                <div className="space-y-3">
                  {caseStudy.demoUrl && (
                    <a
                      href={caseStudy.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button className="w-full flex items-center justify-center gap-2">
                        <ExternalLink className="w-4 h-4" />
                        <span>Launch Live System Demo</span>
                      </Button>
                    </a>
                  )}

                  {caseStudy.githubUrl && (
                    <a
                      href={caseStudy.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button variant="secondary" className="w-full flex items-center justify-center gap-2">
                        <Github className="w-4 h-4" />
                        <span>Explore GitHub Repo</span>
                      </Button>
                    </a>
                  )}

                  {caseStudy.documentationUrl && (
                    <a
                      href={caseStudy.documentationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full block text-center text-xs font-mono text-[#6B7280] hover:text-[#C25E00] pt-1"
                    >
                      <span className="inline-flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        View Technical Docs
                      </span>
                    </a>
                  )}
                </div>
              </div>

              {/* System Specifications Table */}
              <div className="pt-4 border-t border-[#E5E7EB]">
                <h4 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#6B7280] mb-3">
                  SYSTEM SPECIFICATIONS
                </h4>

                <dl className="divide-y divide-[#F3F4F6] text-xs">
                  {caseStudy.specs.map((spec, idx) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between">
                      <dt className="text-[#6B7280] font-normal">{spec.label}</dt>
                      <dd className="font-mono font-medium text-[#111827] text-right">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Research & Peer Review Badge */}
              <div className="pt-2">
                <div className="p-3 rounded-lg bg-[#FAF9F6] border border-[#E5E7EB] text-xs text-[#6B7280] space-y-1">
                  <div className="font-semibold text-[#111827] flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5 text-[#C25E00]" />
                    <span>Peer-Reviewed System Architecture</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Designed according to university-level distributed systems criteria and fault tolerance benchmarks.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </article>
  );
}
