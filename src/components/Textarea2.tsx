"use client"

import * as React from "react"
import TextareaAutosize from "react-textarea-autosize"

import { cn } from "@/lib/utils"

export const Textarea2 = React.forwardRef<
  React.ElementRef<typeof TextareaAutosize>,
  React.ComponentPropsWithoutRef<typeof TextareaAutosize>
>(({ className, ...props }, ref) => {
  return <TextareaAutosize className={cn("w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background", className)} ref={ref} {...props} />
})
Textarea2.displayName = "Textarea2"
