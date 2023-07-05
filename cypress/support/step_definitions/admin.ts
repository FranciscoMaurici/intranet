import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor'

interface TableMap {
  rawTable: string[]
}

Given(
  'the user {string} who needs to log into the Intranet',
  (user: string) => {
    cy.visit('/api/auth/signin?csrf=true')
    cy.fixture('roles.json').then(users => {
      const { email, password } = users[user]

      cy.get('input[name="email"]').type(email)
      cy.get('input[name="password"]').type(password)
      cy.get('button[type="submit"]')
        .contains('Sign in with Credentials')
        .click()
    })
  },
)

When(
  'redirects to the {string} the relative path should be {string}',
  (section: string, relativePath: string) => {
    const baseUrl = Cypress.config('baseUrl')

    cy.url().should('eql', baseUrl + relativePath)
  },
)

Then('the menu should display next items', (tableMap: TableMap) => {
  tableMap.rawTable.map(([section, associatedRelativePath]) => {
    cy.get('p').contains(section).click()
    cy.url().should('include', associatedRelativePath)
  })
})
