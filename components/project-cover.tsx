import Image from "next/image";
import { ViewTransition } from "react";
import type { Project } from "@/lib/portfolio";

export function ProjectCover({ project }: { project: Project }) {
  const image = project.images[0];

  const cover = image ? (
    <div className="relative h-full w-full bg-soft">
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        quality={90}
        sizes="(min-width: 640px) 360px, 100vw"
        className="h-full w-full object-contain transition duration-700 ease-out group-hover:scale-[1.035] motion-reduce:transform-none"
      />
    </div>
  ) : (
    <div className="flex h-full min-h-48 flex-col justify-between bg-soft p-6">
      <p className="text-[13px] font-bold tracking-[0.04em] text-muted uppercase">{project.status}</p>
      <div>
        <p className="max-w-[12ch] text-[1.7rem] leading-[1.05] font-bold tracking-[-0.03em]">{project.name}</p>
        <p className="mt-3 max-w-[24ch] text-[13px] text-muted">No interface screenshot is in this repository.</p>
      </div>
    </div>
  );

  return (
    <ViewTransition name={`work-${project.slug}`} share="morph" default="none">
      {cover}
    </ViewTransition>
  );
}

export function ProjectGallery({ project }: { project: Project }) {
  if (project.images.length === 0) return null;

  return (
    <div className="mt-10 space-y-4">
      {project.images.map((image, index) => {
        const figure = (
          <figure className="overflow-hidden rounded-[6px] border border-line bg-soft">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              quality={90}
              sizes="(min-width: 768px) 736px, 100vw"
              priority={index === 0}
              className="h-auto w-full"
            />
          </figure>
        );
        if (index !== 0) return <div key={image.src}>{figure}</div>;
        return (
          <ViewTransition key={image.src} name={`work-${project.slug}`} share="morph" default="none">
            {figure}
          </ViewTransition>
        );
      })}
    </div>
  );
}
