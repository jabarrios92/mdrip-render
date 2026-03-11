import express from "express";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Feedback
  app.post("/api/feedback", async (req, res) => {
    const { name, email, message, rating } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const feedbackEmail = "mdrip.medellin@gmail.com";
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.error("Email configuration missing (SMTP_HOST, SMTP_USER, or SMTP_PASS). Logging feedback to console instead.");
      console.log("Feedback Received:", { name, email, message, rating });
      return res.json({ success: true, message: "Feedback received (logged to console as SMTP is not configured)" });
    }

    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(smtpPort || "587"),
        secure: smtpPort === "465",
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"MDrip Feedback" <${smtpUser}>`,
        to: feedbackEmail,
        subject: `New Customer Feedback from ${name || "Anonymous"}`,
        text: `
          Name: ${name || "N/A"}
          Email: ${email || "N/A"}
          Rating: ${rating || "N/A"}
          
          Message:
          ${message}
        `,
        html: `
          <h3>New Customer Feedback</h3>
          <p><strong>Name:</strong> ${name || "N/A"}</p>
          <p><strong>Email:</strong> ${email || "N/A"}</p>
          <p><strong>Rating:</strong> ${rating || "N/A"}/5</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      });

      res.json({ success: true, message: "Feedback sent successfully" });
    } catch (error: any) {
      console.error("Error sending email:", error);
      
      if (error.message && error.message.includes("535-5.7.8")) {
        console.error("CRITICAL: Authentication failed. If you are using Gmail, you MUST use an 'App Password', not your regular password.");
        return res.status(401).json({ 
          error: "Authentication failed", 
          details: "Please ensure you are using a Google App Password in the SMTP_PASS secret." 
        });
      }
      
      res.status(500).json({ error: "Failed to send feedback" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile("dist/index.html", { root: "." });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
