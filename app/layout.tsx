import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'BugNote | エラー解決メモ帳',
  description: '開発中のエラーと解決策を記録・検索できるナレッジベース',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <header style={{ background: '#0f172a', color: '#fff', padding: '16px 0' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/" style={{ fontSize: '1.25rem', fontWeight: 'bold', letterSpacing: '0.05em' }}>
              BugNote
            </Link>
            <nav style={{ display: 'flex', gap: '20px' }}>
              <Link href="/">トップ</Link>
              <Link href="/memos">メモ一覧</Link>
            </nav>
          </div>
        </header>

        <main className="container" style={{ minHeight: '80vh', padding: '40px 20px' }}>
          {children}
        </main>

        <footer style={{ textAlign: 'center', padding: '20px', borderTop: '1px solid #e2e8f0', color: '#64748b' }}>
          <p>&copy; 2026 BugNote</p>
        </footer>
      </body>
    </html>
  );
}