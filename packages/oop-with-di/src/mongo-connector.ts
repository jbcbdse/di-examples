import {MongoClient} from "mongodb";
import Config from "./config";
export default class MongoConnector {
  public client: MongoClient;

  constructor(config: Config) {
    this.client = new MongoClient(config.connectionString);
  }

  public getConnection(): MongoClient {
    return this.client;
  }
}
