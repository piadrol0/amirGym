"use client"

import { motion } from "framer-motion"
import { User, Ruler, Scale, Calendar } from "lucide-react"

interface UserInfoFormProps {
  formData: {
    name: string
    height: string
    phone?: string
    notes?: string
    weight: string
    experience: string
  }
  onChange: (field: string, value: string) => void
}

export function UserInfoForm({ formData, onChange }: UserInfoFormProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            نام و نام خانوادگی
          </label>
          <input
            required
            type="text"
            value={formData.name}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder="نام خود را وارد کنید"
            className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Ruler className="w-4 h-4 text-primary" />
            قد (سانتی‌متر)
          </label>
          <input
            required
            type="tel"
            inputMode="numeric"
            value={formData.height}
            onChange={(e) => onChange("height", e.target.value)}
            placeholder="مثال: 175"
            className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Scale className="w-4 h-4 text-primary" />
            وزن (کیلوگرم)
          </label>
          <input
            required
            type="tel"
            inputMode="numeric"
            value={formData.weight}
            onChange={(e) => onChange("weight", e.target.value)}
            placeholder="مثال: 70"
            className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            شماره تلفن
          </label>
          <input
            required
            type="tel"
            inputMode="tel"
            value={formData.phone || ""}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="مثال: 09123456789"
            className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            سابقه تمرینی
          </label>
          <select
            value={formData.experience}
            onChange={(e) => onChange("experience", e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none cursor-pointer"
          >
            <option value="">انتخاب کنید</option>
            <option value="beginner">مبتدی (کمتر از ۶ ماه)</option>
            <option value="intermediate">متوسط (۶ ماه تا ۲ سال)</option>
            <option value="advanced">پیشرفته (بیش از ۲ سال)</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          توضیحات اضافی (اختیاری)
        </label>
        <textarea
          placeholder="هدف، محدودیت‌ها یا سوابق پزشکی خاص..."
          value={formData.notes || ""}
          onChange={(e) => onChange("notes", e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all min-h-[100px] resize-none"
        />
      </div>
    </motion.div>
  )
}
