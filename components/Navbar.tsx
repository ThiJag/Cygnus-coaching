'use client'

import Link from 'next/link'
import {useEffect, useRef, useState} from 'react'

const coachingLinks = [
  {href: '/coaching/stress-en-burn-out', label: 'Stress & Burn-out'},
  {href: '/coaching/loopbaanbegeleiding', label: 'Loopbaanbegeleiding'},
  {href: '/coaching/leiderschapscoaching', label: 'Leiderschapscoaching'},
  {href: '/coaching/life-coaching', label: 'Life coaching'},
] as const

const mainLinks = [
  {href: '/', label: 'Home'},
  {href: '/aanpak', label: 'Aanpak'},
  {href: '/over-mij', label: 'Over Mij'},
  {href: '/getuigenissen', label: 'Getuigenissen'},
  {href: '/contact', label: 'Contact'},
] as const

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileCoachingOpen, setMobileCoachingOpen] = useState(false)
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setMobileOpen(false)
        setMobileCoachingOpen(false)
        setDesktopDropdownOpen(false)
      }
    }
    function onClickOutside(e: MouseEvent) {
      if (!dropdownRef.current) return
      if (!dropdownRef.current.contains(e.target as Node)) setDesktopDropdownOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('mousedown', onClickOutside)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('mousedown', onClickOutside)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-[#1B3A5C]/10 bg-[#F9F7F4]/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="group inline-flex items-baseline gap-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F9F7F4]"
        >
          <img src="https://www.coachinfo.be/images/account_logo/239/image-2016-02-15.jpg" alt="Cygnus Coaching"></img>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <Link
            href="/"
            className="rounded-lg px-3 py-2 text-sm font-medium text-[#1B3A5C]/80 transition hover:bg-white/60 hover:text-[#1B3A5C] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]/60"
          >
            Home
          </Link>

          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDesktopDropdownOpen((v) => !v)}
              onMouseEnter={() => setDesktopDropdownOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#1B3A5C]/80 transition hover:bg-white/60 hover:text-[#1B3A5C] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]/60"
              aria-haspopup="menu"
              aria-expanded={desktopDropdownOpen}
            >
              Coaching
              <span className="text-[#C9A96E]">▾</span>
            </button>

            <div
              onMouseLeave={() => setDesktopDropdownOpen(false)}
              className={[
                'absolute left-0 top-full mt-2 w-72 overflow-hidden rounded-xl border border-[#1B3A5C]/10 bg-white shadow-xl shadow-[#1B3A5C]/10',
                desktopDropdownOpen ? 'block' : 'hidden',
              ].join(' ')}
              role="menu"
            >
              <div className="px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#1B3A5C]/60">
                  Coaching trajecten
                </p>
              </div>
              <div className="h-px bg-[#1B3A5C]/10" />
              <div className="p-2">
                {coachingLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-[#1B3A5C]/85 transition hover:bg-[#F9F7F4] hover:text-[#1B3A5C] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]/60"
                    role="menuitem"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {mainLinks
            .filter((l) => l.href !== '/' && l.href !== '/contact')
            .map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-[#1B3A5C]/80 transition hover:bg-white/60 hover:text-[#1B3A5C] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]/60"
              >
                {l.label}
              </Link>
            ))}

          <Link
            href="/contact"
            className="ml-2 inline-flex items-center justify-center rounded-full bg-[#1B3A5C] px-5 py-2 text-sm font-semibold text-[#F9F7F4] shadow-sm shadow-[#1B3A5C]/20 transition hover:bg-[#16314D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F9F7F4]"
          >
            Contacteer
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-[#1B3A5C]/15 bg-white/50 px-3 py-2 text-sm font-semibold text-[#1B3A5C] transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]/60 md:hidden"
          aria-label="Menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? 'Sluit' : 'Menu'}
        </button>
      </nav>

      <div className={mobileOpen ? 'block md:hidden' : 'hidden md:hidden'}>
        <div className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
          <div className="overflow-hidden rounded-2xl border border-[#1B3A5C]/10 bg-white shadow-lg shadow-[#1B3A5C]/10">
            <div className="p-2">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm font-semibold text-[#1B3A5C] hover:bg-[#F9F7F4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]/60"
              >
                Home
              </Link>

              <button
                type="button"
                onClick={() => setMobileCoachingOpen((v) => !v)}
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-[#1B3A5C] hover:bg-[#F9F7F4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]/60"
                aria-expanded={mobileCoachingOpen}
              >
                Coaching
                <span className="text-[#C9A96E]">{mobileCoachingOpen ? '▴' : '▾'}</span>
              </button>

              <div className={mobileCoachingOpen ? 'block' : 'hidden'}>
                <div className="px-2 pb-2">
                  {coachingLinks.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => {
                        setMobileOpen(false)
                        setMobileCoachingOpen(false)
                      }}
                      className="block rounded-xl px-4 py-3 text-sm font-medium text-[#1B3A5C]/85 hover:bg-[#F9F7F4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]/60"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>

              {mainLinks
                .filter((l) => l.href !== '/' && l.href !== '/contact')
                .map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl px-4 py-3 text-sm font-semibold text-[#1B3A5C] hover:bg-[#F9F7F4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]/60"
                  >
                    {l.label}
                  </Link>
                ))}

              <div className="p-2">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center rounded-xl bg-[#1B3A5C] px-4 py-3 text-sm font-semibold text-[#F9F7F4] shadow-sm shadow-[#1B3A5C]/20 transition hover:bg-[#16314D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]/70 focus-visible:ring-offset-2"
                >
                  Contacteer
                </Link>
              </div>
            </div>
          </div>

          <p className="mt-3 text-xs text-[#1B3A5C]/60">
            Integriteit · Vertrouwen · Respect · Passie · Engagement · Kwaliteit
          </p>
        </div>
      </div>
    </header>
  )
}
