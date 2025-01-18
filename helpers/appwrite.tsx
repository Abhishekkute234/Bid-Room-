import { Client, Account } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("678b3228002d30b7ae28");

const account = new Account(client);

export { account, client };
