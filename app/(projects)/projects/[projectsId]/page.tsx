"use client"
import DashboardNav from "components/Navbar/DashboardNav"
import Image from "next/image"
import { projects } from "utils" // Import the projects data
import ProjectsNav from "../../../../components/Navbar/ProjectsNav"

const ProjectDetail = ({ params }: { params: { projectsId: string } }) => {
  const projectId = parseInt(params.projectsId, 10) // Use projectsId here
  const project = projects.find((p) => p.id === projectId)

  if (!project) {
    return <div>Project not found</div>
  }

  return (
    <section className="mb-40 flex h-full w-full items-start justify-center">
      {/* Main Content Container */}
      <div className="flex min-h-screen max-w-[800px] flex-col">
        <ProjectsNav />
        <div className="mt-20 flex flex-grow">
          <div className="w-full gap-6 max-md:flex-col max-md:px-0 md:mb-16">
            <div className="">
              <div className="mx-auto max-w-4xl pt-6">
                <h1 id="overview" className="mb-4 text-3xl font-bold">
                  {project.title}: {project.description}
                </h1>
                <Image
                  id="images"
                  src={project.imageSrc}
                  width={600}
                  height={400}
                  alt="project-image"
                  className="mb-6 w-full rounded-lg"
                />
                <p id="details" className="mb-4 text-lg">
                  {project.description}
                </p>
                <p id="info">{project.info}</p>
                {/* Add more project details here */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table of Contents - Fixed Position on the Right */}
      <div className="fixed right-20 top-20 ">
        <div className="sticky top-20">
          <h2 className="mb-4 text-xl font-bold">Table of Contents</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#overview" className="hover:text-blue-600">
                Overview
              </a>
            </li>
            <li>
              <a href="#details" className="hover:text-blue-600">
                Project Details
              </a>
            </li>
            <li>
              <a href="#images" className="hover:text-blue-600">
                Images
              </a>
            </li>
            <li>
              <a href="#info" className="hover:text-blue-600">
                Additional Info
              </a>
            </li>
            {/* Add more TOC links as needed */}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default ProjectDetail
