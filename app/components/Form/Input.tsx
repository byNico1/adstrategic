import ErrorIcon from "@mui/icons-material/Error"
import { AnimatePresence, motion } from "framer-motion"
import { Control, Controller, useFormContext } from "react-hook-form"
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input"
import { FormData } from "@/types/form"
import { findInputError, isFormInvalid } from "@/utils/form"

import "react-phone-number-input/style.css"

interface Props {
  label: string
  type: string
  id: string
  placeholder: string
}

export const CustomPhoneInput = ({ control }: { control: Control<FormData> }) => {
  const {
    formState: { errors },
  } = useFormContext()

  const isInvalid = errors["userPhone"]

  return (
    <div className="mb-4 flex flex-col items-start justify-center gap-4 [&>.PhoneInput]:w-full">
      <div className="flex w-full flex-wrap justify-between ">
        <label className="block pr-4 text-left font-bold text-gray-500" htmlFor="userPhone">
          Phone Number
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
                "w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none",
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
      <div className="flex w-full flex-wrap justify-between">
        <label className="block pr-4 text-left font-bold text-gray-500" htmlFor={id}>
          {label}
        </label>
        <AnimatePresence mode="wait" initial={false}>
          {isInvalid && <InputError message={inputError.error.message} key={inputError.error.message} />}
        </AnimatePresence>
      </div>
      <input
        className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
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

export const InputError = ({ message }: { message: string }) => {
  return (
    <motion.p
      className="flex items-center gap-1 rounded-md bg-red-100 px-2 font-semibold text-red-500"
      {...framer_error}
    >
      <ErrorIcon />
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
