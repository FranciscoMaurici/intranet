import { useState } from 'react'

import FragmentButton from '@components/atoms/_FragmentButton'
import PageTitle from '@components/atoms/PageTitle'
import TechInterviewForm from '@components/organisms/TechInterviewForm'

import { HeaderContainer } from './styles'

import { DefaultActionPermission } from '@/types/enums/defaultActions'
import { DefaultUserModules } from '@/types/enums/defaultModules'
import usePermissions from '@/utils/hooks/usePermissions'

const TechInterviews = () => {
  const [showForm, setShowForm] = useState(false)
  const { userCan } = usePermissions()

  const handleCreateNew = () => {
    setShowForm(true)
  }

  const canAddTechInterview =
    (userCan(
      DefaultActionPermission.CREATE,
      DefaultUserModules.TECH_INTERVIEW_STACK_MANAGER,
    ) ||
      userCan(
        DefaultActionPermission.CREATE,
        DefaultUserModules.TECH_INTERVIEW_RECRUITER,
      )) &&
    !showForm

  return (
    <>
      <HeaderContainer>
        <PageTitle>
          {!showForm ? 'Tech Interviews' : 'New Interview Ticket'}
        </PageTitle>
        {canAddTechInterview && (
          <FragmentButton type="submit" onClick={handleCreateNew}>
            CREATE NEW
          </FragmentButton>
        )}
      </HeaderContainer>
      {showForm && <TechInterviewForm />}
    </>
  )
}

export default TechInterviews
