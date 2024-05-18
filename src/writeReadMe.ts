import fs from 'fs'
import path from 'path'
import ts from 'typescript'

const servicesPath = 'src/services'

interface Resource {
  name: string
  parameters: string
  methods: { name: string; description: string }[]
}

function generateReadMe() {
  const folders = fs
    .readdirSync(servicesPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory() && dirent.name !== 'AWSServices')
    .map((dirent) => dirent.name)

  let readmeContent = `# AWS SDK Services Helper\n\n
Este pacote vai te ajudar a se conectar com os serviços da AWS de forma mais fácil e rápida, 
sem precisar se preocupar com documentação e quais os parâmetros necessários para funcionar.\n\n
Detalhes: esse projeto foi implementado utilizando typescript e versão v3 do SDK da AWS.\n\n
# Serviços\n\n`

  const resources: Resource[] = []

  folders.forEach((folder) => {
    const folderPath = path.join(servicesPath, folder)
    const files = fs.readdirSync(folderPath)

    files.forEach((file) => {
      const filePath = path.join(folderPath, file)
      const fileContent = fs.readFileSync(filePath, 'utf-8')

      const sourceFile = ts.createSourceFile(
        filePath,
        fileContent,
        ts.ScriptTarget.Latest,
        true
      )

      const classDeclarations = sourceFile.statements.filter(
        (statement) =>
          ts.isClassDeclaration(statement) &&
          !statement.modifiers?.some(
            (modifier) => modifier.kind === ts.SyntaxKind.AbstractKeyword
          )
      )

      classDeclarations.forEach((classDeclaration: any) => {
        const className = classDeclaration.name?.getText()
        const classParameters = classDeclaration.members
          .filter(
            (member: ts.Node) =>
              ts.isConstructorDeclaration(member) &&
              member.parameters.length > 0
          )
          .map((constructor: { parameters: any[] }) =>
            constructor.parameters
              .map((parameter: { getText: () => any }) => parameter.getText())
              .join(', ')
          )
          .join(', ')

        if (className) {
          const resource: Resource = {
            name: className.replace('Resource', ''),
            parameters: classParameters,
            methods: []
          }

          classDeclaration.members
            .filter((member: ts.Node) => ts.isMethodDeclaration(member))
            .forEach(
              (method: {
                type: any
                parameters: any
                name: { getText: () => any }
              }) => {
                const methodName = method.name?.getText()
                if (methodName) {
                  const methodParameters = method.parameters
                    .map((parameter: { getText: () => any }) =>
                      parameter.getText()
                    )
                    .join(', ')
                  const methodReturnType = method.type?.getText() || 'void'

                  const methodDescription = `**Parameters**: \`${methodParameters}\`\n\n**Return Type**: \`${methodReturnType}\`\n\n`

                  resource.methods.push({
                    name: methodName,
                    description: methodDescription
                  })
                }
              }
            )

          resources.push(resource)
        }
      })
    })
  })

  resources.forEach((resource) => {
    readmeContent += `<details>\n`
    readmeContent += `<summary>${resource.name}</summary>\n\n`
    readmeContent += `<!-- Add method details here -->\n\n`

    readmeContent += `### ${resource.name}\n\n`
    readmeContent += `**Parameters**: \`${resource.parameters}\`\n\n`

    resource.methods.forEach((method) => {
      readmeContent += `<details>\n`
      readmeContent += `<summary>${method.name}</summary>\n\n`
      readmeContent += `${method.description}\n\n`
      readmeContent += `</details>\n\n`
    })
    readmeContent += `</details>\n\n`

    readmeContent +=
      '\n -------------------------------------------------- \n\n'
  })

  fs.writeFileSync('README.md', readmeContent)
}

generateReadMe()
