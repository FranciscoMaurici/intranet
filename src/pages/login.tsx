import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import { Login } from '@components'
import FullscreenLoading from '@components/molecules/FullscreenLoading'

const IndexPage: NextPage = () => {
  const router = useRouter()
  const { status } = useSession()

  if (status === 'loading')
    return (
      <FullscreenLoading
        subTitle="Please wait while we redirect you..."
        imgSrc="/images/svg/spinner.svg"
      />
    )

  if (status === 'unauthenticated')
    return (
      <>
        <Head>
          <title>Intranet Distillery: Login</title>
        </Head>
        <Login callbackUrl={router.query.callbackUrl as string} />
      </>
    )

  router.push('/')
}

export default IndexPage
