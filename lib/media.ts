// lib/media.ts
export function youtubeToEmbed(url: string) {
  try {
    const u = new URL(url)
    if (u.hostname.includes("youtube.com") && u.searchParams.get("v")) {
      return `https://www.youtube.com/embed/${u.searchParams.get("v")}`
    }
    if (u.hostname === "youtu.be") {
      return `https://www.youtube.com/embed${u.pathname}`
    }
    return url
  } catch {
    return url
  }
}

export function isDirectVideo(url: string) {
  return /\.(mp4|webm)$/i.test(url)
}
