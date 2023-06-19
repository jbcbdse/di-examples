import { MongoClient } from "mongodb";
import { TConfig } from "./config";

let client: MongoClient;
export default function getConnection(config: TConfig): MongoClient {
  if(!client) {
    client = new MongoClient(config.connectionString);
  }
  return client;
}

