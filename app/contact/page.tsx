import type { Metadata } from "next";
import { groq } from "next-sanity";
import { sanityFetch } from "../../sanity/lib/live";
import ContactForm from "./ContactForm";

const settingsQuery = groq`*[_type == "settings" && _id == "settings"][0]{
  contactName,
  companyName,
  postalCode,
  city,
  country,
  phone,
  email
}`;

export const metadata: Metadata = {
  title: "Contact",
  description: "Neem contact op met Rike Weltjens in Genk.",
};

export default async function ContactPage() {
  const { data } = await sanityFetch({ query: settingsQuery });
  const s = data as {
    contactName?: string;
    companyName?: string;
    postalCode?: string;
    city?: string;
    country?: string;
    phone?: string;
    email?: string;
  } | null;

  const phone = s?.phone ?? "+32 496 10 55 73";
  const telHref = `tel:${phone.replace(/\s/g, "")}`;

  return (
    <div className="bg-[#F9F7F4]">
      <section className="border-b border-[#1B3A5C]/10">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <h1 className="font-serif text-4xl tracking-tight text-[#1B3A5C] sm:text-5xl">
            Contact
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[#1B3A5C]/75">
            Een eerste gesprek verplicht tot niets—wel tot helderheid over wat
            je nodig hebt.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-12 md:py-16">
        <div className="md:col-span-5">
          <div className="rounded-2xl border border-[#1B3A5C]/10 bg-white p-6 shadow-lg shadow-[#1B3A5C]/5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#1B3A5C]/55">
              Contactgegevens
            </h2>
            <dl className="mt-4 space-y-3 text-sm text-[#1B3A5C]/85">
              <div>
                <dt className="font-semibold text-[#1B3A5C]">Naam</dt>
                <dd>{s?.contactName ?? "Rike Weltjens"}</dd>
              </div>
              <div>
                <dt className="font-semibold text-[#1B3A5C]">Organisatie</dt>
                <dd>{s?.companyName ?? "Cygnus Coaching BV"}</dd>
              </div>
              <div>
                <dt className="font-semibold text-[#1B3A5C]">Adres</dt>
                <dd>
                  {s?.postalCode ?? "3600"} {s?.city ?? "Genk"}
                  {s?.country ? `, ${s.country}` : ", België"}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-[#1B3A5C]">Telefoon</dt>
                <dd>
                  <a
                    href={telHref}
                    className="text-[#1B3A5C] underline-offset-4 hover:underline"
                  >
                    {phone}
                  </a>
                </dd>
              </div>
              {s?.email ? (
                <div>
                  <dt className="font-semibold text-[#1B3A5C]">E-mail</dt>
                  <dd>
                    <a
                      href={`mailto:${s.email}`}
                      className="text-[#1B3A5C] underline-offset-4 hover:underline"
                    >
                      {s.email}
                    </a>
                  </dd>
                </div>
              ) : null}
            </dl>
          </div>
        </div>
        <div className="md:col-span-7">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
