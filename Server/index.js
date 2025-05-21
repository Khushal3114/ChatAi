const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Predefined replies by category
const replyBank = [
  "For bank-related queries, please ensure your account is verified.",
  "Please visit your nearest bank branch for more support.",
  "Bank transactions may take up to 2-3 business days."
];

const replyRefund = [
  "You can request a refund from the order details page.",
  "Refunds are processed within 5-7 business days.",
  "Please provide your order ID for refund assistance."
];

const replyDefault = [
  "I'm here to help! Could you please provide more details?",
  "Let me check that for you.",
  "Thank you for reaching out! We’re working on your query."
];

// Category detection logic
function detectCategory(message) {
  const msg = message.toLowerCase();
  if (msg.includes("bank") || msg.includes("account") || msg.includes("transaction")) {
    return "bank";
  } else if (msg.includes("refund") || msg.includes("return") || msg.includes("money back")) {
    return "refund";
  }
  return "default";
}

// Chat endpoint
app.post("/chat", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message not provided" });
  }

  const category = detectCategory(message);
  let reply;

  if (category === "bank") {
    reply = replyBank[Math.floor(Math.random() * replyBank.length)];
  } else if (category === "refund") {
    reply = replyRefund[Math.floor(Math.random() * replyRefund.length)];
  } else {
    reply = replyDefault[Math.floor(Math.random() * replyDefault.length)];
  }

  return res.json({ reply });
});

// 🧠 Serve frontend from Express (for combined deployment)
app.use(express.static(path.join(__dirname, "../client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
