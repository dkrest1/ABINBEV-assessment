const config = require("./dbconfig")
const sql = require("mssql")

async function connectDB() {
    try {
        let pool = await sql.connect(config);
        // await createCustomerProcedure(pool);
        const test2 = await pool.request().input('email', 'b@gmail.com').input('firstname', 'oluwa').input('lastname', 'tosin').input('password', '54321').query('EXEC createCustomer @email = @email, @firstname = @firstname, @lastname = @lastname, @password = @password')
        console.log(test2)
        console.log("Server successfully connected");
        return pool;
    } catch (error) {
        console.log(`server not connected due to ${error}`)
    }
}

console.log(connectDB())

const createCustomerProcedure = async (pool) => {

    try {
        //procedure 1 - CREATE NEW Customer
        const procedure1 = 'CREATE PROCEDURE createCustomer @email nvarchar(50), @firstname nvarchar(50), @lastname nvarchar(50), @password nvarchar(50) AS BEGIN INSERT INTO customers (email, firstname, lastname, password) VALUES(@email, @firstname, @lastname, @password); SELECT SCOPE_IDENTITY() AS id; END';

        //PROCEDURE 2 - Fetch a customer
        const procedure2 = `CREATE PROCEDURE fetchCustomerByEmail @email nvarchar(50) AS BEGIN SELECT * FROM customers WHERE email = @email; END`;

        //PROCEDURE 3 - Fetch a customer
        const procedure3 = `CREATE PROCEDURE fetchCustomerById @id INT AS BEGIN SELECT * FROM customers WHERE id = @id; END`;

        //Run the query
        pool.request().query(procedure1)
        pool.request().query(procedure2)
        pool.request().query(procedure3)

    } catch (error) {
        console.log('Procedures Not created successfully');
        console.log(error);
    }
}

connectDB();

module.exports = connectDB