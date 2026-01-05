export type MediaItem = { type: "image" | "video"; src: string }

export type ProjectItem = {
  variant: "showcase" | "project" | string
  title: string
  media: MediaItem[]
  highlight: string
  about: string
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
      "https://cdn.discordapp.com/attachments/1374068118883668110/1457492096070975498/assets_task_01jzgs58y1fnr9q10xj6503znp_1751836191_img_0.webp",
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
        { type: "video", src: "https://www.youtube.com/watch?v=0PMvbL0X2oA" },
      ],
      highlight: "Custom fishing mechanics developed for Pulau-Indo.",
      about: "I designed and implemented a responsive fishing loop with timing inputs, rarity tables, and server-side validation.",
      link: "https://www.roblox.com/users/1035292126/profile",
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
      highlight: "Simplified Buckshot-inspired minigame built for Pulau-Indo.",
      about: "Quick rounds, lightweight item logic, and clean hit flow tuned for fast matchmaking inside the main experience.",
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
      highlight: "Boxing minigame with KO flow and anti-cheat checks.",
      about: "State-driven combat with stun windows, KO moments, and server validation to keep public lobbies fair.",
    },
  ] as ProjectItem[],

  contact: {
    email: "husseinsocool99@gmail.com",
    discord: "Sinvert_",
    formspree: "https://formspree.io/f/mzzabngv",
  },
} as const

export type SiteData = typeof siteData
