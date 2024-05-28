const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const contactModel = require("../models/contact-model");

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_COUNT,
    pass: process.env.MAIL_ACCESSS,
  },
});

// router to check server healthy
router.get("/ping", (req, res) => {
  res.status(200).send("Server is healthy!");
});

router.post("/contacts", async (req, res) => {
  try {
    // database
    const client = new contactModel({
      name: req.body.name,
      email: req.body.email,
      project: req.body.project,
      message: req.body.message,
    });
    await client.save();

    // email
    const mailOptions = {
      from: process.env.MAIL_COUNT,
      to: process.env.MAIL_COUNT,
      subject: req.body.project,
      text: req.body.message,
      replyTo: req.body.email,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
    res.status(200).send(client);
  } catch (error) {
    console.error("Error processing contact form:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
