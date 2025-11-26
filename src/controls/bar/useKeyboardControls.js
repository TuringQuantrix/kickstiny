import { useEffect } from "react";

export function useKeyboardControls({
  onPlayPause,
  onMuteToggle,
  onFullscreenToggle,
  container,
}) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Prevent default behavior for these keys
      const key = event.key.toLowerCase();

      switch (key) {
        case " ": // Spacebar
          event.preventDefault();
          onPlayPause();
          break;
        case "m":
          event.preventDefault();
          onMuteToggle();
          break;
        case "f":
          event.preventDefault();
          onFullscreenToggle();
          break;
        default:
          break;
      }
    };

    // Listen on document so keyboard shortcuts work anywhere on the page
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [container, onPlayPause, onMuteToggle, onFullscreenToggle]);
}
