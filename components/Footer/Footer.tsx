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
      <div className="flex h-16 w-full max-w-[800px] items-center justify-between whitespace-nowrap rounded-full bg-[#292929] px-2 font-semibold">
        <div className="flex items-center gap-2">
          <Image className="rounded-full" src="/avatar.svg" width={50} height={50} alt="avatar" />
          <h5 className="text-2xl text-white">IBMuri</h5>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <FiUser className="text-lg font-semibold text-white" />
            <p className="text-white">About</p>
          </div>
          <div className="flex items-center gap-2">
            <LuLayoutDashboard className="text-lg font-semibold text-white" />
            <p className="text-white">Projects</p>
          </div>
          <div className="flex items-center gap-2">
            <CgLaptop className="text-lg font-semibold text-white" />
            <p className="text-white">Media</p>
          </div>
          <div
            className={`relative flex w-72 cursor-pointer items-center justify-center gap-2 rounded-full py-3 transition-colors duration-500 ${
              copied ? "bg-green-500" : hover ? "bg-[#3d3d3d]" : "bg-white"
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
                  } text-black`}
                />
                <p
                  className={`transition-transform duration-300 ${
                    hover ? "-translate-x-6 text-white" : "translate-x-0"
                  } text-black`}
                >
                  muritalaibrahim097@gmail.com
                </p>
                <GoCopy
                  className={`absolute right-2 text-lg font-semibold text-white transition-transform duration-300 ${
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
