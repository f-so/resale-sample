import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendWelcomeEmail(email: string, name: string) {
  try {
    await sgMail.send({
      to: email,
      from: "your-verified-sender@example.com",
      subject: "ご登録ありがとうございます",
      text: `${name}様\n\nご登録ありがとうございます。`,
      html: `<p>${name}様</p><p>ご登録ありがとうございます。</p>`,
    });
  } catch (error) {
    console.error("Email sending error:", error);
    throw error;
  }
}
