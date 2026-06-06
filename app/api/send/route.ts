import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const baseText = `
ثبت سفارش جدید

کد سفارش: ${data.orderId || "-"}

نام: ${data.name}

قد: ${data.height}

وزن: ${data.weight}

سابقه تمرینی: ${data.experience}

برنامه انتخابی: ${data.program}
`;

    const notesText = data.notes ? `\nتوضیحات اضافی:\n${data.notes}\n` : "";

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "amirrabbi20@gmail.com",
      subject: `ثبت نام جدید باشگاه - کد سفارش: ${data.orderId || "-"}`,
      text: baseText + notesText,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
