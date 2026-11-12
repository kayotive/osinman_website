import React, { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowRight, MapPin, Mail, Phone, Calendar } from "lucide-react";
import PdfViewer from "../components/PdfViewer";

/* Same design system as the rest of the site. */

function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const fallback = setTimeout(() => setVisible(true), 1200);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(el);
            clearTimeout(fallback);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function FacebookIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-8.2h2.75l.41-3.2H13.5V7.5c0-.93.26-1.56 1.59-1.56h1.7V3.1C16.5 3.06 15.5 3 14.35 3 11.9 3 10.25 4.49 10.25 7.2v2.4H7.5v3.2h2.75V21h3.25Z" />
    </svg>
  );
}

function WhatsAppIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" />
      <path d="M12.02 2C6.5 2 2.03 6.42 2.03 11.9c0 1.83.5 3.53 1.35 5l-1.4 5.1 5.24-1.37a10.03 10.03 0 0 0 4.8 1.22h.01c5.52 0 9.99-4.42 9.99-9.9C22.02 6.42 17.55 2 12.02 2Zm5.9 15.75c-.62.62-1.72 1.24-2.53 1.4-.65.14-1.5.25-4.36-.94-3.65-1.5-6-5.2-6.18-5.44-.18-.24-1.48-1.97-1.48-3.76 0-1.79.94-2.66 1.28-3.03.34-.37.73-.46.98-.46h.7c.22 0 .53-.04.8.6.29.68.97 2.36 1.05 2.53.08.17.13.36.02.58-.11.22-.16.36-.32.55-.16.19-.34.42-.48.56-.16.16-.33.34-.14.66.19.32.85 1.4 1.83 2.27 1.26 1.11 2.31 1.46 2.65 1.62.34.16.54.14.74-.08.2-.22.85-.98 1.08-1.32.23-.34.46-.28.77-.17.31.11 1.97.93 2.31 1.1.34.17.56.25.64.4.08.15.08.85-.34 1.47Z" />
    </svg>
  );
}

const NAV_LINKS = [
  { label: "Get to Know Us", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Events", href: "/events" },
  { label: "The Team", href: "/team" },
];

const UPCOMING_EVENTS = [
  {
    day: "30",
    month: "Dec",
    year: "2026",
    title: "End of year Annual welfare/outreach program for the elderly widows/widowers",
    location: "Langtang, Plateau State",
  },
  {
    day: "—",
    month: "Easter",
    year: "2027",
    title: "End of year Annual welfare/outreach program for the elderly widows/widowers",
    location: "Langtang, Plateau State",
  },
];

const PAST_EVENTS = [
  {
    date: "December 2022",
    title: "2022 Osinman Foundation Outreach",
    location: "Langtang, Plateau State",
    recap: "The President of the Osi-Nman Foundation shares a joyful dance moment with elderly attendees, creating a heartwarming atmosphere of celebration, connection, and togetherness.",
    photo: "/images/events/2022-langtang-outreach.jpg",
  },
  {
    date: "Past Outreach",
    title: "Osinman Foundation Outreach",
    location: "Plateau State",
    recap: "A guest preacher stands alongside a resilient elderly woman, sharing a message of hope and fellowship under the canopy.",
    photo: "/images/events/guest-preacher-fellowship.jpg",
  },
  {
    date: "Past Outreach",
    title: "Osinman Foundation Outreach",
    location: "Plateau State",
    recap: "Hearts full and hands heavy with blessings as beneficiaries depart our outreach event.",
    photo: "/images/events/beneficiaries-departure.jpg",
  },
  {
    date: "December 2025",
    title: "2025 Osinman Foundation Outreach",
    location: "Langtang, Plateau State",
    recap: "Pure joy in motion! We love seeing our elderly beneficiaries sharing a joyful dance during the final Osi-Nman Foundation outreach of 2025 in Langtang, Plateau State.",
    photo: "/images/events/2025-langtang-outreach-dance.png",
  },
  {
    date: "December 2025",
    title: "2025 Osinman Foundation Outreach",
    location: "Langtang, Plateau State",
    recap: "Behind the scenes of impact! A cross-section of essential food relief packages sorted, packed, and ready for distribution at the Osi-Nman Foundation outreach.",
    photo: "/images/events/2025-food-relief-packing.jpg",
  },
];

export default function EventsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="osf-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&display=swap');

        :root {
          --ink: #241C17;
          --ink-soft: #4A3E36;
          --cream: #FBF5EC;
          --cream-deep: #F3E9DA;
          --burnt: #C1502E;
          --burnt-dark: #9A3D22;
          --gold: #D9A15C;
          --green: #3E4E3A;
          --white: #FFFFFF;
        }

        html, body { scroll-behavior: smooth; }
        .osf-root { font-family: 'Inter', sans-serif; color: var(--ink); background: var(--cream); }
        .osf-root h1, .osf-root h2, .osf-root h3, .osf-root .font-display { font-family: 'Fraunces', serif; }

        .bg-ink { background: var(--ink); }
        .bg-cream { background: var(--cream); }
        .bg-cream-deep { background: var(--cream-deep); }
        .bg-white { background: var(--white); }
        .text-cream { color: var(--cream); }
        .text-inksoft { color: var(--ink-soft); }
        .text-gold { color: var(--gold); }

        .eyebrow {
          font-family: 'Inter', sans-serif; font-weight: 700; font-size: 0.72rem;
          letter-spacing: 0.18em; text-transform: uppercase; color: var(--burnt);
        }
        .eyebrow.on-dark { color: var(--gold); }

        .btn-primary {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: var(--burnt); color: var(--white);
          padding: 0.85rem 1.6rem; border-radius: 999px; font-weight: 600;
          transition: transform 0.35s cubic-bezier(.2,.8,.2,1), background 0.3s ease, box-shadow 0.35s ease;
          box-shadow: 0 8px 24px -10px rgba(193,80,46,0.55);
        }
        .btn-primary:hover { background: var(--burnt-dark); transform: translateY(-3px); box-shadow: 0 14px 28px -10px rgba(193,80,46,0.65); }

        .nav-wrap { transition: background 0.4s ease, box-shadow 0.4s ease, padding 0.3s ease; }
        .nav-link {
          position: relative; color: var(--ink); font-weight: 500; font-size: 0.92rem;
          transition: color 0.25s ease;
        }
        .nav-link::after {
          content: ''; position: absolute; left: 0; right: 0; bottom: -6px; height: 2px;
          background: var(--burnt); transform: scaleX(0); transform-origin: left;
          transition: transform 0.3s ease;
        }
        .nav-link:hover { color: var(--burnt); }
        .nav-link:hover::after { transform: scaleX(1); }
        .nav-link.is-active { color: var(--burnt); }
        .nav-link.is-active::after { transform: scaleX(1); }

        .mobile-panel { transition: transform 0.45s cubic-bezier(.2,.8,.2,1), opacity 0.4s ease; }
        .mobile-backdrop { transition: opacity 0.4s ease; }

        .reveal {
          opacity: 0;
          transform: translateY(64px) scale(0.9);
          filter: blur(10px);
          transition:
            opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1),
            transform 1.1s cubic-bezier(0.16, 1, 0.3, 1),
            filter 1.1s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform, filter;
        }
        .reveal-visible { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }

        .card-event {
          background: var(--white);
          border-radius: 1.25rem;
          padding: 1.75rem;
          display: flex;
          gap: 1.25rem;
          box-shadow: 0 2px 12px -6px rgba(36,28,23,0.1);
        }

        .date-badge {
          flex-shrink: 0;
          width: 64px;
          height: 64px;
          border-radius: 0.9rem;
          background: var(--cream-deep);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .date-badge .day { font-family: 'Fraunces', serif; font-size: 1.3rem; line-height: 1; color: var(--burnt); }
        .date-badge .month { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-soft); }

        .card-past {
          background: var(--white);
          border-radius: 1.25rem;
          overflow: hidden;
          box-shadow: 0 2px 12px -6px rgba(36,28,23,0.1);
        }
        .past-photo-wrap { overflow: hidden; position: relative; aspect-ratio: 16 / 10; }
        .past-photo { width: 100%; height: 100%; object-fit: cover; display: block; }

        .social-dot {
          width: 40px; height: 40px; border-radius: 999px;
          display: flex; align-items: center; justify-content: center;
          border: 1.5px solid rgba(251,245,236,0.25); color: var(--cream);
          transition: all 0.3s ease;
        }
        .social-dot:hover { background: var(--burnt); border-color: var(--burnt); transform: translateY(-3px); }
      `}</style>

      {/* ---------------- NAV ---------------- */}
      <header
        className={`nav-wrap nav-enter fixed top-0 left-0 right-0 z-50 ${scrolled ? "bg-cream shadow-md" : "bg-cream"}`}
        style={{ boxShadow: scrolled ? "0 4px 24px -8px rgba(36,28,23,0.15)" : "none" }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-2">
            <img
              src="/images/logo.avif"
              alt="OSINMAN Foundation logo"
              className="rounded-full object-cover"
              style={{ width: 40, height: 40 }}
            />
            <span className="font-display font-semibold text-lg tracking-tight">OSINMAN FOUNDATION</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} className={`nav-link ${l.label === "Events" ? "is-active" : ""}`}>
                {l.label}
              </a>
            ))}
          </nav>
          <button className="md:hidden p-2 -mr-2" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
            <Menu size={26} />
          </button>
        </div>
      </header>

      {/* ---------------- MOBILE MENU ---------------- */}
      <div
        className="mobile-backdrop fixed inset-0 z-50 md:hidden"
        style={{ background: "rgba(36,28,23,0.55)", opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? "auto" : "none" }}
        onClick={closeMenu}
      />
      <div
        className="mobile-panel fixed top-0 right-0 bottom-0 z-50 md:hidden flex flex-col"
        style={{ width: "78%", maxWidth: 340, background: "var(--ink)", transform: menuOpen ? "translateX(0)" : "translateX(100%)" }}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <span className="font-display text-cream text-lg font-semibold">Menu</span>
          <button aria-label="Close menu" onClick={closeMenu} className="p-2 text-cream">
            <X size={24} />
          </button>
        </div>
        <nav className="flex flex-col gap-1 px-6 mt-4">
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} onClick={closeMenu} className="text-cream py-3 border-b" style={{ borderColor: "rgba(251,245,236,0.1)", fontSize: "1.05rem" }}>
              {l.label}
            </a>
          ))}
        </nav>
      </div>

      {/* ---------------- PAGE HERO ---------------- */}
      <section className="bg-ink pt-36 pb-16 md:pt-44 md:pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <a href="/" className="text-cream inline-flex items-center gap-1 mb-6" style={{ opacity: 0.6, fontSize: "0.85rem" }}>
              ← Back to Home
            </a>
          </Reveal>
          <Reveal delay={60}>
            <p className="eyebrow on-dark mb-4">Our Events</p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="text-cream font-display font-medium" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", lineHeight: 1.12 }}>
              Where the community and the work meet in person.
            </h1>
          </Reveal>
        </div>
      </section>

      {/* ---------------- UPCOMING EVENTS ---------------- */}
      <section className="bg-cream py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <p className="eyebrow mb-4">Mark Your Calendar</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="font-display font-medium mb-12" style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)" }}>
              Upcoming Events
            </h2>
          </Reveal>

          <div className="flex flex-col gap-5">
            {UPCOMING_EVENTS.map((e, i) => (
              <Reveal key={e.title + i} delay={i * 90} className="reveal-pop">
                <div className="card-event flex-col sm:flex-row">
                  <div className="date-badge">
                    <span className="day">{e.day}</span>
                    <span className="month">{e.month}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-medium mb-2" style={{ fontSize: "1.15rem" }}>
                      {e.title}
                    </h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-inksoft" style={{ fontSize: "0.85rem", opacity: 0.8 }}>
                      <span className="flex items-center gap-1.5"><MapPin size={14} color="var(--burnt)" /> {e.location}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      

      {/* ---------------- CALL FOR SUPPORT ---------------- */}
      <section className="bg-cream pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <p className="eyebrow mb-4">Partner With Us</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="font-display font-medium mb-12" style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)" }}>
              Call for Support
            </h2>
          </Reveal>

          <Reveal delay={120} className="reveal-pop">
            <div className="card-event flex-col">
              <PdfViewer file="/call-for-support.pdf" />

              <a
                href="/call-for-support.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-inksoft mt-4 inline-flex items-center gap-1.5"
                style={{ fontSize: "0.85rem", textDecoration: "underline" }}
              >
                Open in a new tab / Download PDF
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="bg-ink border-t" style={{ borderColor: "rgba(251,245,236,0.08)" }}>
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img
              src="/images/logo.avif"
              alt="OSINMAN Foundation logo"
              className="rounded-full object-cover"
              style={{ width: 36, height: 36 }}
            />
                <span className="font-display text-cream font-semibold">OSINMAN</span>
              </div>
              <p className="text-cream" style={{ opacity: 0.55, lineHeight: 1.7, fontSize: "0.9rem" }}>
                Growing communities across Nigeria, one program at a time, since 2007.
              </p>
            </div>

            <div>
              <p className="eyebrow on-dark mb-4">Contact</p>
              <div className="flex flex-col gap-3 text-cream" style={{ opacity: 0.75, fontSize: "0.92rem" }}>
                <span className="flex items-start gap-2">
                  <MapPin size={16} className="mt-0.5 shrink-0" color="var(--gold)" />
                  House 9, Ikogosi Warm Springs, Brookshore Residents (Hall7), Karsana, F.C.T Abuja
                </span>
                <a href="mailto:osinmanfoundation@gmail.com" className="flex items-center gap-2 hover:text-gold transition-colors">
                  <Mail size={16} color="var(--gold)" /> osinmanfoundation@gmail.com
                </a>
                <a href="tel:+2348037051210" className="flex items-center gap-2 hover:text-gold transition-colors">
                  <Phone size={16} color="var(--gold)" /> +234 803 705 1210
                </a>
              </div>
            </div>

            <div>
              <p className="eyebrow on-dark mb-4">Explore</p>
              <div className="flex flex-col gap-3 text-cream" style={{ opacity: 0.75, fontSize: "0.92rem" }}>
                {NAV_LINKS.map((l) => (
                  <a key={l.label} href={l.href} className="hover:text-gold transition-colors w-fit">
                    {l.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="eyebrow on-dark mb-4">Follow Along</p>
              <div className="flex gap-3">
                <a href="https://web.facebook.com/osinmanfoundation/?_rdc=1&_rdr#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-dot"><FacebookIcon size={17} /></a>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-8 border-t" style={{ borderColor: "rgba(251,245,236,0.08)" }}>
            <p className="text-cream" style={{ opacity: 0.45, fontSize: "0.82rem" }}>
              © {new Date().getFullYear()} Osinman Foundation. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
