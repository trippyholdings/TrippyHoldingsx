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
    email: "husseinsocool99@gmail.com",
    discord: "Sinvert_",
    formspree: "https://formspree.io/f/mzzabngv",
  },
} as const

export type SiteData = typeof siteData


