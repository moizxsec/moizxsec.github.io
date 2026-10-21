import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

/** Lower order first; recent date breaks ties. Same rule as writeups' byOrder. */
export const byProjectOrder = (a: Project, b: Project) =>
  (a.data.order ?? 100) - (b.data.order ?? 100) ||
  b.data.date.getTime() - a.data.date.getTime();

export async function getProjects(): Promise<Project[]> {
  return (await getCollection('projects', ({ data }) => !data.draft)).sort(byProjectOrder);
}

/** The card the home page leads with: first featured entry, else the first by order. */
export async function getFeaturedProject(): Promise<Project | undefined> {
  const all = await getProjects();
  return all.find((p) => p.data.featured) ?? all[0];
}

/** External destinations for a project, in order of authority, nulls dropped. */
export function projectLinks(p: Project): { label: string; href: string }[] {
  const d = p.data;
  return [
    { label: 'Repo', href: d.repo },
    d.npm && { label: 'npm', href: d.npm },
    d.docs && { label: 'Docs', href: d.docs },
    d.marketplace && { label: 'Marketplace', href: d.marketplace },
  ].filter(Boolean) as { label: string; href: string }[];
}
