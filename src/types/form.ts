import { z } from "zod" // Add new import
// Finish

export type FormData = {
  userFirstName: string
  userEmail: string
  userPhone: string
}

export const UserSchema = z.object({
  userFirstName: z.string().min(1),
  userEmail: z.string().email().min(1),
  userPhone: z.string().min(1),
})
