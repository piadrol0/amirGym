"use client"

import { motion } from "framer-motion"
import { Copy, Check, CreditCard, MessageCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { getSelectedProgramInfo } from "./program-selector"

interface PaymentInfoProps {
  selectedProgram: string | null
}

export function PaymentInfo({ selectedProgram }: PaymentInfoProps) {
  const [copied, setCopied] = useState(false)
  const [remainingSeconds, setRemainingSeconds] = useState(60 * 60)
  const cardNumber = "6037-9974-3612-9036"
  const programInfo = getSelectedProgramInfo(selectedProgram)

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingSeconds((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const minutes = Math.floor(remainingSeconds / 60)
  const seconds = remainingSeconds % 60
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(cardNumber.replace(/-/g, ""))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      console.log("Failed to copy")
    }
  }

  const telegramLink = "https://t.me/amirrabipoor"

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      {/* Order Summary */}
      <div className="p-6 rounded-2xl bg-card border border-border">
        <h3 className="text-lg font-bold text-foreground mb-4">خلاصه سفارش</h3>
        <div className="flex justify-between items-center py-3 border-b border-border">
          <span className="text-muted-foreground">نوع برنامه</span>
          <span className="font-medium text-foreground">{programInfo?.title || "-"}</span>
        </div>
        <div className="flex justify-between items-center py-3">
          <span className="text-muted-foreground">مبلغ قابل پرداخت</span>
          <span className="text-2xl font-bold text-primary">{programInfo?.price || "۰"} تومان</span>
        </div>
      </div>

      {/* Card Info */}
      <div className="p-6 rounded-2xl bg-card border border-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">اطلاعات کارت بانکی</h3>
            <p className="text-sm text-muted-foreground">بانک ملی ایران - به نام امیر ربیع پور</p>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl bg-secondary">
          <span className="font-mono text-lg tracking-wider text-foreground" dir="ltr">
            {cardNumber}
          </span>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                کپی شد
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                کپی
              </>
            )}
          </button>
        </div>

        <div className="mt-4 rounded-2xl bg-primary/10 border border-primary/20 p-4">
          <p className="text-sm font-medium text-foreground mb-2">
            شماره کارت تا ۶۰ دقیقه دیگر معتبر است.
          </p>
          <p className="text-lg font-bold text-primary">زمان باقی‌مانده: {formattedTime}</p>
          {remainingSeconds === 0 && (
            <p className="text-sm text-destructive mt-2">
              اعتبار کارت به پایان رسیده است. لطفاً صفحه را تازه کنید یا دوباره پرداخت را امتحان کنید.
            </p>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
        <h4 className="font-bold text-foreground mb-3">مراحل پرداخت:</h4>
        <ol className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full  text-xs flex items-center justify-center shrink-0 mt-0.5">۱</span>
            مبلغ فوق را به شماره کارت واریز کنید
          </li>
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full  text-xs flex items-center justify-center shrink-0 mt-0.5">۲</span>
            اسکرین‌شات فیش واریزی را ذخیره کنید
          </li>
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full  text-xs flex items-center justify-center shrink-0 mt-0.5">۳</span>
            روی دکمه زیر کلیک کرده و فیش را در تلگرام ارسال کنید
          </li>
        </ol>
      </div>

      {/* Telegram Button */}
      <a
        href={telegramLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-colors"
      >
        <MessageCircle className="w-6 h-6" />
        ارسال فیش در تلگرام
      </a>
    </motion.div>
  )
}
