import { sequelize } from "../config/dbconfig.js"
import { DataTypes } from "sequelize"

const Order = sequelize.define("order", {
    customer_id: { type: DataTypes.INTEGER, allowNull: false },
    item_id: { type: DataTypes.INTEGER },
    price: { type: DataTypes.DECIMAL },
    date_created: { type: DataTypes.DATE },
    time_created: { type: DataTypes.TIME },
    order_status: { type: DataTypes.STRING, defaultValue: "placed" }
})

//sync database
sequelize.sync()

export default Order