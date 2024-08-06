import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { GoArrowRight } from "react-icons/go"

export default function ProjectCard() {
  const [hover, setHover] = useState(false)
  const [justhover, setJustHover] = useState(false)

  return (
    <div
      className="card-bg relative h-[450px] overflow-hidden rounded-xl border"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className={`transition-transform duration-500 ${hover ? "-translate-y-full" : ""}`}>
        <Image
          className="h-auto w-full overflow-hidden rounded-t-xl"
          src="/Thumbnail.png"
          width={400}
          height={400}
          alt="dekalo"
        />
      </div>
      <div className={`relative transition-transform duration-500 ${hover ? "-translate-y-60" : ""}`}>
        <div className="p-4">
          <div className="flex gap-2">
            <p className="containerbg rounded-full px-2 py-1 text-sm font-medium">2024</p>
            <p className="containerbg rounded-full px-2 py-1 text-sm font-medium">Web 2</p>
            <p className="containerbg rounded-full px-2 py-1 text-sm font-medium">Health</p>
          </div>
          <p className="clash mt-2">Caregivers Hospital</p>
          <h5 className="clash text-xl font-bold">
            A User-centered Electronic Medical Record (EMR) System Integrating health maintenance organizations (HMOs)
          </h5>
        </div>
        <div className={`p-4 transition-opacity duration-500 ${hover ? "opacity-100" : "hidden opacity-0"}`}>
          <p>
            The Stacks ecosystem is growing at a bullish pace. With about 10 protocols & communities, 19 partners &
            integrations, 12 tools and utilities, and about 27 dApps are currently built on the ecosystem. Stacks
            ecosystem is becoming a significant player in the decentralized market and web3 as a whole.
          </p>
        </div>
      </div>
      <div
        className={`absolute bottom-4 left-4 right-4 transition-opacity duration-500 ${
          hover ? "opacity-100" : "opacity-0"
        }`}
      >
        <Link
          className="relative flex w-full items-center justify-between overflow-hidden rounded-full bg-white p-2 text-black"
          href="#"
          onMouseEnter={() => setJustHover(true)}
          onMouseLeave={() => setJustHover(false)}
        >
          <p className="relative z-10">Read Case Study</p>
          <GoArrowRight className="relative z-10" />
          <span
            className={`absolute inset-0 transform bg-gradient-to-r from-[#f4b601] to-[#f4b601] ${
              justhover ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-500`}
          />
        </Link>
      </div>
    </div>
  )
}
