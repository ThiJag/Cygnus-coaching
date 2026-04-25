import Image from "next/image";
import Link from "next/link";
import { groq } from "next-sanity";
import type { Metadata } from "next";
import type { PortableTextBlock } from "@portabletext/types";
import { PortableText } from "@portabletext/react";
import { fetchSanity } from "../../sanity/lib/client";
import { portableTextComponents } from "../../components/portableTextComponents";
import { urlFor } from "../../sanity/lib/image";

const pageQuery = groq`
  *[_type == "page" && slug.current == "aanpak"][0]{
    title,
    content,
    introText,
    processSteps,
    trajectInfo,
    icebergText,
    icebergPhoto,
    photo
  }
`;

export const metadata: Metadata = {
  title: "Aanpak",
  description: "Intake, coaching en opvolging, helder en persoonlijk.",
};

type ProcessStep = { title?: string; text?: string };

type AanpakDoc = {
  title?: string;
  content?: PortableTextBlock[];
  introText?: string;
  processSteps?: ProcessStep[];
  trajectInfo?: string;
  icebergText?: string;
  icebergPhoto?: Record<string, unknown> | null;
  photo?: Record<string, unknown> | null;
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


export default async function AanpakPage() {
  const doc = await fetchSanity<AanpakDoc | null>(pageQuery);

  const steps = doc?.processSteps?.length ? doc.processSteps : DEFAULT_STEPS;
  const introText = doc?.introText ?? "Een doorlopende lijn van intake tot integratie; rustig tempo, duidelijke structuur.";
  const icebergText = doc?.icebergText ?? "Boven de waterlijn: wat anderen zien. Onder de waterlijn: motieven, overtuigingen en patronen die gedrag sturen. Coaching richt zich bewust op beide lagen.";
  const trajectInfo = doc?.trajectInfo ?? "Typisch traject: 6 sessies. Voor een passend voorstel en prijs: neem vrijblijvend contact op.";

  return (
    <div className="bg-[#F9F7F4]">
      <section className="border-b border-[#1B3A5C]/10">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          {doc?.photo ? (
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div>
                <h1 className="font-serif text-4xl tracking-tight text-[#1B3A5C] sm:text-5xl">
                  {doc?.title ?? "Aanpak"}
                </h1>
                <p className="mt-4 text-lg text-[#1B3A5C]/75">{introText}</p>
              </div>
              <div className="w-[81%] mx-auto">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
                  <Image
                    src={urlFor(doc.photo).width(800).url()}
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
              <h1 className="font-serif text-4xl tracking-tight text-[#1B3A5C] sm:text-5xl">
                {doc?.title ?? "Aanpak"}
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-[#1B3A5C]/75">{introText}</p>
            </>
          )}
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

        <div className={`mt-14 grid gap-10 rounded-3xl border border-[#1B3A5C]/10 bg-white p-8 shadow-lg shadow-[#1B3A5C]/5 md:p-10${doc?.icebergPhoto ? " md:grid-cols-2" : ""}`}>
          <div>
            <h2 className="font-serif text-2xl text-[#1B3A5C]">
              Competentiemodel
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#1B3A5C]/75">
              {icebergText}
            </p>
          </div>
          {doc?.icebergPhoto && (
            <div className="overflow-hidden rounded-2xl">
              <Image
                src={urlFor(doc.icebergPhoto).width(800).url()}
                alt="Competentiemodel"
                width={800}
                height={600}
                className="h-auto w-full object-contain"
                sizes="(max-width: 768px) 90vw, 45vw"
              />
            </div>
          )}
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
