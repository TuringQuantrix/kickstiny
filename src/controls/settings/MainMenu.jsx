import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronRight } from "lucide-react";
import { capitalizeIfString } from "../../utils/format";

export default function MainMenu({ onNavigateQuality, selectedQuality }) {
  return (
    <DropdownMenu.Item
      className="dropdown__item dropdown__item--nav"
      onSelect={(e) => {
        e.preventDefault();
        onNavigateQuality();
      }}
    >
      <span>Quality</span>
      <span className="dropdown__item-value">
        {capitalizeIfString(selectedQuality)}
        <ChevronRight size={16} />
      </span>
    </DropdownMenu.Item>
  );
}
