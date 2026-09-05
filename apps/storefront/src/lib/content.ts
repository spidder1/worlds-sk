import { queryNeon } from './neon-client';

export type EditableContentPage = {
  slug: string;
  title: string;
  body: string;
  seo_title: string | null;
  seo_description: string | null;
};

export async function getEditableContentPage(slug: string): Promise<EditableContentPage | null> {
  try {
    const rows = await queryNeon<EditableContentPage>(
      'SELECT slug, title, body, seo_title, seo_description FROM content_pages WHERE slug = $1 AND published = true LIMIT 1',
      [slug],
    );
    const page = rows[0];
    return page?.body?.trim() ? page : null;
  } catch {
    // The static legal/information pages remain the safe fallback until the migration is applied.
    return null;
  }
}
