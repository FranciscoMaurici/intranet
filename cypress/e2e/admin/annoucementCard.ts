import { Then } from '@badeball/cypress-cucumber-preprocessor'

Then('click {string} from the last announcement', (menuItem: string) => {
  const selector =
    '[data-testid="announcements"] > div:nth-child(2) > div > div:nth-child(2) > div > button'
  const menuSelector = `[role="menu"] > [data-testid="${menuItem.toLowerCase()}"]`

  cy.get(selector).click()
  cy.get(menuSelector).click()
})
