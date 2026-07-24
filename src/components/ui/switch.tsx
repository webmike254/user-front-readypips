import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  labelOn?: string;
  labelOff?: string;
  showLabels?: boolean;
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, labelOn = "ON", labelOff = "OFF", showLabels = false, ...props }, ref) => (
  <div className="flex items-center gap-3">
    <SwitchPrimitives.Root
      className={cn(
        "peer inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:bg-primary data-[state=unchecked]:bg-[#E2E2E8]",
        "data-[state=checked]:border-primary data-[state=unchecked]:border-[#D0D0D8]",
        className
      )}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full shadow-md ring-0 transition-all duration-200",
          "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
          "data-[state=checked]:bg-white data-[state=unchecked]:bg-white"
        )}
      />
    </SwitchPrimitives.Root>
    {showLabels && (
      <span className={cn(
        "text-[12px] font-semibold transition-colors duration-200",
        props.checked ? "text-primary" : "text-text-muted"
      )}>
        {props.checked ? labelOn : labelOff}
      </span>
    )}
  </div>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
