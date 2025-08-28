"use client";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);

  async function load() {
    try {
      setLoading(true);
      const res = await fetch("/api/episodes", { cache: "no-store" });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setEpisodes(data.items || []);
    } catch (e:any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  return (
    <main>
      <h1>Episodes</h1>
      {loading && <p>Loading…</p>}
      {error && <p style={{color:"red"}}>Error: {error}</p>}
      {!loading && episodes.length===0 && <p>No episodes yet.</p>}
      <ul>
        {episodes.map(ep=>(
          <li key={ep.id}>{ep.fields?.Title} ({ep.fields?.Status})</li>
        ))}
      </ul>
    </main>
  );
}
