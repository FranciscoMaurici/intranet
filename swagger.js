/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')

// Clean the .openapi folder if exists
if (fs.existsSync(path.join(__dirname, '.openapi'))) {
  fs.rmSync(path.join(__dirname, '.openapi'), { recursive: true })
}

fs.mkdirSync(path.join(__dirname, '.openapi'), { recursive: true })

// Get the ts definition from @prisma/client.
let data = fs.readFileSync(
  path.join(__dirname, 'node_modules/.prisma/client/index.d.ts'),
  'utf-8',
)

// Remove the first 13 lines and everything after "export class PrismaClient"
let lines = data.split('\n')
let prismaClientStartIndex = lines.findIndex(line =>
  line.includes('export class PrismaClient'),
)
lines = lines.slice(13, prismaClientStartIndex)

// Convert lines back to a single string
data = lines.join('\n')

// Replace "type" with "interface" and "= {" with "{"
data = data.replace(/type/g, 'interface')
data = data.replace(/= \{/g, '{')

fs.writeFileSync(path.join(__dirname, '.openapi/alltypes.ts'), data, 'utf-8')

// Concat all the ts files in src/types directory
let typesDirFiles = fs.readdirSync(path.join(__dirname, 'src/types'))

typesDirFiles.forEach(file => {
  if (file.endsWith('.ts')) {
    let fileData = fs.readFileSync(
      path.join(__dirname, 'src/types', file),
      'utf-8',
    )
    fileData = fileData.replace(/import[^]+?\n\n/gs, '') // Remove all import lines, including multi-line imports
    fileData = fileData.replace(/^export \*.*/gm, '') // Remove all export * lines
    fs.appendFileSync(
      path.join(__dirname, '.openapi/alltypes.ts'),
      fileData,
      'utf-8',
    )
  }
})
