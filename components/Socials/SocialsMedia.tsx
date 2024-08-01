import React from "react"
import { useEffect, useState } from "react"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { AiFillInstagram } from "react-icons/ai"
import { FaDiscord } from "react-icons/fa"
import { GoArrowUpRight } from "react-icons/go"
import { FaTelegram } from "react-icons/fa"
import { FaTiktok } from "react-icons/fa"
import { FaGitlab } from "react-icons/fa"
import Link from "next/link"

const SocialsMedia = () => {
  const [gitHover, setGitHover] = useState(false)
  const [twitterHover, setTwitterHover] = useState(false)
  const [discordHover, setDiscordHover] = useState(false)
  const [instagramHover, setInstagramHover] = useState(false)
  const [linkedInHover, setLinkedInHover] = useState(false)
  const [gitlabHover, setGitLabHover] = useState(false)
  const [tiktikHover, setTiktokHover] = useState(false)
  const [telegramHover, setTelegramHover] = useState(false)
  return (
    <>
      <div className="mt-20 flex justify-center gap-10">
        <Link
          href="https://drive.google.com/file/d/1_KNKhl8xPXh8wwSbAmQY6ORSSDsV6wnF/view?usp=sharing"
          target="_blank"
          className=" relative flex h-10 w-36 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full px-3 py-3 transition-colors duration-300"
          onMouseEnter={() => setLinkedInHover(true)}
          onMouseLeave={() => setLinkedInHover(false)}
        >
          <div
            className={`absolute flex items-center gap-2 transition-transform duration-300 ${
              linkedInHover ? "-translate-x-full transform opacity-0" : "translate-x-0 transform opacity-100"
            }`}
          >
            <FaLinkedin className="" />
            <p className=" font-semibold">LinkedIn</p>
          </div>
          <div
            className={`absolute flex items-center gap-2 transition-transform duration-300 ${
              linkedInHover ? "translate-x-0 transform opacity-100" : "translate-x-full transform opacity-0"
            }`}
          >
            <p className="font-semibold text-[#f4b601]">LinkedIn</p>
            <GoArrowUpRight className="text-[#f4b601]" />
          </div>
        </Link>

        <Link
          href="https://drive.google.com/file/d/1_KNKhl8xPXh8wwSbAmQY6ORSSDsV6wnF/view?usp=sharing"
          target="_blank"
          className=" relative flex h-10 w-36 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full px-3 py-3 transition-colors duration-300"
          onMouseEnter={() => setGitHover(true)}
          onMouseLeave={() => setGitHover(false)}
        >
          <div
            className={`absolute flex items-center gap-2 transition-transform duration-300 ${
              gitHover ? "-translate-x-full transform opacity-0" : "translate-x-0 transform opacity-100"
            }`}
          >
            <FaGithub className="" />
            <p className=" font-semibold">GitHub</p>
          </div>
          <div
            className={`absolute flex items-center gap-2 transition-transform duration-300 ${
              gitHover ? "translate-x-0 transform opacity-100" : "translate-x-full transform opacity-0"
            }`}
          >
            <p className="font-semibold text-[#f4b601]">GitHub</p>
            <GoArrowUpRight className="text-[#f4b601]" />
          </div>
        </Link>
        <Link
          href="https://drive.google.com/file/d/1_KNKhl8xPXh8wwSbAmQY6ORSSDsV6wnF/view?usp=sharing"
          target="_blank"
          className=" relative flex h-10 w-36 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full px-3 py-3 transition-colors duration-300"
          onMouseEnter={() => setTwitterHover(true)}
          onMouseLeave={() => setTwitterHover(false)}
        >
          <div
            className={`absolute flex items-center gap-2 transition-transform duration-300 ${
              twitterHover ? "-translate-x-full transform opacity-0" : "translate-x-0 transform opacity-100"
            }`}
          >
            <FaXTwitter className="" />
            <p className=" font-semibold">Twitter</p>
          </div>
          <div
            className={`absolute flex items-center gap-2 transition-transform duration-300 ${
              twitterHover ? "translate-x-0 transform opacity-100" : "translate-x-full transform opacity-0"
            }`}
          >
            <p className="font-semibold text-[#f4b601]">Twitter</p>
            <GoArrowUpRight className="text-[#f4b601]" />
          </div>
        </Link>
        <Link
          href="https://drive.google.com/file/d/1_KNKhl8xPXh8wwSbAmQY6ORSSDsV6wnF/view?usp=sharing"
          target="_blank"
          className=" relative flex h-10 w-36 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full px-3 py-3 transition-colors duration-300"
          onMouseEnter={() => setDiscordHover(true)}
          onMouseLeave={() => setDiscordHover(false)}
        >
          <div
            className={`absolute flex items-center gap-2 transition-transform duration-300 ${
              discordHover ? "-translate-x-full transform opacity-0" : "translate-x-0 transform opacity-100"
            }`}
          >
            <FaDiscord className="" />
            <p className=" font-semibold">Discord</p>
          </div>
          <div
            className={`absolute flex items-center gap-2 transition-transform duration-300 ${
              discordHover ? "translate-x-0 transform opacity-100" : "translate-x-full transform opacity-0"
            }`}
          >
            <p className="font-semibold text-[#f4b601]">Discord</p>
            <GoArrowUpRight className="text-[#f4b601]" />
          </div>
        </Link>
      </div>
      <div className="mt-4 flex justify-center gap-10">
        <Link
          href="https://drive.google.com/file/d/1_KNKhl8xPXh8wwSbAmQY6ORSSDsV6wnF/view?usp=sharing"
          target="_blank"
          className=" relative flex h-10 w-36 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full px-3 py-3 transition-colors duration-300"
          onMouseEnter={() => setInstagramHover(true)}
          onMouseLeave={() => setInstagramHover(false)}
        >
          <div
            className={`absolute flex items-center gap-2 transition-transform duration-300 ${
              instagramHover ? "-translate-x-full transform opacity-0" : "translate-x-0 transform opacity-100"
            }`}
          >
            <AiFillInstagram className="" />
            <p className=" font-semibold">Instagram</p>
          </div>
          <div
            className={`absolute flex items-center gap-2 transition-transform duration-300 ${
              instagramHover ? "translate-x-0 transform opacity-100" : "translate-x-full transform opacity-0"
            }`}
          >
            <p className="font-semibold text-[#f4b601]">Instagram</p>
            <GoArrowUpRight className="text-[#f4b601]" />
          </div>
        </Link>

        <Link
          href="https://drive.google.com/file/d/1_KNKhl8xPXh8wwSbAmQY6ORSSDsV6wnF/view?usp=sharing"
          target="_blank"
          className=" relative flex h-10 w-36 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full px-3 py-3 transition-colors duration-300"
          onMouseEnter={() => setGitLabHover(true)}
          onMouseLeave={() => setGitLabHover(false)}
        >
          <div
            className={`absolute flex items-center gap-2 transition-transform duration-300 ${
              gitlabHover ? "-translate-x-full transform opacity-0" : "translate-x-0 transform opacity-100"
            }`}
          >
            <FaGitlab className="" />
            <p className=" font-semibold">GitLab</p>
          </div>
          <div
            className={`absolute flex items-center gap-2 transition-transform duration-300 ${
              gitlabHover ? "translate-x-0 transform opacity-100" : "translate-x-full transform opacity-0"
            }`}
          >
            <p className="font-semibold text-[#f4b601]">GitLab</p>
            <GoArrowUpRight className="text-[#f4b601]" />
          </div>
        </Link>
        <Link
          href="https://drive.google.com/file/d/1_KNKhl8xPXh8wwSbAmQY6ORSSDsV6wnF/view?usp=sharing"
          target="_blank"
          className=" relative flex h-10 w-36 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full px-3 py-3 transition-colors duration-300"
          onMouseEnter={() => setTelegramHover(true)}
          onMouseLeave={() => setTelegramHover(false)}
        >
          <div
            className={`absolute flex items-center gap-2 transition-transform duration-300 ${
              telegramHover ? "-translate-x-full transform opacity-0" : "translate-x-0 transform opacity-100"
            }`}
          >
            <FaTelegram className="" />
            <p className=" font-semibold">Telegram</p>
          </div>
          <div
            className={`absolute flex items-center gap-2 transition-transform duration-300 ${
              telegramHover ? "translate-x-0 transform opacity-100" : "translate-x-full transform opacity-0"
            }`}
          >
            <p className="font-semibold text-[#f4b601]">Telegram</p>
            <GoArrowUpRight className="text-[#f4b601]" />
          </div>
        </Link>
        <Link
          href="https://drive.google.com/file/d/1_KNKhl8xPXh8wwSbAmQY6ORSSDsV6wnF/view?usp=sharing"
          target="_blank"
          className=" relative flex h-10 w-36 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full px-3 py-3 transition-colors duration-300"
          onMouseEnter={() => setTiktokHover(true)}
          onMouseLeave={() => setTiktokHover(false)}
        >
          <div
            className={`absolute flex items-center gap-2 transition-transform duration-300 ${
              tiktikHover ? "-translate-x-full transform opacity-0" : "translate-x-0 transform opacity-100"
            }`}
          >
            <FaTiktok className="" />
            <p className=" font-semibold">TikTok</p>
          </div>
          <div
            className={`absolute flex items-center gap-2 transition-transform duration-300 ${
              tiktikHover ? "translate-x-0 transform opacity-100" : "translate-x-full transform opacity-0"
            }`}
          >
            <p className="font-semibold text-[#f4b601]">TikTok</p>
            <GoArrowUpRight className="text-[#f4b601]" />
          </div>
        </Link>
      </div>
    </>
  )
}

export default SocialsMedia
