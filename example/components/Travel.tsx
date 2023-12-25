"use client"

import React, { useCallback, useEffect, useState } from "react"
import useSelectedItems from "../../src/index"
import TravelsModal from "./modal"
import { Travel } from "@/shared/types"
import travels from "@/fixtures/travel"
import { BeatLoader } from "react-spinners"
import { cn } from "@/lib/utils"
import { AspectRatio } from "./ui"
import Image from "next/image"
import { DefaultItem } from "../../src/types"

const getTravels = (): Promise<Travel[]> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(travels)
    }, 2000)
  })

function TravelComponent() {
  const [travelItems, setTravelItems] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { items, selectedItems, toggleAllItems, toggleSingleItem } =
    useSelectedItems<Travel>({
      itemIdentifierKey: "id",
      initialItems: travelItems,
    })

  const fetchTravels = useCallback(() => {
    getTravels().then((response) => {
      setTravelItems(response)
    })
  }, [])

  useEffect(() => {
    fetchTravels()
  }, [fetchTravels])

  const handleClick = (item:any) => () => {
    toggleSingleItem(item)
  }

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])
  return (
    <>
      <div className="h-full flex flex-col">
        <header className="p-4 border-b-2 border-gray-200 flex justify-between items-center relative">
          <h1 className="text-3xl font-semibold text-gray-800">Select a travel</h1>
          <div className="flex flex-col items-center">
            <button
              type="button"
              className="bg-none border-none flex items-center text-indigo-500 focus:outline-none focus:shadow-outline rounded-full"
              onClick={handleOpenModal}
            >
              Submit
            </button>

            <button
              type="button"
              className="bg-none border-none flex items-center text-indigo-500 focus:outline-none focus:shadow-outline rounded-full"
              onClick={toggleAllItems}
            >
              Toggle All
            </button>
          </div>
        </header>
        <main className="mt-auto mb-auto p-4 px-12 space-y-12">
          {items?.length ? (
            items.map((item) => {
              return (
                <div
                  key={item.id}
                  className={cn("relative cursor-pointer rounded-lg border-4 border-white border-solid", 
                    item.isSelected && "border-indigo-500")}
                  onClick={handleClick(item)}
                >
                  <AspectRatio ratio={4 / 5}>
                    <Image 
                      src={item.imageUrl}
                      className="w-full h-full object-cover rounded-lg"
                      alt="Travel"
                      aria-label={item.name}
                      layout="fill"
                    />
                  </AspectRatio>
                  <p className="bg-white m-2 rounded px-2 py-1 bg-opacity-90 text-sm font-semibold absolute bottom-0 inset-x-0">
                    {item.name}
                  </p>
                </div>
              )
            })
          ): (
            <div className="h-full flex items-center justify-center">
              <BeatLoader color="#3B82F6" />
            </div>
          )}
        </main>
      </div>
      <TravelsModal
        isModalOpen={isModalOpen}
        selectedTravels={selectedItems}
        handleCloseModal={handleCloseModal}
      />
    </>
  )
}

export default TravelComponent
