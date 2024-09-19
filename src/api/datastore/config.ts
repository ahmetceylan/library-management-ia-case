import { DataSource } from "typeorm"
import { BookEntity, BorrowedBookEntity, UserEntity } from "../entities"

console.log("AHMET ", process.env.DB_DATABASE)
const DatabaseConnection = new DataSource({
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

export default DatabaseConnection