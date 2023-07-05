import { useState } from 'react'
import Image from 'next/image'

import {
  BirthDayCardContainer,
  BirthDayCardContainerText,
  BirthDayCardFooter,
  BirthDayCardSubContainer,
  BirthDayHeaderContainer,
  BirthdayImageContainer,
  BoldInnerText,
} from './styles'
import { IProps } from './types'

import FragmentLink from '@/components/atoms/FragmentLink'
import FragmentSkeleton from '@/components/atoms/FragmentSkeleton'
import FragmentText from '@/components/atoms/FragmentText'
import CelebrationsModal from '@/components/molecules/CelebrationsModal'
import { colors } from '@/theme'
import { ICelebration, ICelebrationGetAllResponse } from '@/types'
import { getFormattedDateString } from '@/utils/dates'

const LoadingSkeleton = [...Array(3)].map((e, i) => (
  <FragmentSkeleton width={120} height={20} key={i} />
))

const getTodayCelebrations = (celebrations: ICelebrationGetAllResponse) => {
  if (!celebrations) return [[], []]
  const birthdaysArray = []
  const anniversariesArray = []
  celebrations[getFormattedDateString()].forEach(e =>
    e.type === 'birthday' ? birthdaysArray.push(e) : anniversariesArray.push(e),
  )

  return [birthdaysArray, anniversariesArray]
}

const getCelebrationNames = (array: ICelebration[]) => {
  const firstName = <BoldInnerText>{array[0].name}</BoldInnerText>
  if (array.length === 1) return firstName
  const secondName = <BoldInnerText>{array[1].name}</BoldInnerText>
  if (array.length === 2)
    return (
      <>
        {firstName} and {secondName}
      </>
    )
  return (
    <>
      {firstName} and {array.length - 1} more people
    </>
  )
}

const getCelebrationMsg = (array: ICelebration[]) => {
  const type = array[0].type
  const [singularType, pluralType] =
    type === 'anniversary' ? [type, 'anniversaries'] : [type, 'birthdays']
  return (
    <>
      {getCelebrationNames(array)}{' '}
      {array.length === 1 ? singularType : pluralType}
    </>
  )
}

const CelebrationsCard = ({ celebrations, isLoading }: IProps) => {
  const [birthdaysArray, anniversariesArray] =
    getTodayCelebrations(celebrations)
  const [areBirthdays, areAnniversaries] = [
    birthdaysArray.length > 0,
    anniversariesArray.length > 0,
  ]
  const noCelebrationsToday = !areAnniversaries && !areBirthdays
  const [celebrationsModalOpen, setCelebrationsModalOpen] = useState(false)

  const renderMessage = () => {
    if (noCelebrationsToday)
      return (
        <FragmentText>
          Today, there are no birthdays or anniversaries to celebrate.
        </FragmentText>
      )

    let innerMsg = null

    if (areBirthdays && areAnniversaries) {
      innerMsg = (
        <>
          {getCelebrationMsg(birthdaysArray)}. <br />
          Also, we celebrate {getCelebrationMsg(anniversariesArray)}
        </>
      )
    } else if (!areBirthdays && areAnniversaries) {
      innerMsg = getCelebrationMsg(anniversariesArray)
    } else if (areBirthdays && !areAnniversaries) {
      innerMsg = getCelebrationMsg(birthdaysArray)
    }

    return (
      <FragmentText color={colors.neutrals.x700}>
        We are celebrating {innerMsg} at Distillery.
      </FragmentText>
    )
  }

  return (
    <>
      <BirthDayHeaderContainer>
        <FragmentText color={colors.neutrals.x700} variant="bodySmallBold">
          Celebrations
        </FragmentText>
      </BirthDayHeaderContainer>

      <BirthDayCardContainer>
        <BirthDayCardSubContainer isLoading={isLoading}>
          <BirthdayImageContainer>
            <Image
              src={`/images/svg/cake.svg`}
              alt="benefit-card-icon"
              width={36}
              height={36}
            />
          </BirthdayImageContainer>
          <BirthDayCardContainerText>
            <>
              {isLoading ? LoadingSkeleton : renderMessage()}

              {!isLoading && (
                <BirthDayCardFooter>
                  <FragmentLink onClick={() => setCelebrationsModalOpen(true)}>
                    {noCelebrationsToday
                      ? 'UPCOMING CELEBRATIONS'
                      : 'MORE DETAILS'}
                  </FragmentLink>
                </BirthDayCardFooter>
              )}
            </>
          </BirthDayCardContainerText>
        </BirthDayCardSubContainer>
      </BirthDayCardContainer>
      {celebrationsModalOpen && (
        <CelebrationsModal
          celebrations={celebrations}
          onClose={() => setCelebrationsModalOpen(false)}
        />
      )}
    </>
  )
}

export default CelebrationsCard
