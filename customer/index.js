const express = require("express")
const cors = require("cors")
const Joi = require("joi")
const connectDB = require("./dboperation")
const helper = require("./helper")

const app = express()
const port = process.env.PORT

const pool = connectDB();

//config
require("dotenv").config()

//middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));


app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.post("/customer/signup", async (req, res) => {
    const body = req.body;
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        password: Joi.string().required(),
    })
    const isValidResult = schema.validate(body)
    if (isValidResult?.error) {
        return res.status(400).json({
            error: true,
            statusCode: 400,
            message: `${isValidResult?.error?.message}`
        })
    }
    const hashedPassword = helper.passwordToHash(body.password);
    //SIGNUP TO DB EXEC INSERT CUSTOMER
    const _ = await pool.request().input('email', body.email).input('firstname', body.firstName).input('lastname', body.lastName).input('password', hashedPassword).query('EXEC createCustomer @email = @email, @firstname = @firstname, @lastname = @lastname, @password = @password');
    const userId = _.recordSet[0].id;
    const _token = generateTokenFromPayload({
        id: userId
    });
    return res.status(201).json({
        error: false,
        message: "User signed up successfully",
        statusCode: 201,
        data: {
            _token
        }
    })
})

app.post("/customer/login", async (req, res) => {
    const body = req.body;
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })
    const isValidResult = schema.validate(body)
    if (isValidResult?.error) {
        return res.status(400).json({
            error: true,
            statusCode: 400,
            message: `${isValidResult?.error?.message}`
        })
    }
    const result = await pool.request().input('email', body.email).query("EXEC fetchCustomerByEmail @email = @email");
    const user = result.recordSet[0];
    const isValidPassword = compareBcryptPassword(body.password, user?.password);
    if (!isValidPassword) {
        return res.status(400).json({
            error: true,
            statusCode: 400,
            message: `Password is incorrect`
        })
    }
    const _token = generateTokenFromPayload({
        id: user.id
    })
    return res.status(201).json({
        error: false,
        message: "User signed up successfully",
        statusCode: 201,
        data: {
            _token,
        }
    })
})

app.listen(port | 8080, () => {
    console.log(`app is live on port ${port}`)
})
