import {
  SQSClient,
  SQSClientConfig,
  SendMessageCommand,
  SendMessageCommandOutput,
  ReceiveMessageCommand,
  ReceiveMessageCommandOutput,
  DeleteMessageCommand,
  DeleteMessageCommandOutput,
  SendMessageBatchCommand
} from '@aws-sdk/client-sqs'
import { AWSService } from '../AWSServices/AWSServices'

interface SQSType {
  sendMessage: (messageBody: string) => Promise<SendMessageCommandOutput>
  receiveMessages: (
    maxNumberOfMessages?: number
  ) => Promise<ReceiveMessageCommandOutput>
  deleteMessage: (receiptHandle: string) => Promise<DeleteMessageCommandOutput>
  sendMessageBatch: (
    messages: Record<string, any>[]
  ) => Promise<SendMessageCommandOutput>
}
export class SQS extends AWSService<SQSClient> implements SQSType {
  readonly queueUrl: string
  constructor(queueUrl: string, config?: SQSClientConfig) {
    super(new SQSClient(config ? config : {}))
    this.queueUrl = queueUrl
  }

  async sendMessage(messageBody: string): Promise<SendMessageCommandOutput> {
    return await this.client.send(
      new SendMessageCommand({
        QueueUrl: this.queueUrl,
        MessageBody: messageBody
      })
    )
  }

  async sendMessageBatch(
    messages: Record<string, any>[]
  ): Promise<SendMessageCommandOutput> {
    return await this.client.send(
      new SendMessageBatchCommand({
        QueueUrl: this.queueUrl,
        Entries: messages.map((message, index) => ({
          Id: `message${index}`,
          MessageBody: JSON.stringify(message)
        }))
      })
    )
  }

  async receiveMessages(
    maxNumberOfMessages: number = 1
  ): Promise<ReceiveMessageCommandOutput> {
    return await this.client.send(
      new ReceiveMessageCommand({
        QueueUrl: this.queueUrl,
        MaxNumberOfMessages: maxNumberOfMessages
      })
    )
  }

  async deleteMessage(
    receiptHandle: string
  ): Promise<DeleteMessageCommandOutput> {
    return await this.client.send(
      new DeleteMessageCommand({
        QueueUrl: this.queueUrl,
        ReceiptHandle: receiptHandle
      })
    )
  }
}
