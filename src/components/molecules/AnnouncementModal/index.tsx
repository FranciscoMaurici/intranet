import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { JSONContent } from '@tiptap/react'

import FragmentButton from '@components/atoms/FragmentButton'
import FragmentDialogActions from '@components/molecules/FragmentDialogActions'
import FragmentDialogContent from '@components/molecules/FragmentDialogContent'
import FragmentDialogTitle from '@components/molecules/FragmentDialogTitle'
import FragmentEditor from '@components/molecules/FragmentEditor'
import UserData from '@components/molecules/UserData'
import { selectUser } from '@slices/userSlice'

import ConfirmDialog from '../ConfirmDialog'
import { editorContentToHTML } from '../FragmentEditor/utils'

import { StyledFragmentDialog } from './styles'
import { AnnouncementFormValues, IProps } from './types'

import { Mutations } from '@/types'
import { useAppMutation } from '@/utils/hooks/useAppMutation'

const AnnouncementModal = ({
  open,
  handleClose,
  announcement,
  isLoading,
}: IProps) => {
  const user = useSelector(selectUser)
  const [openConfirm, toggleConfirmDialog] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<AnnouncementFormValues>({
    defaultValues: {
      ...announcement,
      user_id: user.id,
    },
  })

  const getUseAppMutation = <MutationKey extends Mutations>(
    mutation: MutationKey,
  ) =>
    useAppMutation<MutationKey>(mutation, {
      onSettled: () => handleClose(),
    })

  const [createMutation, updateMutation] = [
    getUseAppMutation(Mutations.CREATE_ANNOUNCEMENT),
    getUseAppMutation(Mutations.EDIT_ANNOUNCEMENT),
  ]

  const onSubmit: SubmitHandler<AnnouncementFormValues> = data => {
    const announcementData = {
      ...data,
      content: editorContentToHTML(data.content as JSONContent),
    }
    if (announcement.id) updateMutation.mutate(announcementData)
    else createMutation.mutate(announcementData)
  }

  const onClose = (
    _?,
    reason?: 'backdropClick' | 'escapeKeyDown' | 'closeButtonClick',
  ) => {
    if (reason !== 'backdropClick')
      isDirty ? toggleConfirmDialog(true) : handleClose(reason)
  }

  const validateContent = content =>
    content &&
    content.content &&
    content.content.length > 0 &&
    content.content.some(e => Boolean(e.content) || e.type === 'custom-image')

  return (
    <>
      <StyledFragmentDialog open={open} onClose={onClose}>
        <FragmentDialogTitle onClose={onClose}>
          {announcement.id ? 'Edit' : 'Create'} post
        </FragmentDialogTitle>
        <FragmentDialogContent>
          <form id="announcement-form" onSubmit={handleSubmit(onSubmit)}>
            <UserData
              iconRightMargin={'1em'}
              withName
              uppercaseName
              nameFontSize={'0.75em'}
              nameFontWeight={'700'}
              useDistilleryInfo
            />
            <FragmentEditor
              control={control}
              name="content"
              editable
              rules={{
                validate: validateContent,
              }}
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
            form="announcement-form"
            disabled={isLoading || !isDirty || !isValid}
          >
            Publish
          </FragmentButton>
        </FragmentDialogActions>
      </StyledFragmentDialog>
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
    </>
  )
}

export default AnnouncementModal
export type { IProps }
