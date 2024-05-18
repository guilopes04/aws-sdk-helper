import {
  SNSClient,
  SNSClientConfig,
  PublishCommand,
  PublishCommandOutput
} from '@aws-sdk/client-sns'
import { Logger } from '../../logger/logger'

export class SNS {
  private readonly client: SNSClient

  constructor(config?: SNSClientConfig) {
    this.client = new SNSClient(config ? config : {})
  }

  async publish(
    topicArn: string,
    message: string
  ): Promise<PublishCommandOutput> {
    try {
      const command = new PublishCommand({
        TopicArn: topicArn,
        Message: message
      })
      return await this.client.send(command)
    } catch (error) {
      Logger.error('Error publishing message to SNS topic:', error)
      throw error
    }
  }
}
