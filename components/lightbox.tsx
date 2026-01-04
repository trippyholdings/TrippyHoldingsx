"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import type { MediaItem } from "@/lib/site-data"

type LightboxProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  items: MediaItem[]
  startIndex?: number
  title?: string
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

export default function Lightbox({ open, onOpenChange, items, startIndex = 0, title }: LightboxProps) {
  const images = useMemo(
    () => (items || []).filter((m) => m && m.type === "image" && typeof m.src === "string" && m.src.length > 0),
    [items],
  )

  const [index, setIndex] = useState(0)
  const [scale, setScale] = useState(1)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const dragging = useRef(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const posStart = useRef({ x: 0, y: 0 })

  // Reset whenever opened or media changes
  useEffect(() => {
    if (!open) return
    const i = clamp(startIndex, 0, Math.max(0, images.length - 1))
    setIndex(i)
    setScale(1)
    setPos({ x: 0, y: 0 })
  }, [open, startIndex, images.length])

  const close = () => onOpenChange(false)

  const prev = () => {
    if (images.length <= 1) return
    setIndex((i) => (i - 1 + images.length) % images.length)
    setScale(1)
    setPos({ x: 0, y: 0 })
  }

  const next = () => {
    if (images.length <= 1) return
    setIndex((i) => (i + 1) % images.length)
    setScale(1)
    setPos({ x: 0, y: 0 })
  }

  // Keyboard controls
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, images.length])

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    // Wheel up = zoom in
    const delta = e.deltaY > 0 ? -0.15 : 0.15
    const nextScale = clamp(scale + delta, 1, 4)
    setScale(nextScale)
    if (nextScale === 1) setPos({ x: 0, y: 0 })
  }

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (scale <= 1) return
    dragging.current = true
    dragStart.current = { x: e.clientX, y: e.clientY }
    posStart.current = { ...pos }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return
    const dx = e.clientX - dragStart.current.x
    const dy = e.clientY - dragStart.current.y
    setPos({ x: posStart.current.x + dx, y: posStart.current.y + dy })
  }

  const onPointerUp = () => {
    dragging.current = false
  }

  if (!open || images.length === 0) return null
  const current = images[index]

  return (
    <div
      className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-sm"
      onMouseDown={(e) => {
        // click outside closes (only when clicking backdrop)
        if (e.target === e.currentTarget) close()
      }}
      role="dialog"
      aria-modal="true"
      aria-label={title || "Image viewer"}
    >
      <div className="absolute inset-0 grid place-items-center p-4">
        <div className="relative w-[min(96vw,1200px)] h-[min(92vh,780px)] overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
          {/* Top bar */}
          <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between px-3 py-3">
            <div className="text-white/80 text-sm truncate pr-4">
              {title ? title : "Preview"}{" "}
              <span className="text-white/50">
                ({index + 1}/{images.length})
              </span>
            </div>

            <button
              className="rounded-xl border border-white/20 bg-black/60 px-3 py-2 text-white hover:bg-black/70"
              onClick={close}
              type="button"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Prev/Next */}
          {images.length > 1 && (
            <>
              <button
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-xl border border-white/20 bg-black/60 px-3 py-2 text-white hover:bg-black/70"
                onClick={prev}
                type="button"
                aria-label="Previous"
              >
                ‹
              </button>

              <button
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-xl border border-white/20 bg-black/60 px-3 py-2 text-white hover:bg-black/70"
                onClick={next}
                type="button"
                aria-label="Next"
              >
                ›
              </button>
            </>
          )}

          {/* Image stage */}
          <div className="absolute inset-0 grid place-items-center">
            <div
              className="select-none touch-none"
              onWheel={onWheel}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              style={{
                transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
                transition: dragging.current ? "none" : "transform 120ms ease",
                cursor: scale > 1 ? (dragging.current ? "grabbing" : "grab") : "zoom-in",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={current.src}
                alt=""
                draggable={false}
                className="max-h-[86vh] max-w-[92vw] object-contain pointer-events-none"
              />
            </div>
          </div>

          {/* Dots */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  className={`h-2.5 w-2.5 rounded-full border border-white/20 ${
                    i === index ? "bg-white" : "bg-white/30"
                  }`}
                  onClick={() => {
                    setIndex(i)
                    setScale(1)
                    setPos({ x: 0, y: 0 })
                  }}
                  type="button"
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          )}

          {/* Hint */}
          <div className="absolute bottom-10 left-0 right-0 z-10 flex justify-center">
            <div className="text-xs text-white/60 bg-black/50 border border-white/10 rounded-full px-3 py-1">
              Wheel to zoom, drag to move, ESC to close
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
