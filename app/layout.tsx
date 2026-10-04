import Nav from "@/components/Nav"
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  )
}

