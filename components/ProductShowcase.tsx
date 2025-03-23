"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// 商品紹介用のサンプルデータ
const productShowcaseItems = [
  {
    id: 1,
    title: "ブランド品の新着通知",
    description: "人気ブランドの新着商品をリアルタイムで通知。他のユーザーより早く掘り出し物を見つけましょう。",
    image: "/images/brand-notification.jpg",
    badge: "人気",
  },
  {
    id: 2,
    title: "家電製品の入荷情報",
    description: "高額査定が期待できる家電製品の入荷情報をいち早くキャッチ。効率的な仕入れを実現します。",
    image: "/images/electronics-alert.jpg",
    badge: "高利益",
  },
  {
    id: 3,
    title: "レアアイテム検知",
    description: "市場価値の高いレアアイテムを自動検知。プレミアム価格で販売できるチャンスを逃しません。",
    image: "/images/rare-items.jpg",
    badge: "限定",
  },
  {
    id: 4,
    title: "トレンド商品分析",
    description: "現在のマーケットトレンドに基づいた商品分析。需要の高いアイテムを優先的に通知します。",
    image: "/images/trend-analysis.jpg",
    badge: "分析",
  },
];

const ProductShowcase = () => {
  return (
    <Card className="border-none shadow-lg overflow-hidden">
      <CardContent className="p-0">
        <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <motion.h2 
                className="text-3xl font-bold text-gray-900 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                商品入荷通知サービス
              </motion.h2>
              <motion.p 
                className="text-lg text-gray-600 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                セカンドストリートなどのリユースサイトの新着商品をリアルタイムで通知。
                他のユーザーより早く掘り出し物を見つけましょう。
              </motion.p>
            </div>

            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-5xl mx-auto"
            >
              <CarouselContent>
                {productShowcaseItems.map((item) => (
                  <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-2">
                      <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="relative h-48 w-full bg-gray-200">
                          {/* 画像がない場合のフォールバック */}
                          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-500 text-white text-xl font-bold">
                            {item.title}
                          </div>
                          {/* 実際の画像がある場合はこちらを使用 */}
                          {/* <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                          /> */}
                        </div>
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                            <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                              {item.badge}
                            </Badge>
                          </div>
                          <p className="text-gray-600">{item.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-8 gap-2">
                <CarouselPrevious className="relative static translate-y-0 left-0" />
                <CarouselNext className="relative static translate-y-0 right-0" />
              </div>
            </Carousel>

            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <p className="text-lg font-semibold text-indigo-700">
                24時間365日、あなたの仕入れをサポートします
              </p>
            </motion.div>
          </div>
        </section>
      </CardContent>
    </Card>
  );
};

export default ProductShowcase; 