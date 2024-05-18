import {
  SQSClient,
  SQSClientConfig,
  SendMessageCommand,
  SendMessageCommandOutput,
  ReceiveMessageCommand,
  ReceiveMessageCommandOutput,
  DeleteMessageCommand,
  DeleteMessageCommandOutput
} from '@aws-sdk/client-sqs'
import { Logger } from '../../logger/logger'

export class SQS {
  private readonly client: SQSClient

  constructor(config?: SQSClientConfig) {
    this.client = new SQSClient(config ? config : {})
  }

  async sendMessage(
    queueUrl: string,
    messageBody: string
  ): Promise<SendMessageCommandOutput> {
    try {
      const command = new SendMessageCommand({
        QueueUrl: queueUrl,
        MessageBody: messageBody
      })
      return await this.client.send(command)
    } catch (error) {
      Logger.error('Error sending message to SQS queue:', error)
      throw error
    }
  }

  async receiveMessages(
    queueUrl: string,
    maxNumberOfMessages: number = 1
  ): Promise<ReceiveMessageCommandOutput> {
    try {
      const command = new ReceiveMessageCommand({
        QueueUrl: queueUrl,
        MaxNumberOfMessages: maxNumberOfMessages
      })
      return await this.client.send(command)
    } catch (error) {
      Logger.error('Error receiving messages from SQS queue:', error)
      throw error
    }
  }

  async deleteMessage(
    queueUrl: string,
    receiptHandle: string
  ): Promise<DeleteMessageCommandOutput> {
    try {
      const command = new DeleteMessageCommand({
        QueueUrl: queueUrl,
        ReceiptHandle: receiptHandle
      })
      return await this.client.send(command)
    } catch (error) {
      Logger.error('Error deleting message from SQS queue:', error)
      throw error
    }
  }
}
