"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { pricingData } from "@/app/config/pricing";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

const PricingPlans = () => {
  const [isYearly, setIsYearly] = useState(false);

  // アニメーション設定
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <Card className="border-none shadow-lg overflow-hidden">
      <CardContent className="p-0">
        <section className="py-16 bg-gradient-to-b from-white to-blue-50 rounded-3xl">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                料金プラン
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                あなたのニーズに合わせた最適なプランをお選びください
              </p>
            </motion.div>

            {/* 支払いサイクル切り替え - 将来的に実装する場合 */}
            {/* <div className="flex justify-center mb-12">
              <div className="bg-gray-100 p-1 rounded-full flex items-center">
                <button
                  className={`px-6 py-2 rounded-full ${
                    !isYearly ? "bg-white shadow-md text-blue-600" : "text-gray-500"
                  }`}
                  onClick={() => setIsYearly(false)}
                >
                  月払い
                </button>
                <button
                  className={`px-6 py-2 rounded-full ${
                    isYearly ? "bg-white shadow-md text-blue-600" : "text-gray-500"
                  }`}
                  onClick={() => setIsYearly(true)}
                >
                  年払い
                  <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    20%お得
                  </span>
                </button>
              </div>
            </div> */}

            <motion.div 
              className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {pricingData.plans.map((plan) => (
                <motion.div key={plan.id} variants={item}>
                  <Card className={`h-full overflow-hidden border-2 ${
                    plan.id === "premium" ? "border-blue-500 shadow-lg shadow-blue-100" : "border-gray-200"
                  }`}>
                    <CardHeader className={`pb-8 pt-6 text-center ${
                      plan.id === "premium" ? "bg-blue-50" : "bg-gray-50"
                    }`}>
                      <div className="mb-1">
                        {plan.id === "premium" && (
                          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium mb-2">
                            おすすめ
                          </span>
                        )}
                      </div>
                      <h3 className={`text-2xl font-bold ${plan.className}`}>
                        {plan.name}
                      </h3>
                      <div className="mt-4 flex items-baseline justify-center">
                        <span className="text-4xl font-extrabold">{plan.price}</span>
                        <span className="ml-1 text-gray-500">{plan.priceNote}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        {plan.id === "standard" ? "基本機能が使えるスタンダードプラン" : "全機能が使えるプレミアムプラン"}
                      </p>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <ul className="space-y-4">
                        {pricingData.features.map((feature) => (
                          <li key={feature.id} className="flex items-start">
                            {plan.features[feature.id] === "○" ? (
                              <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                            ) : (
                              <X className="h-5 w-5 text-gray-300 mr-2 shrink-0 mt-0.5" />
                            )}
                            <span className="text-gray-700">{feature.label}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter className="pb-8">
                      <Button 
                        className={`w-full py-6 text-lg ${
                          plan.id === "premium" 
                            ? "bg-blue-600 hover:bg-blue-700" 
                            : "bg-gray-900 hover:bg-gray-800"
                        }`}
                        disabled={plan.id === "premium"}
                      >
                        {plan.id === "standard" ? "今すぐ登録" : "準備中"}
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              className="mt-12 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <p className="text-sm text-gray-500 max-w-2xl mx-auto">
                ※ すべてのプランは初回登録から7日間の返金保証付きです。
                サービスにご満足いただけない場合は全額返金いたします。
              </p>
            </motion.div>
          </div>
        </section>
      </CardContent>
    </Card>
  );
};

export default PricingPlans; 