import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "./project-card";
import { portfolioData, Project } from "@/data/portfolio-data";

export function ProjectGrid({
  projects = portfolioData.projects,
}: {
  projects?: Project[];
}) {
  return (
    <section id="projects" className="w-full bg-[#FFFFFF] py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Matching reference image) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#E5E7EB]">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#111827] tracking-tight">
              Featured Projects
            </h2>
            <p className="text-sm text-[#6B7280] mt-1 font-normal">
              Curated by our academic committee & engineering team
            </p>
          </div>

          <Link
            href="#all-projects"
            className="inline-flex items-center gap-1 text-sm font-medium text-[#C25E00] hover:text-[#A84E00] transition-colors self-start sm:self-auto group"
          >
            <span>View all projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* 4-Column Grid (Bố cục lưới 4 cột) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

      </div>
    </section>
  );
}
