import { useEffect } from 'react'
import Router from 'next/router'

const DefaultMessage = 'You have unsaved changes. Do you really want to leave?'
export const useOnLeavePageConfirmation = ({
  preventNavigation = false,
  reloadMessage = DefaultMessage,
  navigateAwayMessage = DefaultMessage,
}) => {
  useEffect(() => {
    // For reloading.
    window.onbeforeunload = () => {
      if (preventNavigation) return reloadMessage
    }

    // For changing in-app route.
    if (preventNavigation) {
      const routeChangeStart = () => {
        const ok = confirm(navigateAwayMessage)
        if (!ok) {
          Router.events.emit('routeChangeError')
          throw 'Aborted route change.'
        }
      }

      Router.events.on('routeChangeStart', routeChangeStart)
      return () => {
        Router.events.off('routeChangeStart', routeChangeStart)
      }
    }
  }, [preventNavigation])
}
