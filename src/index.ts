import { DynamoDB } from './services/DynamoDB/DynamoDB'

const main = async () => {
  const repository = new DynamoDB('caronas')
  const response = await repository.scan()
  console.log('• response:', JSON.stringify(response))
}

main()
