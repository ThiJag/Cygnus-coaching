import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { groq } from "next-sanity";
import type { Metadata } from "next";
import type { PortableTextBlock } from "@portabletext/types";
import { PortableText } from "@portabletext/react";
import { client, fetchSanity } from "../../../sanity/lib/client";
import { portableTextComponents } from "../../../components/portableTextComponents";
import { urlFor } from "../../../sanity/lib/image";

type ServiceDoc = {
  _id: string;
  name: string;
  slug: { current: string };
  description?: string;
  themes?: string[];
  result?: PortableTextBlock[];
  photo?: Record<string, unknown> | null;
};

const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0]{
    _id,
    name,
    slug,
    description,
    themes,
    result,
    photo
  }
`;

const allServiceSlugsQuery = groq`
  *[_type == "service" && defined(slug.current)].slug.current
`;

export async function generateStaticParams() {
  // Gebruik de plain client (geen draftMode/live) — build-time safe
  const slugs =
    (await client.fetch<string[]>(allServiceSlugsQuery)) ?? [];
  return slugs.map((slug) => ({ slug }));
}

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await fetchSanity<ServiceDoc | null>(serviceBySlugQuery, { slug });
  if (!service) return { title: "Coaching" };
  return {
    title: service.name,
    description: service.description,
  };
}

export default async function CoachingServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await fetchSanity<ServiceDoc | null>(serviceBySlugQuery, { slug });
  if (!service) notFound();

  return (
    <div className="bg-[#F9F7F4]">
      <section className="relative overflow-hidden border-b border-[#1B3A5C]/10">
        <div className="absolute inset-0 bg-[radial-gradient(50rem_24rem_at_15%_0%,rgba(201,169,110,0.20),transparent_55%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <nav className="text-sm text-[#1B3A5C]/60">
            <Link href="/" className="hover:text-[#1B3A5C]">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/#diensten" className="hover:text-[#1B3A5C]">
              Coaching
            </Link>
            <span className="mx-2">/</span>
            <span className="font-medium text-[#1B3A5C]">{service.name}</span>
          </nav>
          {service.photo ? (
            <div className="mt-6 grid items-center gap-10 md:grid-cols-2">
              <div>
                <h1 className="font-serif text-4xl tracking-tight text-[#1B3A5C] sm:text-5xl">
                  {service.name}
                </h1>
                {service.description ? (
                  <p className="mt-5 text-lg leading-8 text-[#1B3A5C]/75">
                    {service.description}
                  </p>
                ) : null}
              </div>
              <div className="w-[90%] mx-auto">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
                  <Image
                    src={urlFor(service.photo).width(800).url()}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 90vw, 45vw"
                  />
                </div>
              </div>
            </div>
          ) : (
            <>
              <h1 className="mt-6 max-w-3xl font-serif text-4xl tracking-tight text-[#1B3A5C] sm:text-5xl">
                {service.name}
              </h1>
              {service.description ? (
                <p className="mt-5 max-w-2xl text-lg leading-8 text-[#1B3A5C]/75">
                  {service.description}
                </p>
              ) : null}
            </>
          )}
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-12 md:py-16">
        <div className="md:col-span-7">
          {service.result?.length ? (
            <div className="rounded-2xl border border-[#1B3A5C]/10 bg-white p-6 shadow-lg shadow-[#1B3A5C]/5 sm:p-8">
              <h2 className="font-serif text-2xl text-[#1B3A5C]">
                Inhoud &amp; aanpak
              </h2>
              <div className="mt-6">
                <PortableText
                  value={service.result}
                  components={portableTextComponents}
                />
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-[#1B3A5C]/25 bg-white/60 p-8 text-sm text-[#1B3A5C]/70">
              Voeg in Sanity bij deze dienst tekst toe in het veld{" "}
              <strong>Inhoud / resultaat</strong> voor uitgebreide inhoud op
              deze pagina.
            </div>
          )}
        </div>

        <aside className="md:col-span-5">
          <div className="sticky top-28 space-y-6">
            {service.themes?.length ? (
              <div className="rounded-2xl border border-[#1B3A5C]/10 bg-white p-6 shadow-lg shadow-[#1B3A5C]/5">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-[#1B3A5C]/55">
                  Thema&apos;s
                </h2>
                <ul className="mt-4 space-y-3">
                  {service.themes.map((t) => (
                    <li
                      key={t}
                      className="flex gap-3 text-sm leading-6 text-[#1B3A5C]/85"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A96E]" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {slug === "loopbaanbegeleiding" && (
              <div className="flex justify-center">
                <Image
                  src="/images/loopbaancheque-label.jpg"
                  alt="Loopbaancheque – verkrijgbaar via VDAB"
                  width={600}
                  height={200}
                  className="h-auto max-w-full"
                />
              </div>
            )}

            <div className="rounded-2xl border border-[#1B3A5C]/10 bg-[#F9F7F4] p-6">
              <p className="text-sm font-semibold text-[#1B3A5C]">
                Vragen over dit traject?
              </p>
              <p className="mt-2 text-sm leading-6 text-[#1B3A5C]/75">
                We bekijken samen wat voor jou past—discreet en zonder
                verplichting.
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#1B3A5C] px-5 py-3 text-sm font-semibold text-[#F9F7F4] transition hover:bg-[#16314D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]/70"
              >
                Neem contact op
              </Link>
              <Link
                href="/aanpak"
                className="mt-3 block text-center text-sm font-semibold text-[#1B3A5C]/85 underline-offset-4 hover:underline"
              >
                Hoe ik werk
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
