import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Maximize, Minimize } from "lucide-react";
import Button from "../../components/Button.jsx";
import ControlsTooltip from "../ControlsTooltip.jsx";

export default function FullscreenButton({ isFullscreen, onFullscreenToggle }) {
  const label = "Fullscreen";
  const Icon = isFullscreen ? Minimize : Maximize;

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <Button
          variant="tertiary"
          iconOnly
          onClick={onFullscreenToggle}
          aria-label={label}
        >
          <Icon size={20} strokeWidth={2.5} />
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <ControlsTooltip>
          {label} (F)
        </ControlsTooltip>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
