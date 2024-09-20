import { DataSource } from "typeorm"
import { BookEntity, BorrowedBookEntity, UserEntity } from "../entities"

let instance;
class DatabaseConnection {
    constructor() {}
    private static _instance: DataSource;
    public static getInstance(): DataSource
    {
        return this._instance || (this._instance = new this().create());
    };

    private create() {
        console.log("AHMET ", process.env.DB_DATABASE)
        return new DataSource({
            type: "postgres",
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT as string),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            logging: false,
            synchronize:true,
            entities: [UserEntity, BookEntity, BorrowedBookEntity],
        })
    }
}
export default DatabaseConnection;