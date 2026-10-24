import React from "react";
import { BookOpen, Award, Clock, Terminal } from "lucide-react";
import { QuickFilterCard } from "./quick-filter-card";
import { portfolioData } from "@/data/portfolio-data";

export function HeroSection() {
  return (
    <section className="w-full bg-[#FFFFFF] border-b border-[#E5E7EB] py-14 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column (60% / col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Small Top Badge (Matching screenshot) */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDF3E7] text-[#C25E00] border border-[#FBE3CC] text-xs font-mono font-semibold uppercase tracking-wider">
              <Terminal className="w-3.5 h-3.5" />
              <span>{portfolioData.badge}</span>
            </div>

            {/* Headline with Sharp High-Contrast Serif / Architectural typography */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-[#111827] leading-[1.12] font-serif">
              Build Real Expertise in <br className="hidden sm:inline" />
              <span className="text-[#111827]">AI & Computer Systems</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed max-w-xl font-normal">
              Senior engineering portfolio showcasing distributed cloud architecture, AI application pipelines, and rigorous systems design. Built for high fault tolerance and human usability.
            </p>

            {/* Stats Row (Framed with thin 1px border - Matching reference image) */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-[#E5E7EB] text-xs sm:text-sm font-medium text-[#111827]">
                <BookOpen className="w-4 h-4 text-[#C25E00]" />
                <span>24+ Production Projects</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-[#E5E7EB] text-xs sm:text-sm font-medium text-[#111827]">
                <Award className="w-4 h-4 text-[#C25E00]" />
                <span>6 Industry Certifications</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-[#E5E7EB] text-xs sm:text-sm font-medium text-[#111827]">
                <Clock className="w-4 h-4 text-[#C25E00]" />
                <span>University & Research Grade</span>
              </div>
            </div>

          </div>

          {/* Right Column (40% / col-span-5) */}
          <div className="lg:col-span-5 flex justify-center">
            <QuickFilterCard />
          </div>

        </div>
      </div>
    </section>
  );
}
