export const siteData = {
  profile: {
    name: "Hussein Adam",
    tagline:
      "Roblox developer focused on scalable gameplay systems, clean networking, and UI that feels polished.",
    about:
      "I build Roblox games and systems end to end, from core gameplay loops and progression to data saving and UI. I care a lot about performance, maintainability, and making systems that are hard to exploit. I communicate clearly, iterate fast, and I keep codebases organized so projects stay easy to expand.",
    photo:
      "https://cdn.discordapp.com/attachments/1374068118883668110/1457492096070975498/assets_task_01jzgs58y1fnr9q10xj6503znp_1751836191_img_0.webp",
    stats: [
      { value: "3+ years", label: "Development experience" },
      { value: "30M+", label: "Total visits contributed" },
    ],
    skills: [
      "LuaU",
      "Client-Server Networking",
      "Gameplay Systems",
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
      "Modular Architecture",
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
      headline: "Fishing loop with responsive input and rarity",
      placeId: "7061896812",
      media: [{ type: "video", src: "https://www.youtube.com/watch?v=_AslHde6hi8" }],
      summary: "Fishing system built for Pulau-Indo with progression and anti-exploit.",
      details:
        "Designed and implemented a fishing system with timing-based input, rarity tables, and server-authoritative validation. Built to feel responsive while staying secure in public servers.",
      highlight: "Fishing system built for Pulau-Indo.",
      about:
        "Designed and implemented a fishing system with timing-based input, rarity tables, and server-authoritative validation. Built to feel responsive while staying secure in public servers.",
      link: "https://www.roblox.com/games/7061896812/Pulau-Indo",
    },
    {
      variant: "showcase",
      title: "Buckshot! Minigame",
      header: "Buckshot!",
      headline: "Fast PvP rounds built for quick replays",
      placeId: "7061896812",
      media: [{ type: "video", src: "https://www.youtube.com/watch?v=ZbhnuObByh8" }],
      summary: "Short-round PvP minigame integrated into Pulau-Indo.",
      details:
        "Built a lightweight PvP minigame with quick rounds, simple loadouts, and server-validated hit logic. Optimized for fast matchmaking and repeat plays inside the main experience.",
      highlight: "Short-round PvP minigame integrated into Pulau-Indo.",
      about:
        "Built a lightweight PvP minigame with quick rounds, simple loadouts, and server-validated hit logic. Optimized for fast matchmaking and repeat plays inside the main experience.",
      link: "https://www.roblox.com/games/7061896812/Pulau-Indo",
    },
    {
      variant: "showcase",
      title: "Shadow Boxing!",
      header: "Shadow Boxing",
      headline: "Boxing loop with stamina and KO states",
      placeId: "7061896812",
      media: [{ type: "video", src: "https://www.youtube.com/watch?v=SPy6t3L-9YY" }],
      summary: "Boxing minigame with stamina, stun windows, and KO flow.",
      details:
        "Implemented a state-driven boxing system with stamina management, stun windows, and KO flow. Added server checks to reduce abuse and keep fights consistent across latency.",
      highlight: "Boxing minigame with stamina and KO flow.",
      about:
        "Implemented a state-driven boxing system with stamina management, stun windows, and KO flow. Added server checks to reduce abuse and keep fights consistent across latency.",
      link: "https://www.roblox.com/games/7061896812/Pulau-Indo",
    },
    {
      variant: "project",
      title: "Pulau-Indo",
      header: "Published Game",
      headline: "Live experience with multiple playable systems",
      placeId: "116271475876333",
      media: [
        {
          type: "image",
          src: "https://tr.rbxcdn.com/180DAY-fbeb72e4a087da33c7870a503b0c7cfc/768/432/Image/Webp/noFilter",
        },
      ],
      summary: "A live Roblox experience with combat, minigames, and progression.",
      details:
        "Worked across the core experience: combat, fishing, and minigames, plus production-ready networking and UI. Focused on performance, consistency in public servers, and systems that are easy to expand.",
      highlight: "Live Roblox experience with persistent systems.",
      about:
        "Worked across the core experience: combat, fishing, and minigames, plus production-ready networking and UI. Focused on performance, consistency in public servers, and systems that are easy to expand.",
      link: "https://www.roblox.com/games/112702357619883/Pulau-Indo",
    },
  ] as ProjectItem[],

  contact: {
    email: "husseinsocool99@gmail.com",
    discord: "Sinvert_",
    formspree: "https://formspree.io/f/mzzabngv",
  },
} as const
