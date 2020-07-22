export type TypeModalState = 'DETAILS' | 'TRAVEL'
export type SizeModalState = 'SMALL' | 'MEDIUM' | 'LARGE'

export type ModalState = {
  type: TypeModalState
  size: SizeModalState
  title?: string
  visible: boolean
  city?: string
}
