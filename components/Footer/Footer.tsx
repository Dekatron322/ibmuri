"use client"
import Image from "next/image"
import { useTheme } from "next-themes"
import React, { useEffect, useState } from "react"
import { FiUser } from "react-icons/fi"
import { LuLayoutDashboard } from "react-icons/lu"
import { CgLaptop } from "react-icons/cg"
import { HiOutlineMail } from "react-icons/hi"
import { GoCopy } from "react-icons/go"
import AOS from "aos"
import "aos/dist/aos.css"

const Footer = () => {
  const [loading, setLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())
  const { theme, setTheme } = useTheme()
  const [isMoonIcon, setIsMoonIcon] = useState(true)
  const [hover, setHover] = useState(false)

  useEffect(() => {
    AOS.init({
      duration: 500,
      once: true,
    })
  }, [])

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000)

    const intervalId = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  const toggleIcon = () => {
    setIsMoonIcon(!isMoonIcon)
    setTheme(isMoonIcon ? "light" : "dark")
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-NG", {
      timeZone: "Africa/Lagos",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
  }

  return (
    <section
      className="fixed bottom-2 left-80 right-80 z-50 py-7 md:block"
      data-aos="fade-up"
      data-aos-duration="1000"
      data-aos-delay="500"
    >
      <div className="flex h-16 w-full items-center justify-between whitespace-nowrap rounded-full bg-[#292929] px-2 font-semibold">
        <div className="flex items-center gap-2">
          <Image className="rounded-full" src="/avatar.svg" width={50} height={50} alt="avatar" />
          <h5 className="text-2xl text-white">IBMuri</h5>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <FiUser className=" text-lg font-semibold text-white" />
            <p className=" text-white">About</p>
          </div>
          <div className="flex items-center gap-2">
            <LuLayoutDashboard className=" text-lg font-semibold text-white" />
            <p className=" text-white">Projects</p>
          </div>
          <div className="flex items-center gap-2">
            <CgLaptop className=" text-lg font-semibold text-white" />
            <p className=" text-white">Media</p>
          </div>
          <div
            className="relative flex cursor-pointer items-center gap-2 rounded-full bg-white px-2 py-3 transition-colors duration-500 hover:bg-[#3d3d3d]"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <HiOutlineMail
              className={`text-lg font-semibold text-black transition-transform duration-300 ${
                hover ? "-translate-x-full transform opacity-0 " : "opacity-100"
              }`}
            />
            <p
              className={`text-black transition-transform duration-300 ${
                hover ? "-translate-x-6 text-white" : "translate-x-0"
              }`}
            >
              muritalaibrahim097@gmail.com
            </p>
            <GoCopy
              className={`absolute right-2 text-lg font-semibold text-white transition-transform duration-300 ${
                hover ? "translate-x-0 transform opacity-100" : "translate-x-full transform opacity-0"
              }`}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer
