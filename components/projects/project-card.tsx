import React from "react";
import Link from "next/link";
import { Brain, Cpu, Network, Layers, GitBranch, Database, ArrowUpRight } from "lucide-react";
import { Project } from "@/data/portfolio-data";

const iconMap = {
  Brain,
  Cpu,
  Network,
  Layers,
  GitBranch,
  Database,
};

export function ProjectCard({ project }: { project: Project }) {
  const IconComponent = iconMap[project.iconName] || Cpu;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col bg-white border border-[#E5E7EB] rounded-lg overflow-hidden hover:border-[#D1D5DB] hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all select-none"
    >
      {/* Top Half Thumbnail (Matching reference image pastel color blocks) */}
      <div
        className={`relative h-40 w-full ${project.thumbnailBg} flex items-center justify-center p-6 border-b border-[#E5E7EB]/80 transition-colors`}
      >
        {/* Top-Left Category Badge */}
        <div className="absolute top-3.5 left-3.5">
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${project.badgeBg} ${project.badgeText}`}
          >
            {project.category}
          </span>
        </div>

        {/* Center Minimalist Line Icon */}
        <div className="transition-transform duration-300 group-hover:scale-110">
          <IconComponent
            className="w-12 h-12 stroke-[1.5]"
            style={{
              color:
                project.category === "AI"
                  ? "#C25E00"
                  : project.category === "SYSTEMS" && project.badgeBg.includes("16A34A")
                  ? "#16A34A"
                  : project.category === "CLOUD"
                  ? "#D97706"
                  : "#0284C7",
            }}
          />
        </div>
      </div>

      {/* Bottom Half Content Area */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 bg-white">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-heading font-semibold text-base text-[#111827] group-hover:text-[#C25E00] transition-colors line-clamp-1">
              {project.title}
            </h3>
            <ArrowUpRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#C25E00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-0.5" />
          </div>

          <p className="text-xs text-[#6B7280] leading-relaxed line-clamp-2 mt-1.5 mb-4">
            {project.description}
          </p>
        </div>

        {/* Bottom Metadata Row */}
        <div className="pt-3 border-t border-[#F3F4F6] flex items-center justify-between text-[11px] font-mono">
          <span className="text-[#9CA3AF] uppercase">
            {project.duration}
          </span>
          <span className="text-[#6B7280] font-medium uppercase tracking-widest text-[10px]">
            {project.techStack.join(" • ")}
          </span>
        </div>
      </div>
    </Link>
  );
}
