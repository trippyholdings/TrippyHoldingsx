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
      "Hi, I’m Hussein Adam — also known as Trippy/Sinvert_. I’m a Roblox developer specializing in scalable LuaU systems, smooth gameplay, and clean UI.",
    about:
      "I build polished Roblox experiences with clean, scalable LuaU systems. I focus on gameplay feel, networking sanity, performance, and UI that looks and behaves like a real product. If you want a developer who communicates clearly, ships fast, and keeps the codebase maintainable, I’m your guy.",
    photo:
      "https://media.discordapp.net/attachments/1374068118883668110/1410366654990403615/IMG_7391.png?format=webp&quality=lossless",
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
      roblox: "https://www.roblox.com/users/00000000/profile",
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
      about: "Custom fishing mechanics developed for Pulau-Indo.",
    },
    {
      variant: "showcase",
      title: "Pulau-Indo: Mystery Boxes",
      media: [
        {
          type: "image",
          src: "https://media.discordapp.net/attachments/1374068118883668110/1410367004646359060/image.png?format=webp&quality=lossless",
        },
        { type: "video", src: "https://www.youtube.com/watch?v=5hb8wrq1IkQ" },
      ],
      highlight: "Mystery box system with drop tables and rewards flow.",
      about: "Mystery box system with drop tables and rewards flow.",
    },
    {
      variant: "showcase",
      title: "Pulau-Indo: Voice Chat Phone",
      media: [
        {
          type: "image",
          src: "https://media.discordapp.net/attachments/1374068118883668110/1410366967673301022/image.png?format=webp&quality=lossless",
        },
        { type: "video", src: "https://www.youtube.com/watch?v=8vXQ6ld4a9Q" },
      ],
      highlight: "In-world phone UX with voice chat integration.",
      about: "In-world phone UX with voice chat integration.",
    },
    {
      variant: "showcase",
      title: "Pulau-Indo: ATM System",
      media: [
        {
          type: "image",
          src: "https://media.discordapp.net/attachments/1374068118883668110/1410366942364835931/image.png?format=webp&quality=lossless",
        },
        { type: "video", src: "https://www.youtube.com/watch?v=bzT0yNQmVvI" },
      ],
      highlight: "ATM system for deposits, withdrawals, and UI flow.",
      about: "ATM system for deposits, withdrawals, and UI flow.",
    },
    {
      variant: "showcase",
      title: "Pulau-Indo: Vehicle System",
      media: [
        {
          type: "image",
          src: "https://media.discordapp.net/attachments/1374068118883668110/1410366915613691965/image.png?format=webp&quality=lossless",
        },
        { type: "video", src: "https://www.youtube.com/watch?v=48h1FXi3o9U" },
      ],
      highlight: "Vehicle spawning, ownership, and gameplay integration.",
      about: "Vehicle spawning, ownership, and gameplay integration.",
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
