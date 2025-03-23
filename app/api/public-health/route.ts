import { NextResponse } from "next/server";

// パブリックアクセス用のヘルスチェックエンドポイント
export async function GET() {
  try {
    return NextResponse.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      message: "Public API is working correctly",
      environment: process.env.NODE_ENV
    }, { 
      status: 200,
      // CORSヘッダーを設定して外部からのアクセスを許可
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  } catch (error) {
    console.error("Public healthcheck failed:", error);
    return NextResponse.json({
      status: "error",
      message: "API healthcheck failed"
    }, { status: 500 });
  }
} 