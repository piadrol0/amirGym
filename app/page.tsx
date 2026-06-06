"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Dumbbell } from "lucide-react"
import CircularProgress from "@mui/material/CircularProgress"
import { StepIndicator } from "@/components/step-indicator"
import { ProgramSelector } from "@/components/program-selector"
import { UserInfoForm } from "@/components/user-info-form"
import { PaymentInfo } from "@/components/payment-info"

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(10)
  const [formData, setFormData] = useState({
    name: "",
    height: "",
    phone: "",
    weight: "",
    experience: ""
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 20 ? 10 : prevProgress + 2))
    }, 800)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const stepLabels = ["انتخاب برنامه", "اطلاعات شما", "پرداخت"]

  const generateOrderId = () => {
    const timestamp = Date.now()
    return `ORD-${timestamp}`
  }

  const canProceed = () => {
    if (currentStep === 1) return selectedProgram !== null

    if (currentStep === 2) {
      return (
        formData.name &&
        formData.height &&
        formData.weight &&
        formData.experience
      )
    }

    return true
  }

  const sendEmail = async (newOrderId: string) => {
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: newOrderId,
          name: formData.name,
          height: formData.height,
          weight: formData.weight,
          phone: formData.phone,
          experience: formData.experience,
          program: selectedProgram,
        }),
      })

      const result = await response.json()
      console.log(result)
    } catch (error) {
      console.error("Email error:", error)
    }
  }

  const handleNext = async () => {
    if (!canProceed()) return
    if (isLoading) return

    setIsLoading(true)

    try {
      if (currentStep === 2) {
        const newOrderId = generateOrderId()
        setOrderId(newOrderId)
        await sendEmail(newOrderId)
      }

      if (currentStep < 3) {
        setCurrentStep((prev) => prev + 1)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFormChange = (field: string, value: string) => {
    const convertToEnglishDigits = (v: string) => {
      if (!v) return v
      // Persian digits \u06F0-\u06F9 and Arabic-Indic digits \u0660-\u0669
      return v.replace(/[\u06F0-\u06F9]/g, (c) => String(c.charCodeAt(0) - 0x06f0)).replace(/[\u0660-\u0669]/g, (c) => String(c.charCodeAt(0) - 0x0660)).replace(/،/g, ",")
    }

    const numericFields = ["height", "weight", "phone"]
    const newValue = numericFields.includes(field) ? convertToEnglishDigits(value) : value

    setFormData((prev) => ({
      ...prev,
      [field]: newValue,
    }))
  }
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
        <div className="container mx-auto px-4 py-8 relative">
          <div className="flex items-center justify-center gap-3 mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Fitora
            </h1>
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <Dumbbell className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
          <p className="text-center text-muted-foreground max-w-md mx-auto">
            برنامه تمرینی و تغذیه اختصاصی متناسب با اهداف شما
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <StepIndicator
          currentStep={currentStep}
          totalSteps={3}
          labels={stepLabels}
        />

        <div className="bg-card rounded-3xl border border-border p-6 md:p-8 shadow-xl shadow-slate-200/80">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <h2 className="text-xl font-bold text-foreground mb-6">
                  نوع برنامه خود را انتخاب کنید
                </h2>
                <ProgramSelector
                  selectedProgram={selectedProgram}
                  onSelect={setSelectedProgram}
                />
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <h2 className="text-xl font-bold text-foreground mb-6">
                  اطلاعات خود را وارد کنید
                </h2>
                <UserInfoForm
                  formData={formData}
                  onChange={handleFormChange}
                />
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <h2 className="text-xl font-bold text-foreground mb-6">
                  پرداخت و ثبت سفارش
                </h2>
                <PaymentInfo
                  selectedProgram={selectedProgram}
                  orderId={orderId}
                  customerName={formData.name}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${currentStep === 1
                ? "opacity-50 cursor-not-allowed text-muted-foreground"
                : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
            >
              <ArrowRight className="w-5 h-5" />
              مرحله قبل
            </button>

            {currentStep < 3 && (
              <button
                onClick={handleNext}
                disabled={!canProceed() || isLoading}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${canProceed() && !isLoading
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
              >
                مرحله بعد
              </button>
            )}
          </div>
        </div>

        {isLoading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="w-24 h-24 rounded-full bg-card/90 flex items-center justify-center">
              <CircularProgress
                variant="determinate"
                value={progress * 5}
                size={56}
                thickness={4}
                aria-label="Loading"
              />
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-8 text-sm text-muted-foreground">
          <p>برای سوالات و پشتیبانی با ما در تلگرام در ارتباط باشید</p>
        </footer>
      </div>
    </main>
  )
}
