import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const faqs = [
  {
    q: "Berapa lama waktu pengerjaan?",
    a: "Tergantung kompleksitas. Landing page statis bisa selesai 1-3 hari. Website UMKM lengkap biasanya 1-2 minggu. Otomasi n8n dan integrasi AI bervariasi tergantung jumlah alur yang dibangun.",
  },
  {
    q: "Apakah saya perlu pengetahuan teknis?",
    a: "Tidak sama sekali. Kami handle semua hal teknis dari awal sampai selesai. Anda cukup ceritakan kebutuhan bisnis, sisanya kami yang urus.",
  },
  {
    q: "Bagaimana kalau ada bug setelah selesai?",
    a: "Semua proyek kami sertakan garansi perbaikan bug setelah serah terima. Untuk bug yang bukan karena perubahan konten dari klien, kami perbaiki gratis.",
  },
  {
    q: "Bisa request revisi?",
    a: "Bisa. Setiap proyek sudah termasuk sesi revisi. Jumlah revisi tergantung paket yang dipilih, dan selalu kami diskusikan di awal sebelum pengerjaan.",
  },
  {
    q: "Apa bedanya n8n dengan cara manual?",
    a: "Dengan n8n, tugas-tugas repetitif seperti kirim notifikasi, catat order, atau sinkronisasi data berjalan otomatis 24 jam tanpa perlu ada yang mengoperasikan. Hemat waktu dan mengurangi human error.",
  },
  {
    q: "Apakah bisa request fitur di luar daftar layanan?",
    a: "Tentu. Kami terbuka untuk berbagai kebutuhan custom. Ceritakan saja apa yang Anda butuhkan dan kami akan diskusikan apakah bisa dibangun dan berapa estimasinya.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (i: number) => setOpen(open === i ? null : i);

  return (
    <div className="faq-list">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={`faq-item ${isOpen ? "faq-item-open" : ""}`}>
            <button
              className="faq-q"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
            >
              <span>{faq.q}</span>
              <motion.span
                className="faq-icon"
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                aria-hidden="true"
              >
                <svg width="16" height="16" fill="none" stroke="currentColor"
                  strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="faq-a">
                    <p>{faq.a}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      <style>{`
        .faq-list {
          max-width: 720px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
        }

        .faq-item {
          background: var(--color-surface);
          border-bottom: 1px solid var(--color-border);
        }
        .faq-item:last-child { border-bottom: none; }

        .faq-q {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 20px 24px;
          font-size: 15px;
          font-weight: 500;
          color: var(--color-text-primary);
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          font-family: var(--font-sans);
          transition: background 150ms, color 150ms;
        }
        .faq-q:hover { background: var(--color-surface-muted); }

        .faq-item-open .faq-q {
          color: var(--color-primary-800);
          background: var(--color-primary-50);
        }

        .faq-icon {
          color: var(--color-text-muted);
          flex-shrink: 0;
          display: flex;
        }

        .faq-item-open .faq-icon {
          color: var(--color-primary-800);
        }

        .faq-a {
          padding: 0 24px 20px;
          background: var(--color-primary-50);
        }

        .faq-a p {
          font-size: 14px;
          color: var(--color-text-secondary);
          line-height: 1.7;
          border-top: 1px solid var(--color-border);
          padding-top: 16px;
        }
      `}</style>
    </div>
  );
}
