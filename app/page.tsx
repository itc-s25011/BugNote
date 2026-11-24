import Link from 'next/link';
import { getMemos } from '@/libs/microcms';
import styles from './page.module.css';



export default async function HomePage() {
  const { contents } = await getMemos({ limit: 3 });

  return (
    <div>
      <section className={styles.hero}>
        <h1 className={styles.title}>BugNote - エラー解決メモ帳</h1>
        <p className={styles.subtitle}>
          開発中につまずいたエラーの原因と解決策をストックし、素早く検索できる自分専用のナレッジベースです。
        </p>
        <Link href="/memos" className={styles.button}>
          エラーメモ一覧・検索へ
        </Link>
      </section>

      <section>
        <h2 className={styles.sectionTitle}>最近追加した解決メモ</h2>
        <div className={styles.grid}>
          {contents.map((memo) => (
            <Link href={`/memos/${memo.id}`} key={memo.id} className={styles.card}>
              <span className={styles.date}>
                {new Date(memo.publishedAt || memo.createdAt).toLocaleDateString('ja-JP')}
              </span>
              <h3 className={styles.cardTitle}>{memo.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}