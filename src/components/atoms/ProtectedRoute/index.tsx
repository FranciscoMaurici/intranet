import Link from 'next/link'
import { useSession } from 'next-auth/react'

import LinearProgress from '@components/atoms/LinearProgress'

import { IProps } from './types'

const ProtectedRoute: React.FC<IProps> = ({
  children,
  noSessionComponent,
}: IProps) => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <LinearProgress />
  }
  if (!session || status === 'unauthenticated') {
    if (noSessionComponent) {
      return noSessionComponent
    } else {
      return (
        <div>
          <h1>We could&apos;t find the content</h1>
          <h4>Please log in and try again or contact the support team.</h4>
          <Link href="/">Go home!</Link>
        </div>
      )
    }
  } else {
    return children
  }
}

export default ProtectedRoute
export type { IProps }
