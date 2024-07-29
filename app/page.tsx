"use client"
import DashboardNav from "components/Navbar/DashboardNav"
import Footer from "components/Footer/Footer"
import { useEffect, useState } from "react"
import { HiOutlineMail } from "react-icons/hi"
import { GoCopy } from "react-icons/go"
import { CgFileDocument } from "react-icons/cg"
import { BsDownload } from "react-icons/bs"
import AOS from "aos"
import "aos/dist/aos.css"
import Link from "next/link"

export default function Dashboard() {
  const [hover, setHover] = useState(false)
  const [cvHover, setCvHover] = useState(false)

  useEffect(() => {
    AOS.init({
      duration: 500,
      once: true,
    })
  }, [])

  return (
    <section className="paddings h-full w-full">
      <div className="flex min-h-screen flex-col">
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
                className="email relative flex cursor-pointer items-center gap-2 rounded-full px-3 py-3 transition-colors duration-500"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                <HiOutlineMail
                  className={`email-text text-lg font-semibold transition-transform duration-300 ${
                    hover ? "-translate-x-full transform opacity-0 " : "opacity-100"
                  }`}
                />
                <p
                  className={`email-text font-semibold transition-transform duration-300 ${
                    hover ? "email-text -translate-x-6" : "translate-x-0"
                  }`}
                >
                  muritalaibrahim097@gmail.com
                </p>
                <GoCopy
                  className={`email-text absolute right-2 text-lg font-semibold transition-transform duration-300 ${
                    hover ? "translate-x-0 transform opacity-100" : "translate-x-full transform opacity-0"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  )
}
