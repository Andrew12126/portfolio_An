"use client";

import React, { useState } from "react";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuickFilterCardProps {
  onFilterChange?: (filters: { subject: string; skill: string; level: string }) => void;
}

export function QuickFilterCard({ onFilterChange }: QuickFilterCardProps) {
  const [subject, setSubject] = useState("All Subjects");
  const [skill, setSkill] = useState("All Skills");
  const [level, setLevel] = useState("All Levels");

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (onFilterChange) {
      onFilterChange({ subject, skill, level });
    }
  };

  return (
    <div className="w-full bg-white border border-[#E5E7EB] rounded-lg p-6 sm:p-7 shadow-none">
      <div className="mb-5">
        <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-[#6B7280]">
          FILTER PROJECTS
        </h3>
      </div>

      <form onSubmit={handleApply} className="space-y-4">
        {/* Subject Filter */}
        <div className="relative">
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full h-11 px-3.5 pr-10 appearance-none bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#C25E00] cursor-pointer transition-colors"
          >
            <option value="All Subjects">All Subjects</option>
            <option value="Artificial Intelligence">Artificial Intelligence & LLMs</option>
            <option value="Systems Architecture">Systems Architecture & OS</option>
            <option value="Cloud & DevOps">Cloud & DevOps Infrastructure</option>
            <option value="Human-Centric UX">Human-Centric AI & UX</option>
          </select>
          <ChevronDown className="w-4 h-4 text-[#9CA3AF] absolute right-3.5 top-3.5 pointer-events-none" />
        </div>

        {/* Skill Filter */}
        <div className="relative">
          <select
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            className="w-full h-11 px-3.5 pr-10 appearance-none bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#C25E00] cursor-pointer transition-colors"
          >
            <option value="All Skills">All Skills</option>
            <option value="Python & PyTorch">Python & PyTorch</option>
            <option value="Go & Rust">Go & Rust Concurrency</option>
            <option value="Kubernetes & Terraform">Kubernetes & Terraform</option>
            <option value="Distributed Consensus">Distributed Consensus (Raft)</option>
          </select>
          <ChevronDown className="w-4 h-4 text-[#9CA3AF] absolute right-3.5 top-3.5 pointer-events-none" />
        </div>

        {/* Level Filter */}
        <div className="relative">
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full h-11 px-3.5 pr-10 appearance-none bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#C25E00] cursor-pointer transition-colors"
          >
            <option value="All Levels">All Levels</option>
            <option value="Production Grade">Production Grade Systems</option>
            <option value="Academic Research">Academic Research & Papers</option>
            <option value="Open Source Core">Open Source Libraries</option>
          </select>
          <ChevronDown className="w-4 h-4 text-[#9CA3AF] absolute right-3.5 top-3.5 pointer-events-none" />
        </div>

        {/* Submit Button (Matching reference design) */}
        <div className="pt-2">
          <Button
            type="submit"
            className="w-full h-11 text-sm font-medium flex items-center justify-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Apply Filters</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
