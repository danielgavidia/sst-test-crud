import { Api, StackContext, Table } from "sst/constructs";

export function ExampleStack({ stack }: StackContext) {
    // create a table
    const table = new Table(stack, "Notes", {
        fields: {
            userId: "string",
            noteId: "string",
        },
        primaryIndex: {
            partitionKey: "userId",
            sortKey: "noteId",
        },
    });

    // create an API
    const api = new Api(stack, "Api", {
        defaults: {
            function: {
                // bind the table name to our API
                bind: [table],
            },
        },
        routes: {
            "GET    /notes": "packages/functions/src/list.main",
            "POST   /notes": "packages/functions/src/create.main",
            "GET    /notes/{id}": "packages/functions/src/get.main",
            "PUT    /notes/{id}": "packages/functions/src/update.main",
            "DELETE /notes/{id}": "packages/functions/src/delete.main",
        },
    });

    // show the API endpoint in the output
    stack.addOutputs({ ApiEndpoint: api.url });
}
