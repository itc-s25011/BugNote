import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getMemoDetail } from '@/libs/microcms';
import styles from './page.module.css';


type Props = {
  params: Promise<{ id: string }>;
};

export default async function MemoDetailPage({ params }: Props) {
  const { id } = await params;

  const memo = await getMemoDetail(id).catch(() => null);

  if (!memo) {
    notFound();
  }

  return (
    <div>
      <article className={styles.article}>
        <header className={styles.header}>
          <h1 className={styles.title}>{memo.title}</h1>
          <div className={styles.meta}>
            <span>
              登録日: {new Date(memo.publishedAt || memo.createdAt).toLocaleDateString('ja-JP')}
            </span>
            {memo.category && <span>技術カテゴリ: {memo.category.join(', ')}</span>}
          </div>
        </header>

        <div
          className={styles.body}
          dangerouslySetInnerHTML={{ __html: memo.content }}
        />
      </article>

      <Link href="/memos" className={styles.backLink}>
        ← メモ一覧に戻る
      </Link>
    </div>
  );
}