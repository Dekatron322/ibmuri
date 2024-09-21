"use client"
import DashboardNav from "components/Navbar/DashboardNav"
import Footer from "components/Footer/Footer"
import { useEffect, useState } from "react"
import { HiOutlineMail } from "react-icons/hi"
import { GoCopy } from "react-icons/go"
import { CgFileDocument } from "react-icons/cg"
import { BsDownload } from "react-icons/bs"
import { LuCheckCircle, LuPhoneCall } from "react-icons/lu"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import SocialsMedia from "components/Socials/SocialsMedia"
import ProjectCard from "components/ProjectCards/ProjectCards"

export default function Dashboard() {
  const [hover, setHover] = useState(false)
  const [hoverCall, setHoverCall] = useState(false)

  const [cvHover, setCvHover] = useState(false)
  const [hoverCard, setHoverCard] = useState(false)
  const [copied, setCopied] = useState(false)
  const [callCopied, setCallCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText("cygnux696@gmail.com")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000) // Reset copied state after 2 seconds
  }

  const handleCallCopy = () => {
    navigator.clipboard.writeText("08129859405")
    setCallCopied(true)
    setTimeout(() => setCallCopied(false), 2000) // Reset copied state after 2 seconds
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between children
      },
    },
  }

  // Child item animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section className="mb-40 flex h-full w-full items-center justify-center">
      <div className="flex min-h-screen max-w-[800px] flex-col">
        <DashboardNav />
        <div className="mt-16 flex flex-grow">
          <div className="w-full gap-6 max-md:flex-col max-md:px-0 md:mb-16">
            <div className="">
              <motion.h2
                className="clash mt-4 h-full text-[46px] font-bold leading-[60px]"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ease: "easeOut", duration: 2 }}
              >
                I craft human-centered products and designs that convert{" "}
                <span className="text-[#f4b601]">effectively</span>.{" "}
              </motion.h2>
              <motion.p
                className="clash mt-2 text-lg font-normal"
                transition={{ ease: "easeIn", duration: 2 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Ibrahim Muritala is a multidisciplinary software engineer with a background in physics and electronics
                and proficiency in frontend, backend, web3, and interaction design, as well as Framer development
                (no-code).
              </motion.p>
            </div>
            <motion.div
              className="-z-10 mt-5 flex gap-4"
              transition={{ ease: "easeIn", duration: 2 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
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
                className={`relative flex w-56 cursor-pointer items-center justify-center gap-2 rounded-full px-3 py-3 transition-colors duration-500 ${
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
                      cygnux696@gmail.com
                    </p>
                    <GoCopy
                      className={`email-text absolute right-2 text-lg font-semibold transition-transform duration-300 ${
                        hover ? "translate-x-0 transform opacity-100" : "translate-x-full transform opacity-0"
                      }`}
                    />
                  </>
                )}
              </div>
            </motion.div>
            <div className="mt-20 w-full">
              <div>
                <h5 className="text-3xl font-bold">Projects</h5>
                <p className="clash mb-3">Some of my recent work.</p>
              </div>
              <div className=" -z-10 grid w-full grid-cols-2 gap-6">
                <ProjectCard />
              </div>
              <motion.div
                className="mt-10 flex flex-col items-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariants}
              >
                <motion.h5 className="text-4xl font-bold" variants={itemVariants}>
                  Let's work together
                </motion.h5>
                <motion.p className="clash my-4" variants={itemVariants}>
                  I would love to hear from you, so feel free to reach out
                </motion.p>
                <motion.div className="mt-5 flex gap-4" variants={itemVariants}>
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
                    className={` relative flex w-52 cursor-pointer items-center justify-center gap-2 rounded-full  py-3 transition-colors duration-500 ${
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
                          cygnux696@gmail.com
                        </p>
                        <GoCopy
                          className={`email-text absolute right-2 text-lg font-semibold transition-transform duration-300 ${
                            hover ? "translate-x-0 transform opacity-100" : "translate-x-full transform opacity-0"
                          }`}
                        />
                      </>
                    )}
                  </div>
                  <div
                    className={` w-58 relative flex cursor-pointer items-center justify-center gap-2 rounded-full px-3 py-3 transition-colors duration-500 ${
                      callCopied ? "email-click" : hoverCall ? "email" : "email"
                    }`}
                    onMouseEnter={() => setHoverCall(true)}
                    onMouseLeave={() => setHoverCall(false)}
                    onClick={handleCallCopy}
                  >
                    {callCopied ? (
                      <>
                        <p className="font-semibold text-white">Phone no Copied!</p>
                        <LuCheckCircle className="ml-2 text-lg font-semibold text-white" />
                      </>
                    ) : (
                      <>
                        <LuPhoneCall
                          className={`email-text text-lg font-semibold transition-transform duration-300 ${
                            hoverCall ? "-translate-x-full transform opacity-0" : "opacity-100"
                          }`}
                        />
                        <p
                          className={`email-text font-semibold transition-transform duration-300 ${
                            hoverCall ? "-translate-x-6" : "translate-x-0"
                          }`}
                        >
                          +234-812-985-9405
                        </p>
                        <GoCopy
                          className={`email-text absolute right-2 text-lg font-semibold transition-transform duration-300 ${
                            hoverCall ? "translate-x-0 transform opacity-100" : "translate-x-full transform opacity-0"
                          }`}
                        />
                      </>
                    )}
                  </div>
                </motion.div>
              </motion.div>
              <SocialsMedia />

              <motion.div className="mt-20" variants={itemVariants}>
                <motion.p variants={itemVariants} className="clash text-center font-semibold">
                  © 2024 Ibrahim P. Muritala, All Rights Reserved{" "}
                </motion.p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  )
}
