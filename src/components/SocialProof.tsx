import {
  Hexagon, Triangle, Command, Gem, Cpu, Globe,
  type LucideIcon,
} from "lucide-react";

const CLIENTS: { name: string; icon: LucideIcon }[] = [
  { name: "TokoBaju.id",     icon: Gem      },
  { name: "Klinik Sehat",    icon: Hexagon  },
  { name: "Resto Nusantara", icon: Globe    },
  { name: "CV Maju Bersama", icon: Triangle },
  { name: "WarungDigital",   icon: Command  },
  { name: "PT Karya Abadi",  icon: Cpu      },
];

const doubled = [...CLIENTS, ...CLIENTS];

export default function SocialProof() {
  return (
    <section className="sp-section">
      <div className="sp-card">
        <p className="sp-label">Dipercaya oleh bisnis lokal di seluruh Indonesia</p>

        <div className="sp-marquee-wrapper">
          <div className="sp-marquee-track">
            {doubled.map((client, i) => {
              const Icon = client.icon;
              return (
                <div className="sp-item" key={i}>
                  <Icon size={15} strokeWidth={1.5} className="sp-icon" />
                  <span className="sp-name">{client.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .sp-section {
          padding: 0 24px 56px;
          background: transparent;
          position: relative;
          z-index: 1;
        }

        .sp-card {
          max-width: 860px;
          margin: 0 auto;
          padding: 32px 0 28px;
          border-radius: 20px;
          border: 1px solid var(--color-border);
          margin-top: 0;
          background: rgba(255, 255, 255, 0.55);
          backdrop-filter: blur(16px) saturate(160%);
          -webkit-backdrop-filter: blur(16px) saturate(160%);
          box-shadow: 0 2px 24px rgba(0,0,0,0.05), 0 0 0 1px rgba(255,255,255,0.6) inset;
          overflow: hidden;
        }

        [data-theme="dark"] .sp-card {
          background: rgba(22, 22, 30, 0.6);
          border-color: var(--color-border);
          box-shadow: 0 2px 24px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05) inset;
        }

        .sp-label {
          text-align: center;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          color: var(--color-text-muted);
          margin-bottom: 20px;
          padding: 0 24px;
        }

        .sp-marquee-wrapper {
          overflow: hidden;
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }

        .sp-marquee-track {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          align-items: center;
          gap: 10px;
          width: max-content;
          padding: 4px 0;
          animation: sp-marquee 30s linear infinite;
        }

        .sp-marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes sp-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .sp-item {
          display: inline-flex;
          flex-shrink: 0;
          align-items: center;
          gap: 7px;
          padding: 7px 16px;
          border-radius: 999px;
          border: 1px solid var(--color-border);
          background: var(--color-surface);
          white-space: nowrap;
          cursor: default;
          transition: border-color 200ms, background 200ms, transform 200ms;
        }

        [data-theme="dark"] .sp-item {
          background: var(--color-surface-muted);
        }

        .sp-item:hover {
          border-color: var(--color-primary-100);
          background: var(--color-primary-50);
          transform: translateY(-1px);
        }

        [data-theme="dark"] .sp-item:hover {
          border-color: var(--color-primary-100);
          background: var(--color-primary-50);
        }

        .sp-icon {
          color: var(--color-primary-800);
          flex-shrink: 0;
        }

        .sp-name {
          font-size: 13px;
          font-weight: 600;
          color: var(--color-text-secondary);
          letter-spacing: -0.01em;
          transition: color 200ms;
        }

        .sp-item:hover .sp-name {
          color: var(--color-text-primary);
        }
      `}</style>
    </section>
  );
}
