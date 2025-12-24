import { Body, Container, Head, Hr, Html, Img, Preview, Text } from "@react-email/components"
import * as React from "react"

interface NewUserProps {
  userFirstName: string
  userEmail: string
  userPhone: string
}
export const NewUser = ({ userFirstName, userEmail, userPhone }: NewUserProps) => (
  <Html>
    <Head />
    <Preview>New users need information!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={
            "https://lh3.googleusercontent.com/a/ACg8ocKKEmYwGb5Mgp2y-HOtrUghnwmUrI17HVwOo1mzep-uGhZhV2k=s96-c-rg-br100"
          }
          width="50"
          height="50"
          alt="Logo"
          style={logo}
        />
        <Text style={paragraph}>Client Name: {userFirstName},</Text>
        <Text style={paragraph}>Client Email: {userEmail}</Text>
        <Text style={paragraph}>Client Phone: {userPhone}</Text>
        <Text style={paragraph}>Get in touch with the client ASAP</Text>
        <Hr style={hr} />
        <Text style={footer}>ADDSTRATEGIC LLC.</Text>
      </Container>
    </Body>
  </Html>
)

NewUser.PreviewProps = {
  userFirstName: "Nicolas",
  userEmail: "mail@gmail.com",
  userPhone: "3165382781",
} as NewUserProps

export default NewUser

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
}

const logo = {
  margin: "0 auto",
}

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
}

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
}

const footer = {
  color: "#8898aa",
  fontSize: "12px",
}
