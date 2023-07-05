import FragmentButton from '@components/atoms/_FragmentButton'
import FragmentDialog from '@components/molecules/FragmentDialog'
import FragmentDialogActions from '@components/molecules/FragmentDialogActions'
import FragmentDialogContent from '@components/molecules/FragmentDialogContent'
import FragmentDialogTitle from '@components/molecules/FragmentDialogTitle'

import { ConfirmMessage } from './styles'
import { IProps } from './types'

const ConfirmDialog = ({
  open,
  handleClose,
  message,
  title,
  isLoading,
  handleConfirm,
  formId,
}: IProps) => (
  <FragmentDialog open={open} onClose={(_, reason) => handleClose(reason)}>
    <FragmentDialogTitle onClose={handleClose}>{title}</FragmentDialogTitle>
    <FragmentDialogContent>
      <ConfirmMessage>{message}</ConfirmMessage>
    </FragmentDialogContent>
    <FragmentDialogActions>
      <FragmentButton onClick={() => handleClose()} variant="tertiary">
        Cancel
      </FragmentButton>
      <FragmentButton
        type="submit"
        variant="primary"
        onClick={handleConfirm}
        disabled={isLoading}
        form={formId}
      >
        Confirm
      </FragmentButton>
    </FragmentDialogActions>
  </FragmentDialog>
)

export default ConfirmDialog
export type { IProps }
