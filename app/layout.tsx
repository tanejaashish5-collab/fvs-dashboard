import "./globals.css";

export const metadata = { title: "ForgeVoice Client Dashboard" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div style={{maxWidth:900, margin:"0 auto", padding:20}}>{children}</div>
      </body>
    </html>
  );
}
