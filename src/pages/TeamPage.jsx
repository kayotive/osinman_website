import React, { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowRight, MapPin, Mail, Phone } from "lucide-react";

/* ---------------------------------------------------------
   This page shares the exact same design system (colors,
   fonts, buttons, reveal-on-scroll) as the home page so it
   feels like the same site, not a bolted-on extra page.
--------------------------------------------------------- */

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

function WhatsAppIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" />
      <path d="M12.02 2C6.5 2 2.03 6.42 2.03 11.9c0 1.83.5 3.53 1.35 5l-1.4 5.1 5.24-1.37a10.03 10.03 0 0 0 4.8 1.22h.01c5.52 0 9.99-4.42 9.99-9.9C22.02 6.42 17.55 2 12.02 2Zm5.9 15.75c-.62.62-1.72 1.24-2.53 1.4-.65.14-1.5.25-4.36-.94-3.65-1.5-6-5.2-6.18-5.44-.18-.24-1.48-1.97-1.48-3.76 0-1.79.94-2.66 1.28-3.03.34-.37.73-.46.98-.46h.7c.22 0 .53-.04.8.6.29.68.97 2.36 1.05 2.53.08.17.13.36.02.58-.11.22-.16.36-.32.55-.16.19-.34.42-.48.56-.16.16-.33.34-.14.66.19.32.85 1.4 1.83 2.27 1.26 1.11 2.31 1.46 2.65 1.62.34.16.54.14.74-.08.2-.22.85-.98 1.08-1.32.23-.34.46-.28.77-.17.31.11 1.97.93 2.31 1.1.34.17.56.25.64.4.08.15.08.85-.34 1.47Z" />
    </svg>
  );
}

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Get to Know Us", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Events", href: "/events" },
  { label: "Join Us", href: "/get-involved" },
];

/* Section 1: Executive Members (Ordered precisely with new additions and corrected bios) */
const EXECUTIVE_TEAM = [
  {
    name: "Nurse Mampak Nanre",
    role: "Founder & President",
    location: "Abuja, FCT",
    photo: "/images/t1.avif",
    bio: "Nurse Mampak Nanre, born into the family of Mampak Nden from Kwanpe village in Langtang North LGA of Plateau State, was inspired to establish OSINMAN Foundation through her daily experiences in healthcare. In her work, she encountered patients facing not only illness but also neglect, poverty, and lack of support. While caring for the elderly, she witnessed loneliness, abandonment, and limited access to basic needs. Her work with cancer patients exposed her to the physical, psychological, emotional, and financial burdens of long-term treatment—often without adequate family or community support. Her compassion was further deepened by her encounters with orphans, who made up over 20% of her community population between 2002 and 2006 due to religious crises in Southern Plateau State, Nigeria. Many of these children lacked stable support systems and access to education from 2007 to date. These experiences ignited in her a strong desire to go beyond bedside care by creating a platform that provides holistic support—medically, emotionally, socially, and educationally. Through OSI-NMAN Foundation, she has supported orphans with scholarships in technical fields, provided food relief to the elderly, and delivered cancer information, education, screening, and care navigation to rural communities.",
  },
  {
    name: "Mr. Truman",
    role: "Vice President",
    location: "Abuja, FCT",
    photo: "/images/truman.jpg",
    bio: "Mr. Truman is a communications specialist with experience in the development sector, specializing in strategic communications, advocacy and digital media. He has a strong track record in managing brand communications and reputation, developing IEC materials and delivering impactful campaigns. Through visual storytelling, he crafts compelling narratives that drive change, contributing to initiatives focused on justice sector reforms, inclusive political participation and humanitarian interventions in Nigeria.",
  },
  {
    name: "Mrs. Nanbol Rita Danbana",
    role: "Treasurer",
    location: "Abuja, FCT",
    photo: "/images/rita.avif",
    bio: "Mrs. Nanbol Rita Danbana is a dedicated professional based in Abuja, Nigeria. She is married and brings a strong passion for care, organization, and accountability to her work. As the Treasurer of OSI-NMAN Foundation, she plays a vital role in ensuring transparency, proper financial management, and the effective coordination of the foundation’s resources.",
  },
  {
    name: "Austin Odaji Oko",
    role: "Spiritual Head, and Member-Board of Trustees",
    location: "Abuja, FCT",
    photo: "/images/sheni.avif",
    bio: "As the Spiritual Head since 2007 and a Member of the Board of Trustees, Mr. Austin Odaji Oko plays a vital role in guiding the Osinman Foundation with integrity and purpose. He offers spiritual leadership and advisory support, ensuring that the foundation’s activities remain grounded in compassion, service, and strong ethical values.",
  },
  {
    name: "Selkap Miri",
    role: "Patron",
    location: "Plateau State",
    photo: "/images/selkap.jpeg",
    bio: "Mr. Selkap Miri is a dedicated patron of the OSINMAN Foundation, committed to advancing the wellbeing and dignity of vulnerable individuals and families. Through their support, advocacy, and belief in community-driven change, they contribute to OSINMAN’s efforts in healthcare, elderly care, support for widows, skills development, and humanitarian outreach, helping create stronger and more caring communities."
  },
  {
    name: "Mr. Gashon Kumbin Sheni",
    role: "Secretary",
    location: "Plateau, Jos",
    photo: "/images/gashon.jpeg",
    bio: "Mr. Gashon Kumbin Sheni is from Langtang North LGA of Plateau State. A trained Zoologist, he is deeply compassionate about supporting the needy and vulnerable in society. He serves as the Secretary of OSI-NMAN Foundation, where he contributes to effective coordination and administration of the organization’s activities. He is currently based in Jos North, Plateau State",
  },
  {
    name: "Domkur Isaac Nantip",
    role: "Assistant Secretary and Alumni",
    location: "Abuja, FCT",
    photo: "/images/nan.avif",
    bio: "Mr. Domkur Isaac Nantip is the Assistant Secretary of the Osinman Foundation, responsible for supporting administrative processes, managing documentation, and facilitating effective communication within the organization. He is also an alumnus of the foundation, having benefited from its programs and initiatives in the past. His personal experience as a beneficiary gives him a unique perspective and a deep understanding of the foundation’s mission, allowing him to contribute meaningfully to its ongoing efforts to support communities in need.",
  },
  {
    name: "Mrs. Justina Makama",
    role: "Social/welfare coordinator",
    location: "Kaduna State",
    photo: "/images/justina.avif",
    bio: "Mrs. Justina Makama serves as the Social/Welfare Coordinator at the Osinman Foundation. She supports the NGO by overseeing the planning and implementation of welfare initiatives, ensuring that the foundation’s programs effectively address the needs of vulnerable populations. Her role involves coordinating social support services, advocating for community welfare, and contributing to the overall mission of the foundation to improve the well-being of those it serves.",
  },
  {
    name: "Promise Y Makama (Zorimakama)",
    role: "Craft/Fashion Lead",
    location: "Abuja, FCT",
    photo: "/images/promise.png",
    bio: "Promise Y. Makama (Zorimakama) is a creative professional and the Craft/Fashion Lead at Osinman Foundation, based in Abuja, FCT. Passionate about creativity, craftsmanship, and fashion, she contributes to the Foundation’s efforts by promoting creative expression, developing craft and fashion initiatives, and supporting opportunities that empower individuals through skills, talent, and innovation.",
  },
   {
    name: "Samson Shedrack Tongdil",
    role: "IT Assistant and Financial Secretary",
    location: "Abuja, FCT",
    photo: "/images/shed.avif",
    bio: "Samson Shedrack Tongdil serves as the IT and Assistant Financial Secretary of the Osinman Foundation. In this dual role, he oversees the foundation’s technology infrastructure while supporting financial record-keeping, reporting, and accountability processes. His contributions help ensure efficient operations and transparency across the organization, enabling the foundation to effectively serve its mission of supporting communities in need.",
  },
  {
    name: "Ponchang Paul Jangkam",
    role: "Alumni/Youth/Student leaders",
    location: "Langtang North Plateau State",
    photo: "/images/paul.jpeg",
    bio: "Mr. Ponchang Paul Jangkam is a youth and student leader from Langtang North, Plateau State, and an active member of the Osinman Foundation. As part of the Alumni/Youth/Student Leaders team, Ponchang contributes to youth engagement, leadership development, and initiatives that promote education, community participation, and opportunities for young people.",
  },
   {
    name: "Lot Philemon Dupbin",
    role: "IT/Alumni",
    location: "Langtang North Plateau State",
    photo: "/images/lot.jpeg",
    bio: "Lot Philemon is a proud Alumni of Osinman Foundation. He now supports by sharing practical IT insights drawn from his experience in the tech industry."
  },

];

/* Section 2: Local Organizing Committee (LOC) Members (Moved from execution with state tags removed from cards)[cite: 1] */
const LOC_MEMBERS = [
  {
    name: "Mr. Danbana Nansel Kubba",
    role: "LOC CHAIRMAN",
    photo: "/images/nansel.jpeg",
    bio: "Mr. Danbana Nansel Kubba is the LOC Chairman of the Osi-Nman Foundation, where he oversees the planning and coordination of the Foundation’s activities and programs. He is committed to community development and service.",
  },
  {
    name: "Mr. Dindul Gabriel Mampak",
    role: "OUTREACH COORDINATOR",
    photo: "/images/gab.avif",
    bio: "Mr. Dindul Gabriel Mampak serves as the Plateau State Outreach Coordinator for the Osinman Foundation. In this role, he leads and coordinates outreach initiatives across the state, fostering community engagement and ensuring the effective delivery of the foundation’s programs.",
  },
  {
    name: "Rev. Barau Nanpon Matthias",
    role: "OUTREACH COORDINATOR",
    photo: "/images/barau.png",
    bio: "Rev. Barau Nanpon Matthias serves as the Spiritual Father and Outreach Coordinator at Osinman Foundation, providing spiritual guidance, mentorship, and leadership while supporting the Foundation’s outreach initiatives.",
  },
  {
    name: "Mr. Samuel Selfa Zingbong",
    role: "OUTREACH COORDINATOR",
    photo: "/images/sam.avif",
    bio: "As the Plateau State Outreach Coordinator, Mr. Samuel Selfa Zingbong plays a vital role in advancing the Osinman Foundation’s mission at the grassroots level. He is actively involved in community outreach, building relationships, and ensuring that support reaches those who need it most across Plateau State",
  },
  {
    name: "John Sati",
    role: "OUTREACH COORDINATOR",
    photo: "/images/john.png",
    bio: "Mr. John Sati serves as the Coordinator for Pakuk, Yilla, and Bwazang at Osinman Foundation, overseeing community engagement and supporting the Foundation’s initiatives across these communities",
  },
  {
    name: "Nanbol Dauda Danbana",
    role: "ADVISER/SUPPORT LEAD",
    photo: "/images/nanbol.png",
    bio: "Mr. Nanbol Dauda Danbana serves as an Adviser, Donor, and Support Lead at Osinman Foundation, providing strategic guidance and support towards advancing the Foundation’s mission. Through his contributions and commitment, he helps strengthen the Foundation’s initiatives, support community development, and drive meaningful impact through partnerships and resource mobilization.",
  },
    {
    name: "Timman Kumpon",
    role: "Outreach Coordinator",
    location: "Langtang North Plateau State",
    photo: "/images/timman.jpg",
    bio: "Mr. Timman Kumpon is a coordinator from Langtang North, Plateau State, and an active member of the Osinman Foundation. As part of the team, he contributes to youth engagement, leadership development, and initiatives that promote education, community participation, and opportunities for young people.",
  },
   {
    name: "Kargwak Zhakom",
    role: "Outreach Coordinator",
    location: "Langtang North Plateau State",
    photo: "/images/zhakom.jpeg",
    bio: "Mr. Kargwak Zhakom serves as an outreach Coordinator at Osinman Foundation, joining in overseeing community engagement and supporting the Foundation’s initiatives across these communities"
   },
 
];

export default function TeamPage() {
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
        .osf-root {
          font-family: 'Inter', sans-serif;
          color: var(--ink);
          background: var(--cream);
        }
        .osf-root h1, .osf-root h2, .osf-root h3, .osf-root .font-display {
          font-family: 'Fraunces', serif;
        }

        .bg-ink { background: var(--ink); }
        .bg-cream { background: var(--cream); }
        .text-cream { color: var(--cream); }
        .text-inksoft { color: var(--ink-soft); }
        .text-gold { color: var(--gold); }

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
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: var(--burnt); color: var(--white);
          padding: 0.85rem 1.6rem; border-radius: 999px; font-weight: 600;
          transition: transform 0.35s cubic-bezier(.2,.8,.2,1), background 0.3s ease, box-shadow 0.35s ease;
          box-shadow: 0 8px 24px -10px rgba(193,80,46,0.55);
        }
        .btn-primary:hover { background: var(--burnt-dark); transform: translateY(-3px); box-shadow: 0 14px 28px -10px rgba(193,80,46,0.65); }

        .btn-outline {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: transparent; color: var(--cream);
          border: 1.5px solid rgba(251,245,236,0.4);
          padding: 0.85rem 1.6rem; border-radius: 999px; font-weight: 600;
          transition: all 0.35s ease;
        }
        .btn-outline:hover { border-color: var(--gold); color: var(--gold); transform: translateY(-3px); }

        /* Nav */
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

        @keyframes nav-drop-in {
          from { opacity: 0; transform: translateY(-16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .nav-enter { animation: nav-drop-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }

        /* Reveal on scroll */
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

        /* Team profile cards */
        .profile-photo-wrap {
          overflow: hidden;
          position: relative;
          border-radius: 1rem;
          width: 108px;
          height: 108px;
          flex-shrink: 0;
          box-shadow: 0 10px 24px -14px rgba(36,28,23,0.35);
        }
        .profile-photo {
          width: 100%; height: 100%; object-fit: cover; display: block;
          filter: grayscale(18%) contrast(1.02);
          transform: scale(1);
          transition: transform 0.8s cubic-bezier(.2,.8,.2,1), filter 0.6s ease;
        }
        .profile-row:hover .profile-photo { transform: scale(1.05); filter: grayscale(0%); }

        .profile-row {
          background: var(--white);
          border-radius: 1.1rem;
          padding: 1.75rem;
          box-shadow: 0 2px 12px -6px rgba(36,28,23,0.08);
          transition: transform 0.45s cubic-bezier(.2,.8,.2,1), box-shadow 0.45s ease;
        }
        .profile-row:hover { transform: translateY(-4px); box-shadow: 0 18px 34px -18px rgba(36,28,23,0.2); }

        .social-dot {
          width: 40px; height: 40px; border-radius: 999px;
          display: flex; align-items: center; justify-content: center;
          border: 1.5px solid rgba(251,245,236,0.25); color: var(--cream);
          transition: all 0.3s ease;
        }
        .social-dot:hover { background: var(--burnt); border-color: var(--burnt); transform: translateY(-3px); }

        @media (prefers-reduced-motion: reduce) {
          .reveal, .nav-enter { transition: none !important; animation: none !important; filter: none !important; }
          .reveal { opacity: 1 !important; transform: none !important; }
        }
      `}</style>

      {/* ---------------- NAV ---------------- */}
      <header
        className={`nav-wrap nav-enter fixed top-0 left-0 right-0 z-50 bg-cream`}
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
              <a key={l.label} href={l.href} className={`nav-link ${l.label === "Team" ? "is-active" : ""}`}>
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

      {/* ---------------- PAGE HERO ---------------- */}
      <section className="bg-ink pt-36 pb-16 md:pt-44 md:pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <a href="/" className="text-cream inline-flex items-center gap-1 mb-6" style={{ opacity: 0.6, fontSize: "0.85rem" }}>
              ← Back to Home
            </a>
          </Reveal>
          <Reveal delay={60}>
            <p className="eyebrow on-dark mb-4">Meet The Team</p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="text-cream font-display font-medium" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", lineHeight: 1.1 }}>
              Dedicated members, one shared purpose.
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="text-cream mt-5 max-w-xl" style={{ opacity: 0.75, lineHeight: 1.75 }}>
              OSINMAN is built on the everyday work of people who chose to stay close to the
              communities they serve. Here's a bit about who they are and how they got here.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- SECTION 1: EXECUTIVE MEMBERS ---------------- */}
      <section className="bg-cream py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <h2 className="font-display font-medium text-2xl mb-8 border-b pb-3 border-stone-300">
              Executive Members
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EXECUTIVE_TEAM.map((m, i) => (
              <Reveal key={m.name} delay={(i % 6) * 70} className="reveal-pop">
                <div className="profile-row h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="profile-photo-wrap">
                      <img src={m.photo} alt={`${m.name}, ${m.role}`} className="profile-photo" />
                    </div>
                    <div>
                      <h3 className="font-display font-medium" style={{ fontSize: "1.15rem", lineHeight: 1.25 }}>
                        {m.name}
                      </h3>
                      <p className="eyebrow mt-1" style={{ letterSpacing: "0.1em", fontSize: "0.65rem" }}>
                        {m.role}
                      </p>
                      {m.location && (
                        <p className="text-inksoft mt-1" style={{ fontSize: "0.78rem", opacity: 0.7 }}>
                          {m.location}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="text-inksoft" style={{ lineHeight: 1.65, fontSize: "0.9rem" }}>
                    {m.bio}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 2: LOCAL ORGANIZING COMMITTEE (LOC) MEMBERS ---------------- */}
      <section className="bg-cream-deep py-12 md:py-16 border-t border-stone-200">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <h2 className="font-display font-medium text-2xl mb-8 border-b pb-3 border-stone-300">
              LOCAL ORGANIZING COMMITTEE (LOC) MEMBERS
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LOC_MEMBERS.map((m, i) => (
              <Reveal key={m.name} delay={(i % 6) * 70} className="reveal-pop">
                <div className="profile-row h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="profile-photo-wrap">
                      <img src={m.photo} alt={`${m.name}, ${m.role}`} className="profile-photo" />
                    </div>
                    <div>
                      <h3 className="font-display font-medium" style={{ fontSize: "1.15rem", lineHeight: 1.25 }}>
                        {m.name}
                      </h3>
                      <p className="eyebrow mt-1" style={{ letterSpacing: "0.1em", fontSize: "0.65rem" }}>
                        {m.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-inksoft" style={{ lineHeight: 1.65, fontSize: "0.9rem" }}>
                    {m.bio}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CLOSING CTA ---------------- */}
      <section className="bg-ink py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <p className="eyebrow on-dark mb-4">Join Us</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="text-cream font-display font-medium mb-5" style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)" }}>
              We're always looking for more hands.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-cream mb-8" style={{ opacity: 0.72, lineHeight: 1.7 }}>
              Whether it's teaching a Saturday literacy class or lending a professional skill for
              a few hours a month, there's a place for you at OSINMAN.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <a href="/get-involved" className="btn-primary">
              Get in Touch <ArrowRight size={16} />
            </a>
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
            <p className="text-cream" style={{ opacity: 0.45, fontSize: "0.82rem" }}>
              Registered NGO · Abuja, Nigeria
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}