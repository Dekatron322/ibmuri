"use client"
import DashboardNav from "components/Navbar/DashboardNav"
import Footer from "components/Footer/Footer"
import { useEffect, useState } from "react"
import { HiOutlineMail } from "react-icons/hi"
import { GoCopy } from "react-icons/go"
import { CgFileDocument } from "react-icons/cg"
import { BsDownload } from "react-icons/bs"
import { LuCheckCircle } from "react-icons/lu"
import AOS from "aos"
import "aos/dist/aos.css"
import Link from "next/link"
import Image from "next/image"

export default function Dashboard() {
  const [hover, setHover] = useState(false)
  const [cvHover, setCvHover] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    AOS.init({
      duration: 500,
      once: true,
    })
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText("muritalaibrahim097@gmail.com")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000) // Reset copied state after 2 seconds
  }

  return (
    <section className="flex h-full w-full items-center justify-center">
      <div className="flex min-h-screen max-w-[900px] flex-col">
        <DashboardNav />
        <div className="mt-16 flex flex-grow">
          <div className="w-full gap-6 max-md:flex-col max-md:px-0 md:mb-16">
            <div className="">
              <h5
                className="clash mt-10 h-full text-[50px] font-bold leading-[60px]"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="500"
              >
                I craft human-centered products and designs that convert{" "}
                <span className="text-[#f4b601]">effectively</span>.{" "}
              </h5>
              <p
                className="clash mt-5 text-lg font-normal"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="750"
              >
                Ibrahim Muritala is a multidisciplinary software engineer with a background in physics and electronics
                and proficiency in frontend, backend, web3, and interaction design, as well as Framer development
                (no-code).
              </p>
            </div>
            <div className="mt-5 flex gap-4" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="1000">
              <Link
                href="https://drive.google.com/file/d/1_KNKhl8xPXh8wwSbAmQY6ORSSDsV6wnF/view?usp=sharing"
                target="_blank"
                className="cv cv-text relative flex w-36 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full px-3 py-3 transition-colors duration-300"
                onMouseEnter={() => setCvHover(true)}
                onMouseLeave={() => setCvHover(false)}
              >
                <div
                  className={`absolute flex items-center gap-2 transition-transform duration-300 ${
                    cvHover ? "-translate-x-full transform opacity-0" : "translate-x-0 transform opacity-100"
                  }`}
                >
                  <CgFileDocument className="cv-text" />
                  <p className="cv-text font-semibold">CV/Résumé</p>
                </div>
                <div
                  className={`absolute flex items-center gap-2 transition-transform duration-300 ${
                    cvHover ? "translate-x-0 transform opacity-100" : "translate-x-full transform opacity-0"
                  }`}
                >
                  <p className="cv-text-hover font-semibold">Download</p>
                  <BsDownload className="cv-text-hover" />
                </div>
              </Link>
              <div
                className={` relative flex w-72 cursor-pointer items-center justify-center gap-2 rounded-full px-3 py-3 transition-colors duration-500 ${
                  copied ? "email-click" : hover ? "email" : "email"
                }`}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={handleCopy}
              >
                {copied ? (
                  <>
                    <p className="font-semibold text-white">Email Copied!</p>
                    <LuCheckCircle className="ml-2 text-lg font-semibold text-white" />
                  </>
                ) : (
                  <>
                    <HiOutlineMail
                      className={`email-text text-lg font-semibold transition-transform duration-300 ${
                        hover ? "-translate-x-full transform opacity-0" : "opacity-100"
                      }`}
                    />
                    <p
                      className={`email-text font-semibold transition-transform duration-300 ${
                        hover ? "-translate-x-6" : "translate-x-0"
                      }`}
                    >
                      muritalaibrahim097@gmail.com
                    </p>
                    <GoCopy
                      className={`email-text absolute right-2 text-lg font-semibold transition-transform duration-300 ${
                        hover ? "translate-x-0 transform opacity-100" : "translate-x-full transform opacity-0"
                      }`}
                    />
                  </>
                )}
              </div>
            </div>
            <div className=" mt-20  w-full  ">
              <div>
                <h5 className="text-3xl font-bold">Projects</h5>
                <p className="clash mb-3">Some of my resent work.</p>
              </div>
              <div className="mb-40 grid w-full grid-cols-2 gap-6">
                <div className="rounded-xl border bg-[#f0f0f0]">
                  <Image
                    className="h-auto w-full overflow-hidden rounded-t-xl"
                    src="/Thumbnail.png"
                    width={400}
                    height={400}
                    alt="dekalo"
                  />
                  <div className="p-4">
                    <div className="flex gap-2">
                      <p className="rounded-full bg-[#e0e0e0] px-2 py-1 text-sm font-medium">2024</p>
                      <p className="rounded-full bg-[#e0e0e0] px-2 py-1 text-sm font-medium">Web 2</p>
                      <p className="rounded-full bg-[#e0e0e0] px-2 py-1 text-sm font-medium">Health</p>
                    </div>
                    <p className="clash mt-2">Caregivers Hospital</p>
                    <h5 className="text-2xl font-bold">
                      A User-centered Electronic Medical Record (EMR) System Integrating health maintenance
                      organizations (HMOs)
                    </h5>
                  </div>
                </div>
                <div className="bg-[#f0f0f0]">
                  <Image
                    className="h-auto w-full rounded-t-3xl"
                    src="/Thumbnail.png"
                    width={400}
                    height={400}
                    alt="dekalo"
                  />
                  <div className="flex gap-2">
                    <p>2024</p>
                    <p>Web 2</p>
                    <p>Health</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  )
}
