import { Container } from '@mui/system'
import Image from 'next/image'
import Link from 'next/link'

import { SideMenu } from '@components'

import {
  BannerContainer,
  DecorationContainer,
  LayoutGrid,
  LayoutRoot,
  LogoContainer,
} from './styles'
import { IProps } from './types'

const Layout = ({ children }: IProps) => (
  <>
    <BannerContainer>
      <LogoContainer>
        <Link href="/" title="Go to home">
          <Image
            src="/images/headerBanner/Logo.svg"
            alt="header-logo"
            width="140"
            height="20"
            title="Go to home"
          />
        </Link>
      </LogoContainer>
      <DecorationContainer>
        <Image
          alt="header-banner"
          src="/images/headerBanner/banner.png"
          width="852"
          height="80"
        />
      </DecorationContainer>
    </BannerContainer>
    <LayoutRoot disableGutters maxWidth={false}>
      <div></div>
      <div></div>
      <Container disableGutters maxWidth={false}>
        <LayoutGrid>
          <SideMenu />
          <main>{children}</main>
        </LayoutGrid>
      </Container>
    </LayoutRoot>
  </>
)

export default Layout
