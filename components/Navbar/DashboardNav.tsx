"use client"
import Image from "next/image"
import { useTheme } from "next-themes"
import React, { useEffect, useState } from "react"
import WbSunnyIcon from "@mui/icons-material/WbSunny"
import { GoMoon } from "react-icons/go"
import { motion } from "framer-motion"

const DashboardNav = () => {
  const [loading, setLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())
  const { theme, setTheme } = useTheme()
  const isDarkMode = theme === "dark"

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000)

    const intervalId = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  const toggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark")
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
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: "easeOut", duration: 1 }}
      className="z-150 fixed left-0 right-0 top-0 z-20 flex  justify-center pt-7 backdrop-blur"
    >
      <div className="z-50 flex w-full max-w-[800px] justify-between backdrop-blur">
        <div className="containerbg font-semiboldbackdrop-blur flex w-72 items-center justify-center whitespace-nowrap rounded-full px-5 py-3 text-center backdrop-blur">
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
            onClick={toggleTheme}
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
                right: isDarkMode ? "calc(100% - 42px)" : "2px",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: isDarkMode ? "#000" : "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "right 0.5s ease",
              }}
            >
              {isDarkMode ? (
                <GoMoon style={{ color: "#fff", fontSize: "24px" }} />
              ) : (
                <WbSunnyIcon style={{ color: "#000", fontSize: "24px" }} />
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default DashboardNav
