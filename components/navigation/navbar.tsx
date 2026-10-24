"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Terminal, Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#E5E7EB] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Identity (Matching reference image) */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-8 h-8 rounded-lg bg-[#C25E00] flex items-center justify-center text-white shadow-none group-hover:bg-[#A84E00] transition-colors">
              <Terminal className="w-4 h-4" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-heading font-bold text-base tracking-tight text-[#111827]">
                Adley
              </span>
              <span className="text-sm font-normal text-[#6B7280]">
                Technical Hub
              </span>
            </div>
          </Link>

          {/* Navigation Links (Center) */}
          <nav className="hidden md:flex items-center gap-7">
            <Link
              href="#projects"
              className="text-sm font-medium text-[#111827] hover:text-[#C25E00] transition-colors"
            >
              Projects
            </Link>
            <Link
              href="#architecture"
              className="text-sm font-medium text-[#6B7280] hover:text-[#111827] transition-colors"
            >
              Architecture & Skills
            </Link>
            <Link
              href="#casestudy"
              className="text-sm font-medium text-[#6B7280] hover:text-[#111827] transition-colors"
            >
              Case Studies
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium text-[#6B7280] hover:text-[#111827] transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Right Action Tools (Search & CTA) */}
          <div className="flex items-center gap-3">
            {/* Search Input Bar */}
            <div className="hidden sm:flex items-center relative w-48 lg:w-56">
              <Search className="w-3.5 h-3.5 absolute left-3 text-[#9CA3AF] pointer-events-none" />
              <input
                type="text"
                placeholder="Search projects, skills..."
                className="w-full h-8 pl-8 pr-3 text-xs bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#C25E00] focus:bg-white transition-all"
              />
            </div>

            {/* Secondary Action Link */}
            <Link
              href="#resume"
              className="hidden lg:inline-flex text-xs font-semibold uppercase tracking-wider text-[#4B5563] hover:text-[#111827] px-2.5 py-1.5 transition-colors"
            >
              Resume
            </Link>

            {/* Primary CTA (Matching reference image) */}
            <Link href="#contact">
              <Button size="sm" className="font-medium text-xs sm:text-sm px-4">
                Contact Me
              </Button>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E5E7EB] bg-white px-4 pt-3 pb-5 space-y-3">
          <div className="relative mb-3">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search projects, skills..."
              className="w-full h-9 pl-9 pr-3 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-[#111827]"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Link
              href="#projects"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-sm font-medium text-[#111827] hover:bg-[#F9FAFB]"
            >
              Projects
            </Link>
            <Link
              href="#architecture"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-sm font-medium text-[#4B5563] hover:bg-[#F9FAFB]"
            >
              Architecture & Skills
            </Link>
            <Link
              href="#casestudy"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-sm font-medium text-[#4B5563] hover:bg-[#F9FAFB]"
            >
              Case Studies
            </Link>
            <Link
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-sm font-medium text-[#4B5563] hover:bg-[#F9FAFB]"
            >
              About
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
