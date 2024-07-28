import React, { useEffect, useState } from "react"
import axios from "axios"
import { PiDotsThree } from "react-icons/pi"
import { useRouter } from "next/navigation"
import TestModal from "components/Modals/TestModal"
import AOS from "aos"
import "aos/dist/aos.css"
import Image from "next/image"
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye"
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"
import PaymentModal from "components/Modals/PaymentModal"

interface HMO {
  id: string
  name: string
  category: string
  description: string
  status: boolean
  pub_date: string
}

interface LabTestResult {
  id: string
  doctor_name: string
  test_type: string
  status_note: string
  pub_date: string
  patient_name: string
  patient_id: string // Added field for patient ID
  policy_id: string
  diagnosis_code: string
  name: string
  hmo?: HMO
}

interface Diagnosis {
  id: string
  name: string
  code: string
  price: string
  status: boolean
  pub_date: any
}

interface ModalProps {
  results: LabTestResult
  onClose: (isSuccess: boolean) => void
  diagnosis?: Diagnosis
}

const LabTests = () => {
  const router = useRouter()
  const [isDone, setIsDone] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState("all")
  const [clickedCard, setClickedCard] = useState<LabTestResult | null>(null)
  const [paymentCard, setPaymentCard] = useState<LabTestResult | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false)
  const [labTestResults, setLabTestResults] = useState<LabTestResult[]>([])
  const [diagnosisData, setDiagnosisData] = useState<Diagnosis[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showSuccessNotification, setShowSuccessNotification] = useState(false)
  const [showPaymentSuccessNotification, setShowPaymentSuccessNotification] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const resultsPerPage = 7

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // Fetch lab test results
        const labTestResponse = await axios.get("https://api.caregiverhospital.com/patient/patient/")
        const patientData = labTestResponse.data

        // Fetch diagnosis data
        const diagnosisResponse = await axios.get("https://api.caregiverhospital.com/diagnosis/diagnosis/")
        const fetchedDiagnosisData = diagnosisResponse.data
        setDiagnosisData(fetchedDiagnosisData)

        if (Array.isArray(patientData)) {
          const tests = patientData.flatMap((patient: any) => {
            return patient.lab_tests.map((test: any) => {
              const diagnosis = fetchedDiagnosisData.find((diag: any) => diag.code === test.diagnosis_code)
              return {
                ...test,
                patient_name: patient.name,
                patient_id: patient.id, // Include patient ID here
                policy_id: patient.policy_id,
                diagnosis,
                hmo: patient.hmo, // Include HMO details here
              }
            })
          })

          setLabTestResults(tests)
        } else {
          console.error("Unexpected response format for lab test results")
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [refresh])

  const handleCardClick = (results: LabTestResult) => {
    setClickedCard(results)
    setIsModalOpen(true)
  }

  const handlePaymentClick = (results: LabTestResult) => {
    const diagnosis = diagnosisData.find((diag) => diag.code === results.diagnosis_code)
    const resultWithDiagnosis = { ...results, diagnosis }
    setPaymentCard(resultWithDiagnosis)
    setIsPaymentModalOpen(true)
  }

  const handleModalClose = (isSuccess: boolean) => {
    if (isSuccess) {
      setShowSuccessNotification(true)
      setRefresh(!refresh) // Trigger a refresh
      setTimeout(() => setShowSuccessNotification(false), 5000)
    }
    setIsModalOpen(false)
  }

  const handlePaymentModalClose = (isSuccess: boolean) => {
    if (isSuccess) {
      setShowPaymentSuccessNotification(true)
      setRefresh(!refresh) // Trigger a refresh
      setTimeout(() => setShowPaymentSuccessNotification(false), 5000)
    }
    setIsPaymentModalOpen(false)
  }

  const toggleDone = () => {
    setIsDone(!isDone)
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-200"
      case "not approved":
        return "bg-[#F2B8B5]"
      case "discarded":
        return "bg-gray-200"
      default:
        return "bg-gray-200"
    }
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const filteredResults = labTestResults.filter(
    (result) =>
      result.patient_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.doctor_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.test_type.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const indexOfLastResult = currentPage * resultsPerPage
  const indexOfFirstResult = indexOfLastResult - resultsPerPage
  const currentResults = filteredResults.slice(indexOfFirstResult, indexOfLastResult)

  const totalPages = Math.ceil(filteredResults.length / resultsPerPage)

  const renderResults = (filter: (results: LabTestResult) => boolean) => {
    return (
      <div className="flex flex-col gap-2">
        {currentResults.filter(filter).map((results) => {
          const diagnosis = diagnosisData.find((diag) => diag.name === results.diagnosis_code)
          return (
            <div
              key={results.id}
              className="flex w-full cursor-pointer items-center justify-between rounded-lg border p-2"
            >
              <div className="w-full">
                <div className="flex items-center gap-2 text-sm font-bold">
                  <span className="max-sm:hidden">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#46ffa6]">
                      <p className="capitalize text-[#000000]">{results.doctor_name.charAt(0)}</p>
                    </div>
                  </span>
                  <div>
                    <p className="text-sm">Patient: {results.patient_name}</p>
                    <p className="text-sm">Doctor: {results.doctor_name}</p>
                    <p className="text-xs">Test Type: {results.test_type || "N/A"}</p>
                  </div>
                </div>
              </div>
              <div className="w-full max-sm:hidden">
                <p className="text-sm">{diagnosis?.name || "N/A"}</p>
                <p className="text-xs font-bold">Code: {diagnosis?.code || "N/A"}</p>
              </div>

              <div className="w-full max-sm:hidden">
                <p className="text-sm">₦ {diagnosis?.price || "N/A"}</p>
                <p className="text-xs font-bold">Diagnosis Price</p>
              </div>
              <div className="w-full">
                <p
                  className={`w-32 rounded ${getStatusColor(
                    results.status_note
                  )} px-2 py-[6px] text-center text-xs text-[#000000]`}
                >
                  {results.status_note}
                </p>
              </div>
              <div className="w-full max-sm:hidden">
                <p className="text-sm font-bold">{formatDate(diagnosis?.pub_date)}</p>
                <p className="text-xs font-bold">Date Requested</p>
              </div>
              <div className="flex gap-2">
                <RemoveRedEyeIcon className="text-[#46FFA6]" onClick={() => handleCardClick(results)} />
                <AccountBalanceWalletIcon onClick={() => handlePaymentClick(results)} />
              </div>
            </div>
          )
        })}
        <div className="mb-4 flex items-center justify-end  max-sm:px-3 md:mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`pagination-button ${
                currentPage === index + 1
                  ? "active h-6 w-6 rounded-full bg-[#131414] text-sm text-[#ffffff] shadow"
                  : "h-6 w-6 rounded-full bg-[#F1FFF0] text-sm text-[#1E1E1E]"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="flex w-full flex-col" data-aos="fade-in" data-aos-duration="1000" data-aos-delay="500">
        {isLoading ? (
          <div className="loading-text flex h-full items-center justify-center">
            {"loading...".split("").map((letter, index) => (
              <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>
                {letter}
              </span>
            ))}
          </div>
        ) : (
          <>
            <div className="tab-bg mb-4 flex items-center gap-3 rounded-lg p-1 md:w-[358px] md:border">
              <button
                className={`${activeTab === "all" ? "active-tab" : "inactive-tab"}`}
                onClick={() => setActiveTab("all")}
              >
                All
              </button>
              <button
                className={`${activeTab === "approved" ? "active-tab" : "inactive-tab"}`}
                onClick={() => setActiveTab("approved")}
              >
                Approved
              </button>

              <button
                className={`${
                  activeTab === "not approved" ? "active-tab whitespace-nowrap" : "inactive-tab whitespace-nowrap"
                }`}
                onClick={() => setActiveTab("not approved")}
              >
                Not Approved
              </button>

              <button
                className={`${
                  activeTab === "discarded" ? "active-tab whitespace-nowrap" : "inactive-tab whitespace-nowrap"
                }`}
                onClick={() => setActiveTab("discarded")}
              >
                Discarded
              </button>
            </div>
            <div className="search-bg mb-4 flex h-10 items-center justify-between gap-2 rounded border border-[#CFDBD5] px-3 py-1 max-md:w-[180px] lg:w-[300px]">
              <Image className="icon-style" src="/icons.svg" width={16} height={16} alt="dekalo" />
              <Image className="dark-icon-style" src="/search-dark.svg" width={16} height={16} alt="dekalo" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full bg-transparent text-xs outline-none focus:outline-none"
              />
            </div>
          </>
        )}

        {activeTab === "all" && renderResults(() => true)}
        {activeTab === "approved" && renderResults((results) => results.status_note.toLowerCase() === "approved")}
        {activeTab === "not approved" &&
          renderResults((results) => results.status_note.toLowerCase() === "not approved")}
        {activeTab === "discarded" && renderResults((results) => results.status_note.toLowerCase() === "discarded")}
      </div>

      {isModalOpen && clickedCard && <TestModal results={clickedCard} onClose={handleModalClose} />}
      {isPaymentModalOpen && paymentCard && <PaymentModal results={paymentCard} onClose={handlePaymentModalClose} />}

      {showSuccessNotification && (
        <div className="animation-fade-in absolute bottom-16 m-5  flex h-[50px] w-[339px] transform items-center justify-center gap-2 rounded-md border border-[#0F920F] bg-[#F2FDF2] text-[#0F920F] shadow-[#05420514] md:right-16">
          <Image src="/check-circle.svg" width={16} height={16} alt="dekalo" />
          <span className="clash-font text-sm  text-[#0F920F]">Result Submitted</span>
        </div>
      )}
      {showPaymentSuccessNotification && (
        <div className="animation-fade-in absolute bottom-16 m-5  flex h-[50px] w-[339px] transform items-center justify-center gap-2 rounded-md border border-[#0F920F] bg-[#F2FDF2] text-[#0F920F] shadow-[#05420514] md:right-16">
          <Image src="/check-circle.svg" width={16} height={16} alt="dekalo" />
          <span className="clash-font text-sm  text-[#0F920F]">Invoice Sent</span>
        </div>
      )}
    </>
  )
}

export default LabTests
