export type MediaItem = { type: "image" | "video"; src: string }

export type ProjectVariant = "showcase" | "project"

export type ProjectItem = {
  variant: ProjectVariant
  title: string

  // Roblox place to fetch live stats
  placeId?: string

  // Optional display fields used by some templates
  header?: string
  headline?: string

  // Media
  media: MediaItem[]

  // Card + modal text (supports both older + newer naming)
  // Use whichever you prefer, but DO NOT duplicate types.
  highlight?: string
  about?: string
  summary?: string
  details?: string

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
      { value: "12", label: "Shipped Systems" },
    ],
    skills: [
      "LuaU",
      "Roblox Studio",
      "Networking",
      "Combat Systems",
      "Ability Systems",
      "UI/UX",
      "DataStore",
      "ProfileStore",
      "Optimization",
      "Tweening",
      "VFX",
      "Sound",
      "State Machines",
      "Procedural Generation",
      "Tool Systems",
      "A-Chassis Tuning",
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
      media: [
        {
          type: "image",
          src: "https://media.discordapp.net/attachments/1374068118883668110/1410367022501511258/image.png?format=webp&quality=lossless",
        },
        { type: "video", src: "https://www.youtube.com/watch?v=0PMvbL0X2oA" },
      ],
      summary: "Custom fishing mechanics built for Pulau-Indo.",
      details:
        "Designed and implemented a responsive fishing system with timing-based inputs, rarity tables, and server-authoritative anti-exploit checks tailored for Pulau-Indo.",
      // Compatibility for templates that still read highlight/about:
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
      media: [
        { type: "video", src: "https://www.youtube.com/watch?v=ZbhnuObByh8" },
        {
          type: "image",
          src: "https://media.discordapp.net/attachments/1374068118883668110/1410367097527341146/image.png?format=webp&quality=lossless",
        },
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
      media: [
        { type: "video", src: "https://www.youtube.com/watch?v=SPy6t3L-9YY" },
        {
          type: "image",
          src: "https://media.discordapp.net/attachments/1374068118883668110/1410367032289005729/image.png?format=webp&quality=lossless",
        },
      ],
      summary: "Fast-paced boxing minigame for Pulau-Indo.",
      details:
        "Built state-driven combat with stamina, stun windows, KO cinematics, and anti-cheat checks to keep gameplay fair in public lobbies.",
      highlight: "Fast-paced boxing minigame for Pulau-Indo.",
      about:
        "Built state-driven combat with stamina, stun windows, KO cinematics, and anti-cheat checks to keep gameplay fair in public lobbies.",
      link: "https://www.roblox.com/games/7061896812/Pulau-Indo",
    },

    // Keep your template if you want
    {
      ...projectVariantTemplate,
      title: "Project Template Example",
      header: "Template (Use Me)",
      headline: "Copy this structure to add new Roblox projects quickly.",
      media: [
        { type: "image", src: "https://placehold.co/1200x675/png" },
        { type: "video", src: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
      ],
      summary: "Reference card showing the fields needed to add new projects.",
      details:
        "Replace placeholder media with your own, update the headline to your hook, summarize in 1–2 sentences, and use details for the deep dive. Add your Roblox link so the Play button appears.",
      isTemplate: true,
    },
  ] as ProjectItem[],

  ] as ProjectItem[],

  contact: {
    email: "husseinsocool99@gmail.com",
    discord: "Sinvert_",
    formspree: "https://formspree.io/f/mzzabngv",
  },
} as const

export type SiteData = typeof siteData
