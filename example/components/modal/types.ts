import { Travel } from "@/shared/types"

export type TravelModalProps = {
  isModalOpen: boolean
  selectedTravels: Travel[]
  handleCloseModal: () => void
}