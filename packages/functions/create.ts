import * as uuid from "uuid";
import { DynamoDB } from "aws-sdk";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { Table } from "sst/node/table";

const dynamoDb = new DynamoDB.DocumentClient();

export const main: APIGatewayProxyHandlerV2 = async (event) => {
    const data = JSON.parse(event.body);

    const params = {
        // Get the table name from the environment variable
        TableName: Table.Notes.tableName,
        Item: {
            userId: "123",
            noteId: uuid.v1(),
            content: data.content,
            createdAt: Date.now(),
        },
    };

    await dynamoDb.put(params).promise();
    return {
        statusCode: 200,
        body: JSON.stringify(params.Item),
    };
};
