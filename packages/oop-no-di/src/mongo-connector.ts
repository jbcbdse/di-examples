import {MongoClient} from "mongodb";
import config from "./config";
export class MongoConnector {
  public client = new MongoClient(config.connectionString);

  public getConnection(): MongoClient {
    return this.client;
  }
}
const mongoConnector = new MongoConnector();
export default mongoConnector;
