import Link from "next/link";
import { groq } from "next-sanity";
import type { Metadata } from "next";
import type { PortableTextBlock } from "@portabletext/types";
import { PortableText } from "@portabletext/react";
import { sanityFetch } from "../../sanity/lib/live";
import { portableTextComponents } from "../../components/portableTextComponents";

const pageQuery = groq`
  *[_type == "page" && slug.current == "aanpak"][0]{
    title,
    content,
    introText,
    processSteps,
    trajectInfo,
    icebergText
  }
`;

export const metadata: Metadata = {
  title: "Aanpak",
  description: "Intake, coaching en opvolging — helder en persoonlijk.",
};

type ProcessStep = { title?: string; text?: string };

type AanpakDoc = {
  title?: string;
  content?: PortableTextBlock[];
  introText?: string;
  processSteps?: ProcessStep[];
  trajectInfo?: string;
  icebergText?: string;
};

const DEFAULT_STEPS: ProcessStep[] = [
  {
    title: "Intake",
    text: "We verkennen je vraag, context en verwachtingen—helder en vertrouwelijk.",
  },
  {
    title: "Coaching",
    text: "Gefocuste sessies met ruimte voor reflectie, inzicht en concrete stappen.",
  },
  {
    title: "Integratie & opvolging",
    text: "Verankeren in de praktijk en waar nodig bijsturen.",
  },
];

function IcebergSvg() {
  return (
    <svg
      viewBox="0 0 400 280"
      className="h-auto w-full max-w-md"
      aria-hidden
    >
      <defs>
        <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1B3A5C" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#1B3A5C" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <rect x="0" y="140" width="400" height="140" fill="url(#water)" rx="8" />
      <line
        x1="0"
        y1="140"
        x2="400"
        y2="140"
        stroke="#C9A96E"
        strokeWidth="2"
        strokeDasharray="6 4"
      />
      <text
        x="200"
        y="128"
        textAnchor="middle"
        className="fill-[#1B3A5C] text-[11px] font-semibold"
      >
        Waterlijn — zichtbaar gedrag
      </text>
      <path d="M200 20 L320 140 L80 140 Z" fill="#1B3A5C" fillOpacity="0.9" />
      <path
        d="M200 50 L280 140 L120 140 Z"
        fill="#C9A96E"
        fillOpacity="0.35"
      />
      <text
        x="200"
        y="95"
        textAnchor="middle"
        className="fill-[#F9F7F4] text-[10px] font-medium"
      >
        Motieven · waarden · drijfveren
      </text>
      <text
        x="200"
        y="200"
        textAnchor="middle"
        className="fill-[#1B3A5C] text-[10px] opacity-80"
      >
        McClelland ijsberg — onderstroom bepaalt koers
      </text>
    </svg>
  );
}

export default async function AanpakPage() {
  const { data } = await sanityFetch({ query: pageQuery });
  const doc = data as AanpakDoc | null;

  const steps = doc?.processSteps?.length ? doc.processSteps : DEFAULT_STEPS;
  const introText = doc?.introText ?? "Een doorlopende lijn van intake tot integratie—rustig tempo, duidelijke structuur.";
  const icebergText = doc?.icebergText ?? "Boven de waterlijn: wat anderen zien. Onder de waterlijn: motieven, overtuigingen en patronen die gedrag sturen. Coaching richt zich bewust op beide lagen.";
  const trajectInfo = doc?.trajectInfo ?? "Typisch traject: 6 sessies. Voor een passend voorstel en prijs: neem vrijblijvend contact op.";

  return (
    <div className="bg-[#F9F7F4]">
      <section className="border-b border-[#1B3A5C]/10">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <h1 className="font-serif text-4xl tracking-tight text-[#1B3A5C] sm:text-5xl">
            {doc?.title ?? "Aanpak"}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[#1B3A5C]/75">
            {introText}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        <ol className="grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <li
              key={s.title ?? i}
              className="relative rounded-2xl border border-[#1B3A5C]/10 bg-white p-6 shadow-lg shadow-[#1B3A5C]/5"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#1B3A5C] text-sm font-bold text-[#F9F7F4]">
                {i + 1}
              </span>
              <h2 className="mt-4 font-serif text-xl text-[#1B3A5C]">
                {s.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#1B3A5C]/75">
                {s.text}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-14 grid gap-10 rounded-3xl border border-[#1B3A5C]/10 bg-white p-8 shadow-lg shadow-[#1B3A5C]/5 md:grid-cols-2 md:p-10">
          <div>
            <h2 className="font-serif text-2xl text-[#1B3A5C]">
              IJsbergmodel (McClelland)
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#1B3A5C]/75">
              {icebergText}
            </p>
          </div>
          <IcebergSvg />
        </div>

        <div className="mt-14 rounded-2xl border border-[#1B3A5C]/10 bg-white p-6 shadow-lg shadow-[#1B3A5C]/5 sm:p-8">
          <h2 className="font-serif text-2xl text-[#1B3A5C]">Methodiek</h2>
          {doc?.content?.length ? (
            <div className="mt-6">
              <PortableText
                value={doc.content}
                components={portableTextComponents}
              />
            </div>
          ) : (
            <p className="mt-4 text-sm text-[#1B3A5C]/70">
              Vul in Sanity de pagina met slug <strong>aanpak</strong> aan met
              je methodiek-tekst.
            </p>
          )}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-2xl border border-[#C9A96E]/40 bg-[#F9F7F4] p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <h2 className="font-serif text-xl text-[#1B3A5C]">Traject</h2>
            <p className="mt-2 text-sm leading-6 text-[#1B3A5C]/75">
              {trajectInfo}
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 rounded-full bg-[#1B3A5C] px-6 py-3 text-sm font-semibold text-[#F9F7F4] transition hover:bg-[#16314D]"
          >
            Vraag prijs &amp; beschikbaarheid
          </Link>
        </div>
      </div>
    </div>
  );
}
