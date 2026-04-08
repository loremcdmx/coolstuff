export type UserProfile = {
  interests: string[];
  priceRange: "budget" | "mid" | "premium" | "";
  entertainment: string[];
  completedQuiz: boolean;
  viewHistory: { id: string; type: "product" | "movie" | "song"; ts: number }[];
  categoryClicks: Record<string, number>;
};

const STORAGE_KEY = "coolstuff_profile";

const defaultProfile: UserProfile = {
  interests: [],
  priceRange: "",
  entertainment: [],
  completedQuiz: false,
  viewHistory: [],
  categoryClicks: {},
};

export function getProfile(): UserProfile {
  if (typeof window === "undefined") return defaultProfile;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProfile;
    return { ...defaultProfile, ...JSON.parse(raw) };
  } catch {
    return defaultProfile;
  }
}

export function saveProfile(profile: UserProfile) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export function trackView(id: string, type: "product" | "movie" | "song") {
  const p = getProfile();
  p.viewHistory = [
    { id, type, ts: Date.now() },
    ...p.viewHistory.filter((v) => v.id !== id).slice(0, 99),
  ];
  saveProfile(p);
}

export function trackCategoryClick(category: string) {
  const p = getProfile();
  p.categoryClicks[category] = (p.categoryClicks[category] || 0) + 1;
  saveProfile(p);
}

export function getTopCategories(n = 5): string[] {
  const p = getProfile();
  return Object.entries(p.categoryClicks)
    .sort(([, a], [, b]) => b - a)
    .slice(0, n)
    .map(([k]) => k);
}
