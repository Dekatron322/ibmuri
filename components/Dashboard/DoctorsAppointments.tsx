"use client"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import { PiDotsThree } from "react-icons/pi"
import { useRouter } from "next/navigation"
import AOS from "aos"
import "aos/dist/aos.css"

interface Appointment {
  id: number
  doctor: string
  detail: string
  pub_date: string
  status: string
  doctor_assigned: string
  doctor_image: string
  time: string
  complain: string
}

interface Patient {
  id: string
  name: string
  gender: string
  dob: string
  membership_no: string
  policy_id: string
  email_address: string
  phone_no: string
  address: string
  nok_name: string
  nok_phone_no: string
  nok_address: string
  allergies: string
  heart_rate: string
  body_temperature: string
  glucose_level: string
  blood_pressure: string
  image: string
  status: boolean
  appointments: Appointment[]
}

type ApiResponse = Patient[]

const DoctorsAppointments = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all")
  const [patients, setPatients] = useState<Patient[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const handlePatientClick = (patientId: string) => {
    router.push(`/doctor-dashboard/doctor/${patientId}`)
  }

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

  const fetchPatients = async () => {
    try {
      const response = await fetch("https://api.caregiverhospital.com/patient/patient/")
      const data = (await response.json()) as ApiResponse
      const patientsWithAppointments = data.filter((patient) => patient.appointments.length > 0)
      setPatients(patientsWithAppointments)
    } catch (error) {
      console.error("Error fetching patients:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPatients()
  }, [])

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

  const renderPatientDetails = (patient: Patient) => {
    const sortedAppointments = patient.appointments.sort(
      (a, b) => new Date(b.pub_date).getTime() - new Date(a.pub_date).getTime()
    )
    const lastAppointment = sortedAppointments[0]

    return (
      <div
        data-aos="fade-in"
        data-aos-duration="1000"
        data-aos-delay="500"
        key={patient.id}
        className="flex w-full cursor-pointer items-center justify-between rounded-lg border p-2"
      >
        {/* <div className="flex w-[20%] flex-col max-md:hidden">
          {lastAppointment && (
            <div
              className="my-4 flex content-center items-center gap-2"
              onClick={() => toggleDone(patient.id, lastAppointment.id)}
            >
              {lastAppointment.status === "done" ? (
                <Image src="/checkbox1.svg" width={14} height={14} alt="checkbox" />
              ) : (
                <Image src="/checkbox.svg" width={14} height={14} alt="checkbox" />
              )}
            </div>
          )}
        </div> */}
        <div className="flex w-full items-center gap-2">
          {/* <Image src={patient.image} width={40} height={40} alt={`${patient.name}'s image`} className="rounded-full" /> */}
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#46ffa6] max-md:hidden">
            <p className="capitalize text-[#000000]">{patient.name.charAt(0)}</p>
          </div>
          <div>
            <p className="text-sm font-bold">{patient.name}</p>
            <p className="text-xs">Patient Name</p>
          </div>
        </div>
        {/* <div className="flex w-full flex-col max-md:hidden">
          <p className="text-sm font-bold">{patient.phone_no}</p>
          <p className="text-xs">Phone Number</p>
        </div> */}
        {lastAppointment && (
          <>
            <div className="flex w-full flex-col">
              <p className="text-sm font-bold">{lastAppointment.doctor}</p>
              <p className="text-xs">Doctor Assigned</p>
            </div>
            <div className="flex w-full flex-col max-md:hidden">
              <p className="text-sm font-bold">{formatDate(lastAppointment.pub_date)}</p>
              <p className="text-xs">Last Appointment</p>
            </div>
            <div className="md:flex md:w-full md:flex-col md:items-center">
              <p className="rounded bg-[#46FFA6] px-2 py-[2px] text-center text-xs font-bold text-black">
                {lastAppointment.detail}
              </p>
              <p className="text-xs">Complain</p>
            </div>
          </>
        )}
        <div className="max-md:hidden" onClick={() => handlePatientClick(patient.id)}>
          <PiDotsThree />
        </div>
      </div>
    )
  }

  const renderAllPatients = () => (
    <div className="flex flex-col gap-2">{patients.map((patient) => renderPatientDetails(patient))}</div>
  )

  const renderPendingPatients = () => (
    <div className="flex flex-col gap-2">
      {patients
        .filter((patient) => patient.appointments.some((appointment) => appointment.status !== "done"))
        .map((patient) => renderPatientDetails(patient))}
    </div>
  )

  const renderDonePatients = () => (
    <div className="flex flex-col gap-2">
      {patients
        .filter((patient) => patient.appointments.every((appointment) => appointment.status === "done"))
        .map((patient) => renderPatientDetails(patient))}
    </div>
  )

  return (
    <div className="flex w-full flex-col">
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
          <div
            data-aos="fade-in"
            data-aos-duration="1000"
            data-aos-delay="500"
            className="tab-bg mb-8 flex w-[190px] items-center gap-3 rounded-lg p-1 md:border"
          >
            <button
              className={`${activeTab === "all" ? "active-tab" : "inactive-tab"}`}
              onClick={() => setActiveTab("all")}
            >
              All
            </button>
            <button
              className={`${activeTab === "pending" ? "active-tab" : "inactive-tab"}`}
              onClick={() => setActiveTab("pending")}
            >
              Pending
            </button>
            <button
              className={`${activeTab === "done" ? "active-tab" : "inactive-tab"}`}
              onClick={() => setActiveTab("done")}
            >
              Done
            </button>
          </div>

          {activeTab === "all" && renderAllPatients()}
          {activeTab === "pending" && renderPendingPatients()}
          {activeTab === "done" && renderDonePatients()}
        </>
      )}
    </div>
  )
}

export default DoctorsAppointments

// "use client"
// import React, { useState } from "react"
// import { Appointment } from "utils"
// import Image from "next/image"
// import { PiDotsThree } from "react-icons/pi"
// import { useRouter } from "next/navigation"

// const DoctorsAppointments = () => {
//   const router = useRouter()
//   const [isDone, setIsDone] = useState<boolean>(false)
//   const [activeTab, setActiveTab] = useState("all")
//   const handlePatientClick = (appointmentId: any) => {
//     router.push(`/doctor-dashboard/doctor/${appointmentId}`)
//   }

//   const toggleDone = () => {
//     setIsDone(!isDone)
//   }

//   const renderAllAppointments = () => {
//     return (
//       <>
//         <div className="flex flex-col gap-2 max-md:hidden ">
//           {Appointment.map((appointment) => (
//             <div
//               key={appointment.id}
//               className="flex w-full cursor-pointer  items-center justify-between rounded-lg border p-2 "
//             >
//               <div className="my-4 flex content-center items-center gap-2" onClick={toggleDone}>
//                 {appointment.status === "done" ? (
//                   <Image src="/checkbox1.svg" width={14} height={14} alt="checkbox" />
//                 ) : (
//                   <Image src="/checkbox.svg" width={14} height={14} alt="checkbox" />
//                 )}
//               </div>
//               <div className="">
//                 <p className="text-sm font-bold">{appointment.id}</p>
//                 <small className="text-xm ">ID</small>
//               </div>
//               <div className="">
//                 <p className="text-sm font-bold">{appointment.name}</p>
//                 <small className="text-xm ">Name</small>
//               </div>
//               <div>
//                 <div className="flex gap-1 text-sm font-bold">
//                   <span>
//                     <Image src={appointment.doctor_image} height={20} width={20} alt="" />
//                   </span>
//                   {appointment.doctor_assigned}
//                 </div>
//                 <small className="text-xm ">Doctor Assigned</small>
//               </div>
//               <div>
//                 <p className="text-sm font-bold">{appointment.time}</p>
//                 <small className="text-xm ">Time</small>
//               </div>
//               <div>
//                 <p className="rounded bg-[#46FFA6] px-2 py-[2px] text-xs text-[#000000]">{appointment.complain}</p>
//                 <small className="text-xm ">complain</small>
//               </div>

//               <PiDotsThree onClick={() => handlePatientClick(appointment.id)} />
//             </div>
//           ))}
//         </div>
//       </>
//     )
//   }

//   const renderPendingAppointments = () => {
//     const pendingAppointments = Appointment.filter((appointment) => appointment.status === "pending")

//     return (
//       <>
//         <div className="flex flex-col gap-2 max-md:hidden ">
//           {pendingAppointments.map((appointment) => (
//             <div
//               key={appointment.id}
//               className="flex w-full cursor-pointer  items-center justify-between rounded-lg border p-2 "
//             >
//               <div className="my-4 flex content-center items-center gap-2" onClick={toggleDone}>
//                 {appointment.status === "done" ? (
//                   <Image src="/checkbox1.svg" width={14} height={14} alt="checkbox" />
//                 ) : (
//                   <Image src="/checkbox.svg" width={14} height={14} alt="checkbox" />
//                 )}
//               </div>
//               <div className="">
//                 <p className="text-sm font-bold">{appointment.id}</p>
//                 <small className="text-xm ">ID</small>
//               </div>
//               <div className="">
//                 <p className="text-sm font-bold">{appointment.name}</p>
//                 <small className="text-xm ">Name</small>
//               </div>
//               <div>
//                 <div className="flex gap-1 text-sm font-bold">
//                   <span>
//                     <Image src={appointment.doctor_image} height={20} width={20} alt="" />
//                   </span>
//                   {appointment.doctor_assigned}
//                 </div>
//                 <small className="text-xm ">Doctor Assigned</small>
//               </div>
//               <div>
//                 <p className="text-sm font-bold">{appointment.time}</p>
//                 <small className="text-xm ">Time</small>
//               </div>
//               <div>
//                 <p className="rounded bg-[#46FFA6] px-2 py-[2px] text-xs text-[#000000]">{appointment.complain}</p>
//                 <small className="text-xm ">complain</small>
//               </div>
//               <PiDotsThree />
//             </div>
//           ))}
//         </div>
//       </>
//     )
//   }

//   const renderDoneAppointments = () => {
//     const doneAppointments = Appointment.filter((appointment) => appointment.status === "done")
//     return (
//       <>
//         <div className="flex flex-col gap-2 max-md:hidden ">
//           {doneAppointments.map((appointment) => (
//             <div
//               key={appointment.id}
//               className="flex w-full cursor-pointer  items-center justify-between rounded-lg border p-2 "
//             >
//               <div className="my-4 flex content-center items-center gap-2" onClick={toggleDone}>
//                 {appointment.status === "done" ? (
//                   <Image src="/checkbox1.svg" width={14} height={14} alt="checkbox" />
//                 ) : (
//                   <Image src="/checkbox.svg" width={14} height={14} alt="checkbox" />
//                 )}
//               </div>
//               <div className="">
//                 <p className="text-sm font-bold">{appointment.id}</p>
//                 <small className="text-xm ">ID</small>
//               </div>
//               <div className="">
//                 <p className="text-sm font-bold">{appointment.name}</p>
//                 <small className="text-xm ">Name</small>
//               </div>
//               <div>
//                 <div className="flex gap-1 text-sm font-bold">
//                   <span>
//                     <Image src={appointment.doctor_image} height={20} width={20} alt="" />
//                   </span>
//                   {appointment.doctor_assigned}
//                 </div>
//                 <small className="text-xm ">Doctor Assigned</small>
//               </div>
//               <div>
//                 <p className="text-sm font-bold">{appointment.time}</p>
//                 <small className="text-xm ">Time</small>
//               </div>
//               <div>
//                 <p className="rounded bg-[#46FFA6] px-2 py-[2px] text-xs text-[#000000]">{appointment.complain}</p>
//                 <small className="text-xm ">complain</small>
//               </div>

//               <PiDotsThree />
//             </div>
//           ))}
//         </div>
//       </>
//     )
//   }

//   return (
//     <div className="flex w-full flex-col">
//       <div className="tab-bg mb-8 flex w-[185px] items-center gap-3 rounded-lg p-1 md:border">
//         <button
//           className={`${activeTab === "all" ? "active-tab" : "inactive-tab"}`}
//           onClick={() => setActiveTab("all")}
//         >
//           All
//         </button>
//         <button
//           className={`${activeTab === "pending" ? "active-tab" : "inactive-tab"}`}
//           onClick={() => setActiveTab("pending")}
//         >
//           Pending
//         </button>

//         <button
//           className={`${activeTab === "done" ? "active-tab" : "inactive-tab"}`}
//           onClick={() => setActiveTab("done")}
//         >
//           Done
//         </button>
//       </div>

//       {activeTab === "all" ? renderAllAppointments() : null}
//       {activeTab === "pending" ? renderPendingAppointments() : null}
//       {activeTab === "done" ? renderDoneAppointments() : null}
//     </div>
//   )
// }

// export default DoctorsAppointments
