import { NextResponse } from "next/server";
import { profile } from "@/lib/portfolio";

const hits = new Map<string, number[]>();

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || "local";
}

function limited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < 60 * 60 * 1000);
  if (recent.length >= 5) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  return false;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Message was not sent." }, { status: 400 });
  }

  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: false, error: "Message was not sent." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (name.length < 2 || name.length > 80) {
    return NextResponse.json({ ok: false, error: "Add your name." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 120) {
    return NextResponse.json({ ok: false, error: "Add a valid email address." }, { status: 400 });
  }
  if (message.length < 10 || message.length > 4000) {
    return NextResponse.json({ ok: false, error: "Write a message of at least 10 characters." }, { status: 400 });
  }
  if (limited(clientKey(request))) {
    return NextResponse.json({ ok: false, error: "Too many messages from this network. Email directly instead." }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || profile.email;

  if (!apiKey || !from) {
    return NextResponse.json(
      {
        ok: false,
        error: `Email delivery is not configured yet. Write to ${profile.email}.`,
      },
      { status: 503 },
    );
  }

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
    return NextResponse.json(
      { ok: false, error: `Delivery failed. Write to ${profile.email}.` },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
