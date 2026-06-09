const PAYLOAD_URL = import.meta.env.PAYLOAD_URL || "http://localhost:3000";

export interface PayloadPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  date: string;
  cover?: {
    url: string;
    alt?: string;
    width?: number;
    height?: number;
  } | null;
  content: LexicalRoot;
}

interface LexicalNode {
  type?: string;
  text?: string;
  format?: number | string;
  children?: LexicalNode[];
  tag?: string;
  listType?: string;
  url?: string;
  fields?: { url?: string; newTab?: boolean };
  value?: { url?: string; alt?: string };
  [key: string]: unknown;
}

interface LexicalRoot {
  root?: { children?: LexicalNode[] };
}

// Format flags for Lexical text nodes
const FORMAT_BOLD = 1;
const FORMAT_ITALIC = 2;
const FORMAT_STRIKETHROUGH = 8;
const FORMAT_UNDERLINE = 4;
const FORMAT_CODE = 16;

function getTextFormatTags(format: number): [string, string] {
  let open = "";
  let close = "";
  if (format & FORMAT_BOLD) { open += "<strong>"; close = "</strong>" + close; }
  if (format & FORMAT_ITALIC) { open += "<em>"; close = "</em>" + close; }
  if (FORMAT_UNDERLINE & format) { open += "<u>"; close = "</u>" + close; }
  if (FORMAT_STRIKETHROUGH & format) { open += "<s>"; close = "</s>" + close; }
  if (FORMAT_CODE & format) { open += "<code>"; close = "</code>" + close; }
  return [open, close];
}

function renderTextNode(node: LexicalNode): string {
  let text = node.text || "";
  if (text === "\n") return "<br>";
  const format = typeof node.format === "number" ? node.format : 0;
  if (format === 0) return escapeHtml(text);
  const [open, close] = getTextFormatTags(format);
  return open + escapeHtml(text) + close;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderChildren(children: LexicalNode[]): string {
  return children.map(renderNode).join("");
}

function renderNode(node: LexicalNode): string {
  const type = node.type;

  if (type === "text") {
    return renderTextNode(node);
  }

  if (type === "linebreak") {
    return "<br>";
  }

  if (type === "paragraph") {
    return `<p>${renderChildren(node.children || [])}</p>`;
  }

  if (type === "heading") {
    const tag = node.tag || "h2";
    return `<${tag}>${renderChildren(node.children || [])}</${tag}>`;
  }

  if (type === "list") {
    const tag = node.listType === "number" ? "ol" : "ul";
    return `<${tag}>${renderChildren(node.children || [])}</${tag}>`;
  }

  if (type === "listitem") {
    return `<li>${renderChildren(node.children || [])}</li>`;
  }

  if (type === "quote") {
    return `<blockquote>${renderChildren(node.children || [])}</blockquote>`;
  }

  if (type === "link") {
    const url = node.fields?.url || node.url || "#";
    const newTab = node.fields?.newTab;
    const target = newTab ? ' target="_blank" rel="noopener noreferrer"' : "";
    return `<a href="${escapeHtml(url)}"${target}>${renderChildren(node.children || [])}</a>`;
  }

  if (type === "horizontalrule") {
    return "<hr>";
  }

  if (type === "upload" && node.value) {
    const url = getMediaUrl(node.value.url) || "";
    const alt = node.value.alt || "";
    return `<figure><img src="${escapeHtml(url)}" alt="${escapeHtml(alt)}" loading="lazy"></figure>`;
  }

  // Fallback: render children if any
  if (node.children) {
    return renderChildren(node.children);
  }

  return "";
}

/** Convert Payload Lexical JSON to HTML */
export function lexicalToHtml(content: LexicalRoot): string {
  if (!content?.root?.children) return "";
  return renderChildren(content.root.children);
}

/** Get full media URL from Payload */
export function getMediaUrl(url?: string | null): string | null {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${PAYLOAD_URL}${url}`;
}

/** Fetch all published blog posts from Payload */
export async function fetchPosts(): Promise<PayloadPost[]> {
  const res = await fetch(
    `${PAYLOAD_URL}/api/blog?where[_status][equals]=published&sort=-date&limit=100&depth=1`
  );
  if (!res.ok) throw new Error(`Payload API error: ${res.status}`);
  const data = await res.json();
  return data.docs;
}

/** Fetch a single blog post by slug */
export async function fetchPostBySlug(slug: string): Promise<PayloadPost | null> {
  const res = await fetch(
    `${PAYLOAD_URL}/api/blog?where[slug][equals]=${slug}&where[_status][equals]=published&limit=1&depth=1`
  );
  if (!res.ok) throw new Error(`Payload API error: ${res.status}`);
  const data = await res.json();
  return data.docs[0] || null;
}
