import {
  defineStep as And,
  Then,
  When,
} from '@badeball/cypress-cucumber-preprocessor'

interface TableMap {
  rawTable: string[]
}

When(
  'the user clicks on the input field with the placeholder {string}',
  (placeholder: string) => {
    cy.get(`input[placeholder="${placeholder}"]`).click()
  },
)

Then(
  'the system displays the modal title should display {string}',
  (title: string) => {
    cy.get('div[role="dialog"]').should('be.visible')
    cy.get(`[data-testid="${title}"]`).should('be.visible')
  },
)

And('the user type text on the modal {string}', (message: string) => {
  cy.get('.edit-mode').type(message)
})

Then('clicks on the icon {string}', (icon: string) => {
  cy.get(`span[aria-label="${icon}"] > button`).click()
})

Then('clicks the button with label {string}', (label: string) => {
  cy.get(`button[data-testid="${label}"]`).click()
})

Then(
  'fill the form modal section with the title {string}',
  (title: string, tableMap: TableMap) => {
    cy.get(`h2[data-testid="${title}"]`).should('be.visible')

    tableMap.rawTable.forEach(([label, value]) => {
      cy.get(`input[data-testid="${label}"]`).type(value)
    })
  },
)

Then('the system closes the modal window', () => {
  cy.get('div[role="dialog"]').should('not.exist')
})

And(
  'publish the new announcement with a message toast {string}',
  (message: string) => {
    cy.contains(message).should('be.visible')
  },
)
