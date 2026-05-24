import { defineCollection, z } from 'astro:content';

const writeups = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    severity: z.enum(['Critical', 'High', 'Medium', 'Low', 'Informational']),
    cvss: z.number().optional(),
    cve: z.string().optional(),
    ghsa: z.string().optional(),
    cwe: z.string().optional(),
    product: z.string(),
    version: z.string().optional(),
    vendor: z.string().optional(),
    status: z.enum(['Draft', 'Reported', 'Patched', 'Public', 'Coordinated']),
    tags: z.array(z.string()).default([]),
    advisory: z.string().url().optional(),
    draft: z.boolean().default(false),
    order: z.number().default(100),
    featured: z.boolean().default(false),
    type: z.enum(['Disclosure', 'Research', 'Class', 'Architecture', 'Incident Response']).default('Research'),
    readingTime: z.number().optional(),
  }),
});

export const collections = { writeups };
