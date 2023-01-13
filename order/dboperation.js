const config = require("./dbconfig")
const sql = require("mssql")

async function connectDB() {
    try {
        let pool = await sql.connect(config);
        await createOrderProcedure(pool);
        return pool;
    } catch (error) {
        console.log(`server not connected due to ${error}`)
    }
}

const createOrderProcedure = async (pool) => {

    try {
        //procedure 1 - CREATE NEW Order
        const procedure1 = `CREATE PROCEDURE insertOrder @itemId INT, @customerId INT, @price INT, @dateCreated DATE, @timeCreated TIMESTAMP @orderStatus nvarchar(50) AS BEGIN INSERT INTO customers(itemId, customerId, price, dateCreated, timeCreated orderStatus) VALUES(@itemId, @customerId, @price, @dateCreated, @timeCreated, @orderStatus) END;`;

        //PROCEDURE 2 - Fetch a Order
        const procedure2 = `CREATE PROCEDURE fetchOrders AS BEGIN SELECT * FROM orders END;`;

        //PROCEDURE 2 - Fetch a Order
        const procedure3 = `CREATE PROCEDURE updateOrder @id INT @status VARCHAR AS BEGIN UPDATE Customers SET status = @status WHERE id = @id END`;

        //Run the query
        pool.request().query(procedure1)
        pool.request().query(procedure2)
        pool.request().query(procedure3)

        console.log('Procedures created successfully');
    } catch (error) {
        console.log(error);
    }
}

connectDB();

module.exports = connectDB