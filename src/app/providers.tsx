"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Lang } from "@/data/i18n";

type Country = "mx" | "us";
type Theme = "dark" | "light";

type AppState = {
  country: Country;
  setCountry: (c: Country) => void;
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
};

const AppContext = createContext<AppState>({
  country: "mx",
  setCountry: () => {},
  lang: "en",
  setLang: () => {},
  theme: "dark",
  setTheme: () => {},
});

export function useApp() {
  return useContext(AppContext);
}

export function Providers({ children }: { children: ReactNode }) {
  const [country, setCountry] = useState<Country>("mx");
  const [lang, setLang] = useState<Lang>("en");
  const [theme, setTheme] = useState<Theme>("dark");

  return (
    <AppContext.Provider
      value={{ country, setCountry, lang, setLang, theme, setTheme }}
    >
      <div className={theme === "dark" ? "dark" : ""}>{children}</div>
    </AppContext.Provider>
  );
}
