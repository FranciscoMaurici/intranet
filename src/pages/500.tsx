import { signOut } from 'next-auth/react'

import SEO from '@components/atoms/SEO'
import CustomErrorPage from '@components/templates/ErrorLayout'

const PAGE_INFO = {
  title: 'An error has occurred',
  subTitle:
    "An error has occurred and the application can't continue. Please try again later, or contact an administrator if the problem persists.",
}

const Custom500 = (): JSX.Element => (
  <>
    <SEO title={PAGE_INFO.title} description={PAGE_INFO.subTitle} />
    <CustomErrorPage
      title={PAGE_INFO.title}
      description={PAGE_INFO.subTitle}
      imageSrc="/images/svg/404.svg"
      primaryActionText="Go Back"
      onClick={() => {
        signOut({ redirect: true, callbackUrl: '/login' })
      }}
    />
  </>
)

export default Custom500
