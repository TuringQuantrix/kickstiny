import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Play, Pause } from "lucide-react";
import Button from "../../components/Button.jsx";
import ControlsTooltip from "../ControlsTooltip.jsx";

export default function PlayPauseButton({ isPlaying, onPlayPause }) {
  const label = isPlaying ? "Pause" : "Play";
  const Icon = isPlaying ? Pause : Play;

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <Button
          variant="tertiary"
          iconOnly
          onClick={onPlayPause}
          aria-label={label}
        >
          <Icon size={20} strokeWidth={2.5} />
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <ControlsTooltip>{label} (Space)</ControlsTooltip>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
