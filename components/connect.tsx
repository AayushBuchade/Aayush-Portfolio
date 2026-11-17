"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/portfolio";
import { SectionHeading } from "@/components/site-frame";

type Status = "idle" | "sending" | "sent" | "error";

export function Connect({
  resumeReady,
  deliveryConfigured,
}: {
  resumeReady: boolean;
  deliveryConfigured: boolean;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const started = useRef(0);
  useEffect(() => {
    started.current = Date.now();
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(new FormData(form)), started: started.current }),
      });
      const data = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!response.ok || !data?.ok) {
        setStatus("error");
        setMessage(data?.error || "Message was not sent. You can email directly.");
        return;
      }
      form.reset();
      setStatus("sent");
      setMessage("Message sent.");
    } catch {
      setStatus("error");
      setMessage("Message was not sent. You can email directly.");
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
      setMessage("Could not copy the address. It is selected in the mail link.");
    }
  }

  return (
    <section id="connect" aria-labelledby="connect-heading" className="mt-16 scroll-mt-16">
      <SectionHeading id="connect-heading">Connect</SectionHeading>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3 text-[13px] text-muted">
        <a className="hover:text-ink hover:underline" href={profile.github} target="_blank" rel="noreferrer noopener">
          GitHub
        </a>
        <span aria-hidden>·</span>
        <a className="hover:text-ink hover:underline" href={profile.linkedin} target="_blank" rel="noreferrer noopener">
          LinkedIn
        </a>
        <span aria-hidden>·</span>
        {resumeReady ? (
          <a
            href="/resume.pdf"
            download
            className="inline-flex bg-ink px-4 py-2 font-bold tracking-[0.04em] text-paper uppercase"
          >
            Download resume
          </a>
        ) : (
          <button
            type="button"
            className="inline-flex bg-ink px-4 py-2 font-bold tracking-[0.04em] text-paper uppercase"
            onClick={() => setMessage("Add public/resume.pdf to enable the download.")}
          >
            Download resume
          </button>
        )}
      </div>
      <p className="mt-4 flex items-center gap-3 text-[13px]">
        <a className="text-muted hover:text-ink hover:underline" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <button type="button" className="text-muted hover:text-ink" onClick={copyEmail} aria-label="Copy email address">
          {copied ? "Copied" : "Copy"}
        </button>
      </p>

      <form action="/api/contact" method="post" onSubmit={onSubmit} className="mt-8 grid gap-5" aria-describedby="form-status">
        <label className="grid gap-2 text-[13px] font-bold tracking-[0.04em] uppercase">
          Name
          <input
            name="name"
            required
            autoComplete="name"
            maxLength={80}
            className="border-b border-line bg-transparent py-2 text-base font-normal tracking-normal normal-case outline-none focus:border-ink"
          />
        </label>
        <label className="grid gap-2 text-[13px] font-bold tracking-[0.04em] uppercase">
          Email
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            maxLength={120}
            className="border-b border-line bg-transparent py-2 text-base font-normal tracking-normal normal-case outline-none focus:border-ink"
          />
        </label>
        <label className="grid gap-2 text-[13px] font-bold tracking-[0.04em] uppercase">
          Message
          <textarea
            name="message"
            required
            minLength={10}
            maxLength={4000}
            rows={5}
            className="resize-y border-b border-line bg-transparent py-2 text-base font-normal tracking-normal normal-case outline-none focus:border-ink"
          />
        </label>
        <p className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
          <label>
            Website
            <input name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
          </label>
        </p>
        <div className="flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center">
          <div className="grid gap-1">
            {!deliveryConfigured ? (
              <p className="text-[13px] text-muted">
                Email delivery is not configured. Set RESEND_API_KEY and CONTACT_FROM_EMAIL. {profile.email} still works.
              </p>
            ) : null}
            <p id="form-status" className="text-[13px] text-muted" role="status" aria-live={status === "error" ? "assertive" : "polite"}>
              {message}
            </p>
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="bg-ink px-6 py-3 text-[13px] font-bold tracking-[0.04em] text-paper uppercase disabled:opacity-60 sm:self-end"
          >
            {status === "sending" ? "Sending" : "Send"}
          </button>
        </div>
      </form>
    </section>
  );
}
