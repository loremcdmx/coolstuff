export type Lang = "en" | "es";

const translations = {
  en: {
    // nav
    shopping: "Shopping",
    entertainment: "Entertainment",

    // shopping page
    trendingIn: "Trending in",
    mexico: "Mexico",
    usa: "United States",
    popularOnAmazon: "Most popular on Amazon right now",
    noProducts: "No trending products in this category",

    // categories
    "cat.all": "All",
    "cat.tech": "Tech",
    "cat.home": "Home",
    "cat.fashion": "Fashion",
    "cat.beauty": "Beauty",
    "cat.sports": "Sports",
    "cat.gaming": "Gaming",
    "cat.books": "Books",
    "cat.kitchen": "Kitchen",
    "cat.pets": "Pets",

    // AI search
    aiSearchTitle: "AI Search",
    aiSearchDesc: "Describe what you're looking for and we'll recommend the best options",
    aiSearchPlaceholder: "E.g. good headphones for the gym under $50...",
    aiSearchButton: "Search",
    aiSearchError: "Search error. Try again.",
    aiNoResults: "No results",

    // entertainment
    entertainmentTrending: "Trending",
    entertainmentSubtitle: "Most popular in movies, series & music",
    "tab.all": "All",
    "tab.movies": "Movies",
    "tab.series": "Series",
    "tab.music": "Music",
    topMusic: "Top Music",
    noResults: "No results for this filter",
    movie: "Movie",
    series: "Series",
    whereToWatch: "Where to watch:",

    // genres
    "genre.all": "All",
    "genre.action": "Action",
    "genre.comedy": "Comedy",
    "genre.drama": "Drama",
    "genre.thriller": "Thriller",
    "genre.scifi": "Sci-Fi",
    "genre.superhero": "Superhero",
    "genre.mystery": "Mystery",
    "genre.adventure": "Adventure",
    "genre.history": "History",

    // settings
    settingsTitle: "Settings",
    language: "Language",
    theme: "Theme",
    country: "Country",
    dark: "Dark",
    light: "Light",
  },
  es: {
    shopping: "Compras",
    entertainment: "Entretenimiento",

    trendingIn: "Trending en",
    mexico: "Mexico",
    usa: "Estados Unidos",
    popularOnAmazon: "Lo mas popular en Amazon ahora mismo",
    noProducts: "No hay productos trending en esta categoria",

    "cat.all": "Todo",
    "cat.tech": "Tech",
    "cat.home": "Hogar",
    "cat.fashion": "Moda",
    "cat.beauty": "Belleza",
    "cat.sports": "Deportes",
    "cat.gaming": "Gaming",
    "cat.books": "Libros",
    "cat.kitchen": "Cocina",
    "cat.pets": "Mascotas",

    aiSearchTitle: "Busca con IA",
    aiSearchDesc: "Describe lo que buscas y te recomendaremos lo mejor",
    aiSearchPlaceholder: "Ej: audifonos buenos para el gym por menos de $1000...",
    aiSearchButton: "Buscar",
    aiSearchError: "Error al buscar. Intenta de nuevo.",
    aiNoResults: "Sin resultados",

    entertainmentTrending: "Trending",
    entertainmentSubtitle: "Lo mas popular en cine, series y musica",
    "tab.all": "Todo",
    "tab.movies": "Peliculas",
    "tab.series": "Series",
    "tab.music": "Musica",
    topMusic: "Top Musica",
    noResults: "No hay resultados para este filtro",
    movie: "Pelicula",
    series: "Serie",
    whereToWatch: "Donde ver:",

    "genre.all": "Todo",
    "genre.action": "Accion",
    "genre.comedy": "Comedia",
    "genre.drama": "Drama",
    "genre.thriller": "Thriller",
    "genre.scifi": "Sci-Fi",
    "genre.superhero": "Superheroes",
    "genre.mystery": "Misterio",
    "genre.adventure": "Aventura",
    "genre.history": "Historia",

    settingsTitle: "Ajustes",
    language: "Idioma",
    theme: "Tema",
    country: "Pais",
    dark: "Oscuro",
    light: "Claro",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["en"];

export function t(lang: Lang, key: TranslationKey): string {
  return translations[lang][key];
}

export const categoryKeys: { key: TranslationKey; filter: string }[] = [
  { key: "cat.all", filter: "All" },
  { key: "cat.tech", filter: "Tech" },
  { key: "cat.home", filter: "Home" },
  { key: "cat.fashion", filter: "Fashion" },
  { key: "cat.beauty", filter: "Beauty" },
  { key: "cat.sports", filter: "Sports" },
  { key: "cat.gaming", filter: "Gaming" },
  { key: "cat.books", filter: "Books" },
  { key: "cat.kitchen", filter: "Kitchen" },
  { key: "cat.pets", filter: "Pets" },
];

export const genreKeys: { key: TranslationKey; filter: string }[] = [
  { key: "genre.all", filter: "All" },
  { key: "genre.action", filter: "Action" },
  { key: "genre.comedy", filter: "Comedy" },
  { key: "genre.drama", filter: "Drama" },
  { key: "genre.thriller", filter: "Thriller" },
  { key: "genre.scifi", filter: "Sci-Fi" },
  { key: "genre.superhero", filter: "Superhero" },
  { key: "genre.mystery", filter: "Mystery" },
  { key: "genre.adventure", filter: "Adventure" },
  { key: "genre.history", filter: "History" },
];
