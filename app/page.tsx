import Link from "next/link";
import { groq } from "next-sanity";
import type { PortableTextBlock } from "@portabletext/types";
import { PortableText } from "@portabletext/react";
import { sanityFetch } from "../sanity/lib/live";
import { urlFor } from "../sanity/lib/image";
import { portableTextComponents } from "../components/portableTextComponents";

type ServiceCard = {
  _id: string;
  name: string;
  slug: { current: string };
  description?: string;
};

type Testimonial = {
  _id: string;
  firstName: string;
  role?: string;
  category?: string;
  text: string;
};

type Settings = {
  companyName?: string;
  contactName?: string;
  city?: string;
  tagline?: string;
  heroText?: string;
  quote?: string;
  values?: string[];
  specializations?: string[];
  partners?: string[];
  metaDescription?: string;
  heroPhoto?: object;
};

const homePageQuery = groq`*[_type=="page" && slug.current=="home"][0]{ title, content, introText }`;

const servicesQuery = groq`*[_type=="service"] | order(name asc) {
  _id,
  name,
  slug,
  description
}`;

const testimonialsQuery = groq`*[_type=="testimonial"] | order(_createdAt desc) [0..2] {
  _id,
  firstName,
  role,
  category,
  text
}`;

const settingsQuery = groq`*[_type == "settings" && _id == "settings"][0]{
  companyName,
  contactName,
  city,
  tagline,
  heroText,
  quote,
  values,
  specializations,
  partners,
  metaDescription,
  heroPhoto { asset-> }
}`;

const DEFAULT_VALUES = ["Integriteit", "Vertrouwen", "Respect", "Passie", "Engagement", "Kwaliteit"];
const DEFAULT_SPECIALIZATIONS = ["ICF-geïnspireerd", "NLP", "Stress & Burn-out", "Loopbaan", "Leiderschap"];
const DEFAULT_PARTNERS = ["Loopbaancheque", "CERTO", "WSE"];

export default async function HomePage() {
  const [{ data: home }, { data: services }, { data: testimonials }, { data: settingsData }] =
    await Promise.all([
      sanityFetch({ query: homePageQuery }),
      sanityFetch({ query: servicesQuery }),
      sanityFetch({ query: testimonialsQuery }),
      sanityFetch({ query: settingsQuery }),
    ]);

  const cfg = settingsData as Settings | null;
  const homeDoc = home as { title?: string; content?: PortableTextBlock[]; introText?: string } | null;
  const heroTitle = homeDoc?.title ?? "Rust. Richting. Resultaat.";
  const heroLead = cfg?.heroText ?? "Cygnus Coaching BV in Genk begeleidt professionals en leidinggevenden met warmte, helderheid en structuur—van stress & burn-out tot loopbaan- en leiderschapscoaching.";
  const values = cfg?.values?.length ? cfg.values : DEFAULT_VALUES;
  const specializations = cfg?.specializations?.length ? cfg.specializations : DEFAULT_SPECIALIZATIONS;
  const partners = cfg?.partners?.length ? cfg.partners : DEFAULT_PARTNERS;
  const quote = cfg?.quote ?? "Warm menselijk contact, scherpe vragen, en concrete stappen.";
  const companyName = cfg?.companyName ?? "Cygnus Coaching BV";
  const city = cfg?.city ?? "Genk";
  const coachName = cfg?.contactName ?? "Rike Weltjens";
  const tagline = cfg?.tagline ?? "Groei door inzicht. Kracht door coaching.";

  const serviceCards =
    (services as ServiceCard[] | null | undefined)?.slice(0, 3) ?? [];

  return (
    <div className="flex flex-col bg-[#F9F7F4]">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(60rem_30rem_at_20%_10%,rgba(201,169,110,0.22),transparent_60%),radial-gradient(55rem_28rem_at_80%_30%,rgba(27,58,92,0.18),transparent_60%)]" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-20">
          <div className="flex flex-col justify-center">
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-[#1B3A5C]/15 bg-white/50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#1B3A5C]/80 backdrop-blur">
            {/*  {companyName} · {city}*/}
              <span className="h-1 w-1 rounded-full bg-[#C9A96E]" />
              {tagline ?? coachName}
            </p>

            <h1 className="mt-6 font-serif text-4xl leading-tight tracking-tight text-[#1B3A5C] sm:text-5xl">
              {heroTitle}
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-[#1B3A5C]/75 sm:text-lg sm:leading-8">
              {heroLead}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#1B3A5C] px-6 py-3 text-sm font-semibold text-[#F9F7F4] shadow-sm shadow-[#1B3A5C]/20 transition hover:bg-[#16314D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F9F7F4]"
              >
                Plan een kennismaking
              </Link>

              <Link
                href="/aanpak"
                className="inline-flex items-center justify-center rounded-full border border-[#1B3A5C]/20 bg-white/60 px-6 py-3 text-sm font-semibold text-[#1B3A5C] transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F9F7F4]"
              >
                Bekijk mijn aanpak
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3 text-sm text-[#1B3A5C]/70 sm:grid-cols-3">
              {values.map((k) => (
                <div
                  key={k}
                  className="rounded-xl border border-[#1B3A5C]/10 bg-white/50 px-4 py-3 backdrop-blur"
                >
                  <span className="font-semibold text-[#1B3A5C]">·</span> {k}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-[linear-gradient(135deg,rgba(201,169,110,0.35),rgba(27,58,92,0.25))] blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-[#1B3A5C]/10 bg-white shadow-2xl shadow-[#1B3A5C]/10">
              <div className="relative aspect-[4/5] w-full">
                <img
                  src={cfg?.heroPhoto
                    ? urlFor(cfg.heroPhoto).width(800).url()
                    : "https://www.vind-een-coach.be/media/vecbe/siteprofile/images/38169_foto%20240923%20%201.jpg"}
                  alt="Rike Weltjens"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>

              <div className="border-t border-[#1B3A5C]/10 bg-[#F9F7F4] px-6 py-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#1B3A5C]/55">
                  Erkend / partners
                </p>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {partners.map((l) => (
                    <div
                      key={l}
                      className="flex items-center justify-center rounded-xl border border-[#1B3A5C]/10 bg-white px-3 py-3 text-xs font-semibold text-[#1B3A5C]/80"
                    >
                      {l}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 className="font-serif text-3xl tracking-tight text-[#1B3A5C]">
              {companyName}
            </h2>
            {homeDoc?.content?.length ? (
              <div className="mt-4 text-base leading-7 text-[#1B3A5C]/75">
                <PortableText value={homeDoc.content} components={portableTextComponents} />
              </div>
            ) : homeDoc?.introText ? (
              <p className="mt-4 text-base leading-7 text-[#1B3A5C]/75">{homeDoc.introText}</p>
            ) : (
              <p className="mt-4 text-base leading-7 text-[#1B3A5C]/75">
                Met een rustige, resultaatgerichte aanpak creëren we ruimte voor
                helderheid, energie en duurzame verandering.
              </p>
            )}
          </div>

          <div className="md:col-span-7">
            <div className="rounded-2xl border border-[#1B3A5C]/10 bg-white p-6 shadow-lg shadow-[#1B3A5C]/5 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-[#1B3A5C]/55">
                Korte belofte
              </p>
              <p className="mt-3 font-serif text-2xl leading-snug text-[#1B3A5C]">
                {quote}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {specializations.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[#1B3A5C]/15 bg-[#F9F7F4] px-4 py-2 text-xs font-semibold text-[#1B3A5C]/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="diensten" className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="font-serif text-3xl tracking-tight text-[#1B3A5C]">
              Diensten
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[#1B3A5C]/75">
              Kies het traject dat past bij jouw situatie. Elk traject is
              persoonlijk, discreet en doelgericht.
            </p>
          </div>
          <Link
            href="/contact"
            className="hidden rounded-full border border-[#1B3A5C]/20 bg-white/60 px-5 py-2 text-sm font-semibold text-[#1B3A5C] transition hover:bg-white md:inline-flex"
          >
            Vraag advies
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {serviceCards.length > 0 ? (
            serviceCards.map((svc) => (
              <Link
                key={svc._id}
                href={`/coaching/${svc.slug.current}`}
                className="group rounded-2xl border border-[#1B3A5C]/10 bg-white p-6 shadow-lg shadow-[#1B3A5C]/5 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#1B3A5C]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]/60"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-serif text-2xl tracking-tight text-[#1B3A5C]">
                    {svc.name}
                  </h3>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#F9F7F4] text-[#C9A96E] transition group-hover:bg-[#C9A96E] group-hover:text-[#1B3A5C]">
                    →
                  </span>
                </div>
                <p className="mt-4 text-sm leading-6 text-[#1B3A5C]/75">
                  {svc.description ??
                    "Bewerk deze beschrijving in Sanity bij \u201cDienst\u201d."}
                </p>
                <div className="mt-6 h-px w-full bg-[#1B3A5C]/10" />
                <p className="mt-4 text-sm font-semibold text-[#1B3A5C]/85">
                  Lees meer
                </p>
              </Link>
            ))
          ) : (
            <div className="rounded-2xl border border-[#1B3A5C]/10 bg-white p-6 text-sm text-[#1B3A5C]/75 md:col-span-3">
              Voeg in Sanity minstens één document toe van type{" "}
              <span className="font-semibold text-[#1B3A5C]">Dienst</span> met
              slug (bv. stress-en-burn-out).
            </div>
          )}
        </div>

        <div className="mt-8 flex md:hidden">
          <Link
            href="/contact"
            className="w-full rounded-full bg-[#1B3A5C] px-6 py-3 text-center text-sm font-semibold text-[#F9F7F4] transition hover:bg-[#16314D]"
          >
            Vraag advies
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <div className="rounded-3xl border border-[#1B3A5C]/10 bg-white p-8 shadow-lg shadow-[#1B3A5C]/5 sm:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-serif text-3xl tracking-tight text-[#1B3A5C]">
                Getuigenissen
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-[#1B3A5C]/75">
                Vertrouwelijkheid staat centraal. Namen kunnen verkort of
                geanonimiseerd zijn.
              </p>
            </div>
            <Link
              href="/getuigenissen"
              className="inline-flex items-center justify-center rounded-full border border-[#1B3A5C]/20 bg-[#F9F7F4] px-5 py-2 text-sm font-semibold text-[#1B3A5C] transition hover:bg-white"
            >
              Alle getuigenissen
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {(testimonials as Testimonial[] | null | undefined)?.length ? (
              (testimonials as Testimonial[]).map((t) => (
                <figure
                  key={t._id}
                  className="rounded-2xl border border-[#1B3A5C]/10 bg-[#F9F7F4] p-6"
                >
                  <blockquote className="text-sm leading-7 text-[#1B3A5C]/80">
                    &ldquo;{t.text}&rdquo;
                  </blockquote>
                  <figcaption className="mt-5 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-[#1B3A5C]">
                        {t.firstName}
                      </p>
                      <p className="text-xs text-[#1B3A5C]/60">
                        {t.role ?? "—"}
                      </p>
                    </div>
                    <span className="rounded-full border border-[#1B3A5C]/15 bg-white px-3 py-1 text-xs font-semibold text-[#1B3A5C]/70">
                      {t.category ?? "algemeen"}
                    </span>
                  </figcaption>
                </figure>
              ))
            ) : (
              <div className="rounded-2xl border border-[#1B3A5C]/10 bg-[#F9F7F4] p-6 text-sm text-[#1B3A5C]/75 md:col-span-3">
                Voeg in Sanity documenten toe van type{" "}
                <span className="font-semibold text-[#1B3A5C]">
                  Getuigenis
                </span>
                .
              </div>
            )}
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[#1B3A5C]/10 pt-8 sm:flex-row">
            <p className="text-sm text-[#1B3A5C]/70">
              Klaar om een eerste stap te zetten?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[#C9A96E] px-6 py-3 text-sm font-semibold text-[#1B3A5C] shadow-sm shadow-[#1B3A5C]/10 transition hover:bg-[#D6B981] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3A5C]/30"
            >
              Contacteer {coachName}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
