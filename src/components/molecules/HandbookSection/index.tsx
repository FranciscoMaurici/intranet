import { StyledContent } from './styles'
import { IPROPS } from './types'

import FragmentSkeleton from '@/components/atoms/FragmentSkeleton'
import FragmentText from '@/components/atoms/FragmentText'

const HandbookSection = ({
  title,
  content,
  titleVariant = 'headingRegular',
}: IPROPS) => (
  <>
    <FragmentText variant={titleVariant}>{title}</FragmentText>
    <StyledContent
      $isContentExpanded
      $isDashboard={false}
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  </>
)

const HandbookSectionSkeleton = () => (
  <div>
    <FragmentSkeleton width={'30%'} height={40} />
    <FragmentSkeleton width={'60%'} />
    <FragmentSkeleton width={'60%'} />
    <FragmentSkeleton width={'60%'} />
  </div>
)

HandbookSection.Skeleton = HandbookSectionSkeleton

export default HandbookSection
