import { NextResponse } from "next/server"
import { Resend } from "resend"

import NewUser from "@/components/Emails/NewUser"
import WelcomeEmail from "@/components/Emails/Welcome"

const resend = new Resend(process.env.RESEND_API_KEY)

function isUser(obj: any): obj is User {
  return (
    typeof obj === "object" &&
    typeof obj.userFirstName === "string" &&
    typeof obj.userEmail === "string" &&
    typeof obj.userPhone === "string"
  )
}

interface User {
  userFirstName: string
  userEmail: string
  userPhone: string
}

export async function POST(request: Request) {
  const json = await request.json()

  if (isUser(json)) {
    const { userFirstName, userEmail, userPhone } = json

    const data = await resend.batch.send([
      {
        from: "ADDSTRATEGIC <addstrategic@news.addstrategic.com>",
        to: [userEmail],
        subject: "Welcome to ADDSTRATEGIC",
        react: WelcomeEmail({ userFirstName }),
      },
      {
        from: "ADDSTRATEGIC Website <addstrategic@news.addstrategic.com>",
        to: ["adstrategicbusiness@gmail.com"],
        subject: "New ADDSTRATEGIC user has sent you an email",
        react: NewUser({ userFirstName, userEmail, userPhone }),
      },
    ])
    return NextResponse.json(data)
  } else {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}
