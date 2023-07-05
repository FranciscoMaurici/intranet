import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'

import FragmentDialog from '@components/molecules/FragmentDialog'
import FragmentDialogActions from '@components/molecules/FragmentDialogActions'
import FragmentDialogContent from '@components/molecules/FragmentDialogContent'
import FragmentDialogTitle from '@components/molecules/FragmentDialogTitle'

import 'dayjs/locale/en'

import {
  MessageContainer,
  ProgressDescriptionContainer,
  UpdateContentContainer,
} from './styles'
import {
  ContentProps,
  FeedbackMessageType,
  IProps,
  UpdateStatus,
  UpdateSummary,
} from './types'

import FragmentButton from '@/components/atoms/_FragmentButton'
import FragmentLinearProgress from '@/components/atoms/FragmentLinearProgress'
import FragmentText from '@/components/atoms/FragmentText'
import { colors } from '@/theme'

const UpdateUsersDialog = ({ onClose }: IProps) => {
  const [status, setStatus] = useState<UpdateStatus>(UpdateStatus.IDLE)
  const [step, setStep] = useState(1)
  const [updateSummary, setUpdateSummary] = useState<UpdateSummary | null>()

  useEffect(() => {
    axios
      .get('/api/adp/workers/update-summary')
      .then(({ data }) => setUpdateSummary(data))
  }, [])

  const updateStep = () => setStep(step + 1)

  const handleUpdate = async () => {
    setStatus(UpdateStatus.UPDATING)
    try {
      await axios.post('/api/adp/workers/update')
      setStatus(UpdateStatus.SUCCESS)
    } catch (error) {
      setStatus(UpdateStatus.ERROR)
    } finally {
      setStep(1)
    }
  }

  const DialogHeader = () => (
    <FragmentDialogTitle onClose={onClose}>Update users</FragmentDialogTitle>
  )

  return (
    <FragmentDialog open>
      <DialogHeader />
      <Content
        status={status}
        step={step}
        updateSummary={updateSummary}
        handleUpdate={handleUpdate}
        onClose={onClose}
        updateStep={updateStep}
      />
    </FragmentDialog>
  )
}

const FeedbackMessage = ({
  children,
  type,
}: {
  children: React.ReactNode
  type: FeedbackMessageType
}) => (
  <MessageContainer $type={type}>
    <FragmentText
      variant="bodyRegularBold"
      color={type === 'success' ? colors.success.x900 : colors.danger.x900}
    >
      {children}
    </FragmentText>
  </MessageContainer>
)

const UpdateProgressBar = ({
  updateStep,
  avgSeconds,
}: {
  updateStep(): void
  avgSeconds: number
}) => {
  const [progress, setProgress] = useState(0)
  const duration = avgSeconds || 60
  const stepCountRef = useRef(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= 100) {
          clearInterval(timer)
          return 100
        }
        return prevProgress + 100 / (duration * 10)
      })
    }, 100)

    return () => {
      clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    if (progress >= 33 && stepCountRef.current === 0) {
      updateStep()
      stepCountRef.current = 1
    }

    if (progress >= 66 && stepCountRef.current === 1) {
      updateStep()
      stepCountRef.current = 2
    }

    if (progress === 100 && stepCountRef.current === 2) {
      updateStep()
      stepCountRef.current = 3
    }
  }, [progress])

  return <FragmentLinearProgress variant="determinate" value={progress} />
}

const Content = ({
  status,
  step,
  updateSummary,
  handleUpdate,
  onClose,
  updateStep,
}: ContentProps) => {
  switch (status) {
    case UpdateStatus.IDLE:
      return (
        <>
          <FragmentDialogContent>
            <FragmentText variant="bodyRegular">
              Please confirm if you wish to synchronize the users information
              with ADP. This action may take up a few minutes.
            </FragmentText>
            <br />
            {updateSummary?.last_execution_timestamp && (
              <FragmentText variant="bodyXSmall">
                Last update:{' '}
                {dayjs(updateSummary.last_execution_timestamp)
                  .locale('en')
                  .format('dddd D MMMM YYYY')}
              </FragmentText>
            )}
          </FragmentDialogContent>
          <FragmentDialogActions>
            <FragmentButton variant="tertiary" onClick={onClose}>
              Cancel
            </FragmentButton>
            <FragmentButton onClick={handleUpdate}>Update</FragmentButton>
          </FragmentDialogActions>
        </>
      )
    case UpdateStatus.UPDATING:
      return (
        <FragmentDialogContent>
          <UpdateContentContainer>
            <UpdateProgressBar
              updateStep={updateStep}
              avgSeconds={updateSummary?.average_execution_time}
            />
            <ProgressDescriptionContainer>
              <FragmentText variant="bodyMedium" color={colors.neutrals.x600}>
                {
                  [
                    'Obtaining updated workers data',
                    'Updating existing users',
                    'Creating new users',
                    'Almost ready, please wait...',
                  ][step - 1]
                }
              </FragmentText>
              {step < 4 && (
                <FragmentText
                  variant="bodyMicroBold"
                  color={colors.neutrals.x300}
                >
                  STEP {step} OF 3
                </FragmentText>
              )}
            </ProgressDescriptionContainer>
          </UpdateContentContainer>
        </FragmentDialogContent>
      )
    case UpdateStatus.SUCCESS:
      return (
        <>
          <FragmentDialogContent>
            <FeedbackMessage type="success">
              THE USERS WERE UPDATED SUCCESSFULLY!
              <br />
              <br />
              The Intranet users data is now fully synced with ADP information.
            </FeedbackMessage>
          </FragmentDialogContent>
          <FragmentDialogActions>
            <FragmentButton variant="tertiary" onClick={onClose}>
              Close
            </FragmentButton>
          </FragmentDialogActions>
        </>
      )
    case UpdateStatus.ERROR:
      return (
        <>
          <FragmentDialogContent>
            <FeedbackMessage type="error">
              AN ERROR HAS OCURRED.
              <br />
              <br />
              Feel free to try again later.
              <br />
              If the error persists, please contact an administrator.
            </FeedbackMessage>
          </FragmentDialogContent>
          <FragmentDialogActions>
            <FragmentButton variant="tertiary" onClick={onClose}>
              Cancel
            </FragmentButton>
            <FragmentButton onClick={handleUpdate}>Try again</FragmentButton>
          </FragmentDialogActions>
        </>
      )
    default:
      return null
  }
}

export default UpdateUsersDialog
export type { IProps }
