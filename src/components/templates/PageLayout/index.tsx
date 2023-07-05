import Head from 'next/head'

import LinearProgress from '@components/atoms/LinearProgress'
import ProtectedRoute from '@components/atoms/ProtectedRoute'

import { IProps } from './types'

const PageLayout = ({ children, pageTitle }: IProps) => {
  const title = `Intranet Distillery: ${pageTitle}`
  return (
    <ProtectedRoute noSessionComponent={<LinearProgress />}>
      <>
        <Head>
          <title>{title}</title>
        </Head>
        {children}
      </>
    </ProtectedRoute>
  )
}

export default PageLayout
