import { useState, useEffect, useCallback } from "react";
import { usePreferences } from "../usePreferences.js";

const AUTO_QUALITY = { label: "Auto", value: "auto" };

export function useQualitySelector(core) {
  const { savedQuality, setSavedQuality } = usePreferences();
  const [selectedQuality, setSelectedQuality] = useState(AUTO_QUALITY);
  const [qualities, setQualities] = useState([]);

  const handleQualityChange = useCallback(
    (value) => {
      if (!value) {
        return;
      }

      const option =
        value === "auto" ? AUTO_QUALITY : { label: value, value: value };

      setSelectedQuality(option);

      if (value === "auto") {
        core.setAutoQualityMode(true);
        setSavedQuality("auto");
        return;
      }

      const targetQuality = qualities.find((quality) => quality.name === value);
      if (!targetQuality) {
        console.warn("[KickQuality] quality option missing", value);
        return;
      }

      core.setAutoQualityMode(false);
      core.setQuality(targetQuality);

      setSavedQuality(value);
    },
    [core, qualities, setSavedQuality],
  );

  useEffect(() => {
    const handler = (event) => {
      const { type, arg } = event.data;

      if (arg?.key === "qualities") {
        if (arg.value?.length) {
          setQualities(arg.value);
        }
        return;
      }

      if (!savedQuality) {
        return;
      }

      if (type === 12 && arg?.key === "autoQualityMode") {
        const shouldBeAuto = savedQuality === "auto";
        if (arg.value !== shouldBeAuto) {
          console.debug(
            `[Kickstiny] Enforcing auto quality mode ${shouldBeAuto} (player changed to ${arg.value})`,
          );
          handleQualityChange(savedQuality);
        }
      }
    };

    core.worker.addEventListener("message", handler);
    return () => {
      core.worker.removeEventListener("message", handler);
    };
  }, [core, savedQuality, handleQualityChange]);

  useEffect(() => {
    if (!savedQuality || !qualities.length) {
      return;
    }

    if (savedQuality === "auto") {
      handleQualityChange("auto");
      return;
    }

    if (qualities.some((quality) => quality.name === savedQuality)) {
      handleQualityChange(savedQuality);
    }
  }, [qualities, savedQuality, handleQualityChange]);

  const qualityOptions = [
    AUTO_QUALITY,
    ...qualities.map((q) => ({ value: q.name, label: q.name })),
  ];

  return {
    selectedQuality,
    qualityOptions,
    handleQualityChange,
  };
}
