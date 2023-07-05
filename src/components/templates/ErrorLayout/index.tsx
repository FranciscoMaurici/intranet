import Button from '@mui/material/Button'
import Image from 'next/image'

import {
  ContentContainer,
  ImageContainer,
  PageTitle,
} from '@components/templates/ErrorLayout/styles'
import IProps from '@components/templates/ErrorLayout/types'

import FragmentText from '@/components/atoms/FragmentText'

const CustomErrorPage = ({
  title,
  description,
  imageSrc,
  primaryActionText,
  onClick = () => null,
}: IProps): JSX.Element => (
  <ContentContainer>
    <div>
      {imageSrc && (
        <ImageContainer>
          <Image alt="error-image" src={imageSrc} width="570" height="380" />
        </ImageContainer>
      )}
      <PageTitle>{title}</PageTitle>
      <FragmentText>{description}</FragmentText>
      <div>
        <Button variant="contained" color="primary" onClick={onClick}>
          &larr; {primaryActionText}
        </Button>
      </div>
    </div>
  </ContentContainer>
)

export default CustomErrorPage
