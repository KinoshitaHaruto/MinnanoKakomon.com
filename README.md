
# みんなの過去問.com 
大学生同士で過去問や楽単情報を共有するためのプラットフォームです。

## 🛠️ 技術スタック

- **フレームワーク**: Next.js 15 (App Router)
- **データベース**: Prisma (開発環境: SQLite / 本番想定: PostgreSQL)
- **認証**: Auth.js v5 (Google OAuth)
- **スタイリング**: Tailwind CSS
- **言語**: TypeScript

## 🚀 セットアップ手順

1. **依存パッケージのインストール**
   ```bash
   npm install
   ```

2. 環境変数の設定 ルートディレクトリに .env ファイルを作成し、以下を設定してください
   ```env
   DATABASE_URL="file:./dev.db"
   AUTH_SECRET="your_auth_secret" # Generate with: npx auth secret
   AUTH_GOOGLE_ID="your_google_client_id"
   AUTH_GOOGLE_SECRET="your_google_client_secret"
   ```

3. **データベースの設定** データベースの準備 スキーマの適用と初期データ（大学・学部データ等）の投入を行います
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```
   *Note: Seed data is managed via CSV files in `prisma/data/`.*

4. **開発用サーバーの起動**
   ```bash
   npm run dev
   ```
   Access at `http://localhost:3000`.

## ディレクトリ構成

```
.
├── prisma/
│   ├── data/             # 初期データ (CSV形式)
│   ├── schema.prisma     # データベーススキーマ定義
│   └── seed.ts           # シード実行スクリプト
├── src/
│   ├── app/              # Next.js App Router (ページ)
│   ├── components/       # UIコンポーネント
│   │   ├── auth/         # 認証関連 (ログインボタン等)
│   │   └── features/     # 機能別コンポーネント
│   ├── lib/              # 共有ユーティリティ (Prismaクライアント等)
│   ├── server/           # サーバーサイドロジック
│   │   ├── actions/      # Server Actions
│   │   └── db/           # データアクセス層
│   └── types/            # TypeScript型定義
└── ...
```