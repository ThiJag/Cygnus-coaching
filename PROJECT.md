# Cygnus Coaching BV — Project Context

## Doel
Website voor Rike Weltjens, certified coach ICF, Genk.
Gebouwd door Thibaut Jageneau.

---

## Tech Stack
- **Frontend**: Next.js 14 (App Router, TypeScript)
- **CMS**: Sanity v3 (Studio ingebouwd op `/studio`)
- **Styling**: Tailwind CSS
- **Fonts**: Inter (sans) + Playfair Display (serif)
- **Hosting**: Vercel
- **Domein**: cygnuscoaching.be (via Jurgen Vandewal / Wallieeb)

## Kleurenpalet
- Donkerblauw: `#1B3A5C` (primair)
- Goud: `#C9A96E` (accent)
- Achtergrond: `#F9F7F4` (warm wit)

---

## Bestandsstructuur

```
cygnus-coaching/
├── app/
│   ├── layout.tsx          ✅ Navbar + SanityLive + fonts
│   ├── page.tsx            ✅ Homepage (hero, diensten, getuigenissen)
│   ├── globals.css         ✅
│   ├── aanpak/
│   │   └── page.tsx        ✅ Stappenplan + ijsbergmodel + methodiek
│   ├── coaching/
│   │   └── [slug]/
│   │       └── page.tsx    ✅ Dienstdetail (thema's, resultaat, loopbaancheque)
│   ├── contact/
│   │   ├── page.tsx        ✅ Contactpagina
│   │   └── ContactForm.tsx ✅ Formulier component
│   ├── getuigenissen/
│   │   └── page.tsx        ✅ Overzicht getuigenissen
│   ├── over-mij/
│   │   └── page.tsx        ✅ Pagina over Rike
│   └── studio/
│       └── [[...tool]]/    ✅ Sanity Studio
├── components/
│   ├── Navbar.tsx          ✅
│   └── portableTextComponents.tsx ✅
├── sanity/
│   ├── lib/
│   │   └── live.ts         ✅ sanityFetch + SanityLive
│   ├── schemas/
│   │   ├── page.ts         ✅
│   │   ├── service.ts      ✅ (velden: name, slug, description, themes, result)
│   │   ├── testimonial.ts  ✅ (velden: firstName, category, text, role)
│   │   └── settings.ts     ✅
│   └── schemaTypes/
│       └── index.ts        ✅ exporteert page, service, testimonial, settings
└── public/
    └── images/             (leeg — foto's nog toe te voegen)
```

---

## Sanity Schema's

### service
| Veld | Type | Verplicht |
|---|---|---|
| name | string | ja |
| slug | slug (source: name) | ja |
| description | text | nee |
| themes | array of string | nee |
| result | array of block (PortableText) | nee |

### testimonial
| Veld | Type | Verplicht |
|---|---|---|
| firstName | string | ja |
| category | string (list) | nee |
| text | text | ja |
| role | string | nee |

Categorieën: `burnout`, `career`, `leadership`, `life`, `general`

### page
Gebruikt voor: `home`, `aanpak`, `over-mij`
Velden: title, slug, content (PortableText)

### settings
Globale instellingen (naam, contact, logo)

---

## GROQ Queries (in page.tsx)
- `*[_type=="page" && slug.current=="home"][0]` → homepage tekst
- `*[_type=="service"] | order(name asc)` → diensten
- `*[_type=="testimonial"] | order(_createdAt desc)[0..2]` → 3 recentste

---

## Navigatie (Navbar)
Home · Coaching · Aanpak · Over Rike · Getuigenissen · Contact

---

## Diensten (aan te maken in Sanity Studio)
| Naam | Slug | Loopbaancheque |
|---|---|---|
| Stress & Burn-out | stress-en-burn-out | nee |
| Loopbaanbegeleiding | loopbaanbegeleiding | ja |
| Leiderschapscoaching | leiderschapscoaching | nee |

Loopbaancheque-blok verschijnt automatisch op slug `loopbaanbegeleiding`.

---

## Nog te doen
- [ ] Foto van Rike toevoegen (hero + over-mij pagina)
- [ ] Content invoeren in Sanity Studio (3 diensten, getuigenissen, pagina's)
- [ ] Logo's toevoegen: Loopbaancheque, CERTO, WSE
- [ ] QR-code naar VDAB genereren
- [ ] Domein koppelen op Vercel (cygnuscoaching.be)
- [ ] Favicon finaliseren
- [ ] SEO meta's per pagina nakijken
- [ ] Contactformulier: mailto vervangen door echte verzending (bv. Resend)

---

## Belangrijke links
- VDAB loopbaancheque: https://www.vdab.be/orienteren/loopbaanbegeleiding/alles-over-je-loopbaancheque
- Inspiratie: https://www.praktijkcocoon.be/informatie/volwassenen/loonbaanbegeleiding
- Inspiratie stress/BO: https://elisahdecnijf.be/
- Extranet VDAB logo's: https://extranet.vdab.be/loopbaanbegeleiding/communiceren-over-de-loopbaancheque

## Contactgegevens Rike
- Email: rike.weltjens@cygnuscoaching.be
- Tel: +32 496 10 55 73
- Adres: 3600 Genk