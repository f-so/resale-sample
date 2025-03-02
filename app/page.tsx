"use client";

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
import { useState } from "react";

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isAgreed) {
      alert("利用規約に同意してください。");
      return;
    }

    // 直接Stripeのチェックアウトページに遷移
    window.location.href = "https://buy.stripe.com/test_6oE5lc6On3rf8hyeUU";
  };

  return (
    <>
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          利益の出る商品を仕入れる。
        </h1>
        <h2 className="text-xl sm:text-2xl text-gray-900">
          せどり必須ツール。
        </h2>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
          resale-pacoでは、仕入れ先のオンラインショップの新着商品が更新されたら、他の人より早くアクセスして仕入れることは出来いません。
        </p>
      </section>

      {/* Tool Section */}
      <section className="space-y-8">
        <h3 className="text-xl sm:text-2xl font-semibold text-center text-blue-900">
          オンライン仕入れサポートツール
        </h3>
        <Card className="border-[10px] border-green-300 rounded-[40px]">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-lg font-medium text-gray-900">
              説明文追加〜〜
            </h2>
            <p className="text-green-800">LINEで通知。</p>
            <div className="bg-blue-50 p-6 rounded-lg">
              <Image
                src="/placeholder.svg"
                alt="LINE notification example"
                width={300}
                height={200}
                className="mx-auto"
              />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Pricing Table Section */}
      <section className="space-y-8">
        <h3 className="text-xl sm:text-2xl font-semibold text-center text-blue-900">
          ご利用料金
        </h3>
        <div className="overflow-x-auto -mx-4 sm:mx-0 bg-white">
          <div className="min-w-[300px] w-full border rounded-lg overflow-hidden">
            <table className="w-full border-collapse text-sm sm:text-base">
              <thead>
                <tr>
                  <th className="p-2 sm:p-4 border-b w-1/3"></th>
                  <th className="p-2 sm:p-4 border-b w-1/3 text-blue-500">
                    スタンダード
                  </th>
                  <th className="p-2 sm:p-4 border-b w-1/3 text-orange-500">
                    プレミアム
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 sm:p-4 border-b">料金</td>
                  <td className="p-2 sm:p-4 border-b text-center">
                    <span className="whitespace-nowrap">1,480円</span>
                    <br />
                    <span className="text-xs sm:text-sm text-gray-500">
                      (税込)
                    </span>
                  </td>
                  <td className="p-2 sm:p-4 border-b text-center">
                    <span className="whitespace-nowrap">3,980円</span>
                    <br />
                    <span className="text-xs sm:text-sm text-gray-500">
                      (税込)
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-2 sm:p-4 border-b">
                    新着更新LINE通知
                    <br />
                    セカスト/トレファクFASHION/トレファクONLINE/オフモール
                  </td>
                  <td className="p-2 sm:p-4 border-b text-center">○</td>
                  <td className="p-2 sm:p-4 border-b text-center">○</td>
                </tr>
                <tr>
                  <td className="p-2 sm:p-4 border-b">LINE通知「件数」設定</td>
                  <td className="p-2 sm:p-4 border-b text-center">○</td>
                  <td className="p-2 sm:p-4 border-b text-center">○</td>
                </tr>
                <tr>
                  <td className="p-2 sm:p-4 border-b">
                    新着更新LINE通知「URL機能」
                  </td>
                  <td className="p-2 sm:p-4 border-b text-center">×</td>
                  <td className="p-2 sm:p-4 border-b text-center">○</td>
                </tr>
                <tr>
                  <td className="p-2 sm:p-4 border-b">
                    新着更新LINE通知「希望ショップ」
                    <br />
                    セカスト/トレファクFASHION/トレファクONLINE/オフモール以外のショップ
                  </td>
                  <td className="p-2 sm:p-4 border-b text-center">×</td>
                  <td className="p-2 sm:p-4 border-b text-center">○</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section className="space-y-8">
        <h3 className="text-xl sm:text-2xl font-semibold text-center text-blue-900">
          新規登録
        </h3>
        <Card>
          <CardContent className="p-4 sm:p-6">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="terms">
                    利用規約<span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="terms"
                    className="h-48 resize-none"
                    readOnly
                    value={TERMS_OF_SERVICE}
                  />
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="termsAgree"
                      checked={isAgreed}
                      onCheckedChange={(checked) =>
                        setIsAgreed(checked as boolean)
                      }
                    />
                    <Label htmlFor="termsAgree">同意する</Label>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-green-300 hover:bg-green-400 text-white font-bold text-lg"
              >
                登録
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </>
  );
}