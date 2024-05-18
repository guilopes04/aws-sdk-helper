# AWS SDK Services Helper


Este pacote vai te ajudar a se conectar com os serviços da AWS de forma mais fácil e rápida, 
sem precisar se preocupar com documentação e quais os parâmetros necessários para funcionar.


# Serviços

## DynamoDB

**Parameters**: tableName: string, config?: DynamoDBClientConfig

#### getItem

#### putItem

#### query

#### updateItem

#### deleteItem

#### scan

## Lambda

**Parameters**: lambdaFunctionName: string, config?: LambdaClientConfig

#### invoke

## SNS

**Parameters**: config?: SNSClientConfig

#### publish

## SQS

**Parameters**: config?: SQSClientConfig

#### sendMessage

#### receiveMessages

#### deleteMessage

