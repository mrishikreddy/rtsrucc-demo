import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, problem } = await req.json();

    if (!problem) {
      return new Response(
        JSON.stringify({ error: "Problem statement is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions1 = {
      from: process.env.EMAIL_USER,
      to: "malerishikreddy@gmail.com",
      subject: "Contact form received in SRUCC Demo Website",
      html: `
        <h3>Boss, You have Received a Message in contact form in SRUCC Demo Website</h3>
        <p><strong>Name:</strong> ${name || "Anonymous"}</p>
        <p><strong>Email:</strong> ${email || "Not provided"}</p>
        <p><strong>Message:</strong> ${problem}</p>
      `,
    };


   await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ success: "Message sent successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Email sending failed:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send email" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
