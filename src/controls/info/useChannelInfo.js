import { useState, useEffect, useRef } from "react";
import { fetchChannelInfo, fetchViewerCount } from "../../utils/api.js";
import { formatUptime, extractUsernameFromUrl } from "../../utils/format.js";

export function useChannelInfo() {
  const [username, setUsername] = useState(null);
  const [viewerCount, setViewerCount] = useState(null);
  const [uptime, setUptime] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const viewerCountIntervalRef = useRef(null);
  const uptimeIntervalRef = useRef(null);

  useEffect(() => {
    const extractedUsername = extractUsernameFromUrl(window.location.href);
    if (!extractedUsername) {
      return;
    }

    const loadChannelInfo = async () => {
      try {
        const data = await fetchChannelInfo(extractedUsername);

        if (data.user?.username) {
          setUsername(data.user.username);
        }

        const livestreamId = data.livestream?.id;
        if (livestreamId) {
          if (data.livestream.viewer_count !== undefined) {
            setViewerCount(data.livestream.viewer_count);
          }

          if (data.livestream.start_time) {
            console.debug(
              "[Kickstiny] Stream start time is",
              data.livestream.start_time,
            );
            setStartTime(data.livestream.start_time);
            const initialUptime = formatUptime(data.livestream.start_time);
            setUptime(initialUptime);
          } else {
            console.warn("[Kickstiny] No start time found in livestream data");
          }

          const updateViewerCount = async () => {
            try {
              const viewers = await fetchViewerCount(livestreamId);
              if (viewers !== null) {
                setViewerCount(viewers);
              }
            } catch (error) {
              console.error("[Kickstiny] Error fetching viewer count", error);
            }
          };

          updateViewerCount();

          viewerCountIntervalRef.current = setInterval(
            updateViewerCount,
            60000,
          );
        }
      } catch (error) {
        console.error("[Kickstiny] Error fetching channel info", error);
      }
    };

    loadChannelInfo();

    return () => {
      if (viewerCountIntervalRef.current) {
        clearInterval(viewerCountIntervalRef.current);
        viewerCountIntervalRef.current = null;
      }
      if (uptimeIntervalRef.current) {
        clearInterval(uptimeIntervalRef.current);
        uptimeIntervalRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!startTime) return;

    const updateUptime = () => {
      setUptime(formatUptime(startTime));
    };

    updateUptime();

    uptimeIntervalRef.current = setInterval(updateUptime, 1000);

    return () => {
      if (uptimeIntervalRef.current) {
        clearInterval(uptimeIntervalRef.current);
        uptimeIntervalRef.current = null;
      }
    };
  }, [startTime]);

  return { username, viewerCount, uptime };
}
