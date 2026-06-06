import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFileSync } from "fs";
import { resolve } from "path";

const fontRegular = readFileSync(resolve("node_modules/@fontsource/inter/files/inter-latin-400-normal.woff"));
const fontBold = readFileSync(resolve("node_modules/@fontsource/inter/files/inter-latin-700-normal.woff"));

const categoryColors: Record<string, string> = {
  Website: "#6366F1",
  Otomasi: "#F59E0B",
  AI: "#6366F1",
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: { slug: post.id },
    props: {
      title: post.data.title,
      excerpt: post.data.excerpt,
      category: post.data.category,
      date: post.data.date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const { title, excerpt, category, date } = props as {
    title: string;
    excerpt: string;
    category: string;
    date: string;
  };

  const accentColor = categoryColors[category] ?? "#6366F1";

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: "1200px",
          height: "630px",
          background: "#0F0F0F",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          fontFamily: "Inter",
          position: "relative",
          overflow: "hidden",
        },
        children: [
          // Grid dots background (simplified)
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                inset: 0,
                backgroundImage: `radial-gradient(circle at 80% 20%, ${accentColor}33 0%, transparent 50%), radial-gradient(circle at 20% 80%, #F59E0B22 0%, transparent 40%)`,
              },
            },
          },
          // Top: brand + category
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                zIndex: 1,
              },
              children: [
                // Logo
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      fontSize: "28px",
                      fontWeight: 700,
                      color: "#FAFAFA",
                      letterSpacing: "-0.02em",
                    },
                    children: [
                      { type: "span", props: { style: { color: "#FAFAFA" }, children: "Karsa" } },
                      { type: "span", props: { style: { color: accentColor }, children: "Hub" } },
                    ],
                  },
                },
                // Category badge
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: "13px",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: accentColor,
                      background: `${accentColor}22`,
                      border: `1px solid ${accentColor}55`,
                      padding: "6px 16px",
                      borderRadius: "999px",
                    },
                    children: category,
                  },
                },
              ],
            },
          },

          // Middle: title
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                flex: 1,
                justifyContent: "center",
                zIndex: 1,
              },
              children: [
                {
                  type: "h1",
                  props: {
                    style: {
                      fontSize: title.length > 60 ? "40px" : "52px",
                      fontWeight: 700,
                      color: "#FFFFFF",
                      lineHeight: 1.15,
                      letterSpacing: "-0.03em",
                      margin: 0,
                      maxWidth: "900px",
                    },
                    children: title,
                  },
                },
                {
                  type: "p",
                  props: {
                    style: {
                      fontSize: "20px",
                      color: "rgba(255,255,255,0.5)",
                      lineHeight: 1.5,
                      margin: 0,
                      maxWidth: "800px",
                    },
                    children: excerpt.length > 120 ? excerpt.slice(0, 120) + "..." : excerpt,
                  },
                },
              ],
            },
          },

          // Bottom: date + url
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                zIndex: 1,
                borderTop: "1px solid rgba(255,255,255,0.08)",
                paddingTop: "24px",
              },
              children: [
                {
                  type: "span",
                  props: {
                    style: { fontSize: "16px", color: "rgba(255,255,255,0.35)" },
                    children: date,
                  },
                },
                {
                  type: "span",
                  props: {
                    style: { fontSize: "16px", color: "rgba(255,255,255,0.25)" },
                    children: "karsahub.biz.id/blog",
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Inter", data: fontRegular, weight: 400, style: "normal" },
        { name: "Inter", data: fontBold, weight: 700, style: "normal" },
      ],
    },
  );

  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } });
  const png = resvg.render().asPng();

  return new Response(png, {
    headers: { "Content-Type": "image/png" },
  });
};
