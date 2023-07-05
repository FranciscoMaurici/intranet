// The eslint-disable comment below is necessary to override the render function of @testing-library/react and then export it without issues
/* eslint-disable import/export */
import { faker } from '@faker-js/faker'
import { render as rtlRender } from '@testing-library/react'
import { SessionProvider } from 'next-auth/react'

/**
 * @see {@link | https://testing-library.com/docs/react-testing-library/setup/}
 * @see {@link | https://testing-library.com/docs/react-testing-library/api/#render}
 * @param {React.ReactElement<any>} ui
 * @param {Object} renderOptions
 * @param {Object} wrapper
 * @param {String} route
 * @returns
 */
function render(ui, renderOptions = {}, route = null) {
  if (route) {
    window.history.pushState({}, 'Test Page', route)
  }

  return rtlRender(ui, renderOptions)
}

function standardUserSession(overrides = {}) {
  return {
    user: {
      image:
        'https://lh3.googleusercontent.com/a/AEdFTp6OapYcQae_m0RuBePyX8ttnyiezwm5Hs7Lqoaz=s96-c',
      name: 'Test User',
    },
    ...overrides,
  }
}

function renderWithSession(ui, objSession = {}) {
  const session = standardUserSession(objSession)

  return render(<SessionProvider session={session}>{ui}</SessionProvider>)
}

export * from '@testing-library/react'
export { render, renderWithSession, faker }
