import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import Button from "../../components/Button.jsx";
import KickIcon from "./KickIcon.jsx";
import ControlsTooltip from "../ControlsTooltip.jsx";
import TooltipArrow from "../../components/TooltipArrow.jsx";

export default function KickButton({ username, isPlaying, handlePlayPause }) {
  const handleWatchOnKick = () => {
    if (username) {
      if (isPlaying) {
        handlePlayPause();
      }

      window.open(`https://kick.com/${username}`, "_blank");
    }
  };

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <Button
          variant="tertiary"
          iconOnly
          onClick={handleWatchOnKick}
          aria-label="Watch on Kick"
          disabled={!username}
        >
          <KickIcon />
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <ControlsTooltip>
          Watch on Kick
          <TooltipArrow />
        </ControlsTooltip>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
