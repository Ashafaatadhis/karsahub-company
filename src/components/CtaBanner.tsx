import { useState, useEffect, useRef } from "react";

export default function CtaBanner() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDark, setIsDark] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkTheme = () =>
      setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <div className="cta-fade" aria-hidden="true" />
      <section id="kontak" className="cta-section" ref={sectionRef}>
        {/* Top gradient overlay - grid fades in from top */}
        <div className="cta-top-fade" aria-hidden="true" />

        {/* SVG Grid Background */}
        <div className="cta-bg" aria-hidden="true">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1220 810"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
          >
            <g clipPath="url(#cta-clip)">
              <mask
                id="cta-mask"
                style={{ maskType: "alpha" as const }}
                maskUnits="userSpaceOnUse"
                x="10"
                y="-1"
                width="1200"
                height="812"
              >
                <rect
                  x="10"
                  y="-0.84668"
                  width="1200"
                  height="811.693"
                  fill="url(#cta-grad-mask)"
                />
              </mask>
              <g mask="url(#cta-mask)">
                {[...Array(35)].map((_, i) =>
                  [...Array(23)].map((_, j) => (
                    <rect
                      key={`${i}-${j}`}
                      x={-20.09 + i * 36}
                      y={9.2 + j * 36}
                      width="35.6"
                      height="35.6"
                      stroke={isDark ? "white" : "#111111"}
                      strokeOpacity={isDark ? 0.06 : 0.07}
                      strokeWidth="0.4"
                      strokeDasharray="2 2"
                    />
                  )),
                )}
              </g>

              {/* Mouse glow */}
              <circle
                cx={mousePos.x}
                cy={mousePos.y}
                r="140"
                fill="url(#cta-mouse-glow)"
                opacity="0.12"
                style={{
                  pointerEvents: "none",
                  transition: "cx 50ms, cy 50ms",
                }}
              />

              {/* Indigo glow shape kanan */}
              <g filter="url(#cta-blur1)">
                <path
                  d="M1447 -87V-149H1770V1249H466V894C1008 894 1447 455 1447 -87Z"
                  fill="url(#cta-grad1)"
                  opacity="0.4"
                />
              </g>
              <g filter="url(#cta-blur2)">
                <path
                  d="M1383 -151V-213H1706V1185H402V830C944 830 1383 391 1383 -151Z"
                  fill="url(#cta-grad2)"
                  fillOpacity="0.25"
                />
              </g>

              <defs>
                <radialGradient id="cta-mouse-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#6366F1" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
                <filter
                  id="cta-blur1"
                  x="147"
                  y="-468"
                  width="1942"
                  height="2036"
                  filterUnits="userSpaceOnUse"
                >
                  <feGaussianBlur stdDeviation="159" />
                </filter>
                <filter
                  id="cta-blur2"
                  x="-554"
                  y="-1170"
                  width="3217"
                  height="3311"
                  filterUnits="userSpaceOnUse"
                >
                  <feGaussianBlur stdDeviation="478" />
                </filter>
                <linearGradient
                  id="cta-grad-mask"
                  x1="35"
                  y1="23"
                  x2="904"
                  y2="632"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" stopOpacity="0" />
                  <stop offset="1" stopColor="white" />
                </linearGradient>
                <linearGradient
                  id="cta-grad1"
                  x1="1118"
                  y1="-149"
                  x2="1118"
                  y2="1249"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#6366F1" />
                  <stop offset="0.58" stopColor="#3730A3" stopOpacity="0.8" />
                  <stop offset="1" stopColor="#1E1B4B" />
                </linearGradient>
                <linearGradient
                  id="cta-grad2"
                  x1="1054"
                  y1="-213"
                  x2="1054"
                  y2="1185"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#818CF8" />
                  <stop offset="0.58" stopColor="#4F46E5" stopOpacity="0.6" />
                  <stop offset="1" stopColor="#1E1B4B" />
                </linearGradient>
                <clipPath id="cta-clip">
                  <rect width="1220" height="810" fill="white" />
                </clipPath>
              </defs>
            </g>
          </svg>
        </div>

        {/* Content */}
        <div className="cta-content">
          <div className="cta-badge">
            <span className="cta-badge-dot"></span>
            Konsultasi Gratis
          </div>

          <h2 className="cta-title">
            Siap Wujudkan
            <br />
            <span className="cta-title-accent">Karsa Digital Anda?</span>
          </h2>

          <p className="cta-sub">
            Ceritakan kebutuhan bisnis Anda. Kami dengarkan, analisis,
            <br />
            dan berikan solusi terbaik - tanpa tekanan, tanpa komitmen.
          </p>

          <div className="cta-actions">
            <a
              href="https://wa.me/6281214768087?text=Halo%20KarsaHub%2C%20saya%20ingin%20konsultasi%20gratis"
              className="btn btn-accent btn-lg"
              target="_blank"
              rel="noopener"
            >
              <svg
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 24 24"
                style={{ marginRight: 6 }}
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.845L.057 23.5l5.816-1.525A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.817 9.817 0 01-5.003-1.371l-.36-.213-3.45.905.921-3.36-.234-.375A9.818 9.818 0 012.18 12C2.18 6.58 6.58 2.18 12 2.18c5.42 0 9.82 4.4 9.82 9.82 0 5.42-4.4 9.818-9.82 9.818z" />
              </svg>
              Chat WhatsApp
            </a>
            <a
              href="mailto:hello@karsahub.id"
              className={`btn btn-lg ${isDark ? "btn-ghost-light" : "btn-secondary"}`}
            >
              Kirim Email
            </a>
          </div>

          <div className="cta-stats">
            <div className="cta-stat">
              <span className="cta-stat-num">40+</span>
              <span className="cta-stat-label">Proyek Selesai</span>
            </div>
            <div className="cta-stat-divider" />
            <div className="cta-stat">
              <span className="cta-stat-num">Rp 200rb</span>
              <span className="cta-stat-label">Mulai Dari</span>
            </div>
            <div className="cta-stat-divider" />
            <div className="cta-stat">
              <span className="cta-stat-num">Gratis</span>
              <span className="cta-stat-label">Konsultasi Awal</span>
            </div>
          </div>
        </div>

        <style>{`
          .cta-fade {
            height: 160px;
            background: linear-gradient(to bottom, var(--color-bg), var(--color-bg));
          }

          [data-theme="dark"] .cta-fade {
            background: linear-gradient(to bottom, var(--color-bg), #0F0F0F);
          }

          .cta-section {
            position: relative;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--color-bg);
            overflow: hidden;
          }

          [data-theme="dark"] .cta-section {
            background: #0F0F0F;
          }

          .cta-top-fade {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 280px;
            background: linear-gradient(to bottom, var(--color-bg) 0%, transparent 100%);
            z-index: 1;
            pointer-events: none;
          }

          [data-theme="dark"] .cta-top-fade {
            background: linear-gradient(to bottom, #0F0F0F 0%, transparent 100%);
          }

          .cta-bg {
            position: absolute;
            inset: 0;
            z-index: 0;
          }

          .cta-content {
            position: relative;
            z-index: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 24px;
            padding: 80px 24px;
            max-width: 680px;
          }

          .cta-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            color: var(--color-primary-600);
            background: rgba(99,102,241,0.1);
            border: 1px solid rgba(99,102,241,0.25);
            padding: 6px 14px;
            border-radius: 999px;
          }

          .cta-badge-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: var(--color-primary-600);
            animation: pulse-dot 2s infinite;
          }

          .cta-title {
            font-size: clamp(36px, 6vw, 56px);
            font-weight: 700;
            letter-spacing: -0.03em;
            line-height: 1.1;
            color: var(--color-text-primary);
          }

          [data-theme="dark"] .cta-title { color: #fff; }

          .cta-title-accent {
            background: linear-gradient(135deg, #818CF8 0%, #6366F1 50%, #F59E0B 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .cta-sub {
            font-size: 17px;
            color: var(--color-text-secondary);
            line-height: 1.7;
          }

          [data-theme="dark"] .cta-sub { color: rgba(255,255,255,0.5); }

          .cta-actions {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
            justify-content: center;
          }

          .cta-stats {
            display: flex;
            align-items: center;
            gap: 32px;
            padding-top: 16px;
            margin-top: 8px;
            border-top: 1px solid var(--color-border);
            flex-wrap: wrap;
            justify-content: center;
          }

          [data-theme="dark"] .cta-stats { border-top-color: rgba(255,255,255,0.08); }

          .cta-stat { text-align: center; }

          .cta-stat-num {
            display: block;
            font-size: 20px;
            font-weight: 700;
            letter-spacing: -0.02em;
            color: var(--color-text-primary);
          }

          [data-theme="dark"] .cta-stat-num { color: #fff; }

          .cta-stat-label {
            display: block;
            font-size: 12px;
            color: var(--color-text-muted);
            margin-top: 2px;
          }

          [data-theme="dark"] .cta-stat-label { color: rgba(255,255,255,0.35); }

          .cta-stat-divider {
            width: 1px;
            height: 36px;
            background: var(--color-border);
          }

          [data-theme="dark"] .cta-stat-divider { background: rgba(255,255,255,0.1); }

          @media (max-width: 480px) {
            .cta-stat-divider { display: none; }
          }
        `}</style>
      </section>
    </>
  );
}
