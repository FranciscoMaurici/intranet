import { useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import TagManager from 'react-gtm-module'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Session } from 'next-auth'
import { SessionProvider, signOut, useSession } from 'next-auth/react'

import { FragmentSnackbar, LinearProgress } from '@components'
import FragmentLoadingOverlay from '@components/atoms/FragmentLoadingOverlay'
import SEO from '@components/atoms/SEO'
import { Container } from '@components/organisms/Login/styles'
import ErrorLayout from '@components/templates/ErrorLayout'
import Layout from '@components/templates/Layout'
import { selectUser, userFetched } from '@slices/userSlice'
import { getCallbackUrl } from '@utils'

import store from '../redux/store'
import GlobalStyle from '../theme/GlobalStyle'

import { useAppSelector } from '@/redux/hooks'
import { MessagesProvider, useMessages } from '@/utils/hooks/useMessages'

const tagManagerArgs = {
  gtmId: process.env.NEXT_PUBLIC_GOOGLE_GTM,
}
const queryClient = new QueryClient()

const App = ({
  Component,
  pageProps,
}: AppProps<{
  session: Session
}>) => {
  const Loading = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
      //Google Tag Manager
      TagManager.initialize(tagManagerArgs)

      const handleStart = (url: string) => {
        if (url.includes('benefits')) return
        url !== router.asPath && setLoading(true)
      }
      const handleComplete = url => url === router.asPath && setLoading(false)

      router.events.on('routeChangeStart', handleStart)
      router.events.on('routeChangeComplete', handleComplete)
      router.events.on('routeChangeError', handleComplete)

      return () => {
        router.events.off('routeChangeStart', handleStart)
        router.events.off('routeChangeComplete', handleComplete)
        router.events.off('routeChangeError', handleComplete)
      }
    }, [])

    return loading && <LinearProgress />
  }

  const MainComponent = () => {
    const { showOverlay, message } = useAppSelector(store => store.app)
    const { data: session, status } = useSession()
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const router = useRouter()
    const WHITELIST_ROUTES = ['/login-qa']

    const { addMessage } = useMessages()
    useEffect(() => addMessage(message), [message])

    useEffect(() => {
      // Skip redirection for QA accounts (E2E tests)
      if (WHITELIST_ROUTES.includes(router.pathname)) return

      if (status === 'authenticated' && user.email === '') {
        dispatch(userFetched(session.user))
      } else if (status === 'unauthenticated' && router.pathname !== '/login') {
        router.push(
          {
            pathname: '/login',
            query: { callbackUrl: getCallbackUrl(router.asPath) },
          },
          '/login',
        )
      }
    }, [status, user])

    if (session) {
      return (
        <Layout>
          <Loading />
          {showOverlay && <FragmentLoadingOverlay />}
          <Component {...pageProps} />
        </Layout>
      )
    }
    return (
      <Container>
        <Loading />
        <Component {...pageProps} />
      </Container>
    )
  }

  return (
    <ErrorBoundary
      fallbackRender={() => (
        <>
          <SEO
            title="An error has occurred"
            description="An error has occurred and the application can't continue. Please try again later, or contact an administrator if the problem persists."
          />
          <ErrorLayout
            title="An error has occurred"
            description={
              "An error has occurred and the application can't continue. Please try again later, or contact an administrator if the problem persists."
            }
            imageSrc="/images/svg/500.svg"
            primaryActionText="Return to dashboard"
            onClick={() => {
              signOut({ redirect: true, callbackUrl: '/login' })
            }}
          />
        </>
      )}
    >
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={pageProps.session}>
          <Provider store={store}>
            <MessagesProvider>
              <FragmentSnackbar />
              <GlobalStyle />
              <MainComponent />
            </MessagesProvider>
          </Provider>
        </SessionProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App
