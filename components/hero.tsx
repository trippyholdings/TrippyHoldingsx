"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Mail } from "lucide-react"
import { motion } from "framer-motion"
import { siteData } from "@/lib/site-data"

export default function Hero() {
  const fullText = useMemo(() => "Roblox Developer (LuaU)", [])
  const [text, setText] = useState("")

  useEffect(() => {
    let i = 0
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.substring(0, i + 1))
        i++
      } else {
        clearInterval(typingInterval)
      }
    }, 70)

    return () => clearInterval(typingInterval)
  }, [fullText])

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.pageYOffset
    window.scrollTo({ top, behavior: "smooth" })
  }

  const prof = siteData.profile

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Hi, I’m <span className="text-primary">{prof.name}</span>
            </h1>

            <h2 className="text-2xl md:text-3xl font-medium text-muted-foreground mb-4">
              <span className="text-foreground">{text}</span>
              <span className="animate-blink">|</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-6 max-w-xl">{prof.tagline}</p>

            <div className="flex gap-4 flex-wrap mb-8">
              {prof.stats?.map((s, idx) => (
                <div key={idx} className="rounded-xl border bg-muted/40 px-4 py-3">
                  <div className="text-xl font-bold">{s.value}</div>
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group" onClick={() => scrollToSection("projects")}>
                See Portfolio
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button size="lg" variant="outline" asChild>
                <a href={`mailto:${siteData.contact.email}`}>
                  <Mail className="mr-2 h-4 w-4" />
                  Hire Me
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="relative aspect-square max-w-md mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full" />
            <div className="absolute inset-4 bg-muted rounded-full overflow-hidden border">
              <img
                src={prof.photo}
                alt={`${prof.name} portrait`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder-user.jpg"
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block">
        <button onClick={() => scrollToSection("about")} className="animate-bounce" aria-label="Scroll to About">
          <ArrowRight className="h-6 w-6 transform rotate-90" />
        </button>
      </div>
    </section>
  )
}
