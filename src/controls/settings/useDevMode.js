import { useState, useEffect } from "react";

export function useDevMode(core) {
  const [isDevMode, setIsDevMode] = useState(false);

  useEffect(() => {
    if (!isDevMode) {
      return;
    }

    const handler = (event) => {
      console.debug("[Kickstiny][IVS]", event.data);
    };

    core.worker.addEventListener("message", handler);
    return () => {
      core.worker.removeEventListener("message", handler);
    };
  }, [isDevMode, core]);

  return { isDevMode, setIsDevMode };
}
