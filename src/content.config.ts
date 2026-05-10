import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const notes = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/notes" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    category: z.enum([
      "frontend",
      "typescript",
      "backend",
      "testing",
      "ai-workflow",
      "deployment",
      "performance",
      "frontend-security",
    ]),
    tags: z.array(z.string()).default([]),
    date: z.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { notes };
