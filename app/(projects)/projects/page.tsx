"use client"
import Image from "next/image"
import { useState } from "react"
import { GoArrowRight } from "react-icons/go"
import { useRouter } from "next/navigation"
import { projects } from "utils" // Assuming you have a utils file where the projects array is defined.

export default function ProjectCard() {
  const [hoverIndex, setHoverIndex] = useState(-1)
  const [justHoverIndex, setJustHoverIndex] = useState(-1)
  const router = useRouter()

  return (
    <>
      {projects.map((project, index) => (
        <div
          className="card-bg relative h-[450px] overflow-hidden rounded-xl border"
          onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(-1)}
          key={index}
        >
          <div className={`transition-transform duration-500 ${hoverIndex === index ? "-translate-y-full" : ""}`}>
            <Image
              className="h-auto w-full overflow-hidden rounded-t-xl"
              src={project.imageSrc}
              width={400}
              height={400}
              alt="project-thumbnail"
            />
          </div>
          <div
            className={`relative transition-transform duration-500 ${hoverIndex === index ? "-translate-y-60" : ""}`}
          >
            <div className="p-4">
              <div className="flex gap-2">
                <p className="containerbg rounded-full px-2 py-1 text-sm font-medium">{project.year}</p>
                <p className="containerbg rounded-full px-2 py-1 text-sm font-medium">{project.category}</p>
                <p className="containerbg rounded-full px-2 py-1 text-sm font-medium">{project.industry}</p>
              </div>
              <p className="clash mt-2">{project.title}</p>
              <h5 className="clash text-xl font-bold">{project.description}</h5>
            </div>
            <div
              className={`p-4 transition-opacity duration-500 ${
                hoverIndex === index ? "opacity-100" : "hidden opacity-0"
              }`}
            >
              <p>{project.info}</p>
            </div>
          </div>
          <div
            className={`absolute bottom-4 left-4 right-4 transition-opacity duration-500 ${
              hoverIndex === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <button
              className="study_case relative flex w-full items-center justify-between overflow-hidden rounded-full p-2 "
              onClick={() => router.push(`/projects/${project.id}`)}
              onMouseEnter={() => setJustHoverIndex(index)}
              onMouseLeave={() => setJustHoverIndex(-1)}
            >
              <p className="relative z-10">View Project Detail</p>
              <GoArrowRight className="relative z-10" />
              <span
                className={`absolute inset-0 transform bg-gradient-to-r from-[#f4b601] to-[#f4b601] ${
                  justHoverIndex === index ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-500`}
              />
            </button>
          </div>
        </div>
      ))}
    </>
  )
}
