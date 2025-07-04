import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import "./navbar.css"; // Importez le CSS de la barre de navigation ici

import Navigation from "./components/Navigation";
import Footer from "./components/Footer"; // Importez le Footer
import { Container } from "react-bootstrap";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "US MARQUILLIES",
  description: "Site officiel du club de football US Marquillies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
        <script async src="https://www.tiktok.com/embed.js"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Container>
          <div style={{ position: 'relative', width: '100%', height: '250px', backgroundImage: 'url(/images/banniere.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          </div>
          <Navigation />
          <div style={{ backgroundColor: '#F8F8F8', padding: '20px', minHeight: 'calc(100vh - 250px - 56px)' }}>{children}</div> {/* 56px est la hauteur par défaut de la navbar Bootstrap */}
        </Container>
        <Footer />
      </body>
    </html>
  );
}
