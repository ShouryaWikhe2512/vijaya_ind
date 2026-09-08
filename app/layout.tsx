import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vijayaindustries.in"),
  title: {
    default: "Vijaya Industries | Automobile Clip Manufacturer in India",
    template: "%s | Vijaya Industries",
  },
  description:
    "Vijaya Industries manufactures durable automobile clips and fastening solutions for workshops, distributors, and bulk buyers across India.",
  applicationName: "Vijaya Industries",
  keywords: [
    "automobile clips manufacturer India",
    "automotive plastic clips",
    "bumper clips",
    "fender lining clips",
    "car trim clips wholesale",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Vijaya Industries",
    title: "Vijaya Industries | Automobile Clip Manufacturer in India",
    description:
      "Precision automobile clips and fastening solutions for workshops, distributors, and bulk buyers across India.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vijaya Industries | Automobile Clip Manufacturer in India",
    description:
      "Precision automobile clips and fastening solutions for workshops, distributors, and bulk buyers across India.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="font-sans min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
