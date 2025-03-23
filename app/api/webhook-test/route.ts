import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // リクエストの詳細をログ出力
    console.log("Webhook test received - Processing started");

    // リクエストボディを取得
    const body = await req.text();

    // ヘッダーを取得
    const headersList = headers();
    const sig = headersList.get("stripe-signature");

    // 環境変数の確認（セキュリティのため値自体は表示しない）
    const envCheck = {
      STRIPE_SECRET_KEY: !!process.env.STRIPE_SECRET_KEY ? "設定済み" : "未設定",
      STRIPE_WEBHOOK_SECRET: !!process.env.STRIPE_WEBHOOK_SECRET ? "設定済み" : "未設定",
      SMTP_HOST: !!process.env.SMTP_HOST ? "設定済み" : "未設定",
      SMTP_PORT: !!process.env.SMTP_PORT ? "設定済み" : "未設定",
      SMTP_USER: !!process.env.SMTP_USER ? "設定済み" : "未設定",
      SMTP_PASSWORD: !!process.env.SMTP_PASSWORD ? "設定済み" : "未設定",
      SMTP_FROM: !!process.env.SMTP_FROM ? "設定済み" : "未設定",
      SMTP_SECURE: process.env.SMTP_SECURE,
    };

    // レスポンスを返す
    return NextResponse.json({
      status: "success",
      message: "Webhook test endpoint successfully received request",
      receivedBodyLength: body.length,
      bodyPreview: body.slice(0, 200) + "...",
      receivedHeaders: Object.fromEntries(headersList.entries()),
      stripeSignaturePresent: !!sig,
      stripeSignaturePreview: sig ? `${sig.slice(0, 10)}...` : "なし",
      environmentVariables: envCheck,
    });
  } catch (err) {
    console.error("Unexpected error in webhook test:", err);
    return NextResponse.json(
      { error: "Internal server error", details: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
} 