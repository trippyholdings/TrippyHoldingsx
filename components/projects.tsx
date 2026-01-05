"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
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
  const [stats, setStats] = useState<Record<string, { playing?: number; likeRatio?: number }>>({})
  const [statsLoaded, setStatsLoaded] = useState(false)

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

  useEffect(() => {
    const placeIds = Array.from(new Set(projects.map((p) => p.placeId).filter(Boolean))) as string[]
    if (!placeIds.length) return

    let cancelled = false

    const fetchStats = async () => {
      try {
        const placesRes = await fetch(
          `https://games.roblox.com/v1/games/multiget-place-details?placeIds=${placeIds.join(",")}`,
        )
        if (!placesRes.ok) throw new Error(`place details failed with ${placesRes.status}`)
        const placesJson = await placesRes.json()

        const universeIds = placesJson.map((p: any) => p.universeId).filter(Boolean)
        let gamesData: any[] = []
        if (universeIds.length) {
          const gamesRes = await fetch(`https://games.roblox.com/v1/games?universeIds=${universeIds.join(",")}`)
          if (gamesRes.ok) {
            const gamesJson = await gamesRes.json()
            gamesData = gamesJson?.data ?? []
          }
        }

        const gameMap = new Map(gamesData.map((g: any) => [String(g.id), g]))
        const nextStats: Record<string, { playing?: number; likeRatio?: number }> = {}

        placesJson.forEach((p: any) => {
          const playing = typeof p.playing === "number" ? p.playing : undefined
          const game = gameMap.get(String(p.universeId))

          let likeRatio: number | undefined
          if (game && typeof game.upVotes === "number" && typeof game.downVotes === "number") {
            const total = game.upVotes + game.downVotes
            if (total > 0) {
              likeRatio = Math.round((game.upVotes / total) * 100)
            }
          }

          nextStats[String(p.placeId)] = { playing, likeRatio }
        })

        if (!cancelled) {
          setStats(nextStats)
          setStatsLoaded(true)
        }
      } catch (error) {
        console.error("Failed to load Roblox stats", error)
        if (!cancelled) setStatsLoaded(true)
      }
    }

    fetchStats()
    return () => {
      cancelled = true
    }
  }, [projects])

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
      {!items.length && (
        <div className="w-full rounded-xl border bg-muted/30 px-4 py-6 text-center text-sm text-muted-foreground">
          Nothing to show yet—new items coming soon.
        </div>
      )}
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
                <div className="p-6 space-y-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-3">
                      <div className="space-y-1">
                        <p className="text-xs uppercase tracking-wide text-primary/80 font-semibold">
                          {p.header ?? p.title}
                        </p>
                        <h3 className="text-lg font-semibold leading-tight">{p.title}</h3>
                      </div>
                      <Badge variant="secondary" className="uppercase tracking-wide">
                        {p.variant === "project" ? "Project" : "Showcase"}
                      </Badge>
                    </div>
                    {(p.headline ?? p.highlight) && (
                      <p className="text-sm font-semibold text-foreground">{p.headline ?? p.highlight}</p>
                    )}
                    {(p.summary ?? p.about) && (
                      <p className="text-sm text-muted-foreground">{p.summary ?? p.about}</p>
                    )}
                  </div>

                  {p.placeId && (
                    <div className="flex flex-wrap items-center gap-3 text-xs">
                      <span className="rounded-full bg-muted px-3 py-1 font-medium text-foreground">
                        {statsLoaded
                          ? stats[p.placeId]?.playing !== undefined
                            ? `${stats[p.placeId]?.playing?.toLocaleString() ?? 0} players online`
                            : "Live players unavailable"
                          : "Fetching players..."}
                      </span>
                      <span className="rounded-full bg-muted px-3 py-1 font-medium text-foreground">
                        {statsLoaded
                          ? stats[p.placeId]?.likeRatio !== undefined
                            ? `${stats[p.placeId]?.likeRatio}% like rating`
                            : "Like data unavailable"
                          : "Fetching likes..."}
                      </span>
                    </div>
                  )}

                  {p.link && (
                    <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                      <ExternalLink className="h-4 w-4" />
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Play on Roblox
                      </a>
                    </div>
                  )}

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
                    {p.link && (
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

        <div className="space-y-12">
          {section(
            "Projects",
            projects,
            "Playable builds and systems with quick media previews, live player counts, like ratios, and direct Roblox links.",
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

                {activeProject.placeId && (
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <Badge variant="secondary">
                      {statsLoaded
                        ? stats[activeProject.placeId]?.playing !== undefined
                          ? `${stats[activeProject.placeId]?.playing?.toLocaleString() ?? 0} players online`
                          : "Live players unavailable"
                        : "Fetching players..."}
                    </Badge>
                    <Badge variant="secondary">
                      {statsLoaded
                        ? stats[activeProject.placeId]?.likeRatio !== undefined
                          ? `${stats[activeProject.placeId]?.likeRatio}% like rating`
                          : "Like data unavailable"
                        : "Fetching likes..."}
                    </Badge>
                  </div>
                )}

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
