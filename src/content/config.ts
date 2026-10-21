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
    // Optional advisory-record fields. All derived views fall back cleanly when absent.
    ecosystem: z.string().optional(), // e.g. "PyPI", "npm", "Packagist"; shown in the advisory table
    fixedIn: z.string().optional(), // e.g. "7.14.2", the version that closes the issue
    cvssVector: z.string().optional(), // e.g. "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H"
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    status: z.enum(['Published', 'Active', 'Archived']).default('Active'),
    role: z.string().default('Author'),
    stack: z.array(z.string()).default([]),
    highlights: z.array(z.string()).default([]),
    repo: z.string().url(),
    npm: z.string().url().optional(),
    docs: z.string().url().optional(),
    marketplace: z.string().url().optional(),
    language: z.string().optional(),
    license: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    order: z.number().default(100),
  }),
});

export const collections = { writeups, projects };
