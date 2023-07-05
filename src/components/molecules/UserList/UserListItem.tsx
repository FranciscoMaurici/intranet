import { useMemo, useState } from 'react'
import { Control, useForm } from 'react-hook-form'
import Grid from '@mui/material/Grid'
import { AnimatePresence } from 'framer-motion'
import Image from 'next/image'

import type {
  CompletePermissionsFormValues,
  PermissionsFormValues,
  PermissionsFormValuesExtended,
} from '@tstypes/permissions'
import { PermissionsTableStructureType } from '@tstypes/permissions'

import {
  CardContainer,
  EditPermissionsFormContainer,
  GridCell,
  IconContainer,
  IconSkeleton,
  InfoContainer,
  StyledExpander,
  StyledGridContainer,
  StyledRow,
  Subtitle,
  UserNameHeader,
  VisibleCard,
} from './styles'
import type { IProps } from './types'

import FragmentButton from '@/components/atoms/_FragmentButton'
import AnimatedContentToggle from '@/components/atoms/AnimatedContentToggle'
import FragmentCheckbox from '@/components/atoms/FragmentCheckbox'
import FragmentSkeleton from '@/components/atoms/FragmentSkeleton'
import FragmentText from '@/components/atoms/FragmentText'
import { colors } from '@/theme'
import { useGetEntity } from '@/utils/hooks/useEntity'

const DEFAULT_AVATAR =
  'https://lh3.googleusercontent.com/a/ALm5wu2HONfJK8FKG_RofTbGYLBN_XAqa5Y-sm4kftjp=s96-c'

export const buildMappedModulePermissions = (
  modulePermission,
  withID?: boolean,
) =>
  modulePermission.reduce((acc, permission) => {
    const disabled = permission.status === false
    acc[`${permission.module.id}/${permission.actionPermission.id}`] = withID
      ? {
          disabled,
          permissionID: permission.id,
          selected: !disabled,
        }
      : !disabled

    return acc
  }, {})

const rowAdminKey = row => `${row[1]?.checkboxIdentifier?.split('/')?.[0]}/5`

const PermissionsTable = ({
  control,
  watch,
  PermissionsTableStructure,
}: {
  control: Control
  watch: (string) => boolean
  PermissionsTableStructure: PermissionsTableStructureType
}) => (
  <StyledGridContainer item container>
    {PermissionsTableStructure.map((row, rowIndex) => (
      <StyledRow key={rowIndex} container direction="row">
        {row.map((singlePermission, singlePermissionIndex) =>
          singlePermission.checkboxIdentifier ? (
            <Grid key={singlePermission.checkboxIdentifier} item xs={2}>
              <FragmentCheckbox
                control={control}
                checkboxProps={{
                  checked:
                    !!watch(singlePermission.checkboxIdentifier) ||
                    watch(rowAdminKey(row)) === true,
                  disabled:
                    watch(rowAdminKey(row)) === true &&
                    !singlePermission.checkboxIdentifier.includes('/5'),
                }}
                name={singlePermission.checkboxIdentifier}
                label=""
              />
            </Grid>
          ) : (
            <GridCell
              key={singlePermissionIndex}
              item
              container
              xs={2}
              alignItems={'center'}
            >
              <FragmentText variant="bodyRegularBold">
                {singlePermission.text}
              </FragmentText>
            </GridCell>
          ),
        )}
      </StyledRow>
    ))}
  </StyledGridContainer>
)

const UserListItem = ({ user, onSubmit }: IProps) => {
  const { jobTitle, id: userID } = user
  const [editingExpanded, setEditingExpanded] = useState(false)
  const { name, email, avatar, modulePermission } = user

  const MappedModulePermissions: PermissionsFormValues = useMemo(
    () => buildMappedModulePermissions(modulePermission),
    [modulePermission.length],
  )
  const initialMappedModulePermissionsWithID: PermissionsFormValuesExtended =
    useMemo(
      () => buildMappedModulePermissions(modulePermission, true),
      [modulePermission.length],
    )

  const {
    watch,
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<CompletePermissionsFormValues>({
    mode: 'onChange',
    defaultValues: {
      initialMappedModulePermissionsWithID,
      userID,
      ...MappedModulePermissions,
    },
  })

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(onSubmit)(e)
    e.preventDefault()
  }

  const { data: PermissionsTableStructure } = useGetEntity(
    'users/managepermissionstable',
  )

  return (
    <CardContainer>
      <VisibleCard>
        <IconContainer>
          <Image
            alt="learning-card-image"
            src={avatar || DEFAULT_AVATAR}
            width={60}
            height={60}
          />
        </IconContainer>
        <InfoContainer>
          <header>
            <UserNameHeader>
              <FragmentText variant="bodyRegular">{name}</FragmentText>
              <FragmentText color={colors.neutrals.x600} variant="bodySmall">
                {jobTitle?.name}
              </FragmentText>
            </UserNameHeader>
            <Subtitle variant="bodySmall">{email}</Subtitle>
          </header>
          <StyledExpander
            onClick={() => {
              setEditingExpanded(!editingExpanded)
              if (!editingExpanded) reset()
            }}
          >
            {editingExpanded ? 'CANCEL' : 'EDIT'}
          </StyledExpander>
        </InfoContainer>
      </VisibleCard>
      <AnimatePresence initial={false}>
        <AnimatedContentToggle
          isExpanded={editingExpanded}
          initialHeight="0px"
          transition={{
            type: 'spring',
            stiffness: 100,
          }}
        >
          {editingExpanded && (
            <EditPermissionsFormContainer
              id={`edit-permissions-form-${email}`}
              onSubmit={handleFormSubmit}
              noValidate
            >
              {PermissionsTableStructure && (
                <PermissionsTable
                  control={control}
                  watch={watch}
                  PermissionsTableStructure={PermissionsTableStructure}
                />
              )}
              <FragmentButton color="primary" type="submit" disabled={!isDirty}>
                Save changes
              </FragmentButton>
            </EditPermissionsFormContainer>
          )}
        </AnimatedContentToggle>
      </AnimatePresence>
    </CardContainer>
  )
}

const UserListItemSkeleton = () => (
  <>
    <CardContainer direction={'row'}>
      <IconContainer>
        <IconSkeleton />
      </IconContainer>
      <InfoContainer>
        <header>
          <FragmentSkeleton width={120} height={20} />
          <FragmentSkeleton width={80} />
          <FragmentSkeleton width={80} />
        </header>
      </InfoContainer>
    </CardContainer>
  </>
)

UserListItem.Skeleton = UserListItemSkeleton

export default UserListItem
