import React, { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Mail,
  Phone,
  Droplets,
  BookOpen,
  HeartPulse,
  Handshake,
  Target,
  Compass,
} from "lucide-react";

/* ---------------------------------------------------------
   Lucide dropped brand/logo icons (Facebook, Twitter/X,
   Instagram, LinkedIn) a while back to avoid trademark issues.
   These small inline SVGs replace them so nothing depends on
   a package export that may or may not exist in your version.
--------------------------------------------------------- */
function FacebookIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-8.2h2.75l.41-3.2H13.5V7.5c0-.93.26-1.56 1.59-1.56h1.7V3.1C16.5 3.06 15.5 3 14.35 3 11.9 3 10.25 4.49 10.25 7.2v2.4H7.5v3.2h2.75V21h3.25Z" />
    </svg>
  );
}
function TwitterIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.53 3h3.16l-6.9 7.89L21.9 21h-6.35l-4.97-6.5L4.87 21H1.7l7.38-8.44L2.3 3h6.5l4.5 5.94L17.53 3Zm-1.11 16.17h1.75L7.66 4.73H5.78l10.64 14.44Z" />
    </svg>
  );
}
function InstagramIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function LinkedinIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3.5 9.5h3v11h-3v-11Zm6.5 0h2.9v1.5h.04c.4-.76 1.4-1.56 2.86-1.56 3.06 0 3.62 2.02 3.62 4.63v6.43h-3v-5.7c0-1.36-.02-3.1-1.89-3.1-1.9 0-2.19 1.48-2.19 3v5.8h-3v-11Z" />
    </svg>
  );
}

/* ---------------------------------------------------------
   Reveal-on-scroll wrapper — used everywhere for smooth,
   deliberate entrance transitions instead of scattered effects.
--------------------------------------------------------- */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Fail-safe: if IntersectionObserver isn't available, or never fires
    // for any reason, force the content visible after a short delay so
    // the page never gets stuck fully invisible.
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

/* ---------------------------------------------------------
   Growth-ring motif — the page's signature element.
   Concentric ripples standing for one act of care spreading
   outward. Reused (quietly) in the hero and as the timeline
   connective tissue.
--------------------------------------------------------- */
function GrowthRings({ className = "", style = {} }) {
  return (
    <svg
      className={`growth-rings ${className}`}
      style={style}
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="300" cy="300" r="80" stroke="var(--gold)" strokeWidth="1.5" opacity="0.55" />
      <circle cx="300" cy="300" r="150" stroke="var(--burnt)" strokeWidth="1.5" opacity="0.4" />
      <circle cx="300" cy="300" r="220" stroke="var(--gold)" strokeWidth="1" opacity="0.28" />
      <circle cx="300" cy="300" r="290" stroke="var(--burnt)" strokeWidth="1" opacity="0.16" />
    </svg>
  );
}


const HERO_IMAGE_URL = "/images/food.avif";

// Replace with your own YouTube video ID — the part after "v=" in
// https://www.youtube.com/watch?v=XXXXXXXXXXX
const YOUTUBE_VIDEO_ID = "TbhP0j4mkPY";

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

const JOURNEY = [
  {
    year: "2007",
    title: "The Vision Takes Root",
    body: "The vision and commission to serve vulnerable people were received, key community needs were identified, and plans began to turn the vision into meaningful action.",
  },
  {
    year: "2012",
    title: "First Major Community outreach",
    body: "Supporting elderly widows, and the commencement of scholarship awards for children without support",
  },
  {
    year: "2019",
    title: "Osinman Skills Center opens",
    body: "A permanent home for vocational training in tailoring, carpentry, and digital literacy.",
  },
  {
    year: "2021",
    title: "10,000 lives touched",
    body: "A decade of small, steady work quietly crossed a milestone none of us set out chasing.",
  },
  {
    year: "2023",
    title: "Four states, one mission",
    body: "Programs expanded beyond FCT into Niger, Kaduna, and Nasarawa states.",
  },
  {
    year: "2026",
    title: "Building toward 50,000",
    body: "This year's goal: reach 50,000 lives through education, health, and livelihood programs.",
  },
];

// Served from the /public folder — drop your own files at these paths
// (e.g. public/images/projects/literacy.jpg), any filenames are fine as
// long as you update the paths below to match.
const PROJECTS = [
  {
    icon: Droplets,
    title: "Food Relief Initiative",
    body: "Supplying lacking communities with food and basic necessities to help them through difficult times.",
    tag: "Food",
    photo: "/images/food.avif",
  },
   
  {
    icon: Handshake,
    title: "Youths in Trade",
    body: "Empowering youths with high-value skills to make a positive contributions to the society.",
    tag: "skills Training",
    photo: "/images/skill.avif",
  },
  {
    icon: HeartPulse,
    title: "Community Health Outreach",
    body: "Mobile clinics bringing free basic healthcare, screenings, and health education to hard-to-reach villages.",
    tag: "Health",
    photo: "/images/health.avif",
  },
  {
    icon: BookOpen,
    title: "Bright Futures Literacy",
    body: "Providing scholarships to outstanding students in the local environment ",
    tag: "Education",
    photo: "/images/sch.avif",
  },
];

// Served from the /public folder — drop your own files at these paths
// (e.g. public/images/team/amaka.jpg), any filenames are fine as long as
// you update the paths below to match.
const TEAM = [
  {
    initials: "MN",
    name: "Nurse Mampak Nanre",
    role: "Founder & President",
    quote: "Nurse Mampak Nanre, born into the family of Mampak Nden from Kwanpe village in Langtang North LGA of Plateau State, was inspired to establish OSI-NMAN Foundation through her daily experiences in healthcare.",
    tone: "burnt",
    photo: "/images/t1.avif",
  },
  {
    initials: "TB",
    name: "Mr Truman",
    role: "Vice President",
    quote: "Mr. Truman is a communications specialist with experience in the development sector, specializing in strategic communications, advocacy and digital media.",
    tone: "green",
    photo: "/images/truman.avif",
  },
  {
    initials: "NRD",
    name: "Mrs. Nanbol Rita Danbana",
    role: "Treasurer",
    quote: "Mrs. Nanbol Rita Danbana is a dedicated professional based in Abuja, Nigeria. She is married and brings a strong passion for care, organization, and accountability to her work.",
    tone: "gold",
    photo: "/images/rita.avif",
  },
  {
    initials: "AOO",
    name: "Austin Odaji Oko",
    role: "Spiritual Head, and Member-Board of Trustees",
    quote: "As the Spiritual Head since 2007 and a Member of the Board of Trustees, Mr. Austin Odaji Oko plays a vital role in guiding the Osinman Foundation with integrity and purpose.",
    tone: "burnt",
    photo: "/images/sheni.avif",
  },
];

export default function Home() {
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
    <div className="osf-root" id="top">
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

        html, body {
          scroll-behavior: smooth;
        }
        .osf-root {
          font-family: 'Inter', sans-serif;
          color: var(--ink);
          background: var(--cream);
        }
        .osf-root h1, .osf-root h2, .osf-root h3, .osf-root .font-display {
          font-family: 'Fraunces', serif;
        }
        section { scroll-margin-top: 88px; }

        .bg-ink { background: var(--ink); }
        .bg-cream { background: var(--cream); }
        .bg-cream-deep { background: var(--cream-deep); }
        .bg-white { background: var(--white); }
        .text-ink { color: var(--ink); }
        .text-inksoft { color: var(--ink-soft); }
        .text-cream { color: var(--cream); }
        .text-burnt { color: var(--burnt); }
        .text-gold { color: var(--gold); }
        .text-green { color: var(--green); }
        .border-burnt { border-color: var(--burnt); }

        .eyebrow {
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          font-size: 0.72rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--burnt);
        }
        .eyebrow.on-dark { color: var(--gold); }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--burnt);
          color: var(--white);
          padding: 0.85rem 1.6rem;
          border-radius: 999px;
          font-weight: 600;
          transition: transform 0.35s cubic-bezier(.2,.8,.2,1), background 0.3s ease, box-shadow 0.35s ease;
          box-shadow: 0 8px 24px -10px rgba(193,80,46,0.55);
        }
        .btn-primary:hover { background: var(--burnt-dark); transform: translateY(-3px); box-shadow: 0 14px 28px -10px rgba(193,80,46,0.65); }

        .btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: transparent;
          color: var(--cream);
          border: 1.5px solid rgba(251,245,236,0.4);
          padding: 0.85rem 1.6rem;
          border-radius: 999px;
          font-weight: 600;
          transition: all 0.35s ease;
        }
        .btn-outline:hover { border-color: var(--gold); color: var(--gold); transform: translateY(-3px); }

        .btn-outline-ink {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: transparent;
          color: var(--ink);
          border: 1.5px solid rgba(36,28,23,0.2);
          padding: 0.85rem 1.6rem;
          border-radius: 999px;
          font-weight: 600;
          transition: all 0.35s ease;
        }
        .btn-outline-ink:hover { border-color: var(--burnt); color: var(--burnt); background: var(--white); transform: translateY(-3px); }

        .btn-ghost-ink {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--burnt);
          font-weight: 600;
          transition: gap 0.3s ease, color 0.3s ease;
        }
        .btn-ghost-ink:hover { gap: 0.7rem; color: var(--burnt-dark); }

        /* Nav */
        .nav-wrap {
          transition: background 0.4s ease, box-shadow 0.4s ease, padding 0.3s ease;
        }
        .nav-link {
          position: relative;
          color: var(--ink);
          font-weight: 500;
          font-size: 0.92rem;
          transition: color 0.25s ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          left: 0; right: 0; bottom: -6px;
          height: 2px;
          background: var(--burnt);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }
        .nav-link:hover { color: var(--burnt); }
        .nav-link:hover::after { transform: scaleX(1); }

        /* Mobile menu */
        .mobile-panel {
          transition: transform 0.45s cubic-bezier(.2,.8,.2,1), opacity 0.4s ease;
        }
        .mobile-backdrop {
          transition: opacity 0.4s ease;
        }

        /* Growth rings */
        .growth-rings {
          animation: spin-slow 60s linear infinite;
        }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        /* Reveal on scroll — used for the entrance easing across the page */
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

        /* Extra-dramatic pop for cards and pictures: adds a slight rotation
           and a touch of overshoot so they feel like they land into place. */
        .reveal.reveal-pop {
          transform: translateY(72px) scale(0.85) rotate(-3deg);
          transition:
            opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1),
            transform 1.15s cubic-bezier(0.22, 1.4, 0.36, 1),
            filter 1.1s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal.reveal-pop.reveal-visible { transform: translateY(0) scale(1) rotate(0deg); }

        /* Pictures ease in with a slow, deliberate zoom-out-to-rest */
        .reveal.reveal-image {
          transform: scale(1.18);
          filter: blur(14px);
          transition:
            opacity 1.3s cubic-bezier(0.16, 1, 0.3, 1),
            transform 1.4s cubic-bezier(0.16, 1, 0.3, 1),
            filter 1.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal.reveal-image.reveal-visible { transform: scale(1); filter: blur(0); }

        /* Nav bar eases in once when the page first loads */
        @keyframes nav-drop-in {
          from { opacity: 0; transform: translateY(-16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .nav-enter { animation: nav-drop-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }

        /* Cards */
        .card-project {
          background: var(--white);
          border-radius: 1.25rem;
          overflow: hidden;
          transition: transform 0.5s cubic-bezier(.2,.8,.2,1), box-shadow 0.5s cubic-bezier(.2,.8,.2,1);
          box-shadow: 0 2px 12px -6px rgba(36,28,23,0.12);
        }
        .card-project:hover { transform: translateY(-8px); box-shadow: 0 20px 36px -16px rgba(36,28,23,0.22); }

        .project-photo-wrap {
          overflow: hidden;
          position: relative;
          aspect-ratio: 16 / 10;
        }
        .project-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: grayscale(15%);
          transform: scale(1);
          transition: transform 0.8s cubic-bezier(.2,.8,.2,1), filter 0.6s ease;
        }
        .card-project:hover .project-photo { transform: scale(1.08); filter: grayscale(0%); }

        .icon-badge {
          position: relative;
          margin-top: -22px;
          border: 3px solid var(--white);
          box-shadow: 0 6px 16px -6px rgba(36,28,23,0.3);
        }
        .card-project .icon-badge {
          transition: transform 0.5s cubic-bezier(.2,.8,.2,1), background-color 0.4s ease;
        }
        .card-project:hover .icon-badge { transform: rotate(-8deg) scale(1.08); background-color: var(--gold) !important; }
        .card-project h3 { transition: color 0.35s ease; }
        .card-project:hover h3 { color: var(--burnt); }
        .card-project .btn-ghost-ink { transition: gap 0.35s ease, color 0.3s ease, transform 0.35s ease; }
        .card-project:hover .btn-ghost-ink { transform: translateX(2px); }

        .card-team {
          background: var(--white);
          border-radius: 1.25rem;
          overflow: hidden;
          transition: transform 0.55s cubic-bezier(.2,.8,.2,1), box-shadow 0.55s cubic-bezier(.2,.8,.2,1);
          box-shadow: 0 2px 12px -6px rgba(36,28,23,0.1);
        }
        .card-team:hover { transform: translateY(-8px) scale(1.015); box-shadow: 0 22px 40px -18px rgba(36,28,23,0.24); }

        .team-photo-wrap {
          overflow: hidden;
          position: relative;
          aspect-ratio: 4 / 3;
        }
        .team-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: grayscale(18%) contrast(1.02);
          transform: scale(1);
          transition: transform 0.7s cubic-bezier(.2,.8,.2,1), filter 0.6s ease;
        }
        .card-team:hover .team-photo { transform: scale(1.08); filter: grayscale(0%); }
        .team-photo-shade {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(36,28,23,0.35), rgba(36,28,23,0) 45%);
          opacity: 0.9;
          transition: opacity 0.5s ease;
        }
        .card-team:hover .team-photo-shade { opacity: 0.55; }

        .team-name { transition: color 0.35s ease, transform 0.35s ease; display: inline-block; }
        .card-team:hover .team-name { color: var(--burnt); transform: translateX(2px); }
        .team-quote { transition: color 0.4s ease, transform 0.4s ease; }
        .card-team:hover .team-quote { transform: translateY(-1px); }
        .team-social a {
          transition: transform 0.35s cubic-bezier(.2,.8,.2,1), color 0.3s ease;
          display: inline-flex;
        }
        .team-social a:hover { transform: translateY(-3px) scale(1.1); color: var(--burnt); }

        .avatar-burnt { background: linear-gradient(135deg, var(--burnt), var(--burnt-dark)); }
        .avatar-green { background: linear-gradient(135deg, #55694F, var(--green)); }
        .avatar-gold  { background: linear-gradient(135deg, #E4B879, var(--gold)); }

        /* Timeline */
        .timeline-line {
          background: linear-gradient(to bottom, var(--burnt), var(--gold));
          width: 2px;
        }
        .timeline-dot {
          width: 14px; height: 14px;
          border-radius: 999px;
          background: var(--burnt);
          box-shadow: 0 0 0 5px var(--cream), 0 0 0 6px rgba(193,80,46,0.35);
        }

        /* Form */
        .field {
          width: 100%;
          background: rgba(251,245,236,0.06);
          border: 1.5px solid rgba(251,245,236,0.22);
          color: var(--cream);
          border-radius: 0.9rem;
          padding: 0.9rem 1.1rem;
          font-family: 'Inter', sans-serif;
          transition: border-color 0.3s ease, background 0.3s ease;
        }
        .field::placeholder { color: rgba(251,245,236,0.45); }
        .field:focus {
          outline: none;
          border-color: var(--gold);
          background: rgba(251,245,236,0.1);
        }

        .social-dot {
          width: 40px; height: 40px;
          border-radius: 999px;
          display: flex; align-items: center; justify-content: center;
          border: 1.5px solid rgba(251,245,236,0.25);
          color: var(--cream);
          transition: all 0.3s ease;
        }
        .social-dot:hover { background: var(--burnt); border-color: var(--burnt); transform: translateY(-3px); }

        /* Mission & Vision */
        .card-pillar {
          background: var(--cream);
          border-radius: 1.1rem;
          padding: 1.5rem;
          transition: transform 0.5s cubic-bezier(.2,.8,.2,1), box-shadow 0.5s cubic-bezier(.2,.8,.2,1), background 0.4s ease;
          box-shadow: 0 2px 12px -6px rgba(36,28,23,0.08);
        }
        .card-pillar:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 36px -18px rgba(36,28,23,0.18);
          background: var(--white);
        }
        .card-pillar .icon-badge {
          margin-top: 0;
          border: none;
          box-shadow: none;
          transition: transform 0.5s cubic-bezier(.2,.8,.2,1), background-color 0.4s ease;
        }
        .card-pillar:hover .icon-badge { transform: rotate(-8deg) scale(1.08); background-color: var(--gold) !important; }

        @media (prefers-reduced-motion: reduce) {
          .reveal, .growth-rings, .card-project, .card-team, .btn-primary, .btn-outline, .nav-enter { transition: none !important; animation: none !important; filter: none !important; }
          .reveal { opacity: 1 !important; transform: none !important; }
        }
      `}</style>

      {/* ---------------- NAV ---------------- */}
      <header
        className={`nav-wrap nav-enter fixed top-0 left-0 right-0 z-50 ${
          scrolled ? "bg-cream shadow-md" : "bg-cream"
        }`}
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
              <a key={l.label} href={l.href} className="nav-link">
                {l.label}
              </a>
            ))}
          </nav>
          <button
            className="md:hidden p-2 -mr-2"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={26} />
          </button>
        </div>
      </header>

      {/* ---------------- MOBILE MENU ---------------- */}
      <div
        className="mobile-backdrop fixed inset-0 z-50 md:hidden"
        style={{
          background: "rgba(36,28,23,0.55)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
        }}
        onClick={closeMenu}
      />
      <div
        className="mobile-panel fixed top-0 right-0 bottom-0 z-50 md:hidden flex flex-col"
        style={{
          width: "78%",
          maxWidth: 340,
          background: "var(--ink)",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <span className="font-display text-cream text-lg font-semibold">Menu</span>
          <button aria-label="Close menu" onClick={closeMenu} className="p-2 text-cream">
            <X size={24} />
          </button>
        </div>
        <nav className="flex flex-col gap-1 px-6 mt-4">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={closeMenu}
              className="text-cream py-3 border-b"
              style={{ borderColor: "rgba(251,245,236,0.1)", fontSize: "1.05rem" }}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="px-6 mt-8">
          <a href="/get-involved" onClick={closeMenu} className="btn-primary w-full justify-center">
            Get Involved <ArrowRight size={16} />
          </a>
        </div>
      </div>

      {/* ---------------- HERO ---------------- */}
      <section className="bg-ink relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
        <GrowthRings
          className="absolute"
          style={{ top: "-10%", right: "-15%", width: 560, height: 560, opacity: 0.9 }}
        />
        <div className="max-w-6xl mx-auto px-6 relative grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <div>
            <Reveal>
              <p className="eyebrow on-dark mb-5">Osinman Foundation · Abuja, Nigeria</p>
            </Reveal>
            <Reveal delay={80}>
              <h1
                className="text-cream font-display font-medium leading-[1.05]"
                style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}
              >
                Every ripple starts <span style={{ color: "var(--gold)" }}>with one act of care.</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="text-cream mt-6 max-w-md" style={{ opacity: 0.75, fontSize: "1.05rem", lineHeight: 1.7 }}>
                Since 2007, we've worked alongside communities across Nigeria on education, health,
                and livelihood programs — small, patient efforts that add up to lasting change.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="flex flex-wrap gap-4 mt-9">
                <a href="/get-involved" className="btn-outline">
                  DONATE TO THE CAUSE
                </a>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <div className="grid grid-cols-3 gap-6 mt-16 max-w-md">
                {[
                  ["19", "years of work"],
                  ["4", "states reached"],
                  ["10k+", "lives touched"],
                ].map(([num, label]) => (
                  <div key={label}>
                    <div className="font-display text-gold" style={{ fontSize: "2.1rem" }}>
                      {num}
                    </div>
                    <div className="text-cream" style={{ opacity: 0.6, fontSize: "0.8rem" }}>
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} className="reveal-image">
            <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: "0 24px 60px -20px rgba(0,0,0,0.5)" }}>
              <img
                src={HERO_IMAGE_URL}
                alt="A moment from one of our community programs — replace with your own photo"
                className="w-full h-full object-cover block"
                style={{ minHeight: 380 }}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- VIDEO ----------------
          Landscape (16:9) YouTube embed. To use your own video:
          1. Replace YOUTUBE_VIDEO_ID below (the part after "v=" in the
             YouTube URL, e.g. https://www.youtube.com/watch?v=XXXXXXXXXXX)
      ---------------------------------------------------------------------------- */}
      <section className="bg-cream py-20 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <p className="eyebrow mb-4 text-center" style={{ display: "block" }}>
              See Us In Action
            </p>
          </Reveal>
          <Reveal delay={60}>
            <h2
              className="font-display font-medium mb-10 text-center"
              style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)" }}
            >
              Watch our story unfold.
            </h2>
          </Reveal>

          <Reveal delay={120} className="reveal-image">
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ aspectRatio: "16 / 9", boxShadow: "0 24px 60px -20px rgba(0,0,0,0.45)" }}
            >
              <iframe
                className="w-full h-full block"
                src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`}
                title="OSINMAN Foundation — Our Story"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ background: "var(--ink)" }}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- MISSION & VISION ---------------- */}
      <section id="mission" className="bg-white py-24 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <p className="eyebrow mb-4">What Drives Us</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="font-display font-medium mb-14" style={{ fontSize: "clamp(1.9rem, 4vw, 2.6rem)" }}>
              Mission & vision.
            </h2>
          </Reveal>

          <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Reveal delay={0} className="reveal-pop">
              <div className="card-pillar h-full">
                <div
                  className="icon-badge flex items-center justify-center rounded-full mb-4"
                  style={{ width: 38, height: 38, background: "var(--cream-deep)" }}
                >
                  <Target size={17} color="var(--burnt)" />
                </div>
                <p className="eyebrow mb-1.5" style={{ letterSpacing: "0.14em", fontSize: "0.65rem" }}>
                  Our Mission
                </p>
                <p className="font-display font-medium" style={{ fontSize: "0.98rem", lineHeight: 1.45 }}>
                  To empower vulnerable lives through community, education, and sustainable skills—uplifting widows, 
                  seniors, and orphans through faith and heritage, while equipping youth to build a prosperous future 
                  for generations to come.
                </p>
              </div>
            </Reveal>

            <Reveal delay={110} className="reveal-pop">
              <div className="card-pillar h-full">
                <div
                  className="icon-badge flex items-center justify-center rounded-full mb-4"
                  style={{ width: 38, height: 38, background: "var(--cream-deep)" }}
                >
                  <Compass size={17} color="var(--burnt)" />
                </div>
                <p className="eyebrow mb-1.5" style={{ letterSpacing: "0.14em", fontSize: "0.65rem" }}>
                  Our Vision
                </p>
                <p className="font-display font-medium" style={{ fontSize: "0.98rem", lineHeight: 1.45 }}>
                  We envision a world of social harmony and shared trust—where widows, seniors, and orphans find safe 
                  refuge, and youth master modern technology to restore hope and prosperity across generations.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- OUR JOURNEY ---------------- */}
      <section id="journey" className="bg-cream py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <p className="eyebrow mb-4">Our Journey</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="font-display font-medium mb-4" style={{ fontSize: "clamp(1.9rem, 4vw, 2.8rem)" }}>
              Nineteen years, one community at a time.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-inksoft max-w-2xl mb-16" style={{ lineHeight: 1.7 }}>
              We didn't set out with a five-year plan. We started with one classroom, listened
              closely, and let the work grow from there.
            </p>
          </Reveal>

          <div className="relative pl-10">
            <div className="timeline-line absolute top-2 bottom-2 left-[7px]" />
            <div className="flex flex-col gap-14">
              {JOURNEY.map((item, i) => (
                <Reveal key={item.year} delay={i * 60}>
                  <div className="relative">
                    <span className="timeline-dot absolute" style={{ left: "-40px", top: 6 }} />
                    <div className="font-display text-burnt font-medium" style={{ fontSize: "1.6rem" }}>
                      {item.year}
                    </div>
                    <div className="font-semibold mt-1 mb-1.5">{item.title}</div>
                    <p className="text-inksoft max-w-xl" style={{ lineHeight: 1.65 }}>
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- PROJECTS ---------------- */}
      <section id="projects" className="bg-cream-deep py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <Reveal>
                <p className="eyebrow mb-4">Our Projects</p>
              </Reveal>
              <Reveal delay={60}>
                <h2 className="font-display font-medium" style={{ fontSize: "clamp(1.9rem, 4vw, 2.8rem)" }}>
                  Four programs, one purpose.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={100}>
              <p className="text-inksoft max-w-sm" style={{ lineHeight: 1.7 }}>
                Each project is built with the community it serves — not delivered to it.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-5">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 110} className="reveal-pop">
                <div className="card-project h-full flex flex-col">
                  <div className="project-photo-wrap">
                    <img src={p.photo} alt={p.title} className="project-photo" />
                  </div>
                  <div className="p-5 sm:p-5 pt-0 flex flex-col flex-1">
                    <div
                      className="icon-badge flex items-center justify-center rounded-full mb-3"
                      style={{ width: 40, height: 40, background: "var(--cream-deep)" }}
                    >
                      <p.icon size={17} color="var(--burnt)" />
                    </div>
                    <p className="eyebrow mb-2" style={{ letterSpacing: "0.14em", fontSize: "0.65rem" }}>
                      {p.tag}
                    </p>
                    <h3 className="font-display font-medium mb-2" style={{ fontSize: "1.08rem", lineHeight: 1.3 }}>
                      {p.title}
                    </h3>
                    <p className="text-inksoft flex-1" style={{ lineHeight: 1.55, fontSize: "0.87rem" }}>
                      {p.body}
                    </p>
                    <a href="#" className="btn-ghost-ink mt-3" style={{ fontSize: "0.82rem" }}>
                      Learn more <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- TEAM ---------------- */}
      <section id="team" className="bg-cream py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <p className="eyebrow mb-4">Our Team</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="font-display font-medium mb-16" style={{ fontSize: "clamp(1.9rem, 4vw, 2.8rem)" }}>
              The people behind the work.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-7">
            {TEAM.map((m, i) => (
              <Reveal key={m.name} delay={i * 110} className="reveal-pop">
                <div className="card-team h-full flex flex-col">
                  <div className="team-photo-wrap">
                    <img
                      src={m.photo}
                      alt={`${m.name}, ${m.role}`}
                      className="team-photo"
                    />
                    <div className="team-photo-shade" />
                  </div>
                  <div className="p-4 sm:p-5 flex flex-col flex-1">
                    <h3 className="team-name font-semibold mb-0.5" style={{ fontSize: "0.95rem" }}>{m.name}</h3>
                    <p className="eyebrow mb-1.5 sm:mb-2" style={{ letterSpacing: "0.08em", fontSize: "0.65rem" }}>
                      {m.role}
                    </p>
                    <p
                      className="team-quote text-inksoft flex-1"
                      style={{ lineHeight: 1.5, fontSize: "0.8rem" }}
                    >
                      {m.quote}
                    </p>
                    <div className="flex items-center justify-end mt-3">
                      <a href="/team" className="btn-ghost-ink" style={{ fontSize: "0.78rem" }}>
                        Learn more <ArrowUpRight size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={TEAM.length * 110 + 60}>
            <div className="flex justify-center mt-14">
              <a href="/team" className="btn-outline-ink">
                View More Team Members <ArrowRight size={16} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- GET INVOLVED CTA ---------------- */}
      <section id="signup" className="bg-ink relative overflow-hidden py-24 md:py-28">
        <GrowthRings
          className="absolute"
          style={{ bottom: "-20%", left: "-10%", width: 480, height: 480, opacity: 0.6 }}
        />
        <div className="max-w-2xl mx-auto px-6 relative text-center">
          <Reveal>
            <p className="eyebrow on-dark mb-4">Get Involved</p>
          </Reveal>
          <Reveal delay={60}>
            <h2
              className="text-cream font-display font-medium mb-5"
              style={{ fontSize: "clamp(1.9rem, 4vw, 2.6rem)" }}
            >
              Say hello, or make it official.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-cream mb-8" style={{ opacity: 0.72, lineHeight: 1.75 }}>
              Whether you'd like to volunteer, partner with us, or support a program directly —
              our Get Involved page has everything you need in one place.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <a href="/get-involved" className="btn-primary">
              Get Involved <ArrowRight size={16} />
            </a>
          </Reveal>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="bg-ink border-t" style={{ borderColor: "rgba(251,245,236,0.08)" }}>
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
            <Reveal>
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
            </Reveal>

            <Reveal delay={60}>
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
            </Reveal>

            <Reveal delay={120}>
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
            </Reveal>

            <Reveal delay={180}>
              <div>
                <p className="eyebrow on-dark mb-4">Follow Along</p>
                <div className="flex gap-3">
                  <a href="https://web.facebook.com/osinmanfoundation/?_rdc=1&_rdr#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-dot"><FacebookIcon size={17} /></a>
                  <a href="https://wa.me/2348037051210" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="social-dot"><WhatsAppIcon size={17} /></a>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={220}>
            <div
              className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-8 border-t"
              style={{ borderColor: "rgba(251,245,236,0.08)" }}
            >
              <p className="text-cream" style={{ opacity: 0.45, fontSize: "0.82rem" }}>
                © {new Date().getFullYear()} Osinman Foundation. All rights reserved.
              </p>
              <p className="text-cream" style={{ opacity: 0.45, fontSize: "0.82rem" }}>
                Registered NGO · Abuja, Nigeria
              </p>
            </div>
          </Reveal>
        </div>
      </footer>
    </div>
  );
}
