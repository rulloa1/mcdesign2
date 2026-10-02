import { lazy, Suspense, useEffect, useState } from "react";
import { journeyConfig } from "@/lib/journey-config";
import BlueprintOverlay from "./BlueprintOverlay";

const BlueprintScene = lazy(() => import("./BlueprintScene"));

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** One persistent 3D blueprint behind every page, plus the Simple View toggle. */
export function BlueprintJourney() {
  const [ready, setReady] = useState(false);
  const [simple, setSimple] = useState(false);
  const [webgl, setWebgl] = useState(true);

  useEffect(() => {
    setSimple(localStorage.getItem(journeyConfig.storageKey) === "1");
    setWebgl(hasWebGL());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.classList.toggle("journey", !simple);
    localStorage.setItem(journeyConfig.storageKey, simple ? "1" : "0");
  }, [simple, ready]);

  return (
    <>
      {ready && !simple ? (
        <div aria-hidden="true" className="journey-layer pointer-events-none fixed inset-0 -z-10">
          {webgl ? (
            <Suspense fallback={null}>
              <BlueprintScene onFail={() => setWebgl(false)} />
            </Suspense>
          ) : (
            <BlueprintOverlay />
          )}
        </div>
      ) : null}
      {ready ? (
        <button
          type="button"
          onClick={() => setSimple((s) => !s)}
          aria-pressed={simple}
          className="fixed bottom-4 left-4 z-50 rounded-full border border-brass/40 bg-carbon/85 px-4 py-2 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-bone/80 backdrop-blur transition hover:border-brass hover:text-brass focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
        >
          {simple ? "Blueprint View" : "Simple View"}
        </button>
      ) : null}
    </>
  );
}
