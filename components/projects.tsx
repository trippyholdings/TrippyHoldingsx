"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { siteData, type MediaItem, type ProjectItem } from "@/lib/site-data"

function toYouTubeEmbed(url: string) {
  try {
    const u = new URL(url)
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.replace("/", "")
      return `https://www.youtube.com/embed/${id}`
    }
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v")
      if (id) return `https://www.youtube.com/embed/${id}`
    }
  } catch {}
  return url
}

function MediaView({ item }: { item: MediaItem }) {
  if (item.type === "video") {
    const embed = toYouTubeEmbed(item.src)
    return (
      <div className="w-full aspect-video overflow-hidden rounded-xl border bg-black">
        <iframe
          src={embed}
          title="Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    )
  }

  return (
    <div className="w-full overflow-hidden rounded-xl border bg-muted">
      <img
        src={item.src}
        alt="Project media"
        className="w-full h-auto object-cover"
        onError={(e) => {
          e.currentTarget.src = "/placeholder.jpg"
        }}
      />
    </div>
  )
}

export default function Projects() {
  const projects = siteData.projects
  const showcases = projects.filter((p) => p.variant === "showcase")
  const fullProjects = projects.filter((p) => p.variant === "project")
  const [open, setOpen] = useState(false)
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const fadeIn = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    }),
    [],
  )

  const openProject = (p: ProjectItem) => {
    setActiveProject(p)
    setActiveIndex(0)
    setOpen(true)
  }

  const media = activeProject?.media ?? []
  const canPrev = activeIndex > 0
  const canNext = activeIndex < media.length - 1

  const prev = () => setActiveIndex((i) => Math.max(0, i - 1))
  const next = () => setActiveIndex((i) => Math.min(media.length - 1, i + 1))

  const section = (title: string, items: ProjectItem[], description: string) => (
    <div className="space-y-6">
      <div className="flex flex-col items-center text-center space-y-2">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p className="text-muted-foreground max-w-2xl">{description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((p, idx) => (
          <motion.div
            key={`${p.title}-${idx}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: idx * 0.03 }}
            variants={fadeIn}
          >
            <Card
              className="h-full cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => openProject(p)}
              data-variant={p.variant}
            >
              <CardContent className="p-0">
                <div className="aspect-video bg-muted overflow-hidden rounded-t-xl border-b">
                  {p.media?.[0]?.type === "image" && (
                    <img
                      src={p.media[0].src}
                      alt={p.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.jpg"
                      }}
                    />
                  )}
                  {p.media?.[0]?.type === "video" && (
                    <iframe
                      src={toYouTubeEmbed(p.media[0].src)}
                      title={`${p.title} preview`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  )}
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="space-y-1">
                      <p className="text-xs uppercase tracking-wide text-primary/80 font-semibold">
                        {p.header ?? p.title}
                      </p>
                      <h3 className="text-lg font-semibold leading-tight">{p.title}</h3>
                    </div>
                    <span className="text-xs uppercase tracking-wide text-muted-foreground rounded-full border px-2 py-1">
                      {p.variant === "project" ? "Project" : "Showcase"}
                    </span>
                  </div>
                  <p className="text-sm font-medium">{p.headline}</p>
                  <p className="text-sm text-muted-foreground line-clamp-3">{p.summary}</p>
                  <div className="flex items-center justify-between pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        openProject(p)
                      }}
                    >
                      View Details
                    </Button>
                    {p.variant === "project" && p.link && (
                      <Button
                        size="sm"
                        variant="ghost"
                        asChild
                        onClick={(e) => {
                          e.stopPropagation()
                        }}
                      >
                        <a href={p.link} target="_blank" rel="noopener noreferrer">
                          Play
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            Portfolio
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </motion.div>

        <div className="space-y-16">
          {section(
            "Systems & Mechanics (Showcases)",
            showcases,
            "Smaller scoped systems and mechanics built to be performant, modular, and easy to slot into larger experiences.",
          )}
          {section(
            "Full Experiences (Projects)",
            fullProjects,
            "Complete games and live experiences with production-ready networking, polish, and links to play them.",
          )}
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{activeProject?.title ?? "Project"}</DialogTitle>
            </DialogHeader>

            {activeProject && (
              <div className="space-y-6">
                <MediaView item={media[activeIndex]} />

                <div className="flex items-center justify-between gap-3">
                  <Button variant="outline" onClick={prev} disabled={!canPrev}>
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Prev
                  </Button>

                  <div className="flex items-center gap-2">
                    {media.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        aria-label={`Go to media ${i + 1}`}
                        className={`h-2.5 w-2.5 rounded-full border ${i === activeIndex ? "bg-primary" : "bg-muted"}`}
                      />
                    ))}
                  </div>

                  <Button variant="outline" onClick={next} disabled={!canNext}>
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-semibold text-foreground">{activeProject.headline}</p>
                  <p className="text-muted-foreground">{activeProject.details}</p>
                </div>

                {activeProject.link && (
                  <div className="flex justify-end">
                    <Button asChild>
                      <a href={activeProject.link} target="_blank" rel="noopener noreferrer">
                        Play on Roblox
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
