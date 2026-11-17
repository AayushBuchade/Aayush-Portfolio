import { NextResponse } from "next/server";
import { profile } from "@/lib/portfolio";

const hits = new Map<string, number[]>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_HITS = 5;
const MIN_FILL_MS = 1500;
const MAX_AGE_MS = 2 * 60 * 60 * 1000;

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || "local";
}

function limited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_HITS) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  return false;
}

function clean(value: string) {
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim();
}

async function readBody(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const body = (await request.json()) as Record<string, unknown>;
    return { body, json: true };
  }
  const form = await request.formData();
  return { body: Object.fromEntries(form.entries()) as Record<string, unknown>, json: false };
}

function respond(request: Request, json: boolean, status: number, error?: string) {
  if (json) {
    return NextResponse.json(error ? { ok: false, error } : { ok: true }, { status });
  }
  const url = new URL("/", request.url);
  url.hash = "connect";
  url.searchParams.set("sent", error ? "0" : "1");
  if (error) url.searchParams.set("error", error.slice(0, 180));
  return NextResponse.redirect(url, 303);
}

export async function POST(request: Request) {
  let json = true;
  let body: Record<string, unknown>;
  try {
    const parsed = await readBody(request);
    body = parsed.body;
    json = parsed.json;
  } catch {
    return NextResponse.json({ ok: false, error: "Message was not sent." }, { status: 400 });
  }

  if (typeof body.website === "string" && body.website.trim()) {
    return respond(request, json, 400, "Message was not sent.");
  }

  const name = typeof body.name === "string" ? clean(body.name) : "";
  const email = typeof body.email === "string" ? clean(body.email) : "";
  const message = typeof body.message === "string" ? clean(body.message) : "";
  const started = Number(body.started);

  if (name.length < 2 || name.length > 80) {
    return respond(request, json, 400, "Add your name.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 120) {
    return respond(request, json, 400, "Add a valid email address.");
  }
  if (message.length < 10 || message.length > 4000) {
    return respond(request, json, 400, "Write a message of at least 10 characters.");
  }
  if ((message.match(/https?:\/\//gi) || []).length > 3) {
    return respond(request, json, 400, "Message was not sent.");
  }

  const elapsed = Date.now() - started;
  if (json && (!Number.isFinite(started) || elapsed < MIN_FILL_MS || elapsed > MAX_AGE_MS)) {
    return respond(request, json, 400, "Message was not sent. Wait a moment and try again.");
  }

  if (limited(clientKey(request))) {
    return respond(request, json, 429, `Too many messages from this network. Email ${profile.email} instead.`);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || profile.email;

  if (!apiKey || !from) {
    return respond(
      request,
      json,
      503,
      `Email delivery is not configured. Set RESEND_API_KEY and CONTACT_FROM_EMAIL, or write to ${profile.email}.`,
    );
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Portfolio note from ${name}`,
        text: `${message}\n\nFrom: ${name} <${email}>`,
      }),
    });

    if (!response.ok) {
      return respond(request, json, 502, `Delivery failed. Write to ${profile.email}.`);
    }
  } catch {
    return respond(request, json, 502, `Delivery failed. Write to ${profile.email}.`);
  }

  return respond(request, json, 200);
}
