import { Body, Container, Head, Hr, Html, Img, Preview, Text } from "@react-email/components"
import * as React from "react"

interface WelcomeEmailProps {
  userFirstName: string
}
export const WelcomeEmail = ({ userFirstName }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to Adstrategic, exponential growth to your business.</Preview>
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
        <Text style={paragraph}>Hi {userFirstName},</Text>
        <Text style={paragraph}>
          Welcome to Adstrategic, the tool to exponential growth on Internet, we will contact you as soon as possible to
          start the process.
        </Text>
        <Text style={paragraph}>
          Best,
          <br />
          The Adstrategic team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>Adstrategic Inc.</Text>
      </Container>
    </Body>
  </Html>
)

WelcomeEmail.PreviewProps = {
  userFirstName: "Nico",
} as WelcomeEmailProps

export default WelcomeEmail

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
