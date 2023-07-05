import { Alert, Slide, Snackbar } from '@mui/material'

import { IProps } from './types'

import { useMessages } from '@/utils/hooks/useMessages'

const FragmentSnackbar = (props: IProps) => {
  const { message, removeMessage } = useMessages()

  const onClose = () => removeMessage()
  return (
    message && (
      <Snackbar
        {...props}
        autoHideDuration={5000}
        open={!!message}
        TransitionComponent={Slide}
        onClose={onClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          key={`msg_${message.code}`}
          onClose={onClose}
          severity={message.severity}
        >
          {message.message}
        </Alert>
      </Snackbar>
    )
  )
}

export default FragmentSnackbar
export type { IProps }
