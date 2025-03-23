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
    console.log("Public webhook received - Processing started");

    // リクエストボディを取得
    const body = await req.text();
    
    // デバッグ用にリクエストボディの一部をログ出力
    console.log("Request body length:", body.length);
    console.log("Request body preview:", body.substring(0, 100));

    // ヘッダーを取得
    const headersList = headers();
    const sig = headersList.get("stripe-signature");
    
    // デバッグ用にすべてのヘッダーをログ出力
    console.log("Headers presence:", !!headersList);
    console.log("Stripe signature header:", sig ? "Present" : "Not present");

    if (!sig) {
      console.error("No stripe-signature header found");
      return NextResponse.json(
        { error: "No stripe-signature header found" },
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

    if (!endpointSecret) {
      console.error("Webhook secret is not configured");
      return NextResponse.json(
        { error: "Webhook secret is not configured" },
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

    let event: Stripe.Event;

    try {
      // 署名を検証
      event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
      console.log("Signature verification successful for event:", event.type);
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

    // イベントタイプに基づく処理
    try {
      if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("Processing checkout.session.completed");
        console.log("Session details:", {
          customer_email: session.customer_email,
          customer_details: session.customer_details,
          metadata: session.metadata,
        });

        // メール送信処理
        try {
          const emailAddress = session.customer_email || session.customer_details?.email;
          if (!emailAddress) {
            throw new Error("No customer email found in session");
          }

          await sendWelcomeEmail(
            emailAddress,
            session.customer_details?.name || "お客様"
          );
          console.log("Welcome email sent to:", emailAddress);
        } catch (error) {
          console.error("Email sending failed:", error);
        }
      } else {
        console.log(`Received event of type: ${event.type}`);
      }
    } catch (err) {
      console.error("Error processing webhook event:", err);
      return NextResponse.json(
        { error: "Error processing webhook event" },
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

    // 正常応答
    return NextResponse.json(
      { received: true, event_type: event.type },
      { 
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, stripe-signature'
        }
      }
    );
  } catch (err) {
    console.error("Unexpected error in webhook handler:", err);
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
} 