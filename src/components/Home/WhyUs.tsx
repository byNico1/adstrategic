import { Check } from "lucide-react"
import Image from "next/image"
import { FcAlarmClock, FcMoneyTransfer } from "react-icons/fc"
import { GrUpdate } from "react-icons/gr"
import { MdCancel } from "react-icons/md"

const WhyUs = () => {
  return (
    <section id="why-us" className="mx-auto max-w-screen-xl px-4 pt-16 text-center sm:pt-24 lg:px-6">
      <h2 className="mb-4 text-center text-5xl font-extrabold !leading-tight sm:text-7xl">
        Why <span className="text-brand">choose us</span>?
      </h2>
      <p className="mb-12 text-primary">There&apos;s a reason we are the #1 choice for website design.</p>

      <div className="mx-auto grid w-full max-w-3xl rounded-lg bg-muted p-2 max-md:max-w-lg md:grid-cols-[1fr_1.2fr_1fr] md:items-center md:justify-center md:p-4">
        <div className="mb-4 rounded-t-lg bg-primary pb-4 pt-8 text-primary-foreground md:col-start-2 md:mb-0">
          <h2 className="text-2xl font-semibold">ADSTRATEGIC</h2>
        </div>
        <p className="mb-4 flex items-center justify-center gap-4 text-right text-lg md:col-start-1 md:m-0 md:justify-end md:pr-5">
          Turn Around Time
          <FcAlarmClock size={25} />
        </p>
        <div className="h-full bg-primary p-4 text-lg text-primary-foreground md:flex md:items-center md:justify-center md:py-3">
          <p className="md:hidden">Us:</p>
          <p>6-10 Days</p>
        </div>
        <div className="mb-4 bg-destructive p-4 text-lg text-destructive-foreground md:mb-0 md:bg-transparent md:py-0 md:text-muted-foreground">
          <p className="md:hidden">Others:</p>
          <p>2-4 Months</p>
        </div>
        <p className="mb-4 flex items-center justify-center gap-4 text-right text-lg md:col-start-1 md:m-0 md:justify-end md:pr-5">
          Total Cost
          <FcMoneyTransfer size={25} />
        </p>
        <div className="h-full bg-primary p-4 text-lg text-primary-foreground md:flex md:items-center md:justify-center md:py-3">
          <p className="md:hidden">Us:</p>
          <p>300+ USD</p>
        </div>
        <div className="mb-4 bg-destructive p-4 text-lg text-destructive-foreground md:mb-0 md:bg-transparent md:py-0 md:text-muted-foreground">
          <p className="md:hidden">Others:</p>
          <p>3k+ USD</p>
        </div>
        <div className="mb-4 flex items-center justify-center gap-4 text-right text-lg md:col-start-1 md:m-0 md:justify-end md:pr-5">
          <p>Website content</p>
          <Image width={25} height={25} src="/assets/icons/images.png" alt="sdf" />
        </div>
        <div className="h-full bg-primary p-4 text-lg text-primary-foreground md:flex md:items-center md:justify-center md:py-3">
          <p className="md:hidden">Us:</p>
          <p className="flex items-center justify-center gap-4">
            <span className="rounded-lg bg-green-600 p-1 text-white">
              <Check />
            </span>{" "}
            Done for you
          </p>
        </div>
        <div className="mb-4 bg-destructive p-4 text-lg text-destructive-foreground md:mb-0 md:bg-transparent md:py-0 md:text-muted-foreground">
          <p className="md:hidden">Others:</p>
          <p className="flex items-center justify-center gap-4">
            <MdCancel className="md:text-destructive" /> Not included
          </p>
        </div>
        <div className="mb-4 flex items-center justify-center gap-4 text-right text-lg md:col-start-1 md:m-0 md:justify-end md:pr-5">
          <p>Design + Development</p>
          <Image width={25} height={25} src="/assets/icons/diseno.png" alt="sdf" />
        </div>
        <div className="h-full bg-primary p-4 text-lg text-primary-foreground md:flex md:items-center md:justify-center md:py-3">
          <p className="md:hidden">Us:</p>
          <p className="flex items-center justify-center gap-4">
            <span className="rounded-lg bg-green-600 p-1 text-white">
              <Check />
            </span>{" "}
            Done for you
          </p>
        </div>
        <div className="mb-4 bg-destructive px-10 py-4 text-lg text-destructive-foreground md:bg-transparent md:py-0 md:text-muted-foreground">
          <p className="md:hidden">Others:</p>
          <p className="flex items-center justify-center gap-4">
            <span className="md:flex-1">
              <MdCancel className="md:text-destructive" size={18} />
            </span>{" "}
            Design or development
          </p>
        </div>
        <div className="mx-auto mb-4 flex max-w-80 items-center justify-center gap-4 px-8 text-lg md:col-start-1 md:m-0 md:justify-end md:pl-0 md:pr-5 md:text-right">
          <p>Mobile responsive web design</p>
          <Image width={25} height={25} src="/assets/icons/mobile.png" alt="sdf" />
        </div>
        <div className="h-full bg-primary p-4 text-lg text-primary-foreground md:flex md:items-center md:justify-center md:py-3">
          <p className="md:hidden">Us:</p>
          <p className="flex items-center justify-center gap-4">
            <span className="rounded-lg bg-green-600 p-1 text-white">
              <Check />
            </span>{" "}
            Done for you
          </p>
        </div>
        <div className="mb-4 bg-destructive p-4 text-lg text-destructive-foreground md:mb-0 md:bg-transparent md:py-0 md:text-muted-foreground">
          <p className="md:hidden">Others:</p>
          <p className="flex items-center justify-center gap-4">
            <MdCancel className="md:text-destructive" size="18px" /> Not included
          </p>
        </div>
        <p className="mb-4 flex items-center justify-center gap-4 text-lg md:col-start-1 md:m-0 md:justify-end md:pr-5 md:text-right">
          Publish site
          <GrUpdate />
        </p>
        <div className="h-full bg-primary p-4 text-lg text-primary-foreground md:flex md:items-center md:justify-center md:rounded-b-lg md:pb-8 md:pt-4">
          <p className="md:hidden">Us:</p>
          <p className="flex items-center justify-center gap-4">
            <span className="rounded-lg bg-green-600 p-1 text-white">
              <Check />
            </span>
            Done for you
          </p>
        </div>
        <div className="mb-4 bg-destructive p-4 text-lg text-destructive-foreground md:mb-0 md:bg-transparent md:py-0 md:text-muted-foreground">
          <p className="md:hidden">Others:</p>
          <p className="flex items-center justify-center gap-4">
            <MdCancel className="md:text-destructive" /> Not included
          </p>
        </div>
        <p className="row-start-1 hidden text-lg font-bold text-muted-foreground md:col-start-3 md:inline">Others</p>
      </div>
    </section>
  )
}

export default WhyUs
