"use client";

import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";

type DocumentWithTransition = Document & {
  startViewTransition?: (callback: () => void) => void;
};

export function WorkLink({
  href,
  className,
  children,
  label,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  label: string;
}) {
  const router = useRouter();

  function onClick(event: MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const doc = document as DocumentWithTransition;
    if (!doc.startViewTransition || reduce) return;
    event.preventDefault();
    doc.startViewTransition(() => {
      router.push(href);
    });
  }

  return (
    <a href={href} aria-label={label} onClick={onClick} className={className}>
      {children}
    </a>
  );
}
