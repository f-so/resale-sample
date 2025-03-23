import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      message: "API is working correctly"
    }, { status: 200 });
  } catch (error) {
    console.error("Healthcheck failed:", error);
    return NextResponse.json({
      status: "error",
      message: "API healthcheck failed"
    }, { status: 500 });
  }
}

// POSTリクエストも受け付けるようにしておく（webhook検証に役立つ）
export async function POST(req: Request) {
  try {
    // リクエストボディを取得して返す（エコー）
    const body = await req.text();
    const headers = Object.fromEntries(req.headers.entries());

    return NextResponse.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      receivedBody: body,
      receivedHeaders: headers,
      message: "POST request received successfully"
    }, { status: 200 });
  } catch (error) {
    console.error("POST healthcheck failed:", error);
    return NextResponse.json({
      status: "error",
      message: "POST healthcheck failed"
    }, { status: 500 });
  }
} 