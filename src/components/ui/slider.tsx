"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-grab active:cursor-grabbing" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export interface OneThumbSliderProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof Slider>,
    "value" | "onChange"
  > {
  value?: number
  onChange?: (value?: number) => void
}

const OneThumbSlider = React.forwardRef<
  React.ElementRef<typeof Slider>,
  OneThumbSliderProps
>(({ value, onChange, ...props }, ref) => {
  const finalValue = React.useMemo(
    () => (typeof value === "number" ? [value] : value),
    [value]
  )
  const finalOnValueChange = React.useCallback(
    (value?: number[]) => {
      console.log(value)
      let nextValue: number | undefined
      if (!value) {
        nextValue = value
      } else {
        if (value.length >= 1) {
          nextValue = value[0]
        } else {
          nextValue = undefined
        }
      }
      console.log(nextValue)
      onChange?.(nextValue)
    },
    [onChange]
  )
  return (
    <Slider
      ref={ref}
      value={finalValue}
      onValueChange={finalOnValueChange}
      {...props}
    />
  )
})
OneThumbSlider.displayName = "OneThumbSlider"

export { Slider, OneThumbSlider }
