import { useState, useCallback } from "react";

const QUALITY_STORAGE_KEY = "kickstiny.preference.quality";
const VOLUME_STORAGE_KEY = "kickstiny.preference.volume";

const DEFAULT_VOLUME = 100;

export function usePreferences() {
  const [savedQuality, setSavedQualityState] = useState(() => {
    try {
      return window.localStorage.getItem(QUALITY_STORAGE_KEY);
    } catch (err) {
      console.log("[Kickstiny] Unable to read quality preference", err);
      return null;
    }
  });

  const [savedVolume, setSavedVolumeState] = useState(() => {
    try {
      const stored = window.localStorage.getItem(VOLUME_STORAGE_KEY);
      return stored !== null ? parseFloat(stored) : DEFAULT_VOLUME;
    } catch (err) {
      console.log("[Kickstiny] Unable to read volume preference", err);
      return DEFAULT_VOLUME;
    }
  });

  const setSavedQuality = useCallback((value) => {
    try {
      window.localStorage.setItem(QUALITY_STORAGE_KEY, value);
      setSavedQualityState(value);
    } catch (err) {
      console.log("[Kickstiny] Unable to persist quality preference", err);
    }
  }, []);

  const setSavedVolume = useCallback((value) => {
    try {
      window.localStorage.setItem(VOLUME_STORAGE_KEY, value.toString());
      setSavedVolumeState(value);
    } catch (err) {
      console.log("[Kickstiny] Unable to persist volume preference", err);
    }
  }, []);

  return {
    savedQuality,
    savedVolume,
    setSavedQuality,
    setSavedVolume,
  };
}
