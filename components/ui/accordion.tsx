"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionContextValue {
  expandedItems: string[];
  toggleItem: (id: string) => void;
}

const AccordionContext = React.createContext<AccordionContextValue>({
  expandedItems: [],
  toggleItem: () => {},
});

export function Accordion({
  children,
  defaultExpanded = [],
  className,
}: {
  children: React.ReactNode;
  defaultExpanded?: string[];
  className?: string;
}) {
  const [expandedItems, setExpandedItems] = React.useState<string[]>(defaultExpanded);

  const toggleItem = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <AccordionContext.Provider value={{ expandedItems, toggleItem }}>
      <div className={cn("divide-y divide-[#E5E7EB] border-y border-[#E5E7EB]", className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({
  id,
  children,
  className,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("group", className)} data-state={id}>
      {children}
    </div>
  );
}

export function AccordionTrigger({
  id,
  children,
  className,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { expandedItems, toggleItem } = React.useContext(AccordionContext);
  const isOpen = expandedItems.includes(id);

  return (
    <button
      type="button"
      onClick={() => toggleItem(id)}
      className={cn(
        "flex w-full items-center justify-between py-4 text-left font-medium transition-all hover:bg-[#F9FAFB] px-4",
        className
      )}
      aria-expanded={isOpen}
    >
      <div className="flex-1 pr-4">{children}</div>
      <ChevronDown
        className={cn(
          "h-4 w-4 shrink-0 text-[#6B7280] transition-transform duration-200",
          isOpen && "rotate-180 text-[#C25E00]"
        )}
      />
    </button>
  );
}

export function AccordionContent({
  id,
  children,
  className,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { expandedItems } = React.useContext(AccordionContext);
  const isOpen = expandedItems.includes(id);

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "overflow-hidden px-4 pb-4 pt-1 text-sm text-[#4B5563] bg-[#FAFAFA]/50 border-t border-[#F3F4F6]",
        className
      )}
    >
      {children}
    </div>
  );
}
