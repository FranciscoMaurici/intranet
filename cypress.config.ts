import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor'
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild'
import createBundler from '@bahmutov/cypress-esbuild-preprocessor'
import { defineConfig } from 'cypress'

// Cucumber config
export async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions,
): Promise<Cypress.PluginConfigOptions> {
  await addCucumberPreprocessorPlugin(on, config)

  on(
    'file:preprocessor',
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    }),
  )

  // Make sure to return the config object as it might have been modified by the plugin.
  return config
}
// End Cucumber config

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    defaultCommandTimeout: 60000,
    viewportHeight: 1080,
    viewportWidth: 1920,
    // Cucumber config
    specPattern: '**/*.feature',
    supportFile: false,
    setupNodeEvents,
  },
})
