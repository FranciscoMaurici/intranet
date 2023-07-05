import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import CardInputContainer from '@components/molecules/CardInputContainer'
import { CompletePermissionsFormValues } from '@tstypes/permissions'
import { UserState } from '@tstypes/user'

import { CardsContainer } from './styles'
import { IProps } from './types'

import FragmentCheckbox from '@/components/atoms/FragmentCheckbox'
import UserListItem from '@/components/molecules/UserList/UserListItem'
import { renderResultsCountMessage } from '@/components/organisms/OpenPositions/index'
import {
  CardSearchControlsContainer,
  DisclaimerMessage,
  HeaderPositionsBar,
  ResultsNumberContainer,
  SearchBoxContainer,
} from '@/components/organisms/OpenPositions/styles'
import { Mutations } from '@/types'
import { includes } from '@/utils'
import { useAppMutation } from '@/utils/hooks/useAppMutation'

export const filterUsers = (
  rawTerms: string,
  users: UserState[],
  hidingDeactivated: boolean,
): UserState[] => {
  const terms = rawTerms
    .trim()
    .split(' ')
    .filter(term => !!term)
  const filteredUsers = users?.filter(({ jobTitle, name, email, status }) => {
    const isVisibleByActive = hidingDeactivated ? status === true : true
    const isVisibleBySearch = terms.length
      ? terms.some(
          el =>
            includes(el, name) ||
            includes(el, email) ||
            includes(el, jobTitle?.name),
        )
      : true

    return isVisibleByActive && isVisibleBySearch
  })

  return filteredUsers
}

const ManagePermissions = ({ users, isLoading }: IProps) => {
  const { watch, control } = useForm({
    mode: 'onChange',
    defaultValues: { hideDeactivated: true },
  })
  const [search, setSearch] = useState<string>('')
  const updateUserPermissionsMutation = useAppMutation(
    Mutations.UPDATE_USER_PERMISSIONS,
    {},
  )
  const hidingDeactivated = watch('hideDeactivated')
  const filteredUsers = filterUsers(search, users, hidingDeactivated)
  const onSubmit: SubmitHandler<CompletePermissionsFormValues> = data => {
    const PermissionsArr = []
    Object.keys(data).forEach(key => {
      if (key.split('/').length === 2 && data[key] !== undefined) {
        PermissionsArr.push({
          key: key,
          value: data[key],
          id: data.initialMappedModulePermissionsWithID[key]?.permissionID,
        })
      }
    })

    updateUserPermissionsMutation.mutate({
      PermissionsArr,
      userID: data.userID,
    })
  }

  return (
    <CardsContainer>
      {isLoading ? (
        <>
          <UserListItem.Skeleton />
          <UserListItem.Skeleton />
          <UserListItem.Skeleton />
        </>
      ) : (
        <div>
          <CardInputContainer
            key="card-input-container"
            flexDirection="column"
            margin="0 0 1em 0"
          >
            <HeaderPositionsBar>
              <SearchBoxContainer>
                <CardSearchControlsContainer>
                  <input
                    placeholder="Search..."
                    onChange={({ target: { value } }) => setSearch(value)}
                  />
                </CardSearchControlsContainer>
                {search && (
                  <ResultsNumberContainer>
                    {renderResultsCountMessage(search, filteredUsers?.length)}
                  </ResultsNumberContainer>
                )}
              </SearchBoxContainer>
              <DisclaimerMessage>
                <FragmentCheckbox
                  control={control}
                  checkboxProps={{
                    checked: hidingDeactivated,
                  }}
                  name="hideDeactivated"
                  label={<strong>Hide deactivated users</strong>}
                />
              </DisclaimerMessage>
            </HeaderPositionsBar>
          </CardInputContainer>
          {filteredUsers?.map(user => (
            <UserListItem key={user.id} user={user} onSubmit={onSubmit} />
          ))}
        </div>
      )}
    </CardsContainer>
  )
}

export default ManagePermissions
