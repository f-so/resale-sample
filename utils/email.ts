import nodemailer from "nodemailer";


// メール送信用のトランスポーター設定
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendWelcomeEmail(toEmail: string, name: string) {
  if (!toEmail) {
    throw new Error("メールアドレスが指定されていません");
  }

  const msg = {
    from: process.env.SMTP_FROM, // 送信元メールアドレス
    to: toEmail,
    subject: "ご登録ありがとうございます",
    text: `${name}様\n\nご登録ありがとうございます。`,
    html: `
      <div style="font-family: sans-serif;">
        <p>${name}様</p>
        <p>ご登録ありがとうございます。</p>
        <p><a href="https://lin.ee/ORf3l7j">こちら</a>から登録したメールアドレスを運営者に送信してください。</p>
        <p>（決済時に設定したメールアドレスと違う場合は認証できません。）</p>
        <br>
        <p>メールのリンクが開けない方はこちらをコピーしてください：https://lin.ee/ORf3l7j</a></p>
      </div>
    `,
  };

  // // 開発環境ではメール送信をスキップするが、メール内容はログに出力する
  // if (process.env.NODE_ENV === "development") {
  //   console.log(
  //     "Development mode: Email would be sent with the following details:"
  //   );
  //   console.log(msg);
  //   return; // メール送信はスキップするが、エラーは発生させない
  // }

  try {
    await transporter.sendMail(msg);
    console.log("Welcome email sent successfully to:", toEmail);
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw error;
  }
}