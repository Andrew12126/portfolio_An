import React from "react";
import Link from "next/link";
import { Terminal, Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-[#FFFFFF] border-t border-[#E5E7EB] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-[#E5E7EB]">
          
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#C25E00] flex items-center justify-center text-white">
              <Terminal className="w-3.5 h-3.5" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-heading font-bold text-sm tracking-tight text-[#111827]">
                Adley
              </span>
              <span className="text-xs text-[#6B7280]">
                Technical Hub & Portfolio
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs font-mono text-[#6B7280]">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#111827] flex items-center gap-1 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#111827] flex items-center gap-1 transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <a
              href="mailto:contact@adley.tech"
              className="hover:text-[#111827] flex items-center gap-1 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>
          </div>

        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#9CA3AF] font-mono">
          <div>
            © {new Date().getFullYear()} Adley. Built with Next.js, Tailwind CSS & Swiss Minimalist Design.
          </div>
          <div>
            Strict Light Mode • Deep Burnt Orange Accent (#C25E00)
          </div>
        </div>
      </div>
    </footer>
  );
}
