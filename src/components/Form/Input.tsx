import { AnimatePresence, motion } from "framer-motion"
import { Control, Controller, useFormContext } from "react-hook-form"
import { MdError } from "react-icons/md"
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input"
import { findInputError, isFormInvalid } from "@/src/lib/form"
import { FormData } from "@/types/form"

import "react-phone-number-input/style.css"

interface Props {
  label: string
  type: string
  id: string
  placeholder: string
}

export const CustomPhoneInput = ({ control, placeholder }: { control: Control<FormData>; placeholder: string }) => {
  const {
    formState: { errors },
  } = useFormContext()

  const isInvalid = errors["userPhone"]

  return (
    <div className="mb-4 flex flex-col items-start justify-center gap-4 [&>.PhoneInput]:w-full">
      <div className="flex w-full flex-wrap items-center justify-between gap-2">
        <label className="block pr-4 text-left text-sm font-semibold text-slate-300" htmlFor="userPhone">
          {placeholder}
        </label>
        <AnimatePresence mode="wait" initial={false}>
          {isInvalid && <InputError message={"Invalid Phone Number"} key={"Invalid Phone Number"} />}
        </AnimatePresence>
      </div>
      <Controller
        name="userPhone"
        control={control}
        rules={{
          validate: (value) => isValidPhoneNumber(value),
        }}
        render={({ field: { onChange, value } }) => (
            <PhoneInput
              value={value}
              onChange={onChange}
              defaultCountry="US"
              id="userPhone"
              numberInputProps={{
                className:
                  "w-full appearance-none rounded-lg border border-slate-700/50 bg-slate-800/50 px-4 py-3 leading-tight text-slate-100 placeholder-slate-400 backdrop-blur-sm transition-all focus:border-brand focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-brand",
              }}
            />
        )}
      />
    </div>
  )
}

export const Input = ({ label, type, id, placeholder }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const inputError: any = findInputError(errors, id)
  const isInvalid = isFormInvalid(inputError)

  return (
    <div className="mb-4 flex flex-col items-start justify-center gap-4">
      <div className="flex w-full flex-wrap items-center justify-between gap-2">
        <label className="block pr-4 text-left text-sm font-semibold text-slate-300" htmlFor={id}>
          {label}
        </label>
        <AnimatePresence mode="wait" initial={false}>
          {isInvalid && <InputError message={inputError.error.message} key={inputError.error.message} />}
        </AnimatePresence>
      </div>
      <input
        className="w-full appearance-none rounded-lg border border-slate-700/50 bg-slate-800/50 px-4 py-3 leading-tight text-slate-100 placeholder-slate-400 backdrop-blur-sm transition-all focus:border-brand focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-brand"
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id, {
          required: {
            value: true,
            message: "required",
          },
        })}
      />
    </div>
  )
}

export const TextArea = ({ label, id, placeholder }: { label: string; id: string; placeholder: string }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const inputError: any = findInputError(errors, id)
  const isInvalid = isFormInvalid(inputError)

  return (
    <div className="mb-4 flex flex-col items-start justify-center gap-4">
      <div className="flex w-full flex-wrap items-center justify-between gap-2">
        <label className="block pr-4 text-left text-sm font-semibold text-slate-300" htmlFor={id}>
          {label}
        </label>
        <AnimatePresence mode="wait" initial={false}>
          {isInvalid && <InputError message={inputError.error.message} key={inputError.error.message} />}
        </AnimatePresence>
      </div>
      <textarea
        className="h-32 w-full appearance-none rounded-lg border border-slate-700/50 bg-slate-800/50 px-4 py-3 leading-tight text-slate-100 placeholder-slate-400 backdrop-blur-sm transition-all focus:border-brand focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-brand resize-none custom-scrollbar"
        id={id}
        placeholder={placeholder}
        {...register(id, {
          required: {
            value: true,
            message: "required",
          },
        })}
      />
    </div>
  )
}

export const InputError = ({ message }: { message: string }) => {
  return (
    <motion.p
      className="flex items-center gap-1 rounded-md bg-red-100 p-2 font-semibold text-red-500"
      {...framer_error}
    >
      <MdError />
      {message}
    </motion.p>
  )
}

const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
}
