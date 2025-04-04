import { sendWelcomeEmail } from "@/utils/email";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

// raw-bodyを使用してリクエストボディを取得
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-02-24.acacia",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(req: Request) {
  try {
    // リクエストの詳細をログ出力
    console.log("Webhook received - Processing started");

    // 環境変数チェック
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("STRIPE_SECRET_KEY is not set");
      return NextResponse.json(
        { error: "Stripe configuration error" },
        { status: 500 }
      );
    }

    if (!endpointSecret) {
      console.error("STRIPE_WEBHOOK_SECRET is not set");
      return NextResponse.json(
        { error: "Webhook configuration error" },
        { status: 500 }
      );
    }

    // リクエストボディを取得
    const body = await req.text();

    // ヘッダーを取得
    const headersList = headers();
    const sig = headersList.get("stripe-signature");

    let event: Stripe.Event;

    try {
      if (!sig) throw new Error("No signature");

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

      switch (event.type) {
        case "checkout.session.completed": {
          const session = event.data.object as Stripe.Checkout.Session;
          console.log("Processing checkout.session.completed");
          console.log("Session details:", {
            customer_email: session.customer_email,
            customer_details: session.customer_details,
            metadata: session.metadata,
          });

          // メール送信前のSMTP設定チェック
          if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
            console.error("SMTP environment variables are not properly set");
            return NextResponse.json(
              { error: "Email service configuration error" },
              { status: 500 }
            );
          }

          try {
            await sendEmail(session);
            console.log("Email sent successfully");
          } catch (error) {
            console.error("sendEmail failed:", error);
            return NextResponse.json(
              { error: "Failed to send email notification" },
              { status: 500 }
            );
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
        { status: 500 }
      );
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
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
}
