"use client"
import { useTheme } from "next-themes"
import React, { useEffect, useState } from "react"
import WbSunnyIcon from "@mui/icons-material/WbSunny"
import { GoMoon } from "react-icons/go"
import AOS from "aos"
import "aos/dist/aos.css"
import { MdArrowBack } from "react-icons/md"
import { useRouter } from "next/navigation"

const ProjectsNav = () => {
  const { theme, setTheme } = useTheme()
  const [isMoonIcon, setIsMoonIcon] = useState(true)
  const router = useRouter()

  useEffect(() => {
    AOS.init({
      duration: 500,
      once: true,
    })
  }, [])

  const toggleIcon = () => {
    setIsMoonIcon(!isMoonIcon)
    setTheme(isMoonIcon ? "light" : "dark")
  }

  const handleBackClick = () => {
    router.back()
  }

  return (
    <nav
      className="z-150 fixed left-0 right-0 top-0 flex justify-center py-7"
      data-aos="fade-down"
      data-aos-duration="1000"
      data-aos-delay="500"
    >
      <div className="flex w-full max-w-[800px] justify-between">
        <div
          className="containerbg flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 py-3 text-center font-semibold"
          onClick={handleBackClick} // Add onClick event
        >
          <MdArrowBack />
          <p>Back to previous</p>
        </div>

        <div className="flex items-center gap-5">
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

export default ProjectsNav
