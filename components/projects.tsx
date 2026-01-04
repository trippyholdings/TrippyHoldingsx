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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, idx) => (
            <motion.div
              key={`${p.title}-${idx}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.03 }}
              variants={fadeIn}
            >
              <Card className="h-full cursor-pointer hover:shadow-lg transition-shadow" onClick={() => openProject(p)}>
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
                  <div className="p-6">
                    <h3 className="text-lg font-semibold">{p.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{p.highlight}</p>
                    <div className="mt-4">
                      <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); openProject(p) }}>
                        View Media
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{activeProject?.title ?? "Project"}</DialogTitle>
            </DialogHeader>

            {activeProject && (
              <div className="space-y-4">
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

                <p className="text-muted-foreground">{activeProject.about}</p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
