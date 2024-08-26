import { sendGTMEvent } from "@next/third-parties/google"
import { z } from "zod"
import { UserSchema } from "@/types/form"

export default async function triggerFormContact(values: z.infer<typeof UserSchema>) {
  sendGTMEvent({ event: "contactFormClicked", ...values })
}
