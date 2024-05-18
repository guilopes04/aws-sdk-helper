import fs from 'fs'
import path from 'path'
import ts from 'typescript'

const servicesPath = 'src/services'

function generateReadMe() {
  const folders = fs
    .readdirSync(servicesPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory() && dirent.name !== 'AWSServices')
    .map((dirent) => dirent.name)

  let readmeContent = `# AWS SDK Services Helper\n\n
Este pacote vai te ajudar a se conectar com os serviços da AWS de forma mais fácil e rápida, 
sem precisar se preocupar com documentação e quais os parâmetros necessários para funcionar.\n\n
# Serviços\n\n`

  folders.forEach((folder) => {
    const folderPath = path.join(servicesPath, folder)
    const files = fs.readdirSync(folderPath)

    readmeContent += `## ${folder}\n\n`

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
          readmeContent += `### ${className}\n\n`
          readmeContent += `**Parameters**: ${classParameters}\n\n`

          classDeclaration.members
            .filter((member: ts.Node) => ts.isMethodDeclaration(member))
            .forEach((method: { name: { getText: () => any } }) => {
              const methodName = method.name?.getText()
              if (methodName) {
                readmeContent += `#### ${methodName}\n\n`
              }
            })
          readmeContent += '\n'
        }
      })
    })
  })

  fs.writeFileSync('README.md', readmeContent)
}

generateReadMe()
