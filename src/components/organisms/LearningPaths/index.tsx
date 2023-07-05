import { CardsContainer } from './styles'

import LearningCard from '@/components/molecules/LearningCard'
import { useGetEntity } from '@/utils/hooks/useEntity'

const LearningPaths = () => {
  const { isLoading, data: learningPaths } = useGetEntity('learning-paths')
  return (
    <CardsContainer>
      {isLoading ? (
        <>
          <LearningCard.Skeleton />
          <LearningCard.Skeleton />
          <LearningCard.Skeleton />
        </>
      ) : (
        learningPaths.map(department => (
          <LearningCard key={department.id} department={department} />
        ))
      )}
    </CardsContainer>
  )
}

export default LearningPaths
