import { Check } from "lucide-react"
import Image from "next/image"
import { FcAlarmClock, FcMoneyTransfer } from "react-icons/fc"
import { GrUpdate } from "react-icons/gr"
import { MdCancel } from "react-icons/md"
import { type getDictionary } from "@/src/get-dictionary"

const WhyUs = ({ dictionary }: { dictionary: Awaited<ReturnType<typeof getDictionary>>["whyUs"] }) => {
  return (
    <section id="why-us" className="mx-auto max-w-screen-xl px-4 pt-16 text-center sm:pt-24 lg:px-6">
      <h2
        className="mb-4 text-center text-5xl font-extrabold !leading-tight sm:text-7xl"
        dangerouslySetInnerHTML={{ __html: dictionary.title }}
      ></h2>
      <p className="mb-12 text-primary">{dictionary.subtitle}</p>

      <div className="mx-auto grid w-full max-w-3xl rounded-lg bg-muted p-2 max-md:max-w-lg md:grid-cols-[1fr_1.2fr_1fr] md:items-center md:justify-center md:p-4">
        <div className="mb-4 rounded-t-lg bg-primary pb-4 pt-8 text-primary-foreground md:col-start-2 md:mb-0">
          <h2 className="text-2xl font-semibold">ADSTRATEGIC</h2>
        </div>
        <p className="mb-4 flex items-center justify-center gap-4 text-right text-lg md:col-start-1 md:m-0 md:justify-end md:pr-5">
          {dictionary.features[0]}
          <FcAlarmClock size={25} />
        </p>
        <div className="h-full bg-primary p-4 text-lg text-primary-foreground md:flex md:items-center md:justify-center md:py-3">
          <p className="md:hidden">{dictionary.keywords[0]}</p>
          <p>{dictionary.keywords[5]}</p>
        </div>
        <div className="mb-4 bg-destructive p-4 text-lg text-destructive-foreground md:mb-0 md:bg-transparent md:py-0 md:text-muted-foreground">
          <p className="md:hidden">{dictionary.keywords[1]}</p>
          <p>{dictionary.keywords[6]}</p>
        </div>
        <p className="mb-4 flex items-center justify-center gap-4 text-right text-lg md:col-start-1 md:m-0 md:justify-end md:pr-5">
          {dictionary.features[1]}
          <FcMoneyTransfer size={25} />
        </p>
        <div className="h-full bg-primary p-4 text-lg text-primary-foreground md:flex md:items-center md:justify-center md:py-3">
          <p className="md:hidden">{dictionary.keywords[0]}</p>
          <p>300+ USD</p>
        </div>
        <div className="mb-4 bg-destructive p-4 text-lg text-destructive-foreground md:mb-0 md:bg-transparent md:py-0 md:text-muted-foreground">
          <p className="md:hidden">{dictionary.keywords[1]}</p>
          <p>3k+ USD</p>
        </div>
        <div className="mb-4 flex items-center justify-center gap-4 text-right text-lg md:col-start-1 md:m-0 md:justify-end md:pr-5">
          <p>{dictionary.features[2]}</p>
          <Image width={25} height={25} src="/assets/icons/images.webp" alt="sdf" />
        </div>
        <div className="h-full bg-primary p-4 text-lg text-primary-foreground md:flex md:items-center md:justify-center md:py-3">
          <p className="md:hidden">{dictionary.keywords[0]}</p>
          <p className="flex items-center justify-center gap-4">
            <span className="rounded-lg bg-green-600 p-1 text-white">
              <Check />
            </span>{" "}
            {dictionary.keywords[2]}
          </p>
        </div>
        <div className="mb-4 bg-destructive p-4 text-lg text-destructive-foreground md:mb-0 md:bg-transparent md:py-0 md:text-muted-foreground">
          <p className="md:hidden">{dictionary.keywords[1]}</p>
          <p className="flex items-center justify-center gap-4">
            <MdCancel className="md:text-destructive" /> {dictionary.keywords[3]}
          </p>
        </div>
        <div className="mb-4 flex items-center justify-center gap-4 text-right text-lg md:col-start-1 md:m-0 md:justify-end md:pr-5">
          <p>{dictionary.features[3]}</p>
          <Image width={25} height={25} src="/assets/icons/diseno.webp" alt="sdf" />
        </div>
        <div className="h-full bg-primary p-4 text-lg text-primary-foreground md:flex md:items-center md:justify-center md:py-3">
          <p className="md:hidden">{dictionary.keywords[0]}</p>
          <p className="flex items-center justify-center gap-4">
            <span className="rounded-lg bg-green-600 p-1 text-white">
              <Check />
            </span>{" "}
            {dictionary.keywords[2]}
          </p>
        </div>
        <div className="mb-4 bg-destructive px-10 py-4 text-lg text-destructive-foreground md:bg-transparent md:py-0 md:text-muted-foreground">
          <p className="md:hidden">{dictionary.keywords[1]}</p>
          <p className="flex items-center justify-center gap-4">
            <span className="md:flex-1">
              <MdCancel className="md:text-destructive" size={18} />
            </span>{" "}
            {dictionary.keywords[4]}
          </p>
        </div>
        <div className="mx-auto mb-4 flex max-w-80 items-center justify-center gap-4 px-8 text-lg md:col-start-1 md:m-0 md:justify-end md:pl-0 md:pr-5 md:text-right">
          <p>{dictionary.features[4]}</p>
          <Image width={25} height={25} src="/assets/icons/mobile.webp" alt="sdf" />
        </div>
        <div className="h-full bg-primary p-4 text-lg text-primary-foreground md:flex md:items-center md:justify-center md:py-3">
          <p className="md:hidden">{dictionary.keywords[0]}</p>
          <p className="flex items-center justify-center gap-4">
            <span className="rounded-lg bg-green-600 p-1 text-white">
              <Check />
            </span>{" "}
            {dictionary.keywords[2]}
          </p>
        </div>
        <div className="mb-4 bg-destructive p-4 text-lg text-destructive-foreground md:mb-0 md:bg-transparent md:py-0 md:text-muted-foreground">
          <p className="md:hidden">{dictionary.keywords[1]}</p>
          <p className="flex items-center justify-center gap-4">
            <MdCancel className="md:text-destructive" size="18px" /> {dictionary.keywords[3]}
          </p>
        </div>
        <p className="mb-4 flex items-center justify-center gap-4 text-lg md:col-start-1 md:m-0 md:justify-end md:pr-5 md:text-right">
          {dictionary.features[5]}
          <GrUpdate />
        </p>
        <div className="h-full bg-primary p-4 text-lg text-primary-foreground md:flex md:items-center md:justify-center md:rounded-b-lg md:pb-8 md:pt-4">
          <p className="md:hidden">{dictionary.keywords[0]}</p>
          <p className="flex items-center justify-center gap-4">
            <span className="rounded-lg bg-green-600 p-1 text-white">
              <Check />
            </span>
            {dictionary.keywords[2]}
          </p>
        </div>
        <div className="mb-4 bg-destructive p-4 text-lg text-destructive-foreground md:mb-0 md:bg-transparent md:py-0 md:text-muted-foreground">
          <p className="md:hidden">{dictionary.keywords[1]}</p>
          <p className="flex items-center justify-center gap-4">
            <MdCancel className="md:text-destructive" /> {dictionary.keywords[3]}
          </p>
        </div>
        <p className="row-start-1 hidden text-lg font-bold text-muted-foreground md:col-start-3 md:inline">
          {dictionary.keywords[1]}
        </p>
      </div>
    </section>
  )
}

export default WhyUs
