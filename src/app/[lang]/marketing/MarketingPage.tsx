"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Trans } from "@lingui/macro"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { OneThumbSlider, Slider } from "@/components/ui/slider"

function defaultNumberZod() {
  return z.number().positive().min(0).max(100)
}

const FormSchema = z.object({
  humorLevel: defaultNumberZod(),
})

export default function MarketingPage() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      humorLevel: 50,
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {}

  return (
    <div className="md:container py-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <Card>
            <CardHeader>
              <CardTitle>
                <Trans>寫作風格</Trans>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex md:justify-center">
              <FormField
                control={form.control}
                name="humorLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      幽默程度: {field.value}
                      </FormLabel>
                    <FormControl>
                      <OneThumbSlider min={0} max={100} step={10} {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                <Trans>設定</Trans>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex md:justify-center"></CardContent>
          </Card>
        </form>
      </Form>
    </div>
  )
}
