import "@/styles/globals.scss";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="app-root">
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
