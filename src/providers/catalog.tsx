import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { api } from "../utils/lib";
import type { Catalog, Yakuman } from "../types";

const CatalogContext = createContext<Catalog | null>(null);

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setError("");
    api<Catalog>("/catalog", { signal: controller.signal })
      .then((data) => {
        if (!data.yakumans?.length || !data.tileIds?.length) {
          throw new Error("The API returned an empty yakuman catalog.");
        }
        if (!controller.signal.aborted) setCatalog(data);
      })
      .catch((err: Error) => {
        if (!controller.signal.aborted) setError(err.message);
      });
    return () => controller.abort();
  }, [attempt]);

  if (!catalog) {
    return (
      <main className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center gap-5 px-6 text-center">
        <h1 className="text-2xl font-bold">Yakuman Soul</h1>
        {error ? (
          <>
            <p role="alert" className="text-danger">
              {error}
            </p>
            <p className="text-sm text-muted">
              Make sure the API is running, then try again.
            </p>
            <button
              className="rounded-lg bg-accent px-5 py-3 font-semibold text-accent-ink"
              onClick={() => setAttempt((value) => value + 1)}
            >
              Try again
            </button>
          </>
        ) : (
          <p role="status" className="text-muted">
            Loading the yakuman catalog…
          </p>
        )}
      </main>
    );
  }

  return (
    <CatalogContext.Provider value={catalog}>
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalog() {
  const catalog = useContext(CatalogContext);
  if (!catalog)
    throw new Error("useCatalog must be used inside CatalogProvider");
  const getYakuman = (id: string): Yakuman =>
    catalog.yakumans.find((y) => y.id === id) ?? {
      id,
      name: "Unknown yakuman",
      english: "Unrecognized catalog entry",
      japanese: "役満",
      multiplier: 1,
    };
  return { ...catalog, getYakuman };
}
