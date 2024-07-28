import React, { useEffect, useState } from "react"
import { IoIosArrowForward } from "react-icons/io"
import { useRouter } from "next/navigation"
import { HiOutlineTrash } from "react-icons/hi2"
import Image from "next/image"
import DeleteHmoCategoryModal from "components/Modals/DeleteHmoCategoryModal"
import AOS from "aos"
import "aos/dist/aos.css"

interface HmoDetail {
  id: string
  name: string
  detail: string
  status: boolean
  pub_date: string
  hmos: {
    id: string
    name: string
    category: string
    description: string
    status: boolean
    pub_date: string
  }[]
}

interface HmoComponentProps {
  refreshKey: number
  openDeleteModal: (hmoId: string) => void
}

const HmoComponent: React.FC<HmoComponentProps> = ({ refreshKey, openDeleteModal }) => {
  const router = useRouter()
  const [hmoCategories, setHmoCategories] = useState<HmoDetail[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [hmoToDelete, setHmoToDelete] = useState<string | null>(null) // State to store HMO ID to delete
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [showSuccessNotification, setShowSuccessNotification] = useState(false)

  useEffect(() => {
    fetchHmoCategories()
  }, [refreshKey])

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

  const fetchHmoCategories = async () => {
    setLoading(true)
    try {
      const response = await fetch("https://api.caregiverhospital.com/hmo-category/hmo-category/")
      if (!response.ok) {
        throw new Error("Failed to fetch HMOs")
      }
      const data = (await response.json()) as HmoDetail[]
      setHmoCategories(data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching HMOs:", error)
      setError("Failed to fetch HMOs")
      setLoading(false)
    }
  }

  const handleHmoClick = (hmoId: string) => {
    router.push(`/finance/hmos/hmo/${hmoId}`)
  }

  if (loading)
    return (
      <div className="loading-text flex h-full items-center justify-center">
        {"loading...".split("").map((letter, index) => (
          <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>
            {letter}
          </span>
        ))}
      </div>
    )
  if (error) return <p>{error}</p>

  const closeDeleteModal = () => {
    setIsDeleteOpen(false)
  }

  const handleHmoSubmissionSuccess = () => {
    setShowSuccessNotification(true)
    fetchHmoCategories() // Refresh the list of HMOs after successful deletion
    setTimeout(() => setShowSuccessNotification(false), 5000)
  }

  return (
    <>
      {hmoCategories.map((category) => (
        <div
          key={category.id}
          className="mb-3 w-full rounded border p-4 shadow-md"
          data-aos="fade-in"
          data-aos-duration="1000"
          data-aos-delay="500"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h6 className="font-bold">{category.name}</h6>

                <HiOutlineTrash
                  onClick={() => openDeleteModal(category.id)}
                  className="cursor-pointer text-[#F20089]  transition-colors duration-500 hover:text-[#F2B8B5]"
                />
              </div>
              <p className="text-sm">{category.detail}</p>
            </div>
            <div
              className="search-bg cursor-pointer rounded-full border p-2 shadow"
              onClick={() => handleHmoClick(category.id)}
            >
              <IoIosArrowForward />
            </div>
          </div>
        </div>
      ))}

      <DeleteHmoCategoryModal
        isOpen={isDeleteOpen}
        onClose={closeDeleteModal}
        onSubmitSuccess={handleHmoSubmissionSuccess}
        hmoId={hmoToDelete}
      />

      {showSuccessNotification && (
        <div className="animation-fade-in absolute bottom-16  right-16 flex h-[50px] w-[339px] transform items-center justify-center gap-2 rounded-md border border-[#0F920F] bg-[#F2FDF2] text-[#0F920F] shadow-[#05420514]">
          <Image src="/check-circle.svg" width={16} height={16} alt="dekalo" />
          <span className="clash-font text-sm  text-[#0F920F]">HMO added successfully</span>
        </div>
      )}
    </>
  )
}

export default HmoComponent
