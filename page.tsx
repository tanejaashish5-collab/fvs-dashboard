import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 className="h1">ForgeVoice Client Dashboard</h1>
      <p className="muted" style={{marginBottom:16}}>Simple live dashboard reading from Airtable.</p>
      <p><Link href="/dashboard">Go to Dashboard →</Link></p>
      <div className="card" style={{marginTop:16}}>
        <p><b>Next step:</b> set your Airtable keys in environment variables (see README), then open the Dashboard.</p>
      </div>
    </main>
  );
}
