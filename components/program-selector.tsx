"use client"

import { motion } from "framer-motion"
import { Dumbbell, Salad, Trophy, Check } from "lucide-react"

interface ProgramSelectorProps {
  selectedProgram: string | null
  onSelect: (program: string) => void
}

const programs = [
  {
    id: "professional",
    title: "بدنسازی حرفه‌ای",
    description: "برنامه تخصصی برای ورزشکاران حرفه‌ای و رقابتی",
    icon: Trophy,
    price: "۴۵۰,۰۰۰",
    features: ["برنامه ۴ روز در هفته", "پشتیبانی ۲۴ ساعته", "ویدیو آموزشی"]
  },
  {
    id: "amateur",
    title: "بدنسازی آماتور",
    description: "برنامه مناسب برای شروع یا ادامه مسیر ورزشی",
    icon: Dumbbell,
    price: "۲۵۰,۰۰۰",
    features: ["برنامه ۳ روز در هفته", "پشتیبانی روزانه", "راهنمای تمرین"]
  },
  {
    id: "nutrition",
    title: "برنامه غذایی",
    description: "رژیم غذایی اختصاصی متناسب با اهداف شما",
    icon: Salad,
    price: "۲۰۰,۰۰۰",
    features: ["منوی هفتگی", "لیست خرید", "جایگزین غذایی"]
  }
]

export function ProgramSelector({ selectedProgram, onSelect }: ProgramSelectorProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {programs.map((program, index) => {
        const Icon = program.icon
        const isSelected = selectedProgram === program.id
        
        return (
          <motion.button
            key={program.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelect(program.id)}
            className={`relative p-6 rounded-2xl border-2 text-right transition-all ${
              isSelected 
                ? "border-primary bg-primary/10" 
                : "border-border bg-card hover:border-primary/50"
            }`}
          >
            {isSelected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-3 left-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
              >
                <Check className="w-4 h-4 text-primary-foreground" />
              </motion.div>
            )}
            
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
              isSelected ? "bg-primary" : "bg-secondary"
            }`}>
              <Icon className={`w-7 h-7 ${isSelected ? "text-primary-foreground" : "text-primary"}`} />
            </div>
            
            <h3 className="text-lg font-bold text-foreground mb-2">{program.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{program.description}</p>
            
            <div className="space-y-2 mb-4">
              {program.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {feature}
                </div>
              ))}
            </div>
            
            <div className="pt-4 border-t border-border">
              <span className="text-2xl font-bold text-primary">{program.price}</span>
              <span className="text-sm text-muted-foreground mr-1">تومان</span>
            </div>
          </motion.button>
        )
      })}
    </div>
  )
}

export function getSelectedProgramInfo(programId: string | null) {
  return programs.find(p => p.id === programId) || null
}
