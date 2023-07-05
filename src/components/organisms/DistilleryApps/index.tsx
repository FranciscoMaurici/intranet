import Image from 'next/image'

import IntranetIconContainer from '@components/atoms/IntranetIconContainer'

import { distilleryApps } from './data'
import {
  DistilleryAppContainer,
  DistilleryAppsContainer,
  DistilleryAppsContent,
  DistilleryAppsDivider,
} from './styles'
import { DistilleryApp as DistilleryAppType } from './types'

import FragmentText from '@/components/atoms/FragmentText'
import { colors } from '@/theme'

const DistilleryApps = () => (
  <DistilleryAppsContainer>
    <FragmentText color={colors.neutrals.x700} variant="bodySmallBold">
      Useful Links
    </FragmentText>
    <DistilleryAppsContent>
      {distilleryApps.map(app => (
        <DistilleryApp key={app.url} {...app} />
      ))}
    </DistilleryAppsContent>
  </DistilleryAppsContainer>
)

const DistilleryApp = ({ name, icon, description, url }: DistilleryAppType) => (
  <>
    <DistilleryAppContainer>
      <IntranetIconContainer rightMargin={'1.15em'}>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          title={`Go to ${name}`}
        >
          <Image
            src={icon}
            width={24}
            height={name === 'ADP' ? 12 : 24}
            alt={name}
          />
        </a>
      </IntranetIconContainer>
      <div>
        <h3>{name}</h3>
        <p>{description}</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          title={`Go to ${name}`}
        >
          {`Go to ${name}`}
        </a>
      </div>
    </DistilleryAppContainer>
    <DistilleryAppsDivider />
  </>
)

export default DistilleryApps
