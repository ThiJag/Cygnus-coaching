"use client";

import { useState } from "react";

const interests = [
  { value: "", label: "Selecteer (optioneel)" },
  { value: "stress-burn-out", label: "Stress & burn-out" },
  { value: "loopbaan", label: "Loopbaanbegeleiding" },
  { value: "leiderschap", label: "Leiderschapscoaching" },
  { value: "life", label: "Life coaching" },
  { value: "anders", label: "Anders / nog niet zeker" },
] as const;

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sent");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-[#1B3A5C]/10 bg-white p-6 shadow-lg shadow-[#1B3A5C]/5 sm:p-8"
    >
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
          <span className="text-sm font-semibold text-[#1B3A5C]">
            Telefoon
          </span>
          <input
            name="phone"
            type="tel"
            className="mt-2 w-full rounded-xl border border-[#1B3A5C]/15 bg-[#F9F7F4] px-4 py-3 text-sm text-[#1B3A5C] outline-none focus:border-[#1B3A5C]/30 focus:ring-2 focus:ring-[#C9A96E]/40"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-sm font-semibold text-[#1B3A5C]">
            Interesse
          </span>
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
        className="mt-6 w-full rounded-full bg-[#1B3A5C] px-6 py-3 text-sm font-semibold text-[#F9F7F4] transition hover:bg-[#16314D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]/70 sm:w-auto"
      >
        Verstuur
      </button>
      {status === "sent" ? (
        <p className="mt-4 text-sm text-[#1B3A5C]/75">
          Bedankt voor je bericht. Koppel dit formulier later aan een API-route
          of e-maildienst om berichten te verwerken.
        </p>
      ) : null}
    </form>
  );
}
