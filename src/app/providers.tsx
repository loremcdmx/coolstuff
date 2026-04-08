"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Country = "mx" | "us";

const CountryContext = createContext<{
  country: Country;
  setCountry: (c: Country) => void;
}>({
  country: "mx",
  setCountry: () => {},
});

export function useCountry() {
  return useContext(CountryContext);
}

export function Providers({ children }: { children: ReactNode }) {
  const [country, setCountry] = useState<Country>("mx");

  return (
    <CountryContext.Provider value={{ country, setCountry }}>
      {children}
    </CountryContext.Provider>
  );
}
