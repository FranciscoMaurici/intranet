/* eslint-disable no-console */
const delayTime = 50 * 1000

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function evaluateCI() {
  if (process.env.DOCKER_INSTANCE == 'true') {
    console.log(`Starting waiting for ${delayTime} milliseconds to complete the mysql first setup steps`)
    await delay(delayTime)
  }
}

evaluateCI()
  .then()
  .catch(error => console.error(error))
