import { DynamoDB } from './services/DynamoDB/DynamoDB'

const main = async () => {
  const wireRepository = new DynamoDB('wire-table')
  const response = await wireRepository.getItem({ id: '1' })
  console.log(response)
}

main()
