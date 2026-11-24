import Link from 'next/link';
import { getMemos } from '@/libs/microcms';
import styles from './page.module.css';


const PER_PAGE = 3;

type Props = {
  searchParams: Promise<{ page?: string; q?: string }>;
};

export default async function MemosPage({ searchParams }: Props) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const keyword = params.q || '';

  const { contents, totalCount } = await getMemos({
    limit: PER_PAGE,
    offset: (currentPage - 1) * PER_PAGE,
    q: keyword || undefined,
  });

  const totalPages = Math.ceil(totalCount / PER_PAGE);

  return (
    <div>
      <h1 className={styles.heading}>エラー解決メモ一覧</h1>

      <form action="/memos" method="GET" className={styles.searchForm}>
        <input
          type="text"
          name="q"
          defaultValue={keyword}
          placeholder="エラー文や技術名で検索（例: Next.js, TypeError）..."
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          検索
        </button>
      </form>

      {keyword && (
        <p style={{ marginBottom: '16px', color: '#475569' }}>
          「{keyword}」の検索結果：{totalCount}件
        </p>
      )}

      {contents.length === 0 ? (
        <p>該当するメモが見つかりませんでした。</p>
      ) : (
        <div className={styles.list}>
          {contents.map((memo) => (
            <Link href={`/memos/${memo.id}`} key={memo.id} className={styles.item}>
              <div className={styles.meta}>
                <span>
                  {new Date(memo.publishedAt || memo.createdAt).toLocaleDateString('ja-JP')}
                </span>
                {memo.category && memo.category.length > 0 && (
                  <span className={styles.badge}>{memo.category[0]}</span>
                )}
              </div>
              <h2 className={styles.itemTitle}>{memo.title}</h2>
            </Link>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
            const href = `/memos?page=${pageNum}${keyword ? `&q=${encodeURIComponent(keyword)}` : ''}`;
            return (
              <Link
                key={pageNum}
                href={href}
                className={`${styles.pageLink} ${currentPage === pageNum ? styles.activePage : ''}`}
              >
                {pageNum}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}