import { sequelize } from "../config/dbconfig.js"
import { DataTypes } from "sequelize"

const Order = sequelize.define("order", {
    customer_id: {},
    item_id: {},
    price: {},
    date_created: {},
    time_created: {},
    order_status: {}
})

//sync database
sequelize.sync()

export default Order