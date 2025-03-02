# resale-paco

Next.js を使用して構築されたせどり支援ツールのプロジェクトです。

## 開発の始め方

開発サーバーを起動するには：

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000)をブラウザで開いて結果を確認できます。

## プロジェクト構成

```
app/
├── (routes)/           # ページルート
│   ├── page.tsx       # ホームページ
│   ├── terms/         # 利用規約ページ
│   │   └── page.tsx
│   └── legal/         # 特商法ページ
│       └── page.tsx
├── components/
│   └── layout/        # レイアウトコンポーネント
│       ├── header.tsx
│       └── footer.tsx
├── lib/               # ユーティリティ関数やヘルパー
│   └── utils.ts
└── layout.tsx         # ルートレイアウト
components/
├── ui/            # shadcn/uiコンポーネント
│   ├── button.tsx
│   ├── card.tsx
│   └── ...
```

### 主な機能

- **App Router**: Next.js 13 の新しいルーティングシステムを採用
- **Shadcn UI**: モダンな UI コンポーネントライブラリを使用
- **Tailwind CSS**: 効率的なスタイリングを実現
- **TypeScript**: 型安全な開発環境を提供

### コンポーネント構成

- `components/ui/`: shadcn/ui から生成された再利用可能な UI コンポーネント
- `api/components/layout/`: ヘッダーやフッターなどの共通レイアウトコンポーネント

### ページ構成

- `/`: トップページ（サービス説明・料金プラン・登録フォーム）
- `/terms`: 利用規約ページ
- `/legal`: 特定商取引法に基づく表記ページ

## 技術スタック

- **フレームワーク**: Next.js 13
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **UI ライブラリ**: shadcn/ui
- **フォーマッター**: Prettier
- **リンター**: ESLint

## 開発環境のセットアップ

1. リポジトリのクローン:

```bash
git clone [リポジトリURL]
```

2. 依存関係のインストール:

```bash
npm install
```

3. 環境変数の設定:

```bash
cp .env.example .env.local
```

必要な環境変数を`.env.local`に設定してください。

4. 開発サーバーの起動:

```bash
npm run dev
```

## 参考リンク

- [Next.js ドキュメント](https://nextjs.org/docs)
- [Tailwind CSS ドキュメント](https://tailwindcss.com/docs)
- [shadcn/ui ドキュメント](https://ui.shadcn.com)
- [TypeScript ドキュメント](https://www.typescriptlang.org/docs)
