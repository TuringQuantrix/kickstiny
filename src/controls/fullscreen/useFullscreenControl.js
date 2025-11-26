import { useState, useCallback, useEffect } from "react";

export function useFullscreenControl(container) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullscreenToggle = useCallback(() => {
    if (!document.fullscreenElement) {
      container.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, [container]);

  useEffect(() => {
    const updateFullscreenState = () => {
      setIsFullscreen(document.fullscreenElement === container);
    };

    container.addEventListener("fullscreenchange", updateFullscreenState);
    updateFullscreenState();

    return () => {
      container.removeEventListener("fullscreenchange", updateFullscreenState);
    };
  }, []);

  return {
    isFullscreen,
    handleFullscreenToggle,
  };
}
