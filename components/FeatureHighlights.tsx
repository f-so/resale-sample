"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bell, Search, Zap, Clock, TrendingUp, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: <Bell className="h-10 w-10 text-blue-500" />,
    title: "リアルタイム通知",
    description: "新着商品が入荷されると即座に通知。他のユーザーより早く商品をチェックできます。",
  },
  {
    icon: <Search className="h-10 w-10 text-indigo-500" />,
    title: "高精度検索",
    description: "あなたが探している商品を正確に検索。効率的な仕入れをサポートします。",
  },
  {
    icon: <Zap className="h-10 w-10 text-yellow-500" />,
    title: "高速処理",
    description: "サイトの更新を高速で検知。遅延なく情報を届けます。",
  },
  {
    icon: <Clock className="h-10 w-10 text-green-500" />,
    title: "24時間監視",
    description: "24時間365日、休むことなくサイトを監視。いつでも最新情報をお届けします。",
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-red-500" />,
    title: "トレンド分析",
    description: "人気商品のトレンドを分析。高利益が期待できる商品を優先的に通知します。",
  },
  {
    icon: <Shield className="h-10 w-10 text-purple-500" />,
    title: "安心のサポート",
    description: "困ったときはいつでもサポート。あなたのビジネスを全力でバックアップします。",
  },
];

const FeatureHighlights = () => {
  return (
    <Card className="border-none shadow-lg overflow-hidden">
      <CardContent className="p-0">
        <section className="py-16 bg-white rounded-3xl">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                サービスの特徴
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Resale-PACOが選ばれる理由
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="bg-white p-3 rounded-full inline-block mb-4 shadow-sm">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="mt-16 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="inline-block bg-blue-50 px-6 py-3 rounded-full">
                <p className="text-blue-800 font-medium">
                  他のせどりツールとは一線を画す、圧倒的な速さと精度
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </CardContent>
    </Card>
  );
};

export default FeatureHighlights; 