import { Sequelize } from "sequelize"
import dotenv from "dotenv"
dotenv.config()

export const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USER,
    process.env.PASSWORD, {
    dialect: 'mysql',
    host: "localhost",
    pool: {
        max: 5,
        min: 0,
        acquire: 3000,
        idle: 10000,

    }

}
);

export const connectDB = async () => {
    try {
        await sequelize.authenticate()
        console.log("successfully connected to database")

    } catch (error) {
        console.log(error)
    }
}
