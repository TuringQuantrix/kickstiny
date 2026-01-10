import React, { useState, useEffect } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Settings, ChevronRight, ChevronLeft } from "lucide-react";
import clsx from "clsx";
import Button from "../../components/Button.jsx";
import ControlsTooltip from "../ControlsTooltip.jsx";
import { useQualitySelector } from "./useQualitySelector.js";
import { MENU_MAIN, MENU_QUALITY } from "../../constants/SettingsButton.js";

export default function SettingsButton({ core, container, shouldShow }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState(MENU_MAIN);

  useEffect(() => {
    if (!shouldShow) {
      setIsOpen(false);
      setCurrentMenu(MENU_MAIN);
    }
  }, [shouldShow]);
  const { selectedQuality, qualityOptions, handleQualityChange } =
    useQualitySelector(core);

  const handleOpenChange = (open) => {
    setIsOpen(open);
    if (!open) {
      setCurrentMenu(MENU_MAIN);
    }
  };

  const navigateToQuality = () => {
    setCurrentMenu(MENU_QUALITY);
  };

  const navigateBack = () => {
    setCurrentMenu(MENU_MAIN);
  };

  return (
    <Tooltip.Root>
      <DropdownMenu.Root modal={false} open={isOpen} onOpenChange={handleOpenChange}>
        <Tooltip.Trigger asChild>
          <DropdownMenu.Trigger asChild>
            <Button variant="tertiary" iconOnly aria-label="Settings">
              <Settings size={20} strokeWidth={2.5} />
            </Button>
          </DropdownMenu.Trigger>
        </Tooltip.Trigger>
        {shouldShow && !isOpen && (
          <Tooltip.Portal>
            <ControlsTooltip>Settings</ControlsTooltip>
          </Tooltip.Portal>
        )}
        <DropdownMenu.Portal container={container}>
          <DropdownMenu.Content
            className="settings-dropdown dropdown"
            side="top"
            align="end"
            sideOffset={8}
            onClick={(e) => e.stopPropagation()}
          >
            {currentMenu === MENU_MAIN && (
              <DropdownMenu.Item
                className="dropdown__item dropdown__item--nav"
                onSelect={(e) => {
                  e.preventDefault();
                  navigateToQuality();
                }}
              >
                <span>Quality</span>
                <ChevronRight size={16} />
              </DropdownMenu.Item>
            )}

            {currentMenu === MENU_QUALITY && (
              <>
                <DropdownMenu.Item
                  className="dropdown__header"
                  onSelect={(e) => {
                    e.preventDefault();
                    navigateBack();
                  }}
                >
                  <ChevronLeft size={16} />
                  <span>Quality</span>
                </DropdownMenu.Item>

                <DropdownMenu.Separator className="dropdown__separator" />

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
              </>
            )}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </Tooltip.Root>
  );
}
