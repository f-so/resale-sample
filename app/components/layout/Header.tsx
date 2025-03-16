"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // メニュー項目クリック時にメニューを閉じる関数
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // メニュー外クリック時にメニューを閉じる処理
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-white border-b">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <a
            href="/"
            className="text-green-300 font-bold text-sm sm:text-base flex items-center gap-2"
          >
            <Image 
              src="/resale-paco_logo.png"
              alt="resale-paco"
              width={100}
              height={50}
              priority
            />
            <p>Resale-PACO</p>
          </a>
        </div>
        <div className="md:hidden">
          <Button
            ref={buttonRef}
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
          <a href="/#usage" className="text-gray-600 hover:text-green-800">
            ご利用方法
          </a>
          <a href="/#pricing" className="text-gray-600 hover:text-green-800">
            ご利用料金
          </a>
          <a href="/#register" className="text-gray-600 hover:text-green-800">
            新規登録
          </a>
          <a href="/#contact" className="text-gray-600 hover:text-green-800">
            お問い合わせ
          </a>
        </div>
      </nav>

      {/* モバイルメニュー */}
      <div
        ref={menuRef}
        className={`md:hidden bg-white border-t overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-2 space-y-2 transform transition-transform duration-300 ease-in-out">
          <a
            href="/#usage"
            className="block py-2 text-gray-600 hover:text-green-800"
            onClick={closeMenu}
          >
            ご利用方法
          </a>
          <a
            href="/#pricing"
            className="block py-2 text-gray-600 hover:text-green-800"
            onClick={closeMenu}
          >
            ご利用料金
          </a>
          <a
            href="/#register"
            className="block py-2 text-gray-600 hover:text-green-800"
            onClick={closeMenu}
          >
            新規登録
          </a>
          <a href="/#contact"
            className="block py-2 text-gray-600 hover:text-green-800"
          >
            お問い合わせ
          </a>
        </div>
      </div>
    </header>
  );
}
