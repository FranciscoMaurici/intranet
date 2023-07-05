import React, { useState } from 'react'

import {
  Divider,
  LeadsLayout,
  QuestionCard,
  QuestionCardLinksContainer,
  QuestionsContainer,
} from './styles'

import FragmentButton from '@/components/atoms/_FragmentButton'
import FragmentLink from '@/components/atoms/FragmentLink'
import FragmentText from '@/components/atoms/FragmentText'
import LeadModal from '@/components/molecules/LeadModal'
import UserData from '@/components/molecules/UserData'
import { useAppSelector } from '@/redux/hooks'
import { colors } from '@/theme'

const contactInfo = [
  {
    name: 'Christin Palmer',
    role: 'Director of Operations',
    slack: 'https://slack.com/app_redirect?team=T03G61VPV&channel=U02MWSFCLUC',
    email: 'christin.palmer@distillery.com',
    photo: '/images/christin.jpg',
  },
  {
    name: 'Lesley Mackie',
    role: 'Senior Digital Marketing Manager',
    slack: 'https://slack.com/app_redirect?team=T03G61VPV&channel=U02SNTXAZEX',
    email: 'lesley.mackie@distillery.com',
    photo: '/images/lesley.jpg',
  },
]

const Leads = () => {
  const [open, toggleDialog] = useState(false)
  const { showOverlay } = useAppSelector(store => store.app)

  const handleClose = () => {
    toggleDialog(false)
  }

  return (
    <LeadsLayout>
      <article>
        <header>
          <section>
            <FragmentText variant="subHeadingRegular">Leads</FragmentText>
            <FragmentText variant="headingLarge">
              {"We're thrilled to connect with your network"}
            </FragmentText>
          </section>
          <FragmentText>
            {`To make the referral process easier, we have created a `}
            <FragmentText as="span" variant="bodyRegularBold">
              Lead Submittal
            </FragmentText>
            {` Form that will automatically assign the lead to
          a sales representative. We'll review all leads and contact you to
          discuss converting them into approved prospects.`}
          </FragmentText>
          <FragmentButton onClick={() => toggleDialog(true)}>
            Submit a lead
          </FragmentButton>
        </header>
      </article>
      <Divider />
      <QuestionsContainer>
        <FragmentText variant="headingSmall">Any questions?</FragmentText>
        <FragmentText>Please reach our Sales Department</FragmentText>
        <div>
          {contactInfo.map(({ name, email, slack, role, photo }) => (
            <QuestionCard key={email}>
              <UserData
                text={name}
                nameFontSize="1em"
                nameFontWeight="700"
                uppercaseName
                icon={photo}
              >
                <>
                  <FragmentText
                    color={colors.neutrals.x500}
                    variant="bodyXSmall"
                  >
                    {role}
                  </FragmentText>
                  <QuestionCardLinksContainer>
                    <FragmentLink href={slack} target="_blank">
                      SLACK
                    </FragmentLink>
                    <FragmentLink href={`mailto:${email}`} target="_blank">
                      EMAIL
                    </FragmentLink>
                  </QuestionCardLinksContainer>
                </>
              </UserData>
            </QuestionCard>
          ))}
        </div>
      </QuestionsContainer>

      {open && (
        <LeadModal
          open={open}
          handleClose={handleClose}
          isLoading={showOverlay}
        />
      )}
    </LeadsLayout>
  )
}

export default Leads
