import Nav from "@/components/Nav"
import "@/app/globals.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body>
        <div style={{ marginTop: "20px" }}>
          <Nav />
        </div>
        {children}
      </body>
    </html>
  )
}
