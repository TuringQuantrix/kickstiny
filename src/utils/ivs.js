import { getFiber, searchFiberTree } from "./fiber.js";

export function isIVS(value) {
  if (!value || typeof value !== "object") {
    return null;
  }

  const target =
    value.core && typeof value.core === "object" ? value.core : value;
  const methods = ["setQuality", "setAutoQualityMode", "setVolume", "setMuted"];

  const matches = methods.every((name) => typeof target[name] === "function");
  return matches ? target : null;
}

export function waitForIVSCore(timeout = 20000) {
  return new Promise((resolve, reject) => {
    const start = performance.now();

    const attempt = () => {
      const video = document.querySelector("video");
      if (video) {
        const fiber = getFiber(video);
        if (fiber) {
          for (const ref of searchFiberTree(fiber)) {
            const candidate = isIVS(ref);
            if (candidate) {
              resolve(candidate);
              return;
            }
          }
        }
      }

      if (performance.now() - start > timeout) {
        reject(new Error("IVS player not found"));
        return;
      }

      requestAnimationFrame(attempt);
    };

    attempt();
  });
}
