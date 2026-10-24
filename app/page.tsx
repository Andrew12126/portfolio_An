import React from "react";
import { HeroSection } from "@/components/hero/hero-section";
import { ProjectGrid } from "@/components/projects/project-grid";
import { ProjectDetailView } from "@/components/projects/project-detail-view";
import { portfolioData } from "@/data/portfolio-data";

export default function HomePage() {
  // Use the Raft Consensus / Systems project as the featured deep-dive case study
  const featuredCaseStudy = portfolioData.projects[3];

  return (
    <div className="w-full flex flex-col">
      {/* 1. Hero Section (2 Asymmetric Columns: 60% Left, 40% Right Quick Filter) */}
      <HeroSection />

      {/* 2. Featured Projects Grid (4-Column Layout with Pastel Top Thumbnails) */}
      <ProjectGrid />

      {/* 3. Featured Project Case Study (2-Column: 2/3 Left Curriculum & 1/3 Right Sticky Specs) */}
      <section id="casestudy" className="w-full bg-[#FFFFFF] border-t border-[#E5E7EB] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF8F0] text-[#C25E00] border border-[#FBE3CC] text-xs font-mono font-semibold uppercase tracking-wider">
            <span>SPOTLIGHT ARCHITECTURAL CASE STUDY</span>
          </div>
        </div>
        <ProjectDetailView project={featuredCaseStudy} />
      </section>
    </div>
  );
}
