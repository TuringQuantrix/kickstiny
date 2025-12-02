import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";

export default React.forwardRef(function TooltipContent(
  { children, ...props },
  ref,
) {
  return (
    <Tooltip.Content ref={ref} className="tooltip" {...props}>
      {children}
    </Tooltip.Content>
  );
});
