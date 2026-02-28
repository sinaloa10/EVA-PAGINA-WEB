import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
            { threshold }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return [ref, visible];
}

// ─── Global Styles ────────────────────────────────────────────────────────────
const GlobalStyle = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@200;300;400&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --void: #0a0c10;
      --deep: #0e1118;
      --surface: #13161f;
      --edge: #1c2030;
      --mist: rgba(255,255,255,0.04);
      --text-dim: rgba(255,255,255,0.28);
      --text-mid: rgba(255,255,255,0.52);
      --text-bright: rgba(255,255,255,0.84);
      --accent: rgba(120,140,200,0.45);
      --accent-glow: rgba(100,120,180,0.12);
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--void);
      color: var(--text-mid);
      font-family: 'DM Sans', sans-serif;
      font-weight: 300;
      overflow-x: hidden;
      cursor: default;
    }

    ::selection { background: rgba(100,120,180,0.25); color: white; }

    ::-webkit-scrollbar { width: 2px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--edge); }

    h1, h2, h3, .serif {
      font-family: 'Cormorant Garamond', serif;
      font-weight: 300;
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes breathe {
      0%,100% { transform: scale(1); opacity: 0.5; }
      50%      { transform: scale(1.04); opacity: 0.75; }
    }
    @keyframes pulse-dot {
      0%,100% { opacity: 0.3; }
      50%      { opacity: 0.9; }
    }
    @keyframes cursor-blink {
      0%,100% { opacity: 1; }
      50%      { opacity: 0; }
    }
    @keyframes drift {
      0%   { transform: translate(0,0) rotate(0deg); }
      33%  { transform: translate(6px,-4px) rotate(0.5deg); }
      66%  { transform: translate(-4px,6px) rotate(-0.5deg); }
      100% { transform: translate(0,0) rotate(0deg); }
    }

    .fade-up { opacity: 0; }
    .fade-up.visible {
      animation: fadeUp 1.1s cubic-bezier(0.16,1,0.3,1) forwards;
    }
    .fade-in { opacity: 0; }
    .fade-in.visible {
      animation: fadeIn 1.4s ease forwards;
    }

    .d1  { animation-delay: 0ms; }
    .d2  { animation-delay: 180ms; }
    .d3  { animation-delay: 360ms; }
    .d4  { animation-delay: 540ms; }
    .d5  { animation-delay: 720ms; }
    .d6  { animation-delay: 900ms; }

    /* ── RESPONSIVE UTILITIES ── */

    /* Hide vertical text on small screens */
    @media (max-width: 768px) {
      .hide-mobile { display: none !important; }
    }

    /* Chat section grid → single column on mobile */
    .chat-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8vw;
      align-items: center;
    }
    @media (max-width: 768px) {
      .chat-grid {
        grid-template-columns: 1fr;
        gap: 40px;
      }
    }

    /* Diary section grid → single column on mobile */
    .diary-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      min-height: 100vh;
    }
    @media (max-width: 768px) {
      .diary-grid {
        grid-template-columns: 1fr;
        min-height: auto;
      }
      .diary-right {
        display: none !important;
      }
    }

    /* Privacy section grid → single column on mobile */
    .privacy-grid {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 8vw;
      align-items: start;
    }
    @media (max-width: 768px) {
      .privacy-grid {
        grid-template-columns: 1fr;
        gap: 32px;
      }
    }

    /* Privacy pillar items → single column on mobile */
    .pillar-item {
      display: grid;
      grid-template-columns: 180px 1fr;
      gap: 24px;
      align-items: start;
    }
    @media (max-width: 768px) {
      .pillar-item {
        grid-template-columns: 1fr;
        gap: 8px;
      }
    }

    /* Collage text alignment on mobile */
    @media (max-width: 768px) {
      .collage-text {
        text-align: left !important;
      }
      .collage-text-inner {
        max-width: 100% !important;
      }
    }

    /* Input placeholder color */
    input::placeholder {
      color: rgba(255,255,255,0.2);
      font-family: 'DM Sans', sans-serif;
    }
    input:focus {
      outline: none;
    }
  `}</style>
);

const navigation = [
    { name: 'Encuesta', href: '/encuesta' },
    { name: 'Términos y Condiciones', href: '/terms' },
];

const serviciosDropdown = [
    { name: 'Dinamo', href: 'https://dinamoapp.com/', external: true },
    { name: 'EVA Salud Nutricional', href: '/eva-nutricional', external: false },
    { name: 'EVA Better Job', href: '/eva-better-job', external: false },
];

// ─── Ambient orbs ─────────────────────────────────────────────────────────────
const Orb = ({ style }) => (
    <div style={{
        position: "absolute", borderRadius: "50%",
        filter: "blur(90px)", pointerEvents: "none",
        animation: "drift 18s infinite ease-in-out",
        ...style
    }} />
);

// ─── HEADER ───────────────────────────────────────────────────────────────────
const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [serviciosOpen, setServiciosOpen] = useState(false);
    const closeTimeout = useRef();

    const handleServiciosEnter = () => {
        if (closeTimeout.current) clearTimeout(closeTimeout.current);
        setServiciosOpen(true);
    };
    const handleServiciosLeave = () => {
        closeTimeout.current = setTimeout(() => setServiciosOpen(false), 150);
    };

    return (
        <header style={{ position: "absolute", insetInline: "30px", top: 12, zIndex: 10 }}>
            <nav aria-label="Global" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", flex: 1 }}>
                    <Link to="/">
                        <span className="sr-only">EVA Salud Mental</span>
                        <img alt="" src="img/logo-umbra.png" style={{ height: 80, width: "auto" }} />
                    </Link>
                </div>

                {/* Hamburger — mobile only */}
                <div style={{ display: "flex" }} className="lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        style={{
                            margin: "-10px",
                            display: "inline-flex", alignItems: "center", justifyContent: "center",
                            borderRadius: 6, padding: 10,
                            background: "none", border: "none", cursor: "pointer",
                            color: "rgba(255,255,255,0.7)"
                        }}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" style={{ width: 24, height: 24 }} />
                    </button>
                </div>

                {/* Desktop nav */}
                <div className="hidden lg:flex" style={{ gap: 48 }}>
                    <div
                        style={{ position: "relative" }}
                        onMouseEnter={handleServiciosEnter}
                        onMouseLeave={handleServiciosLeave}
                    >
                        <button
                            style={{
                                borderBottom: "4px solid transparent",
                                padding: "0 20px",
                                borderRadius: 6,
                                fontSize: 14,
                                lineHeight: "1.5rem",
                                fontWeight: 600,
                                color: "rgba(255,255,255,0.7)",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                display: "flex", alignItems: "center", gap: 4
                            }}
                            onClick={() => setServiciosOpen(o => !o)}
                            type="button"
                        >
                            Servicios
                            <svg style={{ width: 16, height: 16, marginLeft: 4 }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {serviciosOpen && (
                            <div
                                style={{
                                    position: "absolute", left: 0, marginTop: 8,
                                    width: 224, borderRadius: 6,
                                    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                                    background: "white",
                                    border: "1px solid rgba(0,0,0,0.05)",
                                    zIndex: 50
                                }}
                                onMouseEnter={handleServiciosEnter}
                                onMouseLeave={handleServiciosLeave}
                            >
                                <div style={{ padding: "4px 0" }}>
                                    {serviciosDropdown.map((item) =>
                                        item.external ? (
                                            <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer"
                                                style={{ display: "block", padding: "8px 16px", fontSize: 14, color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>
                                                {item.name}
                                            </a>
                                        ) : (
                                            <Link key={item.name} to={item.href}
                                                style={{ display: "block", padding: "8px 16px", fontSize: 14, color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>
                                                {item.name}
                                            </Link>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    {navigation.map((item) => (
                        <Link key={item.name} to={item.href}
                            style={{
                                padding: "0 20px", borderRadius: 6,
                                fontSize: 14, lineHeight: "1.5rem",
                                fontWeight: 600, color: "rgba(255,255,255,0.7)",
                                textDecoration: "none",
                                borderBottom: "4px solid transparent"
                            }}>
                            {item.name}
                        </Link>
                    ))}
                </div>
            </nav>

            {/* Mobile menu */}
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div style={{ position: "fixed", inset: 0, zIndex: 50 }} />
                <DialogPanel style={{
                    position: "fixed", insetBlock: 0, right: 0, zIndex: 50,
                    width: "100%", overflowY: "auto",
                    background: "white", padding: "24px",
                    maxWidth: 384
                }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Link to="/" style={{ padding: "6px" }}>
                            <span className="sr-only">EVA</span>
                            <img alt="" src="img/logo1.png" style={{ height: 100, width: "auto" }} />
                        </Link>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            style={{
                                margin: "-10px", borderRadius: 6, padding: 10,
                                background: "none", border: "none", cursor: "pointer", color: "#374151"
                            }}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" style={{ width: 24, height: 24 }} />
                        </button>
                    </div>
                    <div style={{ marginTop: 24 }}>
                        <div style={{ borderTop: "1px solid rgba(107,114,128,0.1)", paddingTop: 24 }}>
                            <div style={{ marginBottom: 8 }}>
                                <span style={{ display: "block", padding: "8px 12px", fontSize: 18, fontWeight: 600, color: "#111827" }}>
                                    Servicios
                                </span>
                                <div style={{ paddingLeft: 16 }}>
                                    {serviciosDropdown.map((item) =>
                                        item.external ? (
                                            <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer"
                                                style={{ display: "block", padding: "8px 12px", fontSize: 18, color: "#023d6d", textDecoration: "none" }}
                                                onClick={() => setMobileMenuOpen(false)}>
                                                {item.name}
                                            </a>
                                        ) : (
                                            <Link key={item.name} to={item.href}
                                                style={{ display: "block", padding: "8px 12px", fontSize: 18, color: "#023d6d", textDecoration: "none" }}
                                                onClick={() => setMobileMenuOpen(false)}>
                                                {item.name}
                                            </Link>
                                        )
                                    )}
                                </div>
                            </div>
                            {navigation.map((item) => (
                                <Link key={item.name} to={item.href}
                                    style={{
                                        display: "block", margin: "0 -12px",
                                        borderRadius: 8, padding: "8px 12px",
                                        fontSize: 18, fontWeight: 600, color: "#111827",
                                        textDecoration: "none"
                                    }}
                                    onClick={() => setMobileMenuOpen(false)}>
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    );
};

// ─── 1. HERO ──────────────────────────────────────────────────────────────────
const Hero = () => {
    const [phase, setPhase] = useState(0);

    useEffect(() => {
        const t1 = setTimeout(() => setPhase(1), 900);
        const t2 = setTimeout(() => setPhase(2), 2100);
        const t3 = setTimeout(() => setPhase(3), 3600);
        return () => [t1, t2, t3].forEach(clearTimeout);
    }, []);

    const scrollDown = () => {
        document.getElementById("what")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section style={{
            minHeight: "100vh", width: "100vw", display: "flex", alignItems: "center",
            paddingTop: "clamp(120px, 20vw, 200px)",
            position: "relative", overflow: "hidden",
            background: "linear-gradient(180deg, #060709 0%, #0a0c10 60%, #0c0f16 100%)"
        }}>
            <Orb style={{ width: "min(600px, 80vw)", height: "min(600px, 80vw)", top: "-15%", left: "-10%", background: "rgba(60,70,120,0.08)" }} />
            <Orb style={{ width: "min(400px, 60vw)", height: "min(400px, 60vw)", bottom: "-5%", right: "5%", background: "rgba(80,60,120,0.06)", animationDelay: "6s" }} />

            <div style={{
                width: "100%", maxWidth: 1100,
                margin: "0 auto",
                padding: "0 clamp(20px, 6vw, 80px)",
                position: "relative", zIndex: 1
            }}>
                {/* Tiny label top-left */}
                <div style={{
                    position: "absolute", top: "-10vh", left: "clamp(20px, 6vw, 80px)",
                    fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase",
                    color: "var(--text-dim)",
                    opacity: phase >= 1 ? 1 : 0,
                    transition: "opacity 2s ease 0.3s"
                }}>
                    EVA · Ecosistema de acompañamiento
                </div>

                {/* Main mark */}
                <div style={{
                    opacity: phase >= 1 ? 1 : 0,
                    transform: phase >= 1 ? "translateY(0)" : "translateY(30px)",
                    transition: "all 1.6s cubic-bezier(0.16,1,0.3,1)"
                }}>
                    <div style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "clamp(72px, 20vw, 200px)",
                        fontWeight: 300,
                        lineHeight: 0.88,
                        color: "rgba(255,255,255,0.88)",
                        letterSpacing: "-0.02em",
                        userSelect: "none"
                    }}>
                        UMBRA
                    </div>
                </div>

                {/* Subtle rule */}
                <div style={{
                    width: phase >= 2 ? 80 : 0,
                    height: 1,
                    background: "var(--accent)",
                    margin: "clamp(20px, 4vw, 32px) 0 clamp(16px, 3.5vw, 28px)",
                    transition: "width 1.4s cubic-bezier(0.16,1,0.3,1) 0.2s"
                }} />

                {/* Tagline */}
                <div style={{
                    maxWidth: 360,
                    opacity: phase >= 2 ? 1 : 0,
                    transform: phase >= 2 ? "translateY(0)" : "translateY(16px)",
                    transition: "all 1.4s cubic-bezier(0.16,1,0.3,1) 0.1s"
                }}>
                    <p style={{
                        fontSize: "clamp(17px, 2.5vw, 20px)",
                        fontWeight: 200,
                        color: "var(--text-mid)",
                        lineHeight: 1.7,
                        fontFamily: "'Cormorant Garamond', serif",
                        fontStyle: "italic"
                    }}>
                        Un espacio donde puedes<br />pensar en voz alta.
                    </p>
                </div>

                {/* CTA */}
                <button
                    onClick={scrollDown}
                    style={{
                        marginTop: "clamp(36px, 7vw, 56px)",
                        background: "none", border: "none", padding: 0,
                        display: "flex", alignItems: "center", gap: 14,
                        opacity: phase >= 3 ? 1 : 0,
                        transform: phase >= 3 ? "translateY(0)" : "translateY(12px)",
                        transition: "all 1.2s cubic-bezier(0.16,1,0.3,1)",
                        cursor: "pointer",
                        color: "var(--text-dim)",
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = "var(--text-bright)"}
                    onMouseLeave={e => e.currentTarget.style.color = "var(--text-dim)"}
                >
                    <span style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", transition: "color 0.4s" }}>
                        Entrar
                    </span>
                    <svg width="28" height="1" viewBox="0 0 28 1"><line x1="0" y1="0.5" x2="28" y2="0.5" stroke="currentColor" strokeWidth="0.8" /></svg>
                    <svg width="6" height="6" viewBox="0 0 6 6">
                        <circle cx="3" cy="3" r="2.5" fill="currentColor" style={{ animation: "pulse-dot 3s infinite" }} />
                    </svg>
                </button>
            </div>

            {/* Vertical text on right — hide on mobile */}
            <div className="hide-mobile" style={{
                position: "absolute", right: "5vw", top: "50%",
                transform: "translateY(-50%) rotate(90deg)",
                fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase",
                color: "var(--text-dim)",
                opacity: phase >= 3 ? 0.4 : 0,
                transition: "opacity 2s ease 1s",
                whiteSpace: "nowrap"
            }}>
                La sombra también es un lugar seguro
            </div>

            <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: 120,
                background: "linear-gradient(transparent, #0a0c10)",
                pointerEvents: "none"
            }} />
        </section>
    );
};

// ─── 2. WHAT IS UMBRA ─────────────────────────────────────────────────────────
const WhatIsUmbra = () => {
    const [ref1, v1] = useInView();
    const [ref2, v2] = useInView();
    const [ref3, v3] = useInView();

    return (
        <section id="what" style={{
            padding: "clamp(60px, 18vh, 180px) 0",
            position: "relative",
            background: "linear-gradient(180deg, #0a0c10 0%, #0c0f18 100%)",
            overflow: "hidden"
        }}>
            <Orb style={{ width: 500, height: 300, top: "30%", right: "-15%", background: "rgba(60,80,140,0.07)", animationDelay: "3s" }} />

            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(20px, 6vw, 80px)" }}>

                {/* Fragment 1 */}
                <div ref={ref1} style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "clamp(16px, 4vw, 60px)",
                    marginBottom: "clamp(48px, 14vh, 140px)"
                }}>
                    <div style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "clamp(48px, 10vw, 140px)",
                        lineHeight: 1,
                        color: "rgba(255,255,255,0.04)",
                        flexShrink: 0,
                        userSelect: "none",
                        marginTop: -12
                    }}>01</div>
                    <div style={{ maxWidth: 480 }}>
                        <p className={`fade-up ${v1 ? "visible d1" : ""}`}
                            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px,3.5vw,42px)", fontWeight: 300, color: "var(--text-bright)", lineHeight: 1.4, marginBottom: 20 }}>
                            No es terapia.<br />No es coaching.
                        </p>
                        <p className={`fade-up ${v1 ? "visible d2" : ""}`}
                            style={{ fontSize: "clamp(13px, 1.8vw, 15px)", lineHeight: 1.9, color: "var(--text-mid)", fontWeight: 200 }}>
                            Es presencia. Un lugar donde puedes escribir lo que no le dirías a nadie. Donde tus pensamientos no son interrumpidos. Donde el silencio también es válido.
                        </p>
                    </div>
                </div>

                {/* Fragment 2 */}
                <div ref={ref2} style={{ display: "flex", justifyContent: "flex-end", marginBottom: "clamp(48px, 14vh, 140px)" }}>
                    <div style={{ maxWidth: 520, textAlign: "right" }}>
                        <p className={`fade-up ${v2 ? "visible d1" : ""}`}
                            style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: "clamp(18px,2.8vw,34px)",
                                fontStyle: "italic",
                                color: "rgba(140,160,210,0.7)",
                                lineHeight: 1.55,
                                marginBottom: 20
                            }}>
                            "Aquí no vienes a mejorar.<br />Vienes a estar."
                        </p>
                        <p className={`fade-up ${v2 ? "visible d2" : ""}`}
                            style={{ fontSize: "clamp(13px, 1.6vw, 14px)", lineHeight: 1.9, color: "var(--text-dim)", fontWeight: 200, maxWidth: 360, marginLeft: "auto" }}>
                            UMBRA es una experiencia de acompañamiento personal diseñada para esos momentos en los que tu mente no se detiene.
                        </p>
                    </div>
                </div>

                {/* Fragment 3 */}
                <div ref={ref3} style={{ textAlign: "center" }}>
                    <div className={`fade-in ${v3 ? "visible" : ""}`}
                        style={{ display: "inline-block", position: "relative" }}>
                        <div style={{
                            position: "absolute", inset: "-30px -50px",
                            background: "var(--accent-glow)",
                            filter: "blur(40px)", borderRadius: "50%",
                            animation: "breathe 5s infinite ease-in-out"
                        }} />
                        <p style={{
                            position: "relative",
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "clamp(12px, 1.6vw, 18px)",
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            color: "var(--text-mid)"
                        }}>
                            No todo lo que sientes necesita una respuesta inmediata.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

// ─── 3. CHATBOT ───────────────────────────────────────────────────────────────
const ChatSection = () => {
    const [ref, visible] = useInView(0.1);
    const messages = [
        { role: "bot", text: "Estoy aquí.", delay: 400 },
        { role: "user", text: "No sé por dónde empezar.", delay: 1200 },
        { role: "bot", text: "No tienes que saber. Solo empieza.", delay: 2200 },
        { role: "user", text: "Es que hay demasiado.", delay: 3200 },
        { role: "bot", text: "Lo sé. No hay prisa.\n¿Qué es lo primero que aparece?", delay: 4200 },
    ];

    const [shown, setShown] = useState(0);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        if (!visible || started) return;
        setStarted(true);
        messages.forEach((m, i) => {
            setTimeout(() => setShown(i + 1), m.delay);
        });
    }, [visible]);

    return (
        <section style={{
            minHeight: "110vh",
            background: "linear-gradient(180deg, #0c0f18 0%, #080b12 60%, #060810 100%)",
            display: "flex", alignItems: "center",
            position: "relative", overflow: "hidden",
            padding: "clamp(60px, 10vh, 0px) 0"
        }}>
            <Orb style={{ width: 700, height: 400, top: "20%", left: "-20%", background: "rgba(50,65,120,0.08)", animationDelay: "9s" }} />

            <div style={{ width: "100%", maxWidth: 1100, margin: "0 auto", padding: "0 clamp(20px, 6vw, 80px)" }}>
                <div className="chat-grid">

                    {/* Left: editorial text */}
                    <div ref={ref}>
                        <div className={`fade-up ${visible ? "visible d1" : ""}`}
                            style={{ fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 28 }}>
                            Compañero digital
                        </div>
                        <h2 className={`fade-up ${visible ? "visible d2" : ""}`}
                            style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: "clamp(32px, 5vw, 64px)",
                                fontWeight: 300, color: "var(--text-bright)",
                                lineHeight: 1.15, marginBottom: 28
                            }}>
                            Un compañero<br />que escucha.
                        </h2>
                        <p className={`fade-up ${visible ? "visible d3" : ""}`}
                            style={{ fontSize: "clamp(13px, 1.8vw, 15px)", lineHeight: 1.95, color: "var(--text-mid)", fontWeight: 200, maxWidth: 320 }}>
                            No te corrige. No te dirige. No te presiona a resolver lo que sientes. Solo está ahí, en la oscuridad contigo.
                        </p>
                        <p className={`fade-up ${visible ? "visible d4" : ""}`}
                            style={{ marginTop: 24, fontSize: "clamp(13px, 1.6vw, 14px)", lineHeight: 1.9, color: "var(--text-dim)", fontStyle: "italic", fontFamily: "'Cormorant Garamond', serif", maxWidth: 300 }}>
                            "Aquí no hay prisa."
                        </p>
                    </div>

                    {/* Right: simulated chat */}
                    <div style={{
                        background: "rgba(255,255,255,0.015)",
                        border: "1px solid rgba(255,255,255,0.045)",
                        borderRadius: 4,
                        padding: "clamp(24px, 5vw, 40px) clamp(20px, 4vw, 36px)",
                        minHeight: 320,
                        display: "flex", flexDirection: "column", justifyContent: "flex-end",
                        backdropFilter: "blur(10px)",
                        position: "relative"
                    }}>
                        <div style={{
                            position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                            width: "70%", height: 1,
                            background: "linear-gradient(90deg, transparent, rgba(120,140,200,0.2), transparent)"
                        }} />

                        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                            {messages.slice(0, shown).map((m, i) => (
                                <div key={i} style={{
                                    alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                                    maxWidth: "80%",
                                    animation: "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards",
                                    opacity: 0
                                }}>
                                    <p style={{
                                        fontSize: "clamp(13px, 1.8vw, 15px)",
                                        lineHeight: 1.7,
                                        fontWeight: 200,
                                        whiteSpace: "pre-wrap",
                                        color: m.role === "user" ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.42)",
                                        textAlign: m.role === "user" ? "right" : "left"
                                    }}>
                                        {m.text}
                                    </p>
                                </div>
                            ))}

                            {shown < messages.length && (
                                <div style={{ alignSelf: "flex-start" }}>
                                    <span style={{
                                        display: "inline-block", width: 6, height: 14,
                                        background: "rgba(120,140,200,0.5)",
                                        animation: "cursor-blink 1.2s infinite"
                                    }} />
                                </div>
                            )}
                        </div>

                        <div style={{
                            marginTop: 28, paddingTop: 18,
                            borderTop: "1px solid rgba(255,255,255,0.05)",
                            display: "flex", alignItems: "center", gap: 12
                        }}>
                            <div style={{ flex: 1, fontSize: 13, color: "rgba(255,255,255,0.15)", fontStyle: "italic" }}>
                                Escribe lo que no puedes decir en voz alta...
                            </div>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M1 7h12M7 1l6 6-6 6" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" strokeLinecap="round" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// ─── 4. DIARIO ────────────────────────────────────────────────────────────────
const DiarySection = () => {
    const [ref, visible] = useInView();
    const entries = [
        { date: "Lunes, 11:43pm", text: "No sé si lo que siento es tristeza o cansancio. O ambos. O ninguno." },
        { date: "Miércoles, 7:12am", text: "Desperté pensando en eso que dije hace tres años. Por qué el cerebro hace eso." },
        { date: "Viernes, 2:58am", text: "A veces el silencio pesa más que el ruido." },
    ];

    return (
        <section style={{
            position: "relative",
            background: "#070a10",
            overflow: "hidden"
        }}>
            <div className="diary-grid">
                {/* Left half */}
                <div style={{
                    padding: "clamp(48px, 15vh, 150px) clamp(20px, 6vw, 80px) clamp(48px, 15vh, 150px) clamp(24px, 8vw, 100px)",
                    display: "flex", flexDirection: "column", justifyContent: "center",
                    borderRight: "1px solid rgba(255,255,255,0.04)",
                    position: "relative"
                }}>
                    <Orb style={{ width: 300, height: 300, bottom: "10%", left: "-10%", background: "rgba(60,80,140,0.06)" }} />
                    <div ref={ref} style={{ position: "relative", zIndex: 1 }}>
                        <div className={`fade-up ${visible ? "visible d1" : ""}`}
                            style={{ fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 28 }}>
                            Diario emocional
                        </div>
                        <h2 className={`fade-up ${visible ? "visible d2" : ""}`}
                            style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: "clamp(28px, 4.5vw, 56px)",
                                fontWeight: 300, color: "var(--text-bright)",
                                lineHeight: 1.2, marginBottom: 28
                            }}>
                            Un mapa suave<br />de tu interior.
                        </h2>
                        <p className={`fade-up ${visible ? "visible d3" : ""}`}
                            style={{ fontSize: "clamp(13px, 1.8vw, 15px)", lineHeight: 1.95, color: "var(--text-mid)", fontWeight: 200, maxWidth: 300 }}>
                            No es un registro de productividad. Es un espacio que guarda tus pensamientos sin estructura forzada y detecta patrones emocionales con el tiempo.
                        </p>
                        <div className={`fade-up ${visible ? "visible d4" : ""}`}
                            style={{ marginTop: 44, display: "flex", flexDirection: "column", gap: 10 }}>
                            {["Guarda sin estructura forzada", "Detecta patrones con el tiempo", "Te permite releer tu proceso", "Evoluciona contigo"].map((item, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(120,140,200,0.4)", flexShrink: 0 }} />
                                    <span style={{ fontSize: 13, color: "var(--text-dim)", fontWeight: 200 }}>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right half — notebook simulation, hidden on mobile */}
                <div className="diary-right" style={{
                    background: "rgba(255,255,255,0.015)",
                    padding: "15vh 6vw",
                    display: "flex", flexDirection: "column", justifyContent: "center",
                    position: "relative",
                    overflow: "hidden"
                }}>
                    {[...Array(16)].map((_, i) => (
                        <div key={i} style={{
                            position: "absolute", left: 0, right: 0,
                            top: `${12 + i * 5.6}%`, height: 1,
                            background: "rgba(255,255,255,0.025)"
                        }} />
                    ))}

                    <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 44 }}>
                        {entries.map((e, i) => (
                            <div key={i} className={`fade-up ${visible ? `visible d${i + 2}` : ""}`}>
                                <div style={{
                                    fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase",
                                    color: "var(--text-dim)", marginBottom: 10
                                }}>
                                    {e.date}
                                </div>
                                <p style={{
                                    fontSize: "clamp(14px, 1.5vw, 17px)",
                                    fontFamily: "'Cormorant Garamond', serif",
                                    fontStyle: "italic",
                                    color: "rgba(255,255,255,0.5)",
                                    lineHeight: 1.7,
                                    fontWeight: 300
                                }}>
                                    {e.text}
                                </p>
                            </div>
                        ))}

                        <div className={`fade-in ${visible ? "visible d5" : ""}`}
                            style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{
                                display: "inline-block", width: 1, height: 18,
                                background: "rgba(120,140,200,0.4)",
                                animation: "cursor-blink 1.4s infinite 2s"
                            }} />
                            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.1)", fontStyle: "italic" }}>
                                Escribe tu próxima entrada...
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// ─── 5. COLLAGE ───────────────────────────────────────────────────────────────
const CollageSection = () => {
    const [ref, visible] = useInView(0.1);
    const fragments = [
        { w: 180, h: 220, bg: "rgba(80,60,120,0.18)", top: "8%", left: "5%", rotate: -3, delay: 0 },
        { w: 260, h: 160, bg: "rgba(40,60,100,0.22)", top: "5%", left: "25%", rotate: 1.5, delay: 120 },
        { w: 140, h: 200, bg: "rgba(60,80,60,0.14)", top: "30%", left: "12%", rotate: -1, delay: 240 },
        { w: 320, h: 200, bg: "rgba(100,60,60,0.12)", top: "20%", left: "42%", rotate: 2, delay: 180 },
        { w: 160, h: 280, bg: "rgba(60,100,120,0.16)", top: "45%", left: "28%", rotate: -2.5, delay: 300 },
        { w: 200, h: 130, bg: "rgba(80,80,40,0.14)", top: "58%", left: "52%", rotate: 1, delay: 360 },
        { w: 240, h: 180, bg: "rgba(40,60,120,0.2)", top: "65%", left: "8%", rotate: 3, delay: 420 },
        { w: 180, h: 240, bg: "rgba(100,50,80,0.16)", top: "40%", left: "65%", rotate: -1.5, delay: 480 },
    ];

    return (
        <section style={{
            minHeight: "110vh",
            background: "linear-gradient(180deg, #070a10 0%, #0a0c14 100%)",
            position: "relative",
            overflow: "hidden",
            display: "flex", alignItems: "center"
        }}>
            <div ref={ref} style={{ position: "absolute", inset: 0 }}>
                {fragments.map((f, i) => (
                    <div key={i} style={{
                        position: "absolute",
                        width: f.w, height: f.h,
                        background: f.bg,
                        top: f.top, left: f.left,
                        transform: `rotate(${f.rotate}deg) ${visible ? "translateY(0)" : "translateY(30px)"}`,
                        opacity: visible ? 1 : 0,
                        transition: `all 1.4s cubic-bezier(0.16,1,0.3,1) ${f.delay}ms`,
                        borderRadius: 2,
                        backdropFilter: "blur(1px)"
                    }} />
                ))}

                <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(135deg, transparent 30%, rgba(6,8,14,0.6) 100%)"
                }} />
            </div>

            <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 1100, margin: "0 auto", padding: "clamp(60px, 10vh, 0px) clamp(20px, 6vw, 80px)" }}>
                <div className="collage-text" style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div className="collage-text-inner" style={{ maxWidth: 360 }}>
                        <div className={`fade-up ${visible ? "visible d1" : ""}`}
                            style={{ fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 24 }}>
                            Collage emocional
                        </div>
                        <h2 className={`fade-up ${visible ? "visible d2" : ""}`}
                            style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: "clamp(26px, 4vw, 50px)",
                                fontWeight: 300, color: "var(--text-bright)",
                                lineHeight: 1.2, marginBottom: 20
                            }}>
                            Hay emociones que no se pueden explicar con palabras.
                        </h2>
                        <p className={`fade-up ${visible ? "visible d3" : ""}`}
                            style={{ fontSize: "clamp(13px, 1.8vw, 15px)", lineHeight: 1.9, color: "var(--text-mid)", fontWeight: 200 }}>
                            Un espacio creativo para combinar imágenes, colores y formas abstractas. Este espacio no busca estética. Busca autenticidad.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

// ─── 6. MINDFULNESS ───────────────────────────────────────────────────────────
const MindfulSection = () => {
    const [ref, visible] = useInView(0.2);
    const [breathPhase, setBreathPhase] = useState("inhala");
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (!visible || active) return;
        setActive(true);
    }, [visible]);

    useEffect(() => {
        if (!active) return;
        const phases = ["inhala", "sostén", "exhala", "pausa"];
        const durations = [4000, 2000, 6000, 2000];
        let idx = 0;
        const cycle = () => {
            setBreathPhase(phases[idx]);
            idx = (idx + 1) % phases.length;
            return setTimeout(cycle, durations[idx]);
        };
        const t = setTimeout(cycle, 1000);
        return () => clearTimeout(t);
    }, [active]);

    const exercises = ["Respiración guiada", "Técnica de los 5 sentidos", "Pausas conscientes", "Micro-ejercicios de regulación"];

    return (
        <section style={{
            minHeight: "100vh",
            background: "linear-gradient(180deg, #0a0c14 0%, #07090f 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative", overflow: "hidden",
            padding: "clamp(60px, 10vh, 0px) 0"
        }}>
            <Orb style={{ width: 800, height: 800, top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "rgba(60,80,130,0.04)", animationDelay: "2s" }} />

            <div ref={ref} style={{
                textAlign: "center", position: "relative", zIndex: 1,
                maxWidth: 520, padding: "0 clamp(20px, 6vw, 60px)",
                width: "100%"
            }}>
                {/* Breath circle */}
                <div className={`fade-in ${visible ? "visible" : ""}`} style={{ marginBottom: 64 }}>
                    <div style={{ position: "relative", width: 120, height: 120, margin: "0 auto" }}>
                        <div style={{
                            position: "absolute", inset: 0, borderRadius: "50%",
                            border: "1px solid rgba(120,140,200,0.15)",
                            animation: active ? `breathe ${breathPhase === "inhala" ? "4s" : breathPhase === "exhala" ? "6s" : "2s"} ease-in-out infinite` : "none"
                        }} />
                        <div style={{
                            position: "absolute", inset: 16, borderRadius: "50%",
                            border: "1px solid rgba(120,140,200,0.08)"
                        }} />
                        <div style={{
                            position: "absolute", inset: "50%", transform: "translate(-50%,-50%)",
                            width: 8, height: 8, borderRadius: "50%",
                            background: "rgba(120,140,200,0.35)",
                            animation: "pulse-dot 4s infinite ease-in-out"
                        }} />
                        <div style={{
                            position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center"
                        }}>
                            <span style={{
                                fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
                                color: "rgba(120,140,200,0.5)"
                            }}>
                                {breathPhase}
                            </span>
                        </div>
                    </div>
                </div>

                <div className={`fade-up ${visible ? "visible d2" : ""}`}
                    style={{ fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 24 }}>
                    Mindfulness
                </div>
                <h2 className={`fade-up ${visible ? "visible d3" : ""}`}
                    style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "clamp(24px, 4vw, 48px)",
                        fontWeight: 300, color: "var(--text-bright)",
                        lineHeight: 1.25, marginBottom: 24
                    }}>
                    Cuando la mente se acelera,<br />el cuerpo puede ayudarte<br />a regresar.
                </h2>
                <p className={`fade-up ${visible ? "visible d4" : ""}`}
                    style={{ fontSize: "clamp(13px, 1.6vw, 14px)", lineHeight: 2, color: "var(--text-dim)", fontWeight: 200, marginBottom: 44 }}>
                    Sin música invasiva. Sin narradores motivacionales. Solo indicaciones suaves.
                </p>

                <div className={`fade-up ${visible ? "visible d5" : ""}`}
                    style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
                    {exercises.map((ex, i) => (
                        <div key={i} style={{
                            fontSize: 13, color: "var(--text-dim)", fontWeight: 200,
                            padding: "8px 24px",
                            border: "1px solid rgba(255,255,255,0.04)",
                            borderRadius: 40,
                            background: "rgba(255,255,255,0.015)",
                            whiteSpace: "nowrap"
                        }}>
                            {ex}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ─── 7. PRIVACIDAD ────────────────────────────────────────────────────────────
const PrivacySection = () => {
    const [ref, visible] = useInView();

    const pillars = [
        {
            label: "Anónimo por defecto",
            text: "Puedes usar UMBRA sin registrarte. Ningún perfil. Ninguna cuenta."
        },
        {
            label: "Tus pensamientos son tuyos",
            text: "No están diseñados para exhibirse. No se venden. No se analizan para publicidad."
        },
        {
            label: "Control total",
            text: "Si decides compartir tu proceso con un profesional, lo haces bajo tus términos y en tu tiempo."
        },
    ];

    return (
        <section style={{
            padding: "clamp(60px, 16vh, 160px) 0",
            background: "#06080d",
            position: "relative"
        }}>
            <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 1,
                background: "rgba(255,255,255,0.04)"
            }} />

            <div ref={ref} style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(20px, 6vw, 80px)" }}>
                <div className="privacy-grid">

                    {/* Left */}
                    <div>
                        <div className={`fade-up ${visible ? "visible d1" : ""}`}
                            style={{ fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 24 }}>
                            Privacidad real
                        </div>
                        <h2 className={`fade-up ${visible ? "visible d2" : ""}`}
                            style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: "clamp(28px, 4vw, 50px)",
                                fontWeight: 300, color: "var(--text-bright)",
                                lineHeight: 1.15
                            }}>
                            Nada se fuerza.<br />Nada se impone.
                        </h2>
                    </div>

                    {/* Right: three dense blocks */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                        {pillars.map((p, i) => (
                            <div key={i} className={`fade-up ${visible ? `visible d${i + 2}` : ""}`}
                                style={{
                                    padding: "28px 0",
                                    borderBottom: i < pillars.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                                }}>
                                <div className="pillar-item">
                                    <div style={{ fontSize: 12, color: "rgba(120,140,200,0.5)", letterSpacing: "0.05em", paddingTop: 3, marginBottom: 8 }}>
                                        {p.label}
                                    </div>
                                    <p style={{ fontSize: "clamp(13px, 1.8vw, 15px)", lineHeight: 1.85, color: "var(--text-mid)", fontWeight: 200 }}>
                                        {p.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

// ─── 8. ECOSISTEMA EVA ────────────────────────────────────────────────────────
const EcosystemSection = () => {
    const [ref, visible] = useInView();

    return (
        <section style={{
            padding: "clamp(60px, 14vh, 140px) 0",
            background: "linear-gradient(180deg, #06080d 0%, #050710 100%)",
            position: "relative", overflow: "hidden"
        }}>
            <Orb style={{ width: 500, height: 500, top: "20%", right: "-15%", background: "rgba(60,70,130,0.06)", animationDelay: "4s" }} />

            <div ref={ref} style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(20px, 6vw, 80px)" }}>
                <div style={{ maxWidth: 600 }}>
                    <div className={`fade-up ${visible ? "visible d1" : ""}`}
                        style={{ fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 28 }}>
                        Parte del ecosistema EVA
                    </div>
                    <h2 className={`fade-up ${visible ? "visible d2" : ""}`}
                        style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "clamp(24px, 3.5vw, 44px)",
                            fontWeight: 300, color: "var(--text-bright)",
                            lineHeight: 1.3, marginBottom: 28
                        }}>
                        UMBRA es el primer espacio.<br />Un lugar donde puedes construir claridad antes de dar cualquier otro paso.
                    </h2>
                    <p className={`fade-up ${visible ? "visible d3" : ""}`}
                        style={{ fontSize: "clamp(13px, 1.8vw, 15px)", lineHeight: 1.95, color: "var(--text-mid)", fontWeight: 200 }}>
                        Si algún día decides iniciar un proceso terapéutico, tu experiencia no empieza desde cero. Empieza desde lo que ya pensaste.
                    </p>
                </div>
            </div>
        </section>
    );
};

// ─── 9. CIERRE ────────────────────────────────────────────────────────────────
const ClosingSection = () => {
    const [ref, visible] = useInView(0.1);
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);

    return (
        <section style={{
            minHeight: "100vh",
            background: "linear-gradient(180deg, #050710 0%, #030507 40%, #010203 100%)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            position: "relative", overflow: "hidden",
            padding: "clamp(60px, 10vh, 0px) 0"
        }}>
            <Orb style={{ width: 600, height: 600, top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "rgba(40,50,100,0.05)", animationDelay: "0s" }} />

            <div ref={ref} style={{
                position: "relative", zIndex: 1,
                textAlign: "center",
                maxWidth: 480,
                padding: "0 clamp(20px, 6vw, 60px)",
                width: "100%",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 0
            }}>
                <div className={`fade-in ${visible ? "visible d1" : ""}`}>
                    <img
                        src="/img/logo-umbra.png"
                        alt="Umbra Logo"
                        style={{
                           width: "100%",
                            maxWidth: 110,   // opcional para control fino
                            height: "auto",
                            display: "block"
                        }}
                    />
                </div>

                <div className={`fade-up ${visible ? "visible d1" : ""}`}
                    style={{ fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 28 }}>
                    Próximamente
                </div>

                <h2 className={`fade-up ${visible ? "visible d2" : ""}`}
                    style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "clamp(24px, 4vw, 48px)",
                        fontWeight: 300, color: "rgba(255,255,255,0.7)",
                        lineHeight: 1.25, marginBottom: 20
                    }}>
                    Un espacio donde puedes<br />existir sin actuar.
                </h2>

                <p className={`fade-up ${visible ? "visible d3" : ""}`}
                    style={{
                        fontSize: "clamp(13px, 1.6vw, 14px)", lineHeight: 1.9, color: "var(--text-dim)",
                        fontWeight: 200, marginBottom: 52, maxWidth: 340
                    }}>
                    No te promete felicidad. No te promete transformación instantánea. Solo un espacio seguro.
                </p>

                {/* Email capture */}
                {!sent ? (
                    <div className={`fade-up ${visible ? "visible d4" : ""}`}
                        style={{ width: "100%", maxWidth: 340 }}>
                        <div style={{
                            display: "flex",
                            borderBottom: "1px solid rgba(255,255,255,0.1)",
                        }}>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Tu correo electrónico"
                                onKeyDown={e => e.key === "Enter" && email && setSent(true)}
                                style={{
                                    flex: 1, background: "none", border: "none",
                                    padding: "14px 0",
                                    fontSize: 14, fontWeight: 200,
                                    color: "rgba(255,255,255,0.6)",
                                    fontFamily: "'DM Sans', sans-serif",
                                    minWidth: 0 // important for flex shrinking on mobile
                                }}
                            />
                            <button
                                onClick={() => email && setSent(true)}
                                style={{
                                    background: "none", border: "none", padding: "0 4px",
                                    cursor: "pointer",
                                    color: email ? "rgba(120,140,200,0.6)" : "rgba(255,255,255,0.1)",
                                    transition: "color 0.4s", fontSize: 11, letterSpacing: "0.2em",
                                    textTransform: "uppercase",
                                    flexShrink: 0
                                }}>
                                →
                            </button>
                        </div>
                        <p style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 12, textAlign: "center" }}>
                            Sé el primero en entrar.
                        </p>
                    </div>
                ) : (
                    <div className="fade-in visible"
                        style={{ fontSize: 14, color: "rgba(120,140,200,0.6)", fontStyle: "italic", fontFamily: "'Cormorant Garamond', serif" }}>
                        Te avisaremos cuando UMBRA esté lista.
                    </div>
                )}

                <div className={`fade-in ${visible ? "visible d6" : ""}`}
                    style={{
                        marginTop: 80,
                        fontSize: 11, letterSpacing: "0.25em",
                        color: "rgba(255,255,255,0.1)",
                        textTransform: "uppercase"
                    }}>
                    La sombra también es un lugar seguro.
                </div>
            </div>

            <div style={{
                position: "absolute", inset: 0,
                background: "radial-gradient(ellipse at center, transparent 30%, rgba(1,2,4,0.7) 100%)",
                pointerEvents: "none"
            }} />
        </section>
    );
};

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
    return (
        <>
            <GlobalStyle />
            <Header />
            <main>
                <Hero />
                <WhatIsUmbra />
                <ChatSection />
                <DiarySection />
                <CollageSection />
                <MindfulSection />
                <PrivacySection />
                <EcosystemSection />
                <ClosingSection />
            </main>
        </>
    );
}