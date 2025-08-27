import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // no caching

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const clientId = searchParams.get("clientId") || process.env.NEXT_PUBLIC_DEFAULT_CLIENT_ID || "";

  if (!clientId) {
    return NextResponse.json({ error: "clientId required" }, { status: 400 });
  }

  const pat = process.env.AIRTABLE_PAT;
  const base = process.env.AIRTABLE_BASE_ID;
  const table = process.env.AIRTABLE_TABLE_EPISODES || "Episodes";

  if (!pat || !base) {
    return NextResponse.json({ error: "Missing Airtable env vars" }, { status: 500 });
  }

  const url = new URL(`https://api.airtable.com/v0/${base}/${encodeURIComponent(table)}`);
  url.searchParams.set("filterByFormula", `{ClientID}='${clientId}'`);
  url.searchParams.set("sort[0][field]","UpdatedAt");
  url.searchParams.set("sort[0][direction]","desc");

  const r = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${pat}` }
  });

  if (!r.ok) {
    const txt = await r.text();
    return NextResponse.json({ error: txt }, { status: r.status });
  }

  const data = await r.json();
  const items = (data.records || []).map((rec:any) => ({
    id: rec.id,
    EpisodeID: rec.fields.EpisodeID || "",
    Title: rec.fields.Title || "",
    Status: rec.fields.Status || "",
    DueDate: rec.fields.DueDate || null,
    YouTubeURL: rec.fields.YouTubeURL || null
  }));

  return NextResponse.json({ items });
}
