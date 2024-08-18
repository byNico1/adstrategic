"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { Button } from "@/components/Button/Button"
import { CustomPhoneInput, Input } from "@/components/Form/Input"
import triggerFormContact from "fbServices/sendDataToFB"
import { FormData, UserSchema } from "types/form"

const Form = () => {
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
            className="mx-auto w-full max-w-xl rounded-md bg-white py-8"
          >
            <div className="mx-auto flex w-3/4 flex-col">
              <Input label="Full Name" type="text" id="userFirstName" placeholder="Full Name" />
              <Input label="Email" type="email" id="userEmail" placeholder="Email" />
              <CustomPhoneInput control={methods.control} />

              <Button onClick={onSubmit} type="submit" className="mt-4 text-base sm:text-xl">
                Send Me My Service
              </Button>
            </div>
          </form>
        </FormProvider>
      ) : //* check if loadingState is either ready or loading
      loadingState === "loading" ? (
        <div className="mx-auto w-full max-w-xl rounded-md bg-white p-16">
          <img className="mx-auto" width={200} height={200} src="/assets/icons/loading-spinner.gif" alt="" />
        </div>
      ) : loadingState === "error" ? (
        <div className="mx-auto w-full max-w-xl rounded-md bg-white p-16 text-lg font-semibold">
          <p>There was an error</p>
          <p>Try again.</p>
        </div>
      ) : (
        loadingState === "success" && (
          <div className="mx-auto w-full max-w-xl rounded-md bg-white p-16 text-center">
            <p className="mb-8 text-green-900">Email Sent Succesfully</p>
            <h1 className="mb-4 text-4xl font-extrabold ">Thank you for submitting our form</h1>
            <p>We will contact you ASAP⚡.</p>
          </div>
        )
      )}
    </>
  )
}

export default Form

export const BlogForm = () => {
  const methods = useForm<FormData>({ resolver: zodResolver(UserSchema) })
  const [loadingState, setLoadingState] = useState<string | null>(null)
  const router = useRouter()

  const onSubmit = methods.handleSubmit(async (data) => {
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
      setLoadingState("error")
      return
    }

    setLoadingState("ready")
    router.push("/thank-you")
  })

  return (
    <>
      {loadingState === null ? ( //* user first time watching the send email, form goes here
        <FormProvider {...methods}>
          <form
            onSubmit={(e) => e.preventDefault()}
            noValidate
            className="mx-auto w-full max-w-xl rounded-md bg-white py-8"
          >
            <div className="mx-auto flex w-3/4 flex-col">
              <Input label="Full Name" type="text" id="userFirstName" placeholder="Full Name" />
              <Input label="Email" type="email" id="userEmail" placeholder="Email" />

              <Button onClick={onSubmit} type="submit" className="mt-4 text-base sm:text-xl">
                Send Me My Service
              </Button>
            </div>
          </form>
        </FormProvider>
      ) : //* check if loadingState is either ready or loading
      loadingState === "loading" ? (
        <div className="mx-auto w-full max-w-xl rounded-md bg-white p-16">
          <img className="mx-auto" width={200} height={200} src="/assets/icons/loading-spinner.gif" alt="" />
        </div>
      ) : (
        loadingState === "error" && (
          <div className="mx-auto w-full max-w-xl rounded-md bg-white p-16 text-lg font-semibold">
            <p>There was an error</p>
            <p>Try again.</p>
          </div>
        )
      )}
    </>
  )
}
