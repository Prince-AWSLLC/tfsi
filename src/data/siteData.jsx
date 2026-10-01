import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const SiteDataContext = createContext(null);

const DATA_URL = "/siteData.json";

export function getPath(source, path) {
  if (!source || !path) return undefined;
  return path.split(".").reduce((node, key) => {
    if (node === undefined || node === null) return undefined;
    return node[key];
  }, source);
}

export function SiteDataProvider({ children }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setError(null);

    fetch(DATA_URL, { signal: controller.signal, cache: "no-cache" })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`siteData.json responded ${response.status}`);
        }
        return response.json();
      })
      .then((json) => setData(json))
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err);
        }
      });

    return () => controller.abort();
  }, [attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  const value = useMemo(
    () => ({
      data,
      error,
      ready: data !== null,
      retry,
      get: (path) => getPath(data, path),
    }),
    [data, error, retry]
  );

  return <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteDataContext);
  if (!ctx) {
    throw new Error("useSite must be used inside SiteDataProvider");
  }
  return ctx;
}
