import { sendWelcomeEmail } from "@/utils/email";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

// OPTIONSリクエストに対応するハンドラ（CORS対応）
export async function OPTIONS() {
  return NextResponse.json({}, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, stripe-signature'
    }
  });
}

// raw-bodyを使用してリクエストボディを取得
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  try {
    // リクエストの詳細をログ出力
    console.log("Webhook received - Processing started");

    // リクエストボディを取得
    const body = await req.text();
    
    // デバッグ用にリクエストボディの一部をログ出力
    console.log("Request body (first 100 chars):", body.substring(0, 100));

    // ヘッダーを取得
    const headersList = headers();
    const sig = headersList.get("stripe-signature");
    
    // デバッグ用にすべてのヘッダーをログ出力
    console.log("All headers:", Object.fromEntries(headersList.entries()));
    console.log("Stripe signature header:", sig);

    let event: Stripe.Event;

    try {
      if (!sig) throw new Error("No signature");
      if (!endpointSecret) throw new Error("No endpoint secret");

      // エンドポイントシークレットをログ出力（セキュリティ上の理由から一部のみ）
      console.log("Using endpoint secret starting with:", endpointSecret.substring(0, 5) + "...");

      // 署名を検証
      event = stripe.webhooks.constructEvent(body, sig, endpointSecret);

      console.log("Signature verification successful");
    } catch (err: any) {
      console.error("Webhook signature verification failed:", err.message);
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}` },
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, stripe-signature'
          } 
        }
      );
    }

    // console.log(`Received event: ${event.id} of type ${event.type}`);
    // console.log("Event data:", JSON.stringify(event.data.object, null, 2));

    try {
      switch (event.type) {
        case "checkout.session.completed": {
          const session = event.data.object as Stripe.Checkout.Session;
          console.log("Processing checkout.session.completed");
          console.log("Session details:", {
            customer_email: session.customer_email,
            customer_details: session.customer_details,
            metadata: session.metadata,
          });

          try {
            await sendEmail(session);
          } catch (error) {
            console.error("sendEmail failed:", error);
            throw error;
          }
          break;
        }
        case "invoice.payment_succeeded": {
          const invoice = event.data.object as Stripe.Invoice;
          console.log("Processing invoice.payment_succeeded");
          break;
        }
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
    } catch (err) {
      console.error(`Error processing webhook:`, err);
      // エラーの詳細情報をログ出力
      if (err instanceof Error) {
        console.error("Error details:", {
          name: err.name,
          message: err.message,
          stack: err.stack,
        });
      }
      // 500エラーを返す
      return NextResponse.json(
        { error: "Internal server error" },
        { 
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, stripe-signature'
          }
        }
      );
    }

    return NextResponse.json(
      { received: true },
      { 
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, stripe-signature'
        }
      }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, stripe-signature'
        }
      }
    );
  }
  console.log("post-complete")
}

async function sendEmail(session: Stripe.Checkout.Session) {
  // customer_email または customer_details.email を確認
  const emailAddress =
    session.customer_email || session.customer_details?.email;
  if (!emailAddress) {
    const errorMessage = "No customer email found in session";
    console.error(errorMessage);
    throw new Error(errorMessage); // エラーをスローして処理を中断
  }

  try {
    await sendWelcomeEmail(
      emailAddress,
      session.customer_details?.name || "お客様"
    );
    console.log("Welcome email sent to:", emailAddress);
  } catch (error) {
    console.error("Failed to send welcome email:", error);
    throw error;
  }
  console.log("finish-sendEmail")
}
