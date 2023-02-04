import { sequelize } from "../config/dbConfig.js"
import { DataTypes } from "sequelize"

const Customer = sequelize.define("customer", {
    full_name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING }
});

//sync database
// sequelize.sync()

export default Customer

