import { z } from "zod"

export type FormData = {
  userFirstName: string
  userEmail: string
  userPhone: string
  userMessage: string
}

export const UserSchema = z.object({
  userFirstName: z.string().min(1),
  userEmail: z.string().email().min(1),
  userPhone: z.string().min(1),
  userMessage: z.string().min(1),
})
