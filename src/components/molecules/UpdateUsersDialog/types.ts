export interface IProps {
  onClose(): void
}

export enum UpdateStatus {
  IDLE,
  UPDATING,
  SUCCESS,
  ERROR,
}

export type FeedbackMessageType = 'success' | 'error'
export interface UpdateSummary {
  last_execution_timestamp: Date | null
  average_execution_time: number | null
}
export interface ContentProps {
  status: UpdateStatus
  step: number
  updateSummary: UpdateSummary | null
  handleUpdate: () => void
  onClose: () => void
  updateStep: () => void
}
