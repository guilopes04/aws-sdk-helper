# AWS SDK Services Helper


Este pacote vai te ajudar a se conectar com os serviços da AWS de forma mais fácil e rápida, 
sem precisar se preocupar com documentação e quais os parâmetros necessários para funcionar.


Detalhes: esse projeto foi implementado utilizando typescript e versão v3 do SDK da AWS.


# Serviços

<details>
<summary>DynamoDB</summary>

<!-- Add method details here -->

### DynamoDB

**Parameters**: `tableName: string, config?: DynamoDBClientConfig`

<details>
<summary>getItem</summary>

**Parameters**: `key: Record<string, any>`

**Return Type**: `Promise<GetCommandOutput>`



</details>

<details>
<summary>putItem</summary>

**Parameters**: `item: Record<string, any>`

**Return Type**: `Promise<PutCommandOutput>`



</details>

<details>
<summary>query</summary>

**Parameters**: `indexName: string, indexQueryParams: Record<string, any>`

**Return Type**: `Promise<QueryCommandOutput>`



</details>

<details>
<summary>updateItem</summary>

**Parameters**: `key: Record<string, any>, item: Record<string, any>`

**Return Type**: `Promise<UpdateCommandOutput>`



</details>

<details>
<summary>deleteItem</summary>

**Parameters**: `key: Record<string, any>`

**Return Type**: `Promise<DeleteCommandOutput>`



</details>

<details>
<summary>scan</summary>

**Parameters**: ``

**Return Type**: `Promise<ScanCommandOutput>`



</details>

</details>


 -------------------------------------------------- 

<details>
<summary>Lambda</summary>

<!-- Add method details here -->

### Lambda

**Parameters**: `lambdaFunctionName: string, config?: LambdaClientConfig`

<details>
<summary>invoke</summary>

**Parameters**: `functionName: string, payload: Record<string, any>`

**Return Type**: `Promise<InvokeCommandOutput>`



</details>

</details>


 -------------------------------------------------- 

<details>
<summary>SNS</summary>

<!-- Add method details here -->

### SNS

**Parameters**: `config?: SNSClientConfig`

<details>
<summary>publish</summary>

**Parameters**: `topicArn: string, message: string`

**Return Type**: `Promise<PublishCommandOutput>`



</details>

</details>


 -------------------------------------------------- 

<details>
<summary>SQS</summary>

<!-- Add method details here -->

### SQS

**Parameters**: `config?: SQSClientConfig`

<details>
<summary>sendMessage</summary>

**Parameters**: `queueUrl: string, messageBody: string`

**Return Type**: `Promise<SendMessageCommandOutput>`



</details>

<details>
<summary>receiveMessages</summary>

**Parameters**: `queueUrl: string, maxNumberOfMessages: number = 1`

**Return Type**: `Promise<ReceiveMessageCommandOutput>`



</details>

<details>
<summary>deleteMessage</summary>

**Parameters**: `queueUrl: string, receiptHandle: string`

**Return Type**: `Promise<DeleteMessageCommandOutput>`



</details>

</details>


 -------------------------------------------------- 

