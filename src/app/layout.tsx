import NavBar from "@/components/Navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-primary-foreground">
        <NavBar />
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
