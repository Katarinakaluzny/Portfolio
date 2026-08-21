import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const meshedDisplay = localFont({
  src: "../fonts/MeshedDisplay-Regular.otf",
  variable: "--font-meshed",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Katarina — Portfolio",
  description: "Product Designer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={meshedDisplay.variable}>
      <body>{children}</body>
    </html>
  );
}
