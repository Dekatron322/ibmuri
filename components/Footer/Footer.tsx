"use client"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { FiUser } from "react-icons/fi"
import { LuLayoutDashboard } from "react-icons/lu"
import { CgLaptop } from "react-icons/cg"
import { HiOutlineMail } from "react-icons/hi"
import { GoCopy } from "react-icons/go"
import { LuCheckCircle } from "react-icons/lu"
import AOS from "aos"
import "aos/dist/aos.css"

const Footer = () => {
  const [hover, setHover] = useState(false)
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
    <section
      className="fixed bottom-10 left-0 right-0 z-50 flex justify-center py-4"
      data-aos="fade-up"
      data-aos-duration="1000"
      data-aos-delay="500"
    >
      <div className="footer_bg flex h-16 w-full max-w-[800px] items-center justify-between whitespace-nowrap rounded-full px-2 font-semibold">
        <div className="flex items-center gap-2">
          <Image className="rounded-full" src="/avatar.svg" width={50} height={50} alt="avatar" />
          <h5 className="footer_text text-2xl">IBMuri</h5>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <FiUser className="footer_text text-lg font-semibold" />
            <p className="footer_text">About</p>
          </div>
          <div className="flex items-center gap-2">
            <LuLayoutDashboard className="footer_text text-lg font-semibold" />
            <p className="footer_text">Projects</p>
          </div>
          <div className="flex items-center gap-2">
            <CgLaptop className="footer_text text-lg font-semibold" />
            <p className="footer_text">Media</p>
          </div>
          <div
            className={`relative flex w-56 cursor-pointer items-center justify-center gap-2 rounded-full py-3 transition-colors duration-500 ${
              copied ? "bg-green-500" : hover ? "email_area__hover" : "email_area"
            }`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <p className="text-white">Email Copied!</p>
                <LuCheckCircle className="ml-2 text-lg font-semibold text-white" />
              </>
            ) : (
              <>
                <HiOutlineMail
                  className={`text-lg font-semibold transition-transform duration-300 ${
                    hover ? "-translate-x-full transform opacity-0" : "opacity-100"
                  } email_area__text`}
                />
                <p
                  className={`transition-transform duration-300 ${
                    hover ? "email-text -translate-x-6" : "translate-x-0"
                  } email_area__text`}
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
        </div>
      </div>
    </section>
  )
}

export default Footer
