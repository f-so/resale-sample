import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
          <Link
            href="/"
            className="text-gray-600 hover:text-green-800 transition-colors"
          >
            ホーム
          </Link>
          <Link
            href="/terms"
            className="text-gray-600 hover:text-green-800 transition-colors"
          >
            利用規約
          </Link>
          <Link
            href="/legal"
            className="text-gray-600 hover:text-green-800 transition-colors"
          >
            特定商取引法に基づく表記
          </Link>
        </nav>
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} resale-paco. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
