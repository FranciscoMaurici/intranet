import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import FragmentButton from '@components/atoms/FragmentButton'
import FragmentLoadingOverlay from '@components/atoms/FragmentLoadingOverlay'
import FragmentDialog from '@components/molecules/FragmentDialog'
import FragmentDialogActions from '@components/molecules/FragmentDialogActions'
import FragmentDialogContent from '@components/molecules/FragmentDialogContent'
import FragmentDialogTitle from '@components/molecules/FragmentDialogTitle'
import FragmentInput from '@components/molecules/FragmentInput'

import ConfirmDialog from '../ConfirmDialog'

import { TOpenPositionFormValues, TProps } from './types'

import { Mutations } from '@/types'
import { useAppMutation } from '@/utils/hooks/useAppMutation'

const OpenPositionModal = ({
  open,
  handleClose,
  openPosition,
  isLoading,
}: TProps) => {
  const {
    control,
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useForm<TOpenPositionFormValues>({
    defaultValues: { ...openPosition },
  })

  const [openConfirm, toggleConfirmDialog] = useState(false)

  const createMutation = useAppMutation(Mutations.CREATE_POSITION, {
    onSettled: () => handleClose(),
  })

  const updateMutation = useAppMutation(Mutations.EDIT_POSITION, {
    onSettled: () => handleClose(),
  })

  const onSubmit: SubmitHandler<TOpenPositionFormValues> = async data => {
    const openPositionData = {
      ...openPosition,
      ...data,
      openings: +data.openings,
    }

    if (openPosition.id) updateMutation.mutate(openPositionData)
    else createMutation.mutate(openPositionData)
  }

  const onClose = (_?, reason?) => {
    isDirty ? toggleConfirmDialog(true) : handleClose(reason)
  }

  return (
    <>
      <FragmentDialog open={open} onClose={onClose}>
        <FragmentDialogTitle onClose={onClose}>
          {openPosition.id ? 'Edit' : 'Create'} open position
        </FragmentDialogTitle>
        <FragmentDialogContent>
          <form>
            <FragmentInput
              control={control}
              name="title"
              label={'Title'}
              rules="Required field"
              autoComplete="off"
            />

            <FragmentInput
              control={control}
              name="client"
              label={'Client name'}
              rules="Required field"
              autoComplete="off"
            />
            <FragmentInput
              control={control}
              name="position_id"
              label={'Position ID'}
              rules="Required field"
              autoComplete="off"
            />
            <FragmentInput
              control={control}
              name="openings"
              label={'Number of vacancies'}
              type="number"
              rules={{
                validate: (openPositions: number) =>
                  openPositions > 0 ? true : 'Required field',
              }}
              InputProps={{
                inputProps: { min: 0 },
              }}
            />
            <FragmentInput
              multiline
              rows={4}
              control={control}
              name="description"
              label={'Open position description'}
              rules="Required field"
            />
          </form>
        </FragmentDialogContent>
        <FragmentDialogActions>
          <FragmentButton onClick={onClose} variant="outlined">
            Cancel
          </FragmentButton>
          <FragmentButton
            type="submit"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            disabled={!isDirty}
          >
            Publish
          </FragmentButton>
        </FragmentDialogActions>
      </FragmentDialog>
      {openConfirm && (
        <ConfirmDialog
          open={openConfirm}
          handleClose={() => toggleConfirmDialog(false)}
          handleConfirm={handleClose}
          message={
            'Your changes will be lost, are you sure you want to proceed?'
          }
          title={'Cancel operation'}
          isLoading={isLoading}
        />
      )}
      {isSubmitting && <FragmentLoadingOverlay />}
    </>
  )
}

export default OpenPositionModal
export type { TProps }
