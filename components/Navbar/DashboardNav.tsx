"use client"
import Image from "next/image"
import { useTheme } from "next-themes"
import React, { useEffect, useState } from "react"
import WbSunnyIcon from "@mui/icons-material/WbSunny"
import { GoMoon } from "react-icons/go"
import AOS from "aos"
import "aos/dist/aos.css"

const DashboardNav = () => {
  const [loading, setLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())
  const { theme, setTheme } = useTheme()
  const [isMoonIcon, setIsMoonIcon] = useState(true)

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
    <nav
      className="fixed left-80 right-80 top-0 z-50  flex max-w-[900px] justify-center py-7 md:block"
      data-aos="fade-down"
      data-aos-duration="1000"
      data-aos-delay="500"
    >
      <div className="flex justify-between">
        <div className="containerbg flex w-72 items-center justify-center whitespace-nowrap rounded-full px-5 py-3 text-center font-semibold">
          <p className="uppercase">
            {formatTime(currentTime)} <span className="capitalize">GMT+1, Lagos, Nigeria</span>
          </p>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center justify-center gap-3 rounded-full bg-[#0792531F] px-3 py-3">
            <Image src="/available.svg" width={24} height={24} alt="avatar" />
            <p className="font-regular font-semibold text-[#079255]">Available for work</p>
          </div>

          <div
            className="containerbg flex cursor-pointer items-center rounded-full p-1 transition duration-300"
            onClick={toggleIcon}
            style={{
              position: "relative",
              width: "80px",
              height: "45px",
              borderRadius: "25px",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: isMoonIcon ? "2px" : "calc(100% - 42px)",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: isMoonIcon ? "#fff" : "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "left 0.5s ease",
              }}
            >
              {isMoonIcon ? (
                <WbSunnyIcon style={{ color: "#000", fontSize: "24px" }} />
              ) : (
                <GoMoon style={{ color: "#fff", fontSize: "24px" }} />
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default DashboardNav
