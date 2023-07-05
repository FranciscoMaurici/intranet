import FragmentDialog from '@components/molecules/FragmentDialog'
import FragmentDialogActions from '@components/molecules/FragmentDialogActions'
import FragmentDialogContent from '@components/molecules/FragmentDialogContent'
import FragmentDialogTitle from '@components/molecules/FragmentDialogTitle'

import UserData from '../UserData'

import { ButtonTitle, Content, StyledButton, UserRowContainer } from './styles'
import { IProps } from './types'

import FragmentText from '@/components/atoms/FragmentText'
import { colors } from '@/theme'
import { ICelebration } from '@/types'
import { getFormattedDateString, getTomorrowDateDayjs } from '@/utils/dates'

function getOrdinalSuffixOf(i: number) {
  const j = i % 10,
    k = i % 100
  if (j == 1 && k != 11) {
    return i + 'st'
  }
  if (j == 2 && k != 12) {
    return i + 'nd'
  }
  if (j == 3 && k != 13) {
    return i + 'rd'
  }
  return i + 'th'
}

const UserRow = ({ celebration }: { celebration: ICelebration }) => {
  const { name, years_difference, avatar, type, job_title, avatar_file } =
    celebration

  let icon: string
  if (avatar) {
    icon = avatar
  } else if (avatar_file) {
    const base64Image = Buffer.from(avatar_file).toString('base64')
    icon = `data:image/png;base64,${base64Image}`
  } else {
    icon = '/images/avatar-fallback.png'
  }

  return (
    <UserRowContainer>
      <UserData
        text={name}
        nameFontSize="1em"
        nameFontWeight="700"
        icon={icon}
        role={job_title}
      >
        <>
          <FragmentText variant="bodyXSmall">
            {type === 'birthday'
              ? 'Birthday'
              : `${getOrdinalSuffixOf(years_difference)} Anniversary`}
          </FragmentText>
        </>
      </UserData>
    </UserRowContainer>
  )
}

const CelebrationsModal = ({ onClose, celebrations }: IProps) => {
  const [todayCelebrations, tomorrowCelebrations] = [
    celebrations[getFormattedDateString()],
    celebrations[getFormattedDateString(getTomorrowDateDayjs())],
  ]

  const [areCelebrationsToday, areCelebrationsTomorrow] = [
    todayCelebrations.length > 0,
    tomorrowCelebrations.length > 0,
  ]
  const noCelebrations = !areCelebrationsToday && !areCelebrationsTomorrow
  return (
    <>
      <FragmentDialog open onClose={onClose}>
        <FragmentDialogTitle onClose={onClose}>
          Birthdays & Anniversaries
        </FragmentDialogTitle>
        <FragmentDialogContent>
          <Content>
            {noCelebrations ? (
              <FragmentText>
                There are no upcoming birthdays or anniversaries today or
                tomorrow
              </FragmentText>
            ) : (
              <>
                {areCelebrationsToday && (
                  <div>
                    <FragmentText variant="subHeadingRegular">
                      TODAY
                    </FragmentText>
                    {todayCelebrations.map(celebration => (
                      <UserRow
                        celebration={celebration}
                        key={celebration.name}
                      />
                    ))}
                  </div>
                )}
                {areCelebrationsTomorrow && (
                  <div>
                    <FragmentText variant="subHeadingRegular">
                      TOMORROW
                    </FragmentText>
                    {tomorrowCelebrations.map(celebration => (
                      <UserRow
                        celebration={celebration}
                        key={celebration.name}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </Content>
        </FragmentDialogContent>
        <FragmentDialogActions>
          <StyledButton onClick={onClose}>
            <ButtonTitle color={colors.neutrals.x800} variant="bodySmallBold">
              CLOSE
            </ButtonTitle>
          </StyledButton>
        </FragmentDialogActions>
      </FragmentDialog>
    </>
  )
}

export default CelebrationsModal
export type { IProps }
