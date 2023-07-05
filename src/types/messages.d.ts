export enum MessageSeverity {
  ERROR = 'error',
  WARNING = 'warning',
  SUCCESS = 'success',
  INFO = 'info',
}

export type IMessageType = {
  code?: number
  message: string
  severity: MessageSeverity
}
