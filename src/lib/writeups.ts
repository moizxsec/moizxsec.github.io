import { getCollection, type CollectionEntry } from 'astro:content';

export type Writeup = CollectionEntry<'writeups'>;
export type WriteupType = Writeup['data']['type'];
export type Severity = Writeup['data']['severity'];

/** Display order for grouped sections. Disclosures lead because they are the credential. */
export const TYPE_ORDER: WriteupType[] = [
  'Disclosure',
  'Research',
  'Class',
  'Architecture',
  'Incident Response',
];

export const TYPE_BLURB: Record<WriteupType, string> = {
  Disclosure: 'Vulnerabilities I found and reported to the maintainers, with the fix.',
  Research: 'Original offensive research: bypasses, chains, and techniques.',
  Class: 'Whole classes of bugs walked end-to-end on real, sanitised targets.',
  Architecture: 'How I design security systems that have to run unattended.',
  'Incident Response': 'What actually happened, hour by hour, when something went wrong.',
};

export const SEVERITY_ORDER: Severity[] = ['Critical', 'High', 'Medium', 'Low', 'Informational'];

export const SITE = {
  name: 'Abdul Moiz',
  handle: 'moizxsec',
  email: 'muezzism@gmail.com',
  github: 'https://github.com/moizxsec',
  linkedin: 'https://www.linkedin.com/in/muezism101',
  location: 'Lahore, PK',
  tagline: 'Offensive security engineer',
};

export async function getPublished(): Promise<Writeup[]> {
  return getCollection('writeups', ({ data }) => !data.draft);
}

export const byDateDesc = (a: Writeup, b: Writeup) =>
  b.data.date.getTime() - a.data.date.getTime();

export const byOrder = (a: Writeup, b: Writeup) =>
  (a.data.order ?? 100) - (b.data.order ?? 100) || byDateDesc(a, b);

/**
 * An "advisory" is anything that carries a public identifier or was filed as a
 * Disclosure. This is the rule that makes the CVE table grow by itself: adding
 * `cve:` to any article's frontmatter puts it on the board.
 */
export const isAdvisory = (w: Writeup) =>
  Boolean(w.data.cve || w.data.ghsa || w.data.type === 'Disclosure');

export async function getAdvisories(): Promise<Writeup[]> {
  return (await getPublished()).filter(isAdvisory).sort(byDateDesc);
}

/** Primary public identifier, in order of authority. */
export function advisoryId(w: Writeup): { id: string; kind: 'CVE' | 'GHSA' | 'none' } {
  if (w.data.cve) return { id: w.data.cve, kind: 'CVE' };
  if (w.data.ghsa) return { id: w.data.ghsa, kind: 'GHSA' };
  return { id: 'ID pending', kind: 'none' };
}

export const nvdUrl = (cve: string) => `https://nvd.nist.gov/vuln/detail/${encodeURIComponent(cve)}`;
export const ghsaUrl = (ghsa: string) => `https://github.com/advisories/${encodeURIComponent(ghsa)}`;
export function cweUrl(cwe: string): string | undefined {
  const m = cwe.match(/(\d+)/);
  return m ? `https://cwe.mitre.org/data/definitions/${m[1]}.html` : undefined;
}

/** Frontmatter wins; otherwise estimate from the raw body at ~220 wpm. */
export function readingTime(w: Writeup): number {
  if (w.data.readingTime) return w.data.readingTime;
  const words = (w.body ?? '').replace(/```[\s\S]*?```/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export const isoDate = (d: Date) => d.toISOString().slice(0, 10);

export function stats(all: Writeup[]) {
  const advisories = all.filter(isAdvisory);
  return {
    writeups: all.length,
    advisories: advisories.length,
    cves: all.filter((w) => w.data.cve).length,
    critical: all.filter((w) => w.data.severity === 'Critical').length,
    high: all.filter((w) => w.data.severity === 'High').length,
    patched: advisories.filter((w) => w.data.status === 'Patched').length,
  };
}

export function tagCounts(all: Writeup[]): [string, number][] {
  const m = new Map<string, number>();
  for (const w of all) for (const t of w.data.tags) m.set(t, (m.get(t) ?? 0) + 1);
  return [...m.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

export function typeCounts(all: Writeup[]): [WriteupType, number][] {
  return TYPE_ORDER.map((t) => [t, all.filter((w) => w.data.type === t).length] as [WriteupType, number]).filter(
    ([, n]) => n > 0,
  );
}
