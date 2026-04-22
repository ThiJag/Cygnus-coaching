"use client";

import emailjs from "@emailjs/browser";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useRef, useState } from "react";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

const interests = [
  { value: "", label: "Selecteer (optioneel)" },
  { value: "stress-burn-out", label: "Stress & burn-out" },
  { value: "loopbaan", label: "Loopbaanbegeleiding" },
  { value: "leiderschap", label: "Leiderschapscoaching" },
  { value: "life", label: "Life coaching" },
  { value: "anders", label: "Anders / nog niet zeker" },
] as const;

export default function ContactForm({ email }: { email?: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorDetail, setErrorDetail] = useState<string>("");
  const [loadTime] = useState(() => Date.now());
  const { executeRecaptcha } = useGoogleReCaptcha();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const honeypot = (e.currentTarget.elements.namedItem("_website") as HTMLInputElement)?.value;
    if (honeypot) {
      setStatus("sent");
      return;
    }

    if (Date.now() - loadTime < 2000) {
      setStatus("sent");
      return;
    }

    if (!executeRecaptcha) {
      setStatus("error");
      setErrorDetail("reCAPTCHA niet beschikbaar");
      return;
    }
    const token = await executeRecaptcha("contact_form");

    const verifyRes = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    if (!verifyRes.ok) {
      setStatus("error");
      setErrorDetail("Verificatie mislukt. Probeer het opnieuw.");
      return;
    }

    setStatus("sending");
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current!, { publicKey: PUBLIC_KEY });
      setStatus("sent");
      formRef.current?.reset();
    } catch (err: unknown) {
      console.error("[ContactForm] EmailJS error:", err);
      const detail = err && typeof err === "object" && "text" in err
        ? String((err as { text: unknown }).text)
        : String(err);
      setErrorDetail(detail);
      setStatus("error");
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="rounded-2xl border border-[#1B3A5C]/10 bg-white p-6 shadow-lg shadow-[#1B3A5C]/5 sm:p-8"
    >
      {/* Honeypot — verborgen voor gebruikers, bots vullen het in */}
      <input
        name="_website"
        type="text"
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
        style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block sm:col-span-1">
          <span className="text-sm font-semibold text-[#1B3A5C]">Naam</span>
          <input
            name="name"
            required
            className="mt-2 w-full rounded-xl border border-[#1B3A5C]/15 bg-[#F9F7F4] px-4 py-3 text-sm text-[#1B3A5C] outline-none transition focus:border-[#1B3A5C]/30 focus:ring-2 focus:ring-[#C9A96E]/40"
          />
        </label>
        <label className="block sm:col-span-1">
          <span className="text-sm font-semibold text-[#1B3A5C]">E-mail</span>
          <input
            name="email"
            type="email"
            required
            className="mt-2 w-full rounded-xl border border-[#1B3A5C]/15 bg-[#F9F7F4] px-4 py-3 text-sm text-[#1B3A5C] outline-none focus:border-[#1B3A5C]/30 focus:ring-2 focus:ring-[#C9A96E]/40"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-sm font-semibold text-[#1B3A5C]">Telefoon</span>
          <input
            name="phone"
            type="tel"
            className="mt-2 w-full rounded-xl border border-[#1B3A5C]/15 bg-[#F9F7F4] px-4 py-3 text-sm text-[#1B3A5C] outline-none focus:border-[#1B3A5C]/30 focus:ring-2 focus:ring-[#C9A96E]/40"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-sm font-semibold text-[#1B3A5C]">Interesse</span>
          <select
            name="interest"
            className="mt-2 w-full rounded-xl border border-[#1B3A5C]/15 bg-[#F9F7F4] px-4 py-3 text-sm text-[#1B3A5C] outline-none focus:border-[#1B3A5C]/30 focus:ring-2 focus:ring-[#C9A96E]/40"
            defaultValue=""
          >
            {interests.map((o) => (
              <option key={o.value || "empty"} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className="text-sm font-semibold text-[#1B3A5C]">Bericht</span>
          <textarea
            name="message"
            rows={5}
            required
            className="mt-2 w-full resize-y rounded-xl border border-[#1B3A5C]/15 bg-[#F9F7F4] px-4 py-3 text-sm text-[#1B3A5C] outline-none focus:border-[#1B3A5C]/30 focus:ring-2 focus:ring-[#C9A96E]/40"
          />
        </label>
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 w-full rounded-full bg-[#1B3A5C] px-6 py-3 text-sm font-semibold text-[#F9F7F4] transition hover:bg-[#16314D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]/70 disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Versturen…" : "Verstuur"}
      </button>
      {status === "sent" && (
        <p className="mt-4 text-sm text-[#1B3A5C]/75">
          Bedankt voor je bericht! We nemen zo snel mogelijk contact op.
        </p>
      )}
      {status === "error" && (
        <p className="mt-4 text-sm text-red-600">
          Er is iets misgegaan. Probeer het opnieuw{email ? (
            <> of <a href={`mailto:${email}`} className="underline">{email}</a></>
          ) : " of stuur een e-mail rechtstreeks"}.
          {errorDetail && <span className="block mt-1 text-xs opacity-70">Fout: {errorDetail}</span>}
        </p>
      )}
    </form>
  );
}
