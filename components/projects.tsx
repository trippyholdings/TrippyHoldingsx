"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { siteData, type MediaItem, type ProjectItem, type ProjectStats } from "@/lib/site-data"

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
  const publishedGames = useMemo(() => projects.filter((p) => p.variant === "project"), [projects])
  const showcases = useMemo(() => projects.filter((p) => p.variant === "showcase"), [projects])
  const [open, setOpen] = useState(false)
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [stats, setStats] = useState<Record<string, ProjectStats>>({})
  const [statsStatus, setStatsStatus] = useState<"idle" | "loading" | "success" | "error">("loading")

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
    const placeIds = Array.from(
      new Set(publishedGames.map((p) => p.placeId).filter(Boolean)),
    ) as string[]
    if (!placeIds.length) {
      setStatsStatus("success")
      return
    }

    let cancelled = false

    const fetchStats = async () => {
      setStatsStatus("loading")
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
        const nextStats: Record<string, ProjectStats> = {}

        placesJson.forEach((p: any) => {
          const playing = typeof p.playing === "number" ? p.playing : undefined
          const game = gameMap.get(String(p.universeId))

          let likePercentage: number | undefined
          const visits = typeof game?.visits === "number" ? game.visits : undefined
          if (game && typeof game.upVotes === "number" && typeof game.downVotes === "number") {
            const total = game.upVotes + game.downVotes
            if (total > 0) {
              likePercentage = Math.round((game.upVotes / total) * 100)
            }
          }

          nextStats[String(p.placeId)] = { playing, visits, likePercentage }
        })

        if (!cancelled) {
          setStats(nextStats)
          setStatsStatus("success")
        }
      } catch (error) {
        console.error("Failed to load Roblox stats", error)
        if (!cancelled) setStatsStatus("error")
      }
    }

    fetchStats()
    return () => {
      cancelled = true
    }
  }, [publishedGames])

  const media = activeProject?.media ?? []
  const canPrev = activeIndex > 0
  const canNext = activeIndex < media.length - 1

  const prev = () => setActiveIndex((i) => Math.max(0, i - 1))
  const next = () => setActiveIndex((i) => Math.min(media.length - 1, i + 1))

  const renderStats = (placeId?: string, variant?: string) => {
    if (!placeId || variant !== "project") return null

    const record = stats[placeId]
    const isLoading = statsStatus === "loading"
    const isErrored = statsStatus === "error"

    const loadingText = "Loading game metrics..."
    const errorText = "Metrics unavailable"

    if (isLoading) {
      return (
        <div className="flex flex-wrap items-center gap-3 text-xs" aria-live="polite">
          <span className="rounded-full bg-muted px-3 py-1 font-medium text-foreground">{loadingText}</span>
        </div>
      )
    }

    if (isErrored) {
      return (
        <div className="flex flex-wrap items-center gap-3 text-xs" aria-live="polite">
          <span className="rounded-full bg-muted px-3 py-1 font-medium text-foreground">{errorText}</span>
        </div>
      )
    }

    return (
      <div className="flex flex-wrap items-center gap-3 text-xs" aria-live="polite">
        <span className="rounded-full bg-muted px-3 py-1 font-medium text-foreground">
          {record?.playing !== undefined ? `${record.playing.toLocaleString()} players online` : "Players unavailable"}
        </span>
        <span className="rounded-full bg-muted px-3 py-1 font-medium text-foreground">
          {record?.visits !== undefined ? `${record.visits.toLocaleString()} visits` : "Visits unavailable"}
        </span>
        <span className="rounded-full bg-muted px-3 py-1 font-medium text-foreground">
          {record?.likePercentage !== undefined ? `${record.likePercentage}% like rating` : "Like data unavailable"}
        </span>
      </div>
    )
  }

  const playHref = (p: ProjectItem) => {
    if (p.variant !== "project") return undefined
    if (p.placeId) return `roblox://placeId=${p.placeId}`
    return p.link
  }

  const section = (title: string, items: ProjectItem[], description: string, showStats: boolean) => (
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

                  {showStats && renderStats(p.placeId, p.variant)}

                  {p.link && p.variant === "project" && (
                    <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                      <ExternalLink className="h-4 w-4" />
                      <a
                        href={playHref(p)}
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
                    {p.link && p.variant === "project" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        asChild
                        onClick={(e) => {
                          e.stopPropagation()
                        }}
                      >
                        <a href={playHref(p)} target="_blank" rel="noopener noreferrer">
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
    <section id="published-games" className="py-20">
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
            Published games
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Published games</h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </motion.div>

        <div className="space-y-12">
          {section(
            "Published games",
            publishedGames,
            "Playable builds and systems with quick media previews, live player counts, visit totals, like ratings, and direct Roblox links.",
            true,
          )}

          {section(
            "Showcases",
            showcases,
            "Feature demonstrations, prototypes, and systems work. These cards include media and descriptions without live game actions.",
            false,
          )}
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{activeProject?.title ?? "Published game"}</DialogTitle>
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

                {activeProject.variant === "project" && renderStats(activeProject.placeId, activeProject.variant)}

                {activeProject.link && activeProject.variant === "project" && (
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
