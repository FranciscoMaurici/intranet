import { useRouter } from 'next/router'

import FragmentButton from '@components/atoms/_FragmentButton'
import FragmentDialogActions from '@components/molecules/FragmentDialogActions'
import FragmentDialogContent from '@components/molecules/FragmentDialogContent'
import FragmentDialogTitle from '@components/molecules/FragmentDialogTitle'

import { StyledFragmentDialog } from '../LeadModal/styles'

import { MessageContent } from './styles'

import FragmentText from '@/components/atoms/FragmentText'

const LeadThankYouModal = () => {
  const router = useRouter()

  const onClose = () => {
    router.push(`/leads`)
  }

  return (
    <>
      <StyledFragmentDialog open onClose={onClose}>
        <FragmentDialogTitle onClose={onClose}>
          {'New lead submitted'}
        </FragmentDialogTitle>
        <FragmentDialogContent>
          <MessageContent>
            <FragmentText variant="subHeadingRegular">
              CONGRATULATIONS!
            </FragmentText>
            <FragmentText variant="bodyRegularBold">
              Your lead information has been successfully uploaded.
            </FragmentText>
            <FragmentText></FragmentText>
            <ul>
              <li>
                <FragmentText as="span">
                  All lead submittals will be monitored and reviewed for
                  potential duplicates.
                </FragmentText>
              </li>
              <li>
                <FragmentText as="span">
                  You will be contacted soon by us to discuss your lead
                  submittals and convert them to approved prospects!
                </FragmentText>
              </li>
            </ul>
          </MessageContent>
        </FragmentDialogContent>
        <FragmentDialogActions>
          <FragmentButton onClick={onClose} variant="secondary">
            Close
          </FragmentButton>
        </FragmentDialogActions>
      </StyledFragmentDialog>
    </>
  )
}

export default LeadThankYouModal
