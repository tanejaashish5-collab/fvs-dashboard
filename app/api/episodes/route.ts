import { NextResponse } from "next/server";

export async function GET() {
  const pat = process.env.AIRTABLE_PAT;
  const base = process.env.AIRTABLE_BASE_ID;
  const table = process.env.AIRTABLE_TABLE_EPISODES || "Episodes";

  if (!pat || !base) {
    return NextResponse.json({ error: "Missing Airtable env vars" }, { status: 500 });
  }

  const url = `https://api.airtable.com/v0/${base}/${encodeURIComponent(table)}`;

  const r = await fetch(url, { headers: { Authorization: `Bearer ${pat}` } });
  if (!r.ok) {
    const txt = await r.text();
    return NextResponse.json({ error: txt }, { status: r.status });
  }

  const data = await r.json();
  return NextResponse.json({ items: data.records || [] });
}
