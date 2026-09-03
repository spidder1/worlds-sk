import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  basePath: string;
  currentPage: number;
  totalPages: number;
  searchParams?: Record<string, string | undefined>;
}

function visiblePages(currentPage: number, totalPages: number): Array<number | 'ellipsis'> {
  const pages = new Set([1, totalPages, currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2]);
  const sorted = [...pages].filter((page) => page >= 1 && page <= totalPages).sort((a, b) => a - b);
  const result: Array<number | 'ellipsis'> = [];
  for (const page of sorted) {
    const previous = result.at(-1);
    if (typeof previous === 'number' && page - previous > 1) result.push('ellipsis');
    result.push(page);
  }
  return result;
}

export function Pagination({ basePath, currentPage, totalPages, searchParams = {} }: PaginationProps) {
  if (totalPages <= 1) return null;

  const hrefFor = (page: number) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(searchParams)) {
      if (value && key !== 'page') params.set(key, value);
    }
    if (page > 1) params.set('page', String(page));
    const query = params.toString();
    return `${basePath}${query ? `?${query}` : ''}`;
  };

  const linkClass = 'inline-flex h-10 min-w-10 items-center justify-center rounded-lg border px-3 text-sm font-semibold transition-colors';

  return (
    <nav aria-label="Stránkovanie produktov" className="flex flex-wrap items-center justify-center gap-2 pt-6">
      {currentPage > 1 ? (
        <Link href={hrefFor(currentPage - 1)} rel="prev" className={`${linkClass} border-slate-200 bg-white text-slate-700 hover:border-brand-400 hover:text-brand-700`}>
          <ChevronLeft className="mr-1 h-4 w-4" /> Predchádzajúca
        </Link>
      ) : null}

      {visiblePages(currentPage, totalPages).map((page, index) => page === 'ellipsis' ? (
        <span key={`ellipsis-${index}`} className="px-1 text-slate-400" aria-hidden="true">…</span>
      ) : (
        <Link
          key={page}
          href={hrefFor(page)}
          aria-current={page === currentPage ? 'page' : undefined}
          className={`${linkClass} ${page === currentPage ? 'border-brand-600 bg-brand-600 text-white' : 'border-slate-200 bg-white text-slate-700 hover:border-brand-400 hover:text-brand-700'}`}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages ? (
        <Link href={hrefFor(currentPage + 1)} rel="next" className={`${linkClass} border-slate-200 bg-white text-slate-700 hover:border-brand-400 hover:text-brand-700`}>
          Ďalšia <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      ) : null}
    </nav>
  );
}
