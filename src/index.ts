import { DynamoDBClientConfig } from '@aws-sdk/client-dynamodb'
import { DynamoDB } from './services/DynamoDB/DynamoDB'
import { timeStamp } from 'console'

// const config: DynamoDBClientConfig = {
//   region: 'us-east-1',
//   credentials: {
//     accessKeyId: 'AKIAQA2S5LV27U7C3766',
//     secretAccessKey: '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'
//   }
// }

const main = async () => {
  const repository = new DynamoDB('caronas')
  const response = await repository.scan()
  console.log('• response:', JSON.stringify(response))
}

main()
