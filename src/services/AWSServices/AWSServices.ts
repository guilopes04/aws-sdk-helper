import { Logger } from '../../logger/logger'

interface AWSServiceClient {
  send: (command: any) => Promise<any>
}

type ClientType<T> = T & AWSServiceClient

interface AWSServiceType<T> {
  readonly client: ClientType<T>
  execute<U>(command: any): Promise<U>
}

export abstract class AWSService<T> implements AWSServiceType<T> {
  readonly client: ClientType<T>

  constructor(client: ClientType<T>) {
    this.client = client
  }

  async execute<U>(command: any): Promise<U> {
    try {
      return await this.client.send(command)
    } catch (error) {
      Logger.error('Error executing command:', error)
      throw error
    }
  }
}
