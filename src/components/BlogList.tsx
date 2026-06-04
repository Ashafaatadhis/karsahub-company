import { useState, useMemo } from "react";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
}

const POSTS_PER_PAGE = 6;

const categoryColors: Record<string, { bg: string; text: string }> = {
  Website: { bg: "var(--color-primary-100)", text: "var(--color-primary-800)" },
  Otomasi: { bg: "var(--color-accent-200)", text: "var(--color-accent-600)" },
  AI:      { bg: "var(--color-primary-100)", text: "var(--color-primary-800)" },
};

function Pagination({
  total, current, onChange,
}: { total: number; current: number; onChange: (p: number) => void }) {
  if (total <= 1) return null;

  const pages: (number | "...")[] = [];
  const delta = 2;

  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const left = current - delta;
  const right = current + delta;

  if (left > 2) {
    pages.push(1, "...");
  } else {
    pages.push(...range(1, Math.min(2, total)));
  }

  pages.push(...range(Math.max(3, left), Math.min(total - 2, right))
    .filter(p => p > 2 && p < total - 1));

  if (right < total - 1) {
    pages.push("...", total);
  } else {
    const tail = range(Math.max(total - 1, 3), total);
    tail.forEach(p => { if (!pages.includes(p)) pages.push(p); });
  }

  const unique = [...new Set(pages)];

  return (
    <div className="pagination">
      <button className="pg-btn" onClick={() => onChange(1)} disabled={current === 1} aria-label="Pertama">
        &laquo;
      </button>
      <button className="pg-btn" onClick={() => onChange(current - 1)} disabled={current === 1} aria-label="Sebelumnya">
        &lsaquo;
      </button>

      {unique.map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="pg-ellipsis">...</span>
        ) : (
          <button
            key={p}
            className={`pg-btn ${p === current ? "pg-active" : ""}`}
            onClick={() => onChange(p as number)}
          >
            {p}
          </button>
        )
      )}

      <button className="pg-btn" onClick={() => onChange(current + 1)} disabled={current === total} aria-label="Berikutnya">
        &rsaquo;
      </button>
      <button className="pg-btn" onClick={() => onChange(total)} disabled={current === total} aria-label="Terakhir">
        &raquo;
      </button>

      <style>{`
        .pagination {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          margin-top: 48px;
          flex-wrap: wrap;
        }
        .pg-btn {
          min-width: 36px;
          height: 36px;
          padding: 0 8px;
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border);
          background: var(--color-surface);
          color: var(--color-text-secondary);
          font-size: 14px;
          font-family: var(--font-sans);
          cursor: pointer;
          transition: background 150ms, border-color 150ms, color 150ms;
        }
        .pg-btn:hover:not(:disabled) {
          border-color: var(--color-primary-800);
          color: var(--color-primary-800);
          background: var(--color-primary-50);
        }
        .pg-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .pg-active {
          background: var(--color-primary-800) !important;
          border-color: var(--color-primary-800) !important;
          color: #fff !important;
        }
        .pg-ellipsis {
          min-width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text-muted);
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}

export default function BlogList({ posts, categories }: { posts: Post[]; categories: string[] }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = posts;
    if (activeCategory !== "Semua") {
      result = result.filter(p => p.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)
      );
    }
    return result;
  }, [posts, activeCategory, search]);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  const handleSearch = (v: string) => { setSearch(v); setPage(1); };
  const handleCategory = (c: string) => { setActiveCategory(c); setPage(1); };

  return (
    <div>
      {/* Search + Filter */}
      <div className="bl-controls">
        <div className="bl-search-wrap">
          <svg className="bl-search-icon" width="16" height="16" fill="none"
            stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            className="bl-search"
            type="text"
            placeholder="Cari artikel..."
            value={search}
            onChange={e => handleSearch(e.target.value)}
          />
          {search && (
            <button className="bl-search-clear" onClick={() => handleSearch("")}>
              &times;
            </button>
          )}
        </div>

        <div className="bl-filters">
          {["Semua", ...categories].map(cat => (
            <button
              key={cat}
              className={`bl-filter ${activeCategory === cat ? "bl-filter-active" : ""}`}
              onClick={() => handleCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results info */}
      {search || activeCategory !== "Semua" ? (
        <p className="bl-info">
          {filtered.length} artikel ditemukan
          {activeCategory !== "Semua" && ` dalam ${activeCategory}`}
          {search && ` untuk "${search}"`}
        </p>
      ) : null}

      {/* Grid */}
      {paginated.length > 0 ? (
        <div className="bl-grid">
          {paginated.map(post => {
            const c = categoryColors[post.category];
            return (
              <a key={post.id} href={`/blog/${post.id}`} className="bl-card">
                <div className="bl-cat" style={{ background: c?.bg, color: c?.text }}>
                  {post.category}
                </div>
                <h2 className="bl-title">{post.title}</h2>
                <p className="bl-excerpt">{post.excerpt}</p>
                <div className="bl-footer">
                  <span className="bl-date">{post.date}</span>
                  <span className="bl-read">Baca selengkapnya &rarr;</span>
                </div>
              </a>
            );
          })}
        </div>
      ) : (
        <div className="bl-empty">
          <p>Tidak ada artikel yang cocok.</p>
        </div>
      )}

      <Pagination total={totalPages} current={page} onChange={p => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }} />

      <style>{`
        .bl-controls {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 32px;
        }

        .bl-search-wrap {
          position: relative;
          max-width: 480px;
        }
        .bl-search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--color-text-muted);
          pointer-events: none;
        }
        .bl-search {
          width: 100%;
          height: 44px;
          padding: 0 40px 0 40px;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          background: var(--color-surface);
          color: var(--color-text-primary);
          font-size: 14px;
          font-family: var(--font-sans);
          outline: none;
          transition: border-color 150ms, box-shadow 150ms;
        }
        .bl-search:focus {
          border-color: var(--color-primary-800);
          box-shadow: var(--shadow-focus);
        }
        .bl-search::placeholder { color: var(--color-text-muted); }
        .bl-search-clear {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--color-text-muted);
          font-size: 18px;
          cursor: pointer;
          line-height: 1;
          padding: 0;
        }

        .bl-filters {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .bl-filter {
          padding: 6px 16px;
          border-radius: var(--radius-full);
          border: 1px solid var(--color-border);
          background: var(--color-surface);
          color: var(--color-text-secondary);
          font-size: 13px;
          font-weight: 500;
          font-family: var(--font-sans);
          cursor: pointer;
          transition: background 150ms, border-color 150ms, color 150ms;
        }
        .bl-filter:hover {
          border-color: var(--color-border-strong);
          color: var(--color-text-primary);
        }
        .bl-filter-active {
          background: var(--color-primary-800) !important;
          border-color: var(--color-primary-800) !important;
          color: #fff !important;
        }

        .bl-info {
          font-size: 13px;
          color: var(--color-text-muted);
          margin-bottom: 24px;
        }

        .bl-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 900px) { .bl-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .bl-grid { grid-template-columns: 1fr; } }

        .bl-card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          text-decoration: none;
          box-shadow: var(--shadow-sm);
          transition: box-shadow 200ms, transform 200ms, border-color 200ms;
        }
        .bl-card:hover {
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
          border-color: var(--color-border-strong);
        }

        .bl-cat {
          display: inline-flex;
          align-self: flex-start;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: var(--radius-full);
        }

        .bl-title {
          font-size: 16px;
          font-weight: 600;
          color: var(--color-text-primary);
          letter-spacing: -0.01em;
          line-height: 1.4;
        }

        .bl-excerpt {
          font-size: 13px;
          color: var(--color-text-secondary);
          line-height: 1.6;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .bl-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 12px;
          border-top: 1px solid var(--color-border);
          margin-top: auto;
        }

        .bl-date { font-size: 12px; color: var(--color-text-muted); }
        .bl-read {
          font-size: 13px;
          font-weight: 500;
          color: var(--color-primary-800);
          transition: color 150ms;
        }
        .bl-card:hover .bl-read { color: var(--color-primary-600); }

        .bl-empty {
          text-align: center;
          padding: 80px 0;
          color: var(--color-text-muted);
          font-size: 15px;
        }
      `}</style>
    </div>
  );
}
