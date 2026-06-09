import type { APIRoute, GetStaticPaths } from "astro";
import { fetchPosts } from "../../utils/payload";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFileSync } from "fs";
import { resolve } from "path";

const fontRegular = readFileSync(resolve("node_modules/@fontsource/inter/files/inter-latin-400-normal.woff"));
const fontBold = readFileSync(resolve("node_modules/@fontsource/inter/files/inter-latin-700-normal.woff"));

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await fetchPosts();
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: {
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      date: new Date(post.date).toLocaleDateString("id-ID", {
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

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: "1200px",
          height: "630px",
          background: "linear-gradient(135deg, #e2e5ee 0%, #eef0f5 50%, #dde0eb 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "64px",
          fontFamily: "Inter",
          position: "relative",
          overflow: "hidden",
          gap: "28px",
        },
        children: [
          // Grid background
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "linear-gradient(rgba(0,0,0,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.055) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              },
            },
          },

          // Logo text
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                fontSize: "22px",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                marginBottom: "8px",
              },
              children: [
                { type: "span", props: { style: { color: "#111111" }, children: "Karsa" } },
                { type: "span", props: { style: { color: "#6366F1" }, children: "Hub" } },
              ],
            },
          },

          // Title
          {
            type: "div",
            props: {
              style: {
                fontSize: title.length > 60 ? "44px" : "52px",
                fontWeight: 700,
                color: "#111111",
                lineHeight: 1.15,
                letterSpacing: "-0.03em",
                textAlign: "center",
                maxWidth: "900px",
              },
              children: title,
            },
          },

          // Excerpt
          {
            type: "div",
            props: {
              style: {
                fontSize: "20px",
                color: "#555666",
                lineHeight: 1.6,
                textAlign: "center",
                maxWidth: "720px",
              },
              children: excerpt.length > 120 ? excerpt.slice(0, 120) + "..." : excerpt,
            },
          },

          // Category badge + date
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginTop: "8px",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: "13px",
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "#6366F1",
                      background: "rgba(99,102,241,0.1)",
                      border: "1px solid rgba(99,102,241,0.25)",
                      padding: "5px 14px",
                      borderRadius: "999px",
                    },
                    children: category,
                  },
                },
                {
                  type: "span",
                  props: {
                    style: { fontSize: "14px", color: "#888999" },
                    children: date,
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
