"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { Button } from "@/components/Button/Button"
import { CustomPhoneInput, Input } from "@/components/Form/Input"
import { FormData, UserSchema } from "@/types/form"

function isInputNamedElement(e: Element): e is HTMLInputElement {
  return "value" in e && "name" in e
}

const Form = () => {
  const methods = useForm<FormData>({ resolver: zodResolver(UserSchema) })
  const [loadingState, setLoadingState] = useState<string | null>(null)
  const router = useRouter()

  const onSubmit = methods.handleSubmit(async (data) => {
    console.log(data)

    setLoadingState("loading")

    setTimeout(() => {}, 3000)
    // const dataToSend = await fetch("/api/email", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     userFirstName: data.userFirstName,
    //     userEmail: data.userEmail,
    //     userPhone: data.userPhone,
    //   }),
    // })

    // if (!dataToSend.ok) {
    //   setLoadingState("error")
    //   return
    // }

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
        <div className="mx-auto w-full max-w-xl rounded-md bg-white p-16 text-lg font-semibold">
          <p className="text-green-900">Email Sent Succesfully</p>
          <p className="mt-2 text-sm font-normal text-gray-700">If you think you typed some data wrong:</p>
          <Button onClick={() => setLoadingState(null)} className="mt-5 text-base sm:text-xl">
            Send data again
          </Button>
        </div>
      )}
      {/* {loadingState === null ? ( //* user first time watching the send email, form goes here
        <form onSubmit={handleOnSubmit} className="mx-auto w-full max-w-xl rounded-md bg-white py-8">
          <div className="mx-auto flex w-3/4 flex-col">
            <div className="mb-4 flex flex-col items-start justify-start">
              <label className="mb-2 block pr-4 text-left font-bold text-gray-500" htmlFor="name">
                Full Name
              </label>
              <input
                className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
                id="name"
                name="userFirstName"
                type="text"
                placeholder="Name"
              ></input>
            </div>
            <div className="mb-4 flex flex-col ">
              <label className="mb-1 block pr-4 text-left font-bold text-gray-500" htmlFor="email">
                Email
              </label>
              <input
                className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
                id="email"
                name="userEmail"
                type="email"
                placeholder="Email"
              />
            </div>

            <div className=" flex flex-col ">
              <label className="mb-1 block pr-4 text-left font-bold text-gray-500" htmlFor="phone">
                Phone
              </label>
              <input
                className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
                id="phone"
                name="userPhone"
                type="tel"
                placeholder="Phone"
              />
            </div>

            <Button type="submit" className="mt-8 text-base sm:text-xl">
              Send Me My Service
            </Button>
          </div>
        </form>
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
        <div className="mx-auto w-full max-w-xl rounded-md bg-white p-16 text-lg font-semibold">
          <p className="text-green-900">Email Sent Succesfully</p>
          <p className="mt-2 text-sm font-normal text-gray-700">If you think you typed some data wrong:</p>
          <Button onClick={() => setLoadingState(null)} className="mt-5 text-base sm:text-xl">
            Send data again
          </Button>
        </div>
      )} */}
    </>
  )
}

export default Form

export const BlogForm = () => {
  const [loadingState, setLoadingState] = useState<string | null>(null)

  async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData: Record<string, string> = {}

    Array.from(e.currentTarget.elements)
      .filter(isInputNamedElement)
      .forEach((field) => {
        if (!field.name) return

        formData[field.name] = field.value
      })

    setLoadingState("loading")

    console.log(formData)

    const data = await fetch("/api/email", {
      method: "POST",
      body: JSON.stringify({
        userFirstName: formData.userFirstName,
        userEmail: formData.userEmail,
        userPhone: formData.userPhone,
      }),
    })

    if (!data.ok) {
      setLoadingState("error")
      return
    }

    setLoadingState("ready")
  }

  return (
    <>
      {loadingState === null ? ( //* user first time watching the send email, form goes here
        <form onSubmit={handleOnSubmit} className="mx-auto w-full max-w-xl rounded-md bg-white pt-8">
          <div className="mx-auto  flex w-3/4 flex-col ">
            <div className="mb-4 flex flex-col items-start justify-start">
              <label className="mb-2 block pr-4 text-left font-bold text-gray-500" htmlFor="name">
                Full Name
              </label>
              <input
                className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
                id="name"
                name="userFirstName"
                type="text"
                placeholder="Name"
              ></input>
            </div>
            <div className="mb-4 flex flex-col ">
              <label className="mb-1 block pr-4 text-left font-bold text-gray-500" htmlFor="email">
                Email
              </label>
              <input
                className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
                id="email"
                name="userEmail"
                type="email"
                placeholder="Email"
              />
            </div>

            <Button type="submit" className="mt-4 text-base sm:text-xl">
              Send Me My Service
            </Button>
          </div>
        </form>
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
        <div className="mx-auto w-full max-w-xl rounded-md bg-white p-16 text-lg font-semibold">
          <p className="text-green-900">Email Sent Succesfully</p>
          <p className="mt-2 text-sm font-normal text-gray-700">If you think you typed some data wrong:</p>
          <Button onClick={() => setLoadingState(null)} className="mt-8 text-base sm:text-xl">
            Send data again
          </Button>
        </div>
      )}
    </>
  )
}
