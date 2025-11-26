import React from "react";
import TooltipContent from "../components/TooltipContent.jsx";
import TooltipArrow from "../components/TooltipArrow.jsx";

export default React.forwardRef(function ControlsTooltip({ children }, ref) {
  return (
    <TooltipContent ref={ref} side="top" sideOffset={-4}>
      {children}
      <TooltipArrow />
    </TooltipContent>
  );
});
