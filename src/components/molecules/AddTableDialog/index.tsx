import { useForm } from 'react-hook-form'

import FragmentButton from '@components/atoms/FragmentButton'
import FragmentSwitch from '@components/atoms/FragmentSwitch'
import FragmentDialog from '@components/molecules/FragmentDialog'
import FragmentDialogActions from '@components/molecules/FragmentDialogActions'
import FragmentDialogContent from '@components/molecules/FragmentDialogContent'
import FragmentDialogTitle from '@components/molecules/FragmentDialogTitle'
import FragmentInput from '@components/molecules/FragmentInput'

import { IProps, TableFormValues } from './types'

const AddTableDialog = ({ onClose, onSubmit }: IProps) => {
  const { control, handleSubmit } = useForm<TableFormValues>({
    defaultValues: { cols: 2, rows: 2, withHeaderRow: false },
  })

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit(onSubmit)(e)
    e.stopPropagation()
  }

  return (
    <>
      <FragmentDialog open onClose={onClose} fullWidth maxWidth="xs">
        <FragmentDialogTitle onClose={onClose}>
          Insert Table
        </FragmentDialogTitle>
        <FragmentDialogContent fullWidth>
          <form onSubmit={handleFormSubmit} id="table-form">
            <FragmentInput
              control={control}
              name="rows"
              label={'Number of rows'}
              type="number"
              rules={{
                validate: (rows: number) =>
                  rows > 0 ? true : 'Required field',
              }}
              InputProps={{
                inputProps: { min: 0 },
              }}
            />
            <FragmentInput
              control={control}
              name="cols"
              label={'Number of columns'}
              type="number"
              rules={{
                validate: (cols: number) =>
                  cols > 0 ? true : 'Required field',
              }}
              InputProps={{
                inputProps: { min: 0 },
              }}
            />
            <FragmentSwitch
              label="Include header"
              name="withHeaderRow"
              control={control}
            />
          </form>
        </FragmentDialogContent>
        <FragmentDialogActions>
          <FragmentButton onClick={onClose} variant="outlined">
            Cancel
          </FragmentButton>
          <FragmentButton type="submit" variant="contained" form="table-form">
            Confirm
          </FragmentButton>
        </FragmentDialogActions>
      </FragmentDialog>
    </>
  )
}

export default AddTableDialog
export type { IProps }
