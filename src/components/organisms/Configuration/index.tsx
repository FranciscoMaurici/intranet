import { useState } from 'react'
import { useRouter } from 'next/router'

import {
  CardsContainer,
  ConfigurationHeader,
  ConfigurationLayout,
} from './styles'

import FragmentText from '@/components/atoms/FragmentText'
import FragmentCard from '@/components/molecules/FragmentCard'
import { IFragmentCardItem } from '@/components/molecules/FragmentCard/types'
import UpdateUsersDialog from '@/components/molecules/UpdateUsersDialog'

export const Configuration = () => {
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false)
  const router = useRouter()

  const configurationItems: IFragmentCardItem[] = [
    {
      title: 'UPDATE USERS DATABASE',
      description:
        'The users database is synced with ADP information automatically every week. However, it is also possible to perform this action manually if needed.',
      iconSrc: '/images/configuration-icons/update-users.svg',
      actionButton: {
        type: 'custom',
        title: 'UPDATE USERS',
        onClick: () => setUpdateDialogOpen(true),
      },
    },
    {
      title: 'USER PERMISSIONS',
      description:
        'Here you can grant or revoke user permissions and system access. Adjust to changing roles and maintain system security.      ',
      iconSrc: '/images/learning-paths-icons/web.svg',
      actionButton: {
        type: 'custom',
        title: 'MORE DETAILS',
        onClick: () => router.push(`/configuration/permissions`),
      },
    },
  ]

  return (
    <ConfigurationLayout>
      <ConfigurationHeader>
        <FragmentText variant="subHeadingRegular">CHANGE INTRANET</FragmentText>
        <FragmentText variant="headingLarge">Configuration</FragmentText>
      </ConfigurationHeader>
      <CardsContainer>
        {configurationItems.map(i => (
          <FragmentCard key={i.title} {...i} />
        ))}
      </CardsContainer>
      {updateDialogOpen && (
        <UpdateUsersDialog onClose={() => setUpdateDialogOpen(false)} />
      )}
    </ConfigurationLayout>
  )
}

export default Configuration
