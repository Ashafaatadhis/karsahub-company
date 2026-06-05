import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

const SCROLL_THRESHOLD = 40;

const ease = [0.25, 0.1, 0.25, 1] as const;

const pillTransition = {
  maxWidth:        { type: "tween" as const, ease, duration: 0.45 },
  borderRadius:    { type: "tween" as const, ease, duration: 0.45 },
  backgroundColor: { type: "tween" as const, ease, duration: 0.3 },
  boxShadow:       { type: "tween" as const, ease, duration: 0.3 },
};

const wrapperTransition = {
  paddingTop:   { type: "tween" as const, ease, duration: 0.45 },
  paddingLeft:  { type: "tween" as const, ease, duration: 0.45 },
  paddingRight: { type: "tween" as const, ease, duration: 0.45 },
};

const spring = { type: "spring" as const, stiffness: 260, damping: 26, mass: 0.8 };

function getInitialTheme() {
  if (typeof window === "undefined") return "light";
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(
    () => typeof window !== "undefined" && window.scrollY > SCROLL_THRESHOLD
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    if (next === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    localStorage.setItem("theme", next);
  };

  const closeMenu = () => setMenuOpen(false);

  const handleMobileNav = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      else window.location.href = `/#${hash}`;
    }, 200);
  };

  const isDark = theme === "dark";
  const pillBg = scrolled
    ? isDark ? "rgba(22,22,30,0.88)" : "rgba(250,250,250,0.88)"
    : "rgba(0,0,0,0)";
  const pillShadow = scrolled
    ? isDark
      ? "0 0 0 1px #2A2A35, 0 4px 24px rgba(0,0,0,0.3)"
      : "0 0 0 1px #E4E4E7, 0 4px 24px rgba(0,0,0,0.07)"
    : "0 0 0 0px transparent";

  return (
    <nav
      aria-label="Navigasi utama"
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100 }}
    >
      <motion.div
        initial={false}
        animate={{ paddingTop: scrolled ? 12 : 4, paddingLeft: 16, paddingRight: 16 }}
        transition={wrapperTransition}
      >
        <motion.div
          initial={false}
          animate={{
            maxWidth: scrolled ? 780 : 2000,
            borderRadius: scrolled ? 24 : 0,
            backgroundColor: pillBg,
            boxShadow: pillShadow,
          }}
          transition={pillTransition}
          style={{ margin: "0 auto", overflow: "hidden", position: "relative" }}
        >
          <motion.div
            animate={{ opacity: scrolled ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute",
              inset: 0,
              backdropFilter: "blur(16px) saturate(180%)",
              WebkitBackdropFilter: "blur(16px) saturate(180%)",
              pointerEvents: "none",
            }}
          />

          <div className="nav-inner">
            <a href="/" className="logo">
              Karsa<span className="logo-hub">Hub</span>
            </a>

            <div className="nav-links-desktop">
              <a href="/#layanan" className="nav-link">Layanan</a>
              <a href="/#cara-kerja" className="nav-link">Cara Kerja</a>
              <a href="/#portofolio" className="nav-link">Portofolio</a>
              <a href="/#harga" className="nav-link">Harga</a>
            </div>

            {/* Theme toggle */}
            <motion.button
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              whileTap={{ scale: 0.9 }}
              className="theme-toggle"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                  <motion.span
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun size={16} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon size={16} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <a href="/#kontak" className="btn btn-nav-cta nav-cta-desktop">
              Mulai Proyek
            </a>

            <button
              className="nav-toggle"
              aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <motion.span className="toggle-bar" animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} transition={spring} />
              <motion.span className="toggle-bar" animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} transition={{ duration: 0.15 }} />
              <motion.span className="toggle-bar" animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} transition={spring} />
            </button>
          </div>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                className="nav-mobile-menu"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <a href="/#layanan" className="nav-link-mobile" onClick={e => handleMobileNav(e, "layanan")}>Layanan</a>
                <a href="/#cara-kerja" className="nav-link-mobile" onClick={e => handleMobileNav(e, "cara-kerja")}>Cara Kerja</a>
                <a href="/#portofolio" className="nav-link-mobile" onClick={e => handleMobileNav(e, "portofolio")}>Portofolio</a>
                <a href="/#harga" className="nav-link-mobile" onClick={e => handleMobileNav(e, "harga")}>Harga</a>
                <a href="/#kontak" className="nav-link-mobile nav-link-cta" onClick={e => handleMobileNav(e, "kontak")}>Mulai Proyek</a>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <style>{`
        .nav-inner {
          position: relative;
          display: flex;
          align-items: center;
          height: 64px;
          gap: 20px;
          padding: 0 24px;
        }
        .nav-links-desktop {
          display: flex;
          gap: 28px;
          flex: 1;
        }
        .nav-link {
          font-size: 14px;
          font-weight: 450;
          color: var(--color-text-secondary);
          text-decoration: none;
          transition: color 150ms;
        }
        .nav-link:hover { color: var(--color-text-primary); }
        .nav-cta-desktop { flex-shrink: 0; }

        .theme-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          border: 1px solid var(--color-border);
          background: var(--color-surface-muted);
          color: var(--color-text-secondary);
          cursor: pointer;
          flex-shrink: 0;
          transition: border-color 150ms, background 150ms;
        }
        .theme-toggle:hover {
          border-color: var(--color-border-strong);
          color: var(--color-text-primary);
        }

        .nav-toggle {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
          margin-left: auto;
          border-radius: 4px;
        }
        .toggle-bar {
          display: block;
          width: 22px;
          height: 2px;
          background: var(--color-text-primary);
          border-radius: 2px;
        }
        .nav-mobile-menu {
          position: relative;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border-top: 1px solid var(--color-border);
          padding: 8px 16px 16px;
          gap: 2px;
          background: rgba(250, 250, 250, 0.95);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        [data-theme="dark"] .nav-mobile-menu {
          background: rgba(22, 22, 30, 0.95);
        }
        .nav-link-mobile {
          font-size: 15px;
          font-weight: 450;
          color: var(--color-text-secondary);
          text-decoration: none;
          padding: 10px 8px;
          border-radius: 8px;
          transition: background 150ms, color 150ms;
        }
        .nav-link-mobile:hover {
          background: var(--color-surface-muted);
          color: var(--color-text-primary);
        }
        .nav-link-cta {
          font-weight: 600;
          color: var(--color-primary-800);
          margin-top: 4px;
        }

        @media (max-width: 768px) {
          .nav-links-desktop { display: none; }
          .nav-cta-desktop { display: none; }
          .nav-toggle { display: flex; }
        }
        @media (min-width: 769px) {
          .nav-mobile-menu { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
