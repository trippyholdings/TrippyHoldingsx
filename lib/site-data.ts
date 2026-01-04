export type MediaItem = { type: "image" | "video"; src: string }

export type ProjectItem = {
  variant: "showcase" | "project"
  title: string
  header?: string
  headline: string
  media: MediaItem[]
  summary: string
  details: string
  link?: string
}

export const siteData = {
  profile: {
    name: "Hussein Adam",
    tagline:
      "Hi, I’m Hussein Adam also known as Trippy, I’m a Roblox developer specializing in scalable LuaU systems, smooth gameplay, and clean UI.",
    about:
      "I build polished Roblox experiences with clean, scalable LuaU systems. I focus on gameplay feel, networking sanity, performance, and UI that looks and behaves like a real product. If you want a developer who communicates clearly, ships fast, and keeps the codebase maintainable, I’m your guy.",
    photo:
      "https://cdn.discordapp.com/attachments/1374068118883668110/1457492096070975498/assets_task_01jzgs58y1fnr9q10xj6503znp_1751836191_img_0.webp?ex=695c32ca&is=695ae14a&hm=15fd829a764a1dfdd3aedd43b8ac0904c53f0248fa01eee21e420d03cd4eb413&",
    stats: [
      { value: "3+", label: "Years of Experience" },
      { value: "21M+", label: "Total Visits Contributed" },
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
        "I designed and implemented a responsive fishing system with timing-based inputs, rarity tables, and server-authoritative anti-exploit checks tailored for Pulau-Indo.",
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
      details: "Lightweight loadout selection, short rounds, and snappy hit detection optimized for quick matchmaking inside the main experience.",
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
    },
    {
      variant: "project",
      title: "Neon Drift",
      header: "Neon Drift",
      headline: "Open-world driving RPG",
      media: [
        {
          type: "image",
          src: "https://media.discordapp.net/attachments/1374068118883668110/1458045983220973670/neon-drift.png?format=webp&quality=lossless",
        },
        { type: "video", src: "https://www.youtube.com/watch?v=7e3_u1pUZpM" },
      ],
      summary: "A Roblox driving RPG with progression, trading, and live events.",
      details:
        "I led systems design and engineering: vehicle tuning (A-Chassis), dynamic economies, seasonal events, and live ops tooling. Built server-authoritative racing, matchmaking, and telemetry to keep sessions stable at scale.",
      link: "https://www.roblox.com/games/11992788872/Neon-Drift",
    },
    {
      variant: "project",
      title: "Arcane Arena",
      header: "Arcane Arena",
      headline: "Competitive ability battler",
      media: [
        { type: "video", src: "https://www.youtube.com/watch?v=5YCFy9J6mHQ" },
        {
          type: "image",
          src: "https://media.discordapp.net/attachments/1374068118883668110/1458046140815663135/arcane-arena.png?format=webp&quality=lossless",
        },
      ],
      summary: "Team-based arena combat with bespoke ability kits and polished VFX.",
      details:
        "Implemented modular ability pipelines (wind-up, execution, resolve), rollback-friendly movement prediction, and expressive UI with clarity-focused VFX/SFX. Supported events, ranked play, and spectating tools.",
      link: "https://www.roblox.com/games/9483746282/Arcane-Arena",
    },
  ] as ProjectItem[],
  contact: {
    email: "husseinsocool99@gmail.com",
    discord: "Sinvert_",
    formspree: "https://formspree.io/f/mzzabngv",
  },
} as const

export const projectVariantTemplate: ProjectItem = {
  variant: "project",
  title: "Project Name",
  header: "Project Display Heading",
  headline: "1–2 sentence hook that explains the core of the experience.",
  media: [
    { type: "image", src: "https://example.com/cover-image.png" },
    { type: "video", src: "https://www.youtube.com/watch?v=VIDEO_ID" },
  ],
  summary: "Short description that appears in cards (1–2 sentences).",
  details:
    "Long-form description for the modal: what you built, systems you owned, performance targets, and any live-ops or tooling highlights.",
  link: "https://www.roblox.com/games/<GAME_ID>/Game-Name",
}

export type SiteData = typeof siteData
export type MediaItem = { type: "image" | "video"; src: string }

export type ProjectItem = {
  variant: "showcase" | string
  title: string
  media: MediaItem[]
  highlight: string
  about: string
}

export const siteData = {
  profile: {
    name: "Hussein Adam",
    tagline:
      "Hi, I’m Hussein Adam also known as Trippy, I’m a Roblox developer specializing in scalable LuaU systems, smooth gameplay, and clean UI.",
    about:
      "I build polished Roblox experiences with clean, scalable LuaU systems. I focus on gameplay feel, networking sanity, performance, and UI that looks and behaves like a real product. If you want a developer who communicates clearly, ships fast, and keeps the codebase maintainable, I’m your guy.",
    photo:
      "https://cdn.discordapp.com/attachments/1374068118883668110/1457492096070975498/assets_task_01jzgs58y1fnr9q10xj6503znp_1751836191_img_0.webp?ex=695c32ca&is=695ae14a&hm=15fd829a764a1dfdd3aedd43b8ac0904c53f0248fa01eee21e420d03cd4eb413&",
    stats: [
      { value: "3+", label: "Years of Experience" },
      { value: "21M+", label: "Total Visits Contributed" },
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
      media: [
        {
          type: "image",
          src: "https://media.discordapp.net/attachments/1374068118883668110/1410367022501511258/image.png?format=webp&quality=lossless",
        },
        { type: "video", src: "https://www.youtube.com/watch?v=_AslHde6hi8" },
      ],
      highlight: "Custom fishing mechanics developed for Pulau-Indo.",
      about: "Custom fishing mechanics developed for Pulau-Indo.",
    },
    {
      variant: "showcase",
      title: "Buckshot!",
      media: [
        { type: "video", src: "https://www.youtube.com/watch?v=ZbhnuObByh8" },
        {
          type: "image",
          src: "https://media.discordapp.net/attachments/1374068118883668110/1410367097527341146/image.png?format=webp&quality=lossless",
        },
      ],
      highlight: "Developed a simplified Buckshot-inspired minigame for Pulau-Indo.",
      about: "Casual PvP minigame with items and simple mechanics.",
    },
    {
      variant: "showcase",
      title: "Shadow Boxing!",
      media: [
        { type: "video", src: "https://www.youtube.com/watch?v=SPy6t3L-9YY" },
        {
          type: "image",
          src: "https://media.discordapp.net/attachments/1374068118883668110/1410367032289005729/image.png?format=webp&quality=lossless",
        },
      ],
      highlight: "Created a Shadow Boxing minigame with KO animations, state management, and anti-cheat measures.",
      about: "A fast-paced boxing minigame developed for Pulau-Indo.",
    },
  ] as ProjectItem[],
  contact: {
    email: "trippyholdings@gmail.com",
    discord: "Sinvert_",
    formspree: "https://formspree.io/f/mzzabngv",
  },
} as const

export type SiteData = typeof siteData



