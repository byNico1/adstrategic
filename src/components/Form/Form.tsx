"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import dynamic from "next/dynamic"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import triggerFormContact from "@/fb/sendDataToFB"
import { Button } from "@/shadcn/button"
import { type getDictionary } from "@/src/get-dictionary"
import { FormData, UserSchema } from "@/types/form"

const CustomPhoneInput = dynamic(() => import("@/components/Form/Input").then((mod) => mod.CustomPhoneInput))
const Input = dynamic(() => import("@/components/Form/Input").then((mod) => mod.Input))

const Form = ({
  className,
  dictionary,
}: {
  className?: string
  dictionary?: Awaited<ReturnType<typeof getDictionary>>["form"]
}) => {
  const methods = useForm<FormData>({ resolver: zodResolver(UserSchema) })
  const [loadingState, setLoadingState] = useState<string | null>(null)
  const router = useRouter()

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      setLoadingState("loading")

      const dataToSend = await fetch("/api/email", {
        method: "POST",
        body: JSON.stringify({
          userFirstName: data.userFirstName,
          userEmail: data.userEmail,
          userPhone: data.userPhone,
        }),
      })

      if (!dataToSend.ok) {
        throw new Error("Error fetching")
      }

      triggerFormContact(data)

      setLoadingState("success")
      router.push("/thank-you")
    } catch (err) {
      console.error(err)
      setLoadingState("error")
    }
  })

  return (
    <>
      {loadingState === null ? ( //* user first time watching the send email, form goes here
        <FormProvider {...methods}>
          <form
            onSubmit={(e) => e.preventDefault()}
            noValidate
            className="mx-auto w-full max-w-xl rounded-md bg-background py-8"
          >
            <div className={`mx-auto flex w-3/4 flex-col ${className}`}>
              <Input
                label={dictionary?.fullNamePlaceholder || "Full Name"}
                type="text"
                id="userFirstName"
                placeholder={dictionary?.fullNamePlaceholder || "Full Number"}
              />
              <Input label="E-mail" type="email" id="userEmail" placeholder="E-mail" />
              <CustomPhoneInput
                placeholder={dictionary?.phoneNumberPlaceholder || "Phone Number"}
                control={methods.control}
              />

              <Button onClick={onSubmit} size="lg" type="submit" className="mt-4 w-full">
                {dictionary?.cta || "Send me my proposal"}
              </Button>
            </div>
          </form>
        </FormProvider>
      ) : //* check if loadingState is either ready or loading
      loadingState === "loading" ? (
        <div className="mx-auto w-full max-w-xl rounded-md p-16">
          <Image className="mx-auto" width={200} height={200} src="/assets/icons/loading-spinner.gif" alt="" />
        </div>
      ) : loadingState === "error" ? (
        <div className="mx-auto w-full max-w-xl rounded-md bg-background p-16 text-lg font-semibold text-destructive dark:text-red-400">
          <p>{dictionary?.errorMessages[0] || "There was an error"}</p>
          <p>{dictionary?.errorMessages[1] || "Try again."}</p>
        </div>
      ) : (
        loadingState === "success" && (
          <div className="mx-auto w-full max-w-xl rounded-md bg-background px-2 py-16 text-center">
            <p className="mb-8 text-green-900 dark:text-green-400">
              {dictionary?.successMessages[0] || "Email Sent Succesfully"}
            </p>
            <p className="mb-4 text-4xl font-extrabold">
              {dictionary?.successMessages[1] || "Thank you for submitting our form"}
            </p>
            <p>{dictionary?.successMessages[2] || "We will contact you ASAP⚡."}</p>
          </div>
        )
      )}
    </>
  )
}

export default Form
