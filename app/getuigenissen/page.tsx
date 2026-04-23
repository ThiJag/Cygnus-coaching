import Image from "next/image";
import { groq } from "next-sanity";
import type { Metadata } from "next";
import { fetchSanity } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/lib/image";

const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(_createdAt desc) {
    _id,
    firstName,
    role,
    category,
    text
  }
`;

const pageQuery = groq`
  *[_type == "page" && slug.current == "getuigenissen"][0]{ photo }
`;

export const metadata: Metadata = {
  title: "Getuigenissen",
  description: "Ervaringen van coachees,met respect voor vertrouwelijkheid.",
};

type T = {
  _id: string;
  firstName: string;
  role?: string;
  category?: string;
  text: string;
};

export default async function GetuigenissenPage() {
  const [list, pageDoc] = await Promise.all([
    fetchSanity<T[] | null>(testimonialsQuery).then((r) => r ?? []),
    fetchSanity<{ photo?: Record<string, unknown> | null } | null>(pageQuery),
  ]);

  return (
    <div className="bg-[#F9F7F4]">
      <section className="border-b border-[#1B3A5C]/10">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          {pageDoc?.photo ? (
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div>
                <h1 className="font-serif text-4xl tracking-tight text-[#1B3A5C] sm:text-5xl">
                  Getuigenissen
                </h1>
                <p className="mt-4 text-lg text-[#1B3A5C]/75">
                  Elke situatie is uniek. Hieronder een selectie van feedback—altijd
                  met oog voor vertrouwelijkheid.
                </p>
                <div className="mt-6 rounded-xl border border-[#1B3A5C]/15 bg-white/70 px-4 py-3 text-sm text-[#1B3A5C]/75">
                  <strong className="font-semibold text-[#1B3A5C]">
                    Disclaimer:
                  </strong>{" "}
                  getuigenissen zijn vrijwillig gedeeld; namen en context kunnen
                  worden aangepast om anonimiteit te waarborgen.
                </div>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src={urlFor(pageDoc.photo).width(800).url()}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          ) : (
            <>
              <h1 className="font-serif text-4xl tracking-tight text-[#1B3A5C] sm:text-5xl">
                Getuigenissen
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-[#1B3A5C]/75">
                Elke situatie is uniek. Hieronder een selectie van feedback—altijd
                met oog voor vertrouwelijkheid.
              </p>
              <div className="mt-6 rounded-xl border border-[#1B3A5C]/15 bg-white/70 px-4 py-3 text-sm text-[#1B3A5C]/75">
                <strong className="font-semibold text-[#1B3A5C]">
                  Disclaimer:
                </strong>{" "}
                getuigenissen zijn vrijwillig gedeeld; namen en context kunnen
                worden aangepast om anonimiteit te waarborgen.
              </div>
            </>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {list.length ? (
            list.map((t) => (
              <figure
                key={t._id}
                className="rounded-2xl border border-[#1B3A5C]/10 bg-white p-6 shadow-lg shadow-[#1B3A5C]/5"
              >
                <blockquote className="text-sm leading-7 text-[#1B3A5C]/80">
                  &ldquo;{t.text}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#1B3A5C]/10 pt-5">
                  <div>
                    <p className="font-semibold text-[#1B3A5C]">
                      {t.firstName}
                    </p>
                    {t.role ? (
                      <p className="text-xs text-[#1B3A5C]/60">{t.role}</p>
                    ) : null}
                  </div>
                  {t.category ? (
                    <span className="rounded-full border border-[#1B3A5C]/15 bg-[#F9F7F4] px-3 py-1 text-xs font-semibold text-[#1B3A5C]/70">
                      {t.category}
                    </span>
                  ) : null}
                </figcaption>
              </figure>
            ))
          ) : (
            <p className="text-sm text-[#1B3A5C]/70 md:col-span-2">
              Nog geen getuigenissen in Sanity. Voeg documenten toe van type{" "}
              <strong>Getuigenis</strong>.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
