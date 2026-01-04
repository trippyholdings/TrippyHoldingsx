"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Code2,
  Layout,
  Server,
  Database,
  Wrench,
  Shield,
  Gauge,
  Boxes,
  Sparkles,
  Network,
} from "lucide-react"
import { siteData } from "@/lib/site-data"

type Skill = { name: string; level: number }
type Category = {
  icon: React.ReactNode
  title: string
  description: string
  skills: Skill[]
}

function normalizeSkillName(s: string) {
  return s.trim().replace(/\s+/g, " ")
}

function skillLevel(name: string) {
  const n = name.toLowerCase()

  // High-confidence core strengths for Roblox/LuaU scripting work
  if (n.includes("luau") || n.includes("roblox")) return 95
  if (n.includes("network") || n.includes("replication") || n.includes("remote")) return 92
  if (n.includes("datastore") || n.includes("profilestore") || n.includes("persistence")) return 90
  if (n.includes("optimization") || n.includes("performance") || n.includes("caching")) return 92
  if (n.includes("security") || n.includes("exploit") || n.includes("validation") || n.includes("anti")) return 90
  if (n.includes("ui") || n.includes("ux") || n.includes("gui") || n.includes("tween")) return 88
  if (n.includes("state") || n.includes("session") || n.includes("machine")) return 88
  if (n.includes("physics") || n.includes("collision") || n.includes("raycast") || n.includes("overlap")) return 86
  if (n.includes("rng") || n.includes("probability") || n.includes("weight")) return 86
  if (n.includes("vfx") || n.includes("sound") || n.includes("fx")) return 84
  if (n.includes("logging") || n.includes("diagnostics") || n.includes("debug")) return 84
  if (n.includes("input") || n.includes("proximity")) return 84
  if (n.includes("tool")) return 82

  // General default for “I can do this comfortably”
  return 80
}

function pick(skills: string[], keywords: string[]) {
  const out: string[] = []
  for (const s of skills) {
    const lower = s.toLowerCase()
    if (keywords.some((k) => lower.includes(k))) out.push(s)
  }
  return out
}

function uniqueSkills(list: string[]) {
  const seen = new Set<string>()
  const out: string[] = []
  for (const s of list) {
    const n = normalizeSkillName(s)
    const key = n.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    out.push(n)
  }
  return out
}

export default function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const rawSkills = useMemo(() => siteData.profile.skills ?? [], [])
  const all = useMemo(() => uniqueSkills(rawSkills), [rawSkills])

  const technologies: Record<string, Category> = useMemo(() => {
    // Categorize using the actual skills list from your HTML-backed data
    const languages = uniqueSkills([
      ...pick(all, ["luau", "lua", "typescript", "javascript"]),
      // Ensure core entries show even if wording changes
      ...all.filter((s) => ["luau", "lua"].includes(s.toLowerCase())),
    ])

    const robloxCore = uniqueSkills([
      ...pick(all, ["roblox studio", "roblox", "luau"]),
      ...pick(all, ["module", "oop", "state", "session"]),
      ...pick(all, ["combat", "ability", "tool", "inventory", "economy"]),
    ])

    const networking = uniqueSkills([
      ...pick(all, ["network", "replication", "remote"]),
      ...pick(all, ["server authority", "validation"]),
    ])

    const data = uniqueSkills([
      ...pick(all, ["datastore", "profilestore", "persistence", "data"]),
      ...pick(all, ["rng", "probability", "weight"]),
    ])

    const ui = uniqueSkills([
      ...pick(all, ["ui", "ux", "gui"]),
      ...pick(all, ["tween", "indicator", "hover"]),
    ])

    const perf = uniqueSkills([
      ...pick(all, ["optimization", "performance", "caching"]),
      ...pick(all, ["physics", "collision", "raycast", "overlap", "impulse"]),
      ...pick(all, ["cleanup", "debris"]),
    ])

    const tools = uniqueSkills([
      ...pick(all, ["git", "logging", "diagnostics", "debug"]),
      ...pick(all, ["a-chassis"]),
    ])

    // Convert to {name, level}
    const toLeveled = (arr: string[]) =>
      arr.map((name) => ({ name, level: skillLevel(name) })).sort((a, b) => b.level - a.level)

    return {
      roblox: {
        icon: <Boxes className="h-6 w-6" />,
        title: "Roblox Systems",
        description: "Gameplay systems, architecture, and scalable LuaU patterns",
        skills: toLeveled(
          robloxCore.length
            ? robloxCore
            : ["LuaU / Roblox", "OOP / Module Systems", "State & Session Management", "Inventory & Economy Systems"],
        ),
      },
      languages: {
        icon: <Code2 className="h-6 w-6" />,
        title: "Languages",
        description: "Core scripting and web basics used in production",
        skills: toLeveled(languages.length ? languages : ["LuaU", "TypeScript"]),
      },
      networking: {
        icon: <Network className="h-6 w-6" />,
        title: "Networking",
        description: "Replication sanity, server authority, and clean client-server flow",
        skills: toLeveled(
          networking.length
            ? networking
            : ["Networking & Replication (RemoteEvents / RemoteFunctions)", "Security & Exploit Prevention"],
        ),
      },
      ui: {
        icon: <Layout className="h-6 w-6" />,
        title: "UI and UX",
        description: "Clean UI, feedback, and motion that feels premium",
        skills: toLeveled(ui.length ? ui : ["UI Design (Roblox GUI, Tweening, Indicators)", "Input Handling"]),
      },
      data: {
        icon: <Database className="h-6 w-6" />,
        title: "Data and RNG",
        description: "Persistence, progression, and weighted reward systems",
        skills: toLeveled(data.length ? data : ["Datastores & Persistence", "RNG & Probability Weighting"]),
      },
      perf: {
        icon: <Gauge className="h-6 w-6" />,
        title: "Performance and Physics",
        description: "Optimization, collision logic, and stable physics behavior",
        skills: toLeveled(perf.length ? perf : ["Optimization & Performance", "Physics & Collision"]),
      },
      security: {
        icon: <Shield className="h-6 w-6" />,
        title: "Security",
        description: "Server validation, anti-abuse patterns, and safe replication",
        skills: toLeveled(
          uniqueSkills([
            ...pick(all, ["security", "exploit", "validation", "anti"]),
            "Security & Exploit Prevention (server authority, validation, anti-abuse)",
          ]),
        ),
      },
      tools: {
        icon: <Wrench className="h-6 w-6" />,
        title: "Tools and Workflow",
        description: "Debugging discipline and practical production tooling",
        skills: toLeveled(
          tools.length ? tools : ["Logging & Diagnostics (debug channels, error tracing)", "Git"],
        ),
      },
      polish: {
        icon: <Sparkles className="h-6 w-6" />,
        title: "Polish",
        description: "VFX, sound, and micro-interactions that lift the whole game",
        skills: toLeveled(uniqueSkills([...pick(all, ["vfx", "sound", "fx"]), "VFX", "Sound"])),
      },
      backend: {
        icon: <Server className="h-6 w-6" />,
        title: "Service Patterns",
        description: "Clean server modules and game-loop orchestration",
        skills: toLeveled(
          uniqueSkills([
            ...pick(all, ["service", "manager", "handler", "state"]),
            "OOP / Module Systems",
            "State & Session Management (round/session IDs, cleanup)",
          ]),
        ),
      },
    }
  }, [all])

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const scaleUp = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  }

  return (
    <section id="tech-stack" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            Skills
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Expertise</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(technologies).map(([key, category]) => (
            <motion.div
              key={key}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              variants={scaleUp}
            >
              <Card
                className={`h-full cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedCategory === key ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedCategory(selectedCategory === key ? null : key)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-primary/10 p-3 rounded-full">{category.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold">{category.title}</h3>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                  </div>

                  <AnimatePresence>
                    {selectedCategory === key && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        {category.skills.map((skill, index) => (
                          <motion.div
                            key={`${skill.name}-${index}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.06 }}
                            className="space-y-2"
                          >
                            <div className="flex justify-between text-sm">
                              <span className="font-medium">{skill.name}</span>
                              <span className="text-muted-foreground">{skill.level}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-1.5">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ duration: 0.5, delay: index * 0.06 }}
                                className="bg-primary h-1.5 rounded-full"
                              />
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {selectedCategory !== key && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {category.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={`${skill.name}-${index}`} variant="secondary">
                          {skill.name}
                        </Badge>
                      ))}
                      {category.skills.length > 3 && (
                        <Badge variant="secondary">+{category.skills.length - 3} more</Badge>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          variants={fadeIn}
          className="mt-12 text-center text-muted-foreground"
        >
          <p className="max-w-2xl mx-auto">
            These levels are self-rated and focused on real shipped work: scalable LuaU systems, clean replication,
            persistence, UI polish, and performance-minded gameplay.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
