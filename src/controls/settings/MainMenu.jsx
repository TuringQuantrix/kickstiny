import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronRight } from "lucide-react";
import Switch from "../../components/Switch.jsx";

export default function MainMenu({
  onNavigateQuality,
  selectedQuality,
  isDevMode,
  onDevModeChange,
}) {
  return (
    <>
      <DropdownMenu.Item
        className="dropdown__item dropdown__item--nav"
        onSelect={(e) => {
          e.preventDefault();
          onNavigateQuality();
        }}
      >
        <span>Quality</span>
        <span className="dropdown__item-value">
          {selectedQuality.label}
          <ChevronRight size={16} />
        </span>
      </DropdownMenu.Item>

      <DropdownMenu.Item
        className="dropdown__item dropdown__item--nav"
        onSelect={(e) => {
          e.preventDefault();
        }}
      >
        <span>Dev Mode</span>
        <Switch checked={isDevMode} onCheckedChange={onDevModeChange} />
      </DropdownMenu.Item>
    </>
  );
}
