import { DynamoDB } from "aws-sdk";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { Table } from "sst/node/table";

const dynamoDb = new DynamoDB.DocumentClient();

export const main: APIGatewayProxyHandlerV2 = async (event) => {
    const params = {
        // Get the table name from the environment variable
        TableName: Table.Notes.tableName,
        // Get the row where the noteId is the one in the path
        Key: {
            userId: "123",
            noteId: event.pathParameters.id,
        },
    };

    const results = await dynamoDb.get(params).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(results.Item),
    };
};
