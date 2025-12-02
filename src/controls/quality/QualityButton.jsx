import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Settings } from "lucide-react";
import clsx from "clsx";
import Button from "../../components/Button.jsx";
import ControlsTooltip from "../ControlsTooltip.jsx";
import { useQualitySelector } from "./useQualitySelector.js";

export default function QualityButton({ core, container }) {
  const { selectedQuality, qualityOptions, handleQualityChange } =
    useQualitySelector(core);

  return (
    <Tooltip.Root>
      <DropdownMenu.Root modal={false}>
        <Tooltip.Trigger asChild>
          <DropdownMenu.Trigger asChild>
            <Button variant="tertiary" iconOnly aria-label="Quality">
              <Settings size={20} strokeWidth={2.5} />
            </Button>
          </DropdownMenu.Trigger>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <ControlsTooltip>Quality</ControlsTooltip>
        </Tooltip.Portal>
        <DropdownMenu.Portal container={container}>
          <DropdownMenu.Content
            className="quality-dropdown dropdown"
            side="top"
            align="end"
            sideOffset={8}
          >
            <DropdownMenu.RadioGroup
              value={selectedQuality}
              onValueChange={handleQualityChange}
            >
              {qualityOptions.map((option) => (
                <DropdownMenu.RadioItem
                  key={option.value}
                  value={option.value}
                  className={clsx(
                    "dropdown__item",
                    selectedQuality === option.value &&
                      "dropdown__item--active",
                  )}
                >
                  {option.label}
                </DropdownMenu.RadioItem>
              ))}
            </DropdownMenu.RadioGroup>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </Tooltip.Root>
  );
}
