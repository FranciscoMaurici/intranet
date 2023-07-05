import { signIn } from 'next-auth/react'

import { DistilleryLogo } from '../SideMenu/styles'

import {
  Container,
  DistilleryLogoContainer,
  GoogleLoginButton,
  Headline,
  LoginImage,
  SideLogin,
  SideLoginContentContainer,
  Subheadline,
} from './styles'
import { IProps } from './types'

const Login = ({ callbackUrl }: IProps) => (
  <Container>
    <SideLogin>
      <SideLoginContentContainer>
        <DistilleryLogoContainer>
          <DistilleryLogo />
        </DistilleryLogoContainer>
        <Headline>
          Welcome, <br />
          to your <span>intranet</span>
        </Headline>
        <Subheadline>Sign in using your Distillery account</Subheadline>
        <GoogleLoginButton
          onClick={() => {
            signIn('google', { callbackUrl })
          }}
        >
          <i />
          <span>Sign in with Google</span>
        </GoogleLoginButton>
      </SideLoginContentContainer>
    </SideLogin>
    <LoginImage />
  </Container>
)

export default Login
export type { IProps }
