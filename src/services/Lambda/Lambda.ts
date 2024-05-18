import {
  LambdaClient,
  LambdaClientConfig,
  InvokeCommand,
  InvokeCommandOutput
} from '@aws-sdk/client-lambda'
import { Logger } from '../../logger/logger'

export class Lambda {
  private readonly client: LambdaClient

  constructor(lambdaFunctionName: string, config?: LambdaClientConfig) {
    this.client = new LambdaClient(config ? config : {})
  }

  async invoke(
    functionName: string,
    payload: Record<string, any>
  ): Promise<InvokeCommandOutput> {
    try {
      const command = new InvokeCommand({
        FunctionName: functionName,
        Payload: new TextEncoder().encode(JSON.stringify(payload))
      })
      return await this.client.send(command)
    } catch (error) {
      Logger.error('Error invoking Lambda function:', error)
      throw error
    }
  }
}
