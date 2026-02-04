export type MediaItem = { type: "image" | "video"; src: string }

export type ProjectVariant = "showcase" | "project"

export type ProjectStats = {
  playing?: number
  visits?: number
  likePercentage?: number
}

export type ProjectItem = {
  variant: ProjectVariant
  title: string

  // Roblox place to fetch live stats
  placeId?: string

  // Optional display fields
  header?: string
  headline?: string

  // Media
  media: MediaItem[]

  // Card + modal text
  highlight?: string
  about?: string
  summary?: string
  details?: string

  // Live stats (hydrated client-side)
  stats?: ProjectStats

  // Optional external link
  link?: string
}

export const siteData = {
  profile: {
    name: "Hussein Adam",
    tagline:
      "Roblox systems engineer crafting performant gameplay loops, resilient networking, and UI that feels like a shipped product.",
    about:
      "I build polished Roblox experiences end to end: scalable LuaU systems, latency-tolerant networking, data pipelines, and UI that players trust. Clear communication, fast iteration, and maintainable code are my non-negotiables.",
    photo:
      "https://cdn.discordapp.com/attachments/1374068118883668110/1457492096070975498/assets_task_01jzgs58y1fnr9q10xj6503znp_1751836191_img_0.webp",
    stats: [
      { value: "4+", label: "Years of Experience" },
      { value: "30M+", label: "Total Visits Contributed" },
    ],
    skills: [
      "LuaU",
      "Networking",
      "Combat Systems",
      "Ability Systems",
      "UI/UX",
      "DataStore",
      "ProfileStore",
      "Optimization",
      "VFX",
      "Sound",
      "State Machines",
      "Procedural Generation",
      "Tool Systems",
      "A-Chassis Tuning",
      "Modular Systems"
    ],
    links: {
      roblox: "https://www.roblox.com/users/1035292126/profile",
    },
  },

  projects: [
    {
      variant: "showcase",
      title: "Pulau-Indo: Fishing System",
      header: "Fishing System",
      headline: "Responsive fishing gameplay loop",
      placeId: "7061896812",
      media: [
        { type: "video", src: "https://www.youtube.com/watch?v=_AslHde6hi8" },
      ],
      summary: "Custom fishing mechanics built for Pulau-Indo.",
      details:
        "Designed and implemented a responsive fishing system with timing-based inputs, rarity tables, and server-authoritative anti-exploit checks tailored for Pulau-Indo.",
      highlight: "Custom fishing mechanics built for Pulau-Indo.",
      about:
        "Designed and implemented a responsive fishing system with timing-based inputs, rarity tables, and server-authoritative anti-exploit checks tailored for Pulau-Indo.",
      link: "https://www.roblox.com/games/7061896812/Pulau-Indo",
    },
    {
      variant: "showcase",
      title: "Buckshot! Minigame",
      header: "Buckshot!",
      headline: "Quick-fire PvP experience",
      placeId: "7061896812",
      media: [
        { type: "video", src: "https://www.youtube.com/watch?v=ZbhnuObByh8" },
      ],
      summary: "Simplified Buckshot-inspired PvP built inside Pulau-Indo.",
      details:
        "Lightweight loadout selection, short rounds, and snappy hit detection optimized for quick matchmaking inside the main experience.",
      highlight: "Simplified Buckshot-inspired PvP built inside Pulau-Indo.",
      about:
        "Lightweight loadout selection, short rounds, and snappy hit detection optimized for quick matchmaking inside the main experience.",
      link: "https://www.roblox.com/games/7061896812/Pulau-Indo",
    },
    {
      variant: "showcase",
      title: "Shadow Boxing!",
      header: "Shadow Boxing",
      headline: "KO-ready boxing loop",
      placeId: "7061896812",
      media: [
        { type: "video", src: "https://www.youtube.com/watch?v=SPy6t3L-9YY" },
      ],
      summary: "Fast-paced boxing minigame for Pulau-Indo.",
      details:
        "Built state-driven combat with stamina, stun windows, KO cinematics, and anti-cheat checks to keep gameplay fair in public lobbies.",
      highlight: "Fast-paced boxing minigame for Pulau-Indo.",
      about:
        "Built state-driven combat with stamina, stun windows, KO cinematics, and anti-cheat checks to keep gameplay fair in public lobbies.",
      link: "https://www.roblox.com/games/7061896812/Pulau-Indo",
    },
    {
      variant: "project",
      title: "Pulau-Indo",
      header: "Published Game",
      headline: "Live experience with active playerbase",
      placeId: "116271475876333",
      media: [
        {
          type: "image",
          src: "https://tr.rbxcdn.com/180DAY-fbeb72e4a087da33c7870a503b0c7cfc/768/432/Image/Webp/noFilter",
        },
      ],
      summary: "Live Roblox experience showcasing the full gameplay loop.",
      details:
        "End-to-end experience including combat, fishing, and matchmaking systems with production-ready networking and UI polish.",
      highlight: "Live Roblox experience with persistent systems.",
      about:
        "End-to-end experience including combat, fishing, and matchmaking systems with production-ready networking and UI polish.",
      link: "https://www.roblox.com/games/116271475876333/Pulau-Indo-18",
    },
  ] as ProjectItem[],

  contact: {
    email: "husseinsocool99@gmail.com",
    discord: "Sinvert_",
    formspree: "https://formspree.io/f/mzzabngv",
  },
} as const

export type SiteData = typeof siteData
