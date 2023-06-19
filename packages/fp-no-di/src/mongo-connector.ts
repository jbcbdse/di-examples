import { MongoClient } from "mongodb";
import config from "./config";

const client = new MongoClient(config.connectionString);
export default function getConnection(): MongoClient {
  return client;
}

