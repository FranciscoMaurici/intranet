import { useRouter } from 'next/router'

import SEO from '@components/atoms/SEO'
import CustomErrorPage from '@components/templates/ErrorLayout'

const PAGE_INFO = {
  title: '404 - Page Not Found',
  subTitle:
    "The page you're looking for does not exist, or has been moved permanently.",
}

const Custom404 = (): JSX.Element => {
  const router = useRouter()

  return (
    <>
      <SEO title={PAGE_INFO.title} description={PAGE_INFO.subTitle} />
      <CustomErrorPage
        title={PAGE_INFO.title}
        description={PAGE_INFO.subTitle}
        imageSrc="/images/svg/404.svg"
        primaryActionText="Return to dashboard"
        onClick={() => {
          router.push('/')
        }}
      />
    </>
  )
}

export default Custom404
