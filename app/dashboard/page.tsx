"use client";
import { useEffect, useState } from "react";

type Episode = { id:string; EpisodeID:string; Title:string; Status:string; DueDate?:string|null; YouTubeURL?:string|null };

export default function DashboardPage() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [clientId, setClientId] = useState<string>(process.env.NEXT_PUBLIC_DEFAULT_CLIENT_ID || "CL-0001");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string| null>(null);

  async function load() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/episodes?clientId=${encodeURIComponent(clientId)}`, { cache: "no-store" });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setEpisodes(data.items || []);
    } catch (e:any) {
      setError(e.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    const t = setInterval(load, 15000); // refresh every 15s
    return () => clearInterval(t);
  }, [clientId]);

  return (
    <main>
      <h1 className="h1">Dashboard</h1>
      <div className="row" style={{marginBottom:12}}>
        <div className="muted">Client ID</div>
        <input className="input" value={clientId} onChange={e=>setClientId(e.target.value)} style={{minWidth:180}} />
      </div>

      <section>
        <h2 className="h2">Episodes</h2>
        {loading && <p>Loading…</p>}
        {error && <p style={{color:"#f66"}}>Error: {error}</p>}
        {!loading && episodes.length === 0 && <p>No episodes yet.</p>}

        <div className="grid">
          {episodes.map(ep => (
            <div key={ep.id} className="card">
              <div className="row">
                <div>
                  <div style={{fontWeight:700}}>{ep.Title || "Untitled"}</div>
                  <div className="muted">{ep.EpisodeID}</div>
                </div>
                <span className="badge">{ep.Status || "—"}</span>
              </div>
              <div className="row" style={{marginTop:8, justifyContent:"flex-start", gap:18}}>
                <div className="muted">Due: {ep.DueDate ? new Date(ep.DueDate).toLocaleDateString() : "—"}</div>
                {ep.YouTubeURL && <a href={ep.YouTubeURL} target="_blank">YouTube ↗</a>}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
