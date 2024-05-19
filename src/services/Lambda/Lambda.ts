import {
  LambdaClient,
  LambdaClientConfig,
  InvokeCommand,
  InvokeCommandOutput,
  InvocationType
} from '@aws-sdk/client-lambda'
import { AWSService } from '../AWSServices/AWSServices'

interface LambdaInvokeInputType {
  payload: Record<string, any>
  invocationType?: InvocationType
}

interface LambdaType {
  readonly functionName: string
  invoke: (input: LambdaInvokeInputType) => Promise<InvokeCommandOutput>
}

export class Lambda extends AWSService<LambdaClient> implements LambdaType {
  readonly functionName: string
  constructor(lambdaFunctionName: string, config?: LambdaClientConfig) {
    super(new LambdaClient(config ? config : {}))
    this.functionName = lambdaFunctionName
  }

  async invoke({
    payload,
    invocationType
  }: LambdaInvokeInputType): Promise<InvokeCommandOutput> {
    return await this.client.send(
      new InvokeCommand({
        FunctionName: this.functionName,
        Payload: new TextEncoder().encode(JSON.stringify(payload)),
        InvocationType: invocationType ? invocationType : 'RequestResponse'
      })
    )
  }
}
