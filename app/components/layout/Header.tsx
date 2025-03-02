"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-white border-b">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="text-green-300 font-bold text-sm sm:text-base pr-4">
            <img
              src="/resale-paco_logo.png"
              alt="resale-paco"
              className="h-8 w-auto sm:h-10 rounded-lg"
            />
          </a>
          <p>Resale-PACO</p>
        </div>
        <div className="md:hidden">
          <Button
            variant="ghost"
            className="p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">メニューを開く</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </Button>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a href="#usage" className="text-gray-600 hover:text-green-800">
            ご利用方法
          </a>
          <a href="#pricing" className="text-gray-600 hover:text-green-800">
            ご利用料金
          </a>
          <a href="#register" className="text-gray-600 hover:text-green-800">
            新規登録
          </a>
          <Button
            variant="outline"
            className="text-green-800 border-green-800 hover:bg-green-50"
          >
            お問い合わせ
          </Button>
        </div>
      </nav>

      {/* モバイルメニュー */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-2 space-y-2">
            <a href="#usage" className="block py-2 text-gray-600 hover:text-green-800">
              ご利用方法
            </a>
            <a href="#pricing" className="block py-2 text-gray-600 hover:text-green-800">
              ご利用料金
            </a>
            <a href="#register" className="block py-2 text-gray-600 hover:text-green-800">
              新規登録
            </a>
            {/* <Button
              variant="outline"
              className="w-full text-green-800 border-green-800 hover:bg-green-50"
            >
              お問い合わせ
            </Button> */}
          </div>
        </div>
      )}
    </header>
  );
}
