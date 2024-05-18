import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb'
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  QueryCommand,
  UpdateCommand,
  DeleteCommand,
  ScanCommand,
  GetCommandOutput,
  PutCommandOutput,
  QueryCommandOutput,
  UpdateCommandOutput,
  DeleteCommandOutput,
  ScanCommandOutput
} from '@aws-sdk/lib-dynamodb'
import { AWSService } from '../AWSServices/AWSServices'

interface DynamoDBType {
  readonly tableName: string
  getItem: (key: Record<string, any>) => Promise<GetCommandOutput>
  putItem: (item: Record<string, any>) => Promise<PutCommandOutput>
  query: (
    indexName: string,
    indexQueryParams: Record<string, any>
  ) => Promise<QueryCommandOutput>
  updateItem: (
    key: Record<string, any>,
    item: Record<string, any>
  ) => Promise<UpdateCommandOutput>
  deleteItem: (key: Record<string, any>) => Promise<DeleteCommandOutput>
  scan: () => Promise<ScanCommandOutput>
}

export class DynamoDB
  extends AWSService<DynamoDBDocumentClient>
  implements DynamoDBType
{
  readonly tableName: string

  constructor(tableName: string, config?: DynamoDBClientConfig) {
    super(DynamoDBDocumentClient.from(new DynamoDBClient(config ? config : {})))
    this.tableName = tableName
  }

  async getItem(key: Record<string, any>): Promise<GetCommandOutput> {
    return await this.execute(
      new GetCommand({
        TableName: this.tableName,
        Key: key
      })
    )
  }

  async putItem(item: Record<string, any>): Promise<PutCommandOutput> {
    return await this.execute(
      new PutCommand({
        TableName: this.tableName,
        Item: item
      })
    )
  }

  async query(
    indexName: string,
    indexQueryParams: Record<string, any>
  ): Promise<QueryCommandOutput> {
    const keyConditionExpression = Object.keys(indexQueryParams)
      .map((attribute) => `${attribute} = :${attribute}`)
      .join(' AND ')
    const expressionAttributeValues: Record<string, any> = Object.entries(
      indexQueryParams
    ).reduce((values: Record<string, any>, [attribute, value]) => {
      values[`:${attribute}`] = value
      return values
    }, {})
    return await this.execute(
      new QueryCommand({
        TableName: this.tableName,
        IndexName: indexName,
        KeyConditionExpression: keyConditionExpression,
        ExpressionAttributeValues: expressionAttributeValues
      })
    )
  }

  async updateItem(
    key: Record<string, any>,
    item: Record<string, any>
  ): Promise<UpdateCommandOutput> {
    const updateExpression =
      'SET ' +
      Object.keys(item)
        .map((attribute) => `${attribute} = :${attribute}`)
        .join(', ')
    const expressionAttributeValues: Record<string, any> = Object.entries(
      item
    ).reduce((values: Record<string, any>, [attribute, value]) => {
      values[`:${attribute}`] = value
      return values
    }, {})

    return await this.execute(
      new UpdateCommand({
        TableName: this.tableName,
        Key: key,
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: expressionAttributeValues
      })
    )
  }

  async deleteItem(key: Record<string, any>): Promise<DeleteCommandOutput> {
    return await this.execute(
      new DeleteCommand({
        TableName: this.tableName,
        Key: key
      })
    )
  }

  async scan(): Promise<ScanCommandOutput> {
    return await this.execute(
      new ScanCommand({
        TableName: this.tableName
      })
    )
  }
}
