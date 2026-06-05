"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  labels: string[]
}

export function StepIndicator({ currentStep, totalSteps, labels }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step, index) => (
        <div key={step} className="flex items-center">
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{
                scale: currentStep === step ? 1.1 : 1,
                backgroundColor: currentStep > step
                  ? "var(--primary)"
                  : currentStep === step
                    ? "var(--primary)"
                    : "var(--secondary)"
              }}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${currentStep >= step ? "text-primary-foreground" : "text-muted-foreground"
                }`}
            >
              {currentStep > step ? (
                <Check className="w-5 h-5" />
              ) : (
                step
              )}
            </motion.div>
            <span className={`text-xs mt-2 hidden sm:block ${currentStep >= step ? "text-primary" : "text-muted-foreground"
              }`}>
              {labels[index]}
            </span>
          </div>
          {index < totalSteps - 1 && (
            <div className="w-12 sm:w-20 h-1 mx-2 rounded-full overflow-hidden bg-secondary">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: currentStep > step ? "100%" : "0%" }}
                className="h-full bg-primary"
                transition={{ duration: 0.3 }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
