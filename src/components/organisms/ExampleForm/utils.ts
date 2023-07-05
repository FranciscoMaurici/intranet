import { MessageSeverity } from '@tstypes'

import { AddMessageFn } from './types'

const messageMapping = {
  1: { message: 'Error', severity: MessageSeverity.ERROR },
  2: { message: 'Warning', severity: MessageSeverity.WARNING },
  3: { message: 'Success', severity: MessageSeverity.SUCCESS },
}

export const generateAddMessageHandler =
  (addMessage: AddMessageFn) => (code: number) => {
    const { message, severity } = messageMapping[code]

    addMessage({
      code,
      message,
      severity,
    })
  }
