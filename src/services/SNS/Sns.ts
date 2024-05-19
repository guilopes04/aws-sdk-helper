import {
  SNSClient,
  SNSClientConfig,
  PublishCommand,
  PublishCommandOutput,
  PublishBatchCommand,
  PublishBatchRequestEntry,
  PublishCommandInput
} from '@aws-sdk/client-sns'
import { AWSService } from '../AWSServices/AWSServices'

interface SNSType {
  readonly topicArn: string
  publish: (message: string) => Promise<PublishCommandOutput>
  publishBatch: (
    messages: PublishBatchRequestEntry[]
  ) => Promise<PublishCommandOutput>
  sendSMS: (
    phoneNumber: string,
    message: string
  ) => Promise<PublishCommandOutput>
  publishCommand: (
    command: PublishCommandInput
  ) => Promise<PublishCommandOutput>
}

export class SNS extends AWSService<SNSClient> implements SNSType {
  readonly topicArn: string

  constructor(topicArn?: string, config?: SNSClientConfig) {
    super(new SNSClient(config ? config : {}))
    this.topicArn = topicArn ?? ''
  }

  async publish(message: string): Promise<PublishCommandOutput> {
    return await this.client.send(
      new PublishCommand({
        TopicArn: this.topicArn,
        Message: message
      })
    )
  }

  async publishBatch(
    messages: PublishBatchRequestEntry[]
  ): Promise<PublishCommandOutput> {
    return await this.client.send(
      new PublishBatchCommand({
        TopicArn: this.topicArn,
        PublishBatchRequestEntries: messages
      })
    )
  }

  async sendSMS(
    phoneNumber: string,
    message: string
  ): Promise<PublishCommandOutput> {
    return await this.client.send(
      new PublishCommand({
        PhoneNumber: phoneNumber,
        Message: message
      })
    )
  }

  async publishCommand(
    command: PublishCommandInput
  ): Promise<PublishCommandOutput> {
    return await this.client.send(new PublishCommand(command))
  }
}
