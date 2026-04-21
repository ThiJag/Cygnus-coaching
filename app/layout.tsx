import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { groq } from "next-sanity";
import Navbar from "../components/Navbar";
import { sanityFetch, SanityLive } from "../sanity/lib/live";
import { urlFor } from "../sanity/lib/image";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const settingsMetaQuery = groq`*[_type == "settings" && _id == "settings"][0]{
  companyName,
  metaDescription,
  logo { asset-> }
}`;

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({ query: settingsMetaQuery });
  const s = data as { companyName?: string; metaDescription?: string } | null;
  const name = s?.companyName ?? "Cygnus Coaching BV";
  return {
    title: {
      default: name,
      template: `%s | ${name}`,
    },
    description:
      s?.metaDescription ??
      "Professionele coaching in Genk door Rike Weltjens — stress & burn-out, loopbaan, leiderschap en life coaching.",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data } = await sanityFetch({ query: settingsMetaQuery });
  const s = data as { companyName?: string; logo?: object } | null;
  const logoUrl = s?.logo ? urlFor(s.logo).height(128).format('png').url() : undefined;

  return (
    <html
      lang="nl"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F9F7F4] font-sans text-[#0F172A]">
        <Navbar logoUrl={logoUrl} />
        <main className="flex-1">{children}</main>
        <SanityLive />
      </body>
    </html>
  );
}
