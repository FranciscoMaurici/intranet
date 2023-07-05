import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

import FragmentButton from '@components/atoms/FragmentButton'
import FragmentLoadingOverlay from '@components/atoms/FragmentLoadingOverlay'
import ConfirmDialog from '@components/molecules/ConfirmDialog'
import FragmentEditor from '@components/molecules/FragmentEditor'

import { BenefitHeaderContainer, CancelButton, Form } from './styles'
import { BenefitFormValues, IProps } from './types'

import GoBack from '@/components/atoms/GoBack'
import { mutationRejected } from '@/redux/appSlice'
import { Mutations } from '@/types'
import { DefaultActionPermission } from '@/types/enums/defaultActions'
import { DefaultUserModules } from '@/types/enums/defaultModules'
import { useAppMutation } from '@/utils/hooks/useAppMutation'
import usePermissions from '@/utils/hooks/usePermissions'
import { getErrorMsg } from '@/utils/mutations'

const Benefit = ({ benefit }: IProps) => {
  const router = useRouter()
  const { userCan } = usePermissions()
  const [openConfirm, toggleConfirmDialog] = useState(false)
  const parsedBenefitContent = benefit?.content
    ? JSON.parse(benefit.content)
    : null

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<BenefitFormValues>({
    defaultValues: {
      benefitContent: parsedBenefitContent,
    },
  })

  const dispatch = useDispatch()

  const updateMutation = useAppMutation(
    Mutations.UPDATE_BENEFIT,
    {
      onError: () => {
        dispatch(mutationRejected(getErrorMsg('benefit', 'update')))
        handleCancel()
      },
      onSettled: () => {
        setStatus(DefaultActionPermission.READ)
        toggleConfirmDialog(false)
      },
    },
    `benefits/${benefit?.id}`,
  )

  const [status, setStatus] = useState<
    DefaultActionPermission.READ | DefaultActionPermission.UPDATE
  >(DefaultActionPermission.READ)

  const onSubmit: SubmitHandler<BenefitFormValues> = data =>
    updateMutation.mutate({
      id: benefit?.id,
      content: JSON.stringify(data.benefitContent),
    })

  const onError = (errors: unknown, e: unknown) => {
    console.error(errors, e)
  }

  const changeToEditMode = () => setStatus(DefaultActionPermission.UPDATE)
  const changeToViewMode = () => setStatus(DefaultActionPermission.READ)
  const handleCancel = () => {
    setValue('benefitContent', parsedBenefitContent)
    changeToViewMode()
  }

  useEffect(() => {
    const keyDownHandler = event => {
      if (event.key === 'Enter') {
        event.preventDefault()
      }
    }

    document.addEventListener('keydown', keyDownHandler)

    return () => {
      document.removeEventListener('keydown', keyDownHandler)
    }
  }, [])

  const onGoBack = () => {
    router.push(`/benefits`)
  }

  return (
    <>
      <Form id="benefit-form" onSubmit={handleSubmit(onSubmit, onError)}>
        <BenefitHeaderContainer status={status}>
          <GoBack onGoBack={onGoBack} />
          {userCan(
            DefaultActionPermission.UPDATE,
            DefaultUserModules.BENEFIT,
          ) && (
            <>
              {status === DefaultActionPermission.UPDATE && (
                <div>
                  <CancelButton variant="outlined" onClick={handleCancel}>
                    Cancel
                  </CancelButton>
                  <FragmentButton
                    variant="contained"
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => toggleConfirmDialog(true)}
                  >
                    Save
                  </FragmentButton>
                </div>
              )}
              {status === DefaultActionPermission.READ && (
                <FragmentButton variant="contained" onClick={changeToEditMode}>
                  Edit this page
                </FragmentButton>
              )}
            </>
          )}
        </BenefitHeaderContainer>

        <FragmentEditor
          control={control}
          name="benefitContent"
          editable={status === DefaultActionPermission.UPDATE}
        />
      </Form>
      {openConfirm && (
        <ConfirmDialog
          open={openConfirm}
          handleClose={() => toggleConfirmDialog(false)}
          message={'Do you want to save changes?'}
          title={'Save changes'}
          isLoading={isSubmitting}
          formId="benefit-form"
        />
      )}
      {isSubmitting && <FragmentLoadingOverlay />}
    </>
  )
}

export default Benefit
