import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, answer, message, timestamp } = body;

    // Validate required fields
    if (!name || !answer) {
      return NextResponse.json(
        { error: "Name and answer are required" },
        { status: 400 }
      );
    }

    // Create transporter with SMTP configuration
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Format the email content
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              background: linear-gradient(135deg, #fff5f7 0%, #ffe4e9 100%);
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: white;
              border-radius: 20px;
              padding: 40px;
              box-shadow: 0 10px 40px rgba(255, 79, 129, 0.2);
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .emoji {
              font-size: 60px;
              margin-bottom: 20px;
            }
            h1 {
              color: #ff4f81;
              font-size: 32px;
              margin: 0;
            }
            .content {
              background: #fff5f7;
              border-radius: 15px;
              padding: 25px;
              margin: 20px 0;
            }
            .field {
              margin: 15px 0;
              padding: 10px 0;
              border-bottom: 1px solid #ffe4e9;
            }
            .field:last-child {
              border-bottom: none;
            }
            .label {
              color: #ff4f81;
              font-weight: bold;
              font-size: 14px;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            .value {
              color: #2d1b1e;
              font-size: 18px;
              margin-top: 5px;
            }
            .message-box {
              background: white;
              border-left: 4px solid #ff4f81;
              padding: 15px;
              margin-top: 10px;
              font-style: italic;
              color: #555;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              color: #999;
              font-size: 12px;
            }
            .hearts {
              text-align: center;
              font-size: 24px;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="emoji">💍❤️</div>
              <h1>✅ Swati Accepted Your Marriage Proposal!</h1>
            </div>
            
            <div class="hearts">❤️ 💕 💖 💗 💝 💞</div>
            
            <div class="content">
              <div class="field">
                <div class="label">Her Name</div>
                <div class="value">${name}</div>
              </div>
              
              <div class="field">
                <div class="label">Her Answer</div>
                <div class="value">${answer}</div>
              </div>
              
              ${
                message
                  ? `
              <div class="field">
                <div class="label">Her Message</div>
                <div class="message-box">${message}</div>
              </div>
              `
                  : ""
              }
              
              <div class="field">
                <div class="label">Timestamp</div>
                <div class="value">${new Date(timestamp).toLocaleString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}</div>
              </div>
            </div>
            
            <div class="hearts">🌹 🌹 🌹 🌹 🌹</div>
            
            <div class="footer">
              <p>This is a special moment in your life! 💕</p>
              <p>Sent from your Marriage Proposal Website</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Plain text version
    const emailText = `
✅ Swati Accepted Your Marriage Proposal!

Her Name: ${name}
Her Answer: ${answer}
${message ? `Her Message: ${message}` : ""}
Timestamp: ${new Date(timestamp).toLocaleString()}

This is a special moment in your life! 💕
    `;

    // Send email
    const info = await transporter.sendMail({
      from: `"Marriage Proposal 💍" <${process.env.SMTP_USER}>`,
      to: process.env.BOYFRIEND_EMAIL,
      subject: "✅ Swati Accepted Your Marriage Proposal! 💍❤️",
      text: emailText,
      html: emailHtml,
    });

    console.log("Message sent: %s", info.messageId);

    return NextResponse.json(
      {
        success: true,
        message: "Email sent successfully!",
        messageId: info.messageId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      {
        error: "Failed to send email",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

