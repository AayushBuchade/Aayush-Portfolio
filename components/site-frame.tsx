import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-[736px] justify-end px-5 pt-5 sm:px-0">
          <div className="pointer-events-auto">
            <ThemeToggle />
          </div>
        </div>
      </div>
      <main id="content" className="mx-auto w-full max-w-[736px] px-5 pt-24 pb-36 sm:px-0">
        {children}
      </main>
      <footer className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper">
        <div className="mx-auto flex h-[53px] max-w-[736px] items-stretch justify-between px-5 sm:px-0">
          <p className="flex items-center gap-2 text-[13px] font-bold tracking-[0.04em] uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2f6f45]" aria-hidden />
            Open to roles
          </p>
          <Link
            href="/#connect"
            className="flex items-center bg-ink px-6 text-[13px] font-bold tracking-[0.04em] text-paper uppercase sm:px-8"
          >
            Let&apos;s talk
          </Link>
        </div>
      </footer>
    </>
  );
}

export function SectionHeading({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="mb-5 border-b border-line pb-3 text-[13px] font-bold tracking-[0.04em] text-muted uppercase"
    >
      {children}
    </h2>
  );
}
