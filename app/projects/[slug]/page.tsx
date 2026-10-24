import React from "react";
import { notFound } from "next/navigation";
import { ProjectDetailView } from "@/components/projects/project-detail-view";
import { portfolioData } from "@/data/portfolio-data";

export async function generateStaticParams() {
  return portfolioData.projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = portfolioData.projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="w-full min-h-screen bg-white">
      <ProjectDetailView project={project} />
    </div>
  );
}
