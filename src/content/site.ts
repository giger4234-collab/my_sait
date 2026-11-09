export const planets = [
  {
    id: "earth",
    name: "Земля",
    english: "EARTH",
    order: "03",
    type: "Планета земной группы",
    headline: "Всё знакомое.\nСовсем другой взгляд.",
    description:
      "Океаны, материки и тонкая атмосфера. Земля — наш дом и единственная планета, на которой нам известно о существовании жизни.",
    year: "365,25",
    unit: "земных суток в году",
    distance: "1 а.е.",
    texture: "/assets/textures/earth.webp",
    source: "https://science.nasa.gov/earth/facts/",
  },
  {
    id: "mars",
    name: "Марс",
    english: "MARS",
    order: "04",
    type: "Планета земной группы",
    headline: "Красный мир.\nБольшие вопросы.",
    description:
      "Холодная каменистая планета с пыльной поверхностью. Исследователи ищут здесь следы условий, в которых когда-то могла существовать жизнь.",
    year: "687",
    unit: "земных суток в году",
    distance: "1,5 а.е.",
    texture: "/assets/textures/mars.webp",
    source: "https://science.nasa.gov/mars/facts/",
  },
  {
    id: "saturn",
    name: "Сатурн",
    english: "SATURN",
    order: "06",
    type: "Газовый гигант",
    headline: "Узнаваемый силуэт.\nНеобычный мир.",
    description:
      "Газовый гигант, окружённый кольцами из множества частиц льда и камня. Его год длится почти три десятилетия по земному календарю.",
    year: "29,4",
    unit: "земного года в одном году",
    distance: "9,5 а.е.",
    texture: "/assets/textures/saturn.webp",
    source: "https://science.nasa.gov/saturn/facts/",
  },
] as const;
export const readingLinks = [
  {
    number: "01",
    title: "Наша планета",
    description: "Земля, её океаны и атмосфера",
    href: "https://science.nasa.gov/earth/",
  },
  {
    number: "02",
    title: "Солнечная система",
    description: "Планеты, спутники и пространство между ними",
    href: "https://science.nasa.gov/solar-system/",
  },
  {
    number: "03",
    title: "Вселенная",
    description: "Звёзды, галактики и новые вопросы",
    href: "https://science.nasa.gov/universe/",
  },
] as const;
