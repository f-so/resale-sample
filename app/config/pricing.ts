// 機能リストを別途定義（キーと表示テキストを分離）
const featuresList = [
  {
    id: "sekasuto",
    label: "新着通知：セカストオンライン"
  },
  {
    id: "other_shops",
    label: "新着通知：ベクトルパーク、カインドオル、オフハウス、レクロ、ブランドオフ、トレファク、高山質店、買取王国"
  },
  {
    id: "search_tool",
    label: "各サイト一括検索ツール"
  }
];

// 機能IDの型を定義
type FeatureId = "sekasuto" | "other_shops" | "search_tool";

// 各プランの機能対応状況（キーを使用）
const standardFeatures: Record<FeatureId, string> = {
  "sekasuto": "○",
  "other_shops": "×",
  "search_tool": "×"
};

const premiumFeatures: Record<FeatureId, string> = {
  "sekasuto": "○",
  "other_shops": "○",
  "search_tool": "○"
};

// 機能リストの型定義
interface Feature {
  id: FeatureId;
  label: string;
}

// プランの型定義
interface Plan {
  id: string;
  name: string;
  price: string;
  priceNote: string;
  className: string;
  features: Record<FeatureId, string>;
}

// メインのデータ構造
export const pricingData = {
  // 機能リストを公開
  features: featuresList as Feature[],
  
  // プラン情報
  plans: [
    {
      id: "standard",
      name: "スタンダードプラン",
      price: "2,0000円",
      priceNote: "(税込)",
      className: "text-blue-500",
      features: standardFeatures
    },
    {
      id: "premium",
      name: "プレミアムプラン（準備中）",
      price: "4,000円(予定)",
      priceNote: "(税込)",
      className: "text-red-500",
      features: premiumFeatures
    }
  ] as Plan[]
}; 