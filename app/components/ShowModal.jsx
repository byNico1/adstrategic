"use client"

import { useState } from "react"
import Modal from "./Modal"
import { Button } from "../../components/Button/Button"

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
        <form class="w-full max-w-xl">
          <div class="mx-auto  flex w-3/4 flex-col ">
            <div class="mb-4 flex flex-col items-start justify-start">
              <label class="mb-2 block pr-4 text-left font-bold text-gray-500" for="name">
                Full Name
              </label>
              <input
                class="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
                id="name"
                type="text"
                placeholder="Name"
              ></input>
            </div>
            <div class="mb-4 flex flex-col ">
              <label class="mb-1 block pr-4 text-left font-bold text-gray-500" for="email">
                Email
              </label>
              <input
                class="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
                id="email"
                type="email"
                placeholder="Email"
              />
            </div>

            <div class=" flex flex-col ">
              <label class="mb-1 block pr-4 text-left font-bold text-gray-500" for="phone">
                Phone
              </label>
              <input
                class="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
                id="phone"
                type="tel"
                placeholder="Phone"
              />
            </div>

            <Button className="my-6 text-base sm:my-8 sm:text-xl">Send Me My Service</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default ShowModal
