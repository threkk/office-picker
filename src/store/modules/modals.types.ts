export type TypeModalState = 'DETAILS' | 'TRAVEL'
export type SizeModalState = 'SMALL' | 'MEDIUM' | 'LARGE'

export type ModalState = {
  type: TypeModalState
  size: SizeModalState
  visible: boolean
  city?: string
}
