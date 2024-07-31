"use client"

import { useState } from "react"
import Modal from "./Modal"
import { Button } from "../Button/Button"
import Form from "../Form"

const ShowModal = () => {
  const [modalState, setModalState] = useState(false)

  return (
    <div className="relative z-50">
      <Button className="relative z-50 mr-3" onClick={() => setModalState(true)}>
        Get started
      </Button>
      <Modal isVisible={modalState} onClose={() => setModalState(false)}>
        <h2 className="mx-auto mb-6 mt-8 w-10/12 max-w-2xl text-2xl font-extrabold !leading-tight tracking-wide text-black md:text-3xl xl:text-4xl">
          Get 10 Top-Tier Leads
        </h2>
        <p className="mx-auto mb-4 w-10/12 max-w-2xl text-xl font-extrabold !leading-tight tracking-wide text-brand md:text-2xl xl:text-3xl">
          Within Less Than 30 Days
        </p>
        <p className="mb-4">Apply Now</p>
        <Form />
      </Modal>
    </div>
  )
}

export default ShowModal
