"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Dumbbell } from "lucide-react"
import { StepIndicator } from "@/components/step-indicator"
import { ProgramSelector } from "@/components/program-selector"
import { UserInfoForm } from "@/components/user-info-form"
import { PaymentInfo } from "@/components/payment-info"

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    height: "",
    weight: "",
    experience: ""
  })

  const stepLabels = ["انتخاب برنامه", "اطلاعات شما", "پرداخت"]

  const canProceed = () => {
    if (currentStep === 1) return selectedProgram !== null
    if (currentStep === 2) {
      return formData.name && formData.height && formData.weight && formData.experience
    }
    return true
  }

  const handleNext = () => {
    if (canProceed() && currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
        <div className="container mx-auto px-4 py-8 relative">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <Dumbbell className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              امیر ربیع پور - برنامه تمرینی و تغذیه اختصاصی
            </h1>
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
                <PaymentInfo selectedProgram={selectedProgram} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                currentStep === 1
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
                disabled={!canProceed()}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  canProceed()
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                مرحله بعد
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-8 text-sm text-muted-foreground">
          <p>برای سوالات و پشتیبانی با ما در تلگرام در ارتباط باشید</p>
        </footer>
      </div>
    </main>
  )
}
