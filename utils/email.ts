import nodemailer from "nodemailer";

// メール送信用のトランスポーター設定
function createTransporter() {
  // 環境変数チェック
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const secure = process.env.SMTP_SECURE === "true"; // true for 465, false for other ports

  // 必須パラメータのチェック
  if (!host || !user || !pass) {
    console.error("SMTP configuration is incomplete:", { 
      host: !!host, 
      port: !!port, 
      user: !!user, 
      pass: !!pass 
    });
    throw new Error("SMTP configuration is incomplete");
  }

  // トランスポーターを作成して返す
  return nodemailer.createTransport({
    host,
    port: isNaN(port) ? 587 : port, // デフォルトは587
    secure,
    auth: {
      user,
      pass,
    },
  });
}

export async function sendWelcomeEmail(toEmail: string, name: string) {
  if (!toEmail) {
    throw new Error("メールアドレスが指定されていません");
  }

  // 送信元アドレスを確認
  const from = process.env.SMTP_FROM;
  if (!from) {
    throw new Error("SMTP_FROMが設定されていません");
  }

  const msg = {
    from, // 送信元メールアドレス
    to: toEmail,
    subject: "ご登録ありがとうございます",
    text: `${name}様\n\nご登録ありがとうございます。\n\nこちらから登録したメールアドレスを運営者に送信してください：https://lin.ee/ORf3l7j\n（決済時に設定したメールアドレスと違う場合は認証できません。）`,
    html: `
      <div style="font-family: sans-serif;">
        <p>${name}様</p>
        <p>ご登録ありがとうございます。</p>
        <p><a href="https://lin.ee/ORf3l7j">こちら</a>から登録したメールアドレスを運営者に送信してください。</p>
        <p>（決済時に設定したメールアドレスと違う場合は認証できません。）</p>
        <br>
        <p>メールのリンクが開けない方はこちらをコピーしてください：https://lin.ee/ORf3l7j</p>
      </div>
    `,
  };

  try {
    console.log("メール送信を開始します...");
    // 毎回新しいトランスポーターを作成
    const transporter = createTransporter();
    
    // メール送信を試行
    const info = await transporter.sendMail(msg);
    console.log("Welcome email sent successfully to:", toEmail, "Message ID:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending welcome email:", error);
    // より詳細なエラー情報
    if (error instanceof Error) {
      console.error("Error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
    }
    throw error;
  }
}