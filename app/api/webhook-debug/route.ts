import { sendWelcomeEmail } from "@/utils/email";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

// Stripeインスタンスを初期化
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-02-24.acacia",
});

// Webhookシークレットを取得
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(req: Request) {
  try {
    console.log("Webhook debug - Processing started");

    // Stripeキーのチェック
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("STRIPE_SECRET_KEY is not set");
      return NextResponse.json(
        { error: "STRIPE_SECRET_KEY is not set" },
        { status: 500 }
      );
    }

    // シークレットのチェック
    if (!endpointSecret) {
      console.error("STRIPE_WEBHOOK_SECRET is not set");
      return NextResponse.json(
        { error: "STRIPE_WEBHOOK_SECRET is not set" },
        { status: 500 }
      );
    }

    // リクエストボディを取得
    const body = await req.text();
    if (!body) {
      console.error("Request body is empty");
      return NextResponse.json(
        { error: "Request body is empty" },
        { status: 400 }
      );
    }

    // ヘッダーを取得
    const headersList = headers();
    const sig = headersList.get("stripe-signature");
    if (!sig) {
      console.error("stripe-signature header is missing");
      return NextResponse.json(
        { error: "stripe-signature header is missing" },
        { status: 400 }
      );
    }

    let event: Stripe.Event;
    
    try {
      // 署名を検証
      event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
      console.log("Signature verification successful");
    } catch (err: any) {
      console.error("Webhook signature verification failed:", err.message);
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}` },
        { status: 400 }
      );
    }

    // イベント処理
    try {
      console.log(`Received event: ${event.id} of type ${event.type}`);
      
      if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("Processing checkout.session.completed, session ID:", session.id);
        
        // セッションの詳細をログ出力
        console.log("Session details:", {
          id: session.id,
          customer_email: session.customer_email,
          customer_details: session.customer_details,
          metadata: session.metadata,
        });

        try {
          // メールアドレスの取得
          const emailAddress = session.customer_email || session.customer_details?.email;
          if (!emailAddress) {
            console.error("No customer email found in session");
            return NextResponse.json(
              { error: "No customer email found in session" },
              { status: 400 }
            );
          }

          // SMTPの設定確認
          if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
            console.error("SMTP environment variables are not properly set");
            return NextResponse.json(
              { error: "SMTP environment variables are not properly set" },
              { status: 500 }
            );
          }

          // メール送信を試みる
          try {
            await sendWelcomeEmail(
              emailAddress,
              session.customer_details?.name || "お客様"
            );
            console.log("Welcome email sent to:", emailAddress);
          } catch (emailError) {
            console.error("Failed to send welcome email:", emailError);
            return NextResponse.json(
              { 
                error: "Failed to send welcome email", 
                details: emailError instanceof Error ? emailError.message : String(emailError)
              },
              { status: 500 }
            );
          }
          
        } catch (sessionError) {
          console.error("Error processing session:", sessionError);
          return NextResponse.json(
            { 
              error: "Error processing session", 
              details: sessionError instanceof Error ? sessionError.message : String(sessionError)
            },
            { status: 500 }
          );
        }
      } else {
        console.log(`Unhandled event type ${event.type}`);
      }
      
      // 成功レスポンス
      return NextResponse.json({ 
        status: "success", 
        message: `Processed ${event.type} event successfully`
      });
      
    } catch (err) {
      console.error(`Error processing webhook:`, err);
      return NextResponse.json(
        { 
          error: "Internal server error",
          details: err instanceof Error ? err.message : String(err)
        },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      { 
        error: "Internal server error", 
        details: err instanceof Error ? err.message : String(err) 
      },
      { status: 500 }
    );
  }
} 