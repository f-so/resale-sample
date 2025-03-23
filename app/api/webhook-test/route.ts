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
    const allHeaders = Object.fromEntries(headersList.entries());
    
    // stripe-signatureヘッダーを特別に確認
    const stripeSignature = headersList.get("stripe-signature");

    return NextResponse.json({
      status: "success",
      message: "Webhook test endpoint successfully received request",
      receivedBodyLength: body.length,
      bodyPreview: body.substring(0, 200) + (body.length > 200 ? "..." : ""),
      receivedHeaders: allHeaders,
      stripeSignaturePresent: !!stripeSignature,
      stripeSignaturePreview: stripeSignature 
        ? stripeSignature.substring(0, 20) + "..." 
        : "Not present"
    }, { status: 200 });
  } catch (err) {
    console.error("Webhook test error:", err);
    return NextResponse.json(
      { 
        status: "error",
        message: err instanceof Error ? err.message : "Unknown error",
        stack: err instanceof Error ? err.stack : undefined
      },
      { status: 500 }
    );
  }
} 