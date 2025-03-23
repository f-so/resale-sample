"use client";

import { pricingData } from "@/app/config/pricing";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TERMS_OF_SERVICE } from "@/constants/terms";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// 新しく作成したコンポーネントをインポート
import ProductShowcase from "@/components/ProductShowcase";
import PricingPlans from "@/components/PricingPlans";
import FeatureHighlights from "@/components/FeatureHighlights";

export default function Page() {
  const [isAgreed, setIsAgreed] = useState(false);
  const [email, setEmail] = useState("");
  const [showTerms, setShowTerms] = useState(false);
  const router = useRouter();

  // モーダルが表示されている間はbodyのスクロールを無効にする
  useEffect(() => {
    if (showTerms) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    // クリーンアップ関数
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showTerms]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isAgreed) {
      alert("利用規約に同意してください。");
      return;
    }

    // 環境変数からStripeチェックアウトURLを取得
    const stripeCheckoutUrl = process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_URL;
    
    // 直接Stripeのチェックアウトページに遷移
    window.location.href = stripeCheckoutUrl || "";
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8 pt-20">
        <div className="w-full max-w-7xl mx-auto space-y-16">
          {/* ヒーローセクション */}
          <section className="text-center space-y-6 py-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              オンライン仕入れサポートツール <span className="text-blue-600">Resale-PACO-1037</span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-800">
              せどり必須ツール。
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              resale-pacoでは、仕入れ先のオンラインショップの新着商品が更新されたら、他の人より早くアクセスして仕入れる事ができます。
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
              <Button className="bg-blue-600 hover:bg-blue-700 text-lg py-6 px-8">
                今すぐ始める
              </Button>
              <Button variant="outline" className="text-lg py-6 px-8">
                詳細を見る
              </Button>
            </div>
          </section>

          {/* 商品紹介セクション */}
          <ProductShowcase />

          {/* 特徴セクション */}
          <section id="features">
            <FeatureHighlights />
          </section>

          {/* 料金プランセクション */}
          <section id="pricing">
            <PricingPlans />
          </section>

          {/* 利用方法セクション */}
          <section id="usage" className="space-y-8 py-12">
            <h3 className="text-3xl font-semibold text-center text-gray-900 mb-12">
              ご利用方法
            </h3>
            <Card className="border-[10px] border-green-300 rounded-[40px] overflow-hidden shadow-xl">
              <CardContent className="p-8 space-y-8">
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
                  サービス登録の流れ
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="bg-white p-6 rounded-xl shadow-md relative">
                    <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">1</div>
                    <h3 className="font-bold text-lg mb-3 pt-2">利用規約の確認と同意</h3>
                    <p className="text-gray-600">
                      利用規約をご確認の上、「登録」ボタンをクリックしてください。
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-md relative">
                    <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">2</div>
                    <h3 className="font-bold text-lg mb-3 pt-2">お支払い情報の登録</h3>
                    <p className="text-gray-600">
                      メールアドレスとクレジットカード情報を入力し、決済を完了してください。
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-md relative">
                    <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">3</div>
                    <h3 className="font-bold text-lg mb-3 pt-2">メール確認</h3>
                    <p className="text-gray-600">
                      登録したメールアドレスに確認メールが届きます。メール内のURLをクリックしてください。
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-md relative">
                    <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">4</div>
                    <h3 className="font-bold text-lg mb-3 pt-2">LINE連携</h3>
                    <p className="text-gray-600">
                      URLから公式LINEアカウントを友だち追加してください。
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* よくある質問セクション */}
          <section id="faq" className="py-12">
            <h3 className="text-3xl font-semibold text-center text-gray-900 mb-12">
              よくある質問
            </h3>
            <div className="max-w-3xl mx-auto space-y-6">
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    通知はどのように届きますか？
                  </h4>
                  <p className="text-gray-600">
                    通知はDiscordサーバーを通じて届きます。登録後、招待リンクが送られますので、そちらからサーバーに参加してください。
                  </p>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    どのようなショップの情報が通知されますか？
                  </h4>
                  <p className="text-gray-600">
                    スタンダードプランではセカストオンラインの情報が通知されます。プレミアムプランでは、ベクトルパーク、カインドオル、オフハウスなど複数のショップ情報が通知されます。
                  </p>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    解約はいつでもできますか？
                  </h4>
                  <p className="text-gray-600">
                    はい、いつでも解約可能です。解約はマイページから簡単に行えます。なお、解約後も期間満了までサービスをご利用いただけます。
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 登録フォームセクション */}
          <section id="register" className="py-12">
            <Card className="border-none shadow-lg overflow-hidden">
              <CardContent className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl">
                <div className="max-w-3xl mx-auto">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      今すぐ登録して始めましょう
                    </h2>
                    <p className="text-lg text-gray-600">
                      7日間の返金保証付き。安心してお試しいただけます。
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">メールアドレス</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="example@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="py-6 text-lg"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="terms"
                          checked={isAgreed}
                          onCheckedChange={(checked) => {
                            setIsAgreed(checked as boolean);
                          }}
                        />
                        <div className="grid gap-1.5 leading-none">
                          <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            利用規約に同意する
                          </label>
                          <p className="text-sm text-gray-500">
                            <button
                              type="button"
                              onClick={() => setShowTerms(true)}
                              className="text-blue-600 hover:underline"
                            >
                              利用規約を読む
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button type="submit" className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700">
                      登録して始める
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      {/* 利用規約モーダル */}
      {showTerms && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setShowTerms(false)}>
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">利用規約</h3>
                <button
                  onClick={() => setShowTerms(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto flex-grow">
              <div className="prose max-w-none">
                {TERMS_OF_SERVICE.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="p-6 border-t">
              <div className="flex justify-end">
                <Button
                  onClick={() => {
                    setShowTerms(false);
                    setIsAgreed(true);
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  同意して閉じる
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
