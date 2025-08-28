import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>ForgeVoice Client Dashboard</h1>
      <p><Link href="/dashboard">Go to Dashboard →</Link></p>
    </main>
  );
}
