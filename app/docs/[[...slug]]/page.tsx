import fs from 'node:fs/promises';
import path from 'node:path';
import { source } from '@/lib/source';
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { CopyPageButton } from '@/components/CopyPageButton';

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

/**
 * Read the raw .mdx body for a given slug so the "Copy page" button has
 * something to put on the clipboard. We strip the YAML frontmatter — the
 * developer doesn't care about title/description metadata when pasting into
 * an LLM, they care about the actual content.
 *
 * Tries two paths: `<slug>.mdx` first, then `<slug>/index.mdx`. Returns
 * an empty string if neither exists (the button still renders but copies
 * nothing — never crash the page over a missing source file).
 */
async function loadRawMarkdown(slug: string[] | undefined): Promise<string> {
  const segments = slug?.length ? slug : ['index'];
  const base = path.join(process.cwd(), 'content', 'docs');
  const candidates = [
    path.join(base, ...segments) + '.mdx',
    path.join(base, ...segments, 'index.mdx'),
  ];
  for (const p of candidates) {
    try {
      const raw = await fs.readFile(p, 'utf8');
      return raw.replace(/^---[\s\S]*?---\n*/, '');
    } catch {
      // try next candidate
    }
  }
  return '';
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const rawMarkdown = await loadRawMarkdown(slug);

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      {rawMarkdown && (
        <div style={{ marginTop: 12, marginBottom: 4 }}>
          <CopyPageButton markdown={rawMarkdown} />
        </div>
      )}
      <DocsBody>
        <MDX components={defaultMdxComponents} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
