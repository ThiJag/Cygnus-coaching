import Image from "next/image";
import Link from "next/link";
import { groq } from "next-sanity";
import type { Metadata } from "next";
import type { PortableTextBlock } from "@portabletext/types";
import { PortableText } from "@portabletext/react";
import { sanityFetch } from "../../sanity/lib/live";
import { portableTextComponentsSimple } from "../../components/portableTextComponents";
import { urlFor } from "../../sanity/lib/image";

const pageQuery = groq`
  *[_type == "page" && slug.current == "over-mij"][0]{
    title,
    content,
    introText,
    credentials,
    inspirationQuote,
    quoteAuthor,
    photo
  }
`;

export const metadata: Metadata = {
  title: "Over mij",
  description: "Rike Weltjens — gecertificeerd coach met 20+ jaar ervaring.",
};

type OverMijDoc = {
  title?: string;
  content?: PortableTextBlock[];
  introText?: string;
  credentials?: string[];
  inspirationQuote?: string;
  quoteAuthor?: string;
  photo?: { asset?: { _ref?: string } };
};

const DEFAULT_CREDENTIALS = ["ICF ACC", "NLP master", "Stress & burn-out certificaat"];

export default async function OverMijPage() {
  const { data } = await sanityFetch({ query: pageQuery });
  const doc = data as OverMijDoc | null;

  const introText = doc?.introText ?? "Rike Weltjens — gecertificeerd ICF-coach, met meer dan 20 jaar ervaring in begeleiding en ontwikkeling.";
  const credentials = doc?.credentials?.length ? doc.credentials : DEFAULT_CREDENTIALS;
  const inspirationQuote = doc?.inspirationQuote ?? "We zien goed enkel met het hart. Het wezenlijke is onzichtbaar voor de ogen.";
  const quoteAuthor = doc?.quoteAuthor ?? "Antoine de Saint-Exupéry";
  const photoUrl = doc?.photo?.asset ? urlFor(doc.photo).width(800).url() : null;

  return (
    <div className="bg-[#F9F7F4]">
      <section className="border-b border-[#1B3A5C]/10 bg-[linear-gradient(180deg,rgba(27,58,92,0.06),transparent)]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <h1 className="font-serif text-4xl tracking-tight text-[#1B3A5C] sm:text-5xl">
            {doc?.title ?? "Over mij"}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[#1B3A5C]/75">
            {introText}
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-12 md:py-16">
        <div className="md:col-span-5">
          <div className="overflow-hidden rounded-[2rem] border border-[#1B3A5C]/10 bg-white shadow-xl shadow-[#1B3A5C]/10">
            <div className="relative aspect-[4/5] w-full">
              {photoUrl ? (
                <Image
                  src={photoUrl}
                  alt={doc?.title ?? "Rike Weltjens"}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 40vw, 100vw"
                  priority
                />
              ) : (
                <Image
                  src="/images/rike-placeholder.svg"
                  alt="Rike Weltjens"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 40vw, 100vw"
                  priority
                  unoptimized
                />
              )}
            </div>
          </div>
          {!photoUrl && (
            <p className="mt-4 text-center text-xs text-[#1B3A5C]/55">
              Voeg een foto toe via Sanity Studio (pagina{" "}
              <strong>Over Mij</strong> → Foto)
            </p>
          )}
        </div>

        <div className="md:col-span-7">
          <div className="rounded-2xl border border-[#1B3A5C]/10 bg-white p-6 shadow-lg shadow-[#1B3A5C]/5 sm:p-8">
            {doc?.content?.length ? (
              <PortableText
                value={doc.content}
                components={portableTextComponentsSimple}
              />
            ) : (
              <p className="text-base leading-7 text-[#1B3A5C]/80">
                Voeg in Sanity een document <strong>Pagina</strong> toe met
                slug <strong>over-mij</strong> en vul de inhoud aan.
              </p>
            )}
          </div>

          <div className="mt-8 rounded-2xl border border-[#1B3A5C]/10 bg-[#F9F7F4] p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#1B3A5C]/55">
              Certificaten &amp; opleidingen
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-[#1B3A5C]/85">
              {credentials.map((c) => (
                <li key={c} className="flex gap-3">
                  <span className="text-[#C9A96E]">✓</span> {c}
                </li>
              ))}
            </ul>
          </div>

          <blockquote className="mt-8 border-l-4 border-[#C9A96E] pl-6">
            <p className="font-serif text-xl italic leading-relaxed text-[#1B3A5C]">
              &ldquo;{inspirationQuote}&rdquo;
            </p>
            <footer className="mt-3 text-sm text-[#1B3A5C]/60">
              — {quoteAuthor}
            </footer>
          </blockquote>

          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex rounded-full bg-[#1B3A5C] px-6 py-3 text-sm font-semibold text-[#F9F7F4] transition hover:bg-[#16314D]"
            >
              Contacteer mij
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
