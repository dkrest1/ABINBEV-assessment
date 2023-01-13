const express = require("express")
const app = express()
const cors = require("cors")

app.use(express.json())
app.use(cors())
const port = 8081

app.get("/", async (req, res) => {
    res.send("Hello World!")
})

app.get("/orders", (req, res) => {
    //const orders = await pool.request().query("EXEC fetchOrders")
    return res.json({
        data: {
            orders,
        },
        error: false,
        statusCode: 200
    });
})

app.post("/order/create", async (req, res) => {
    const body = req.body;
    const schema = Joi.object().keys({
        itemId: Joi.string().required(),
        price: Joi.number().required(),
    })
    const isValidResult = schema.validate(body)
    if (isValidResult?.error) {
        return res.status(400).json({
            error: true,
            statusCode: 400,
            message: `${isValidResult?.error?.message}`
        })
    }
    const dateCreated = new Date();
    const timeCreated = Date.now();
    //SIGNUP TO DB
    return res.status(201).json({
        error: false,
        message: "Order created successfully",
        statusCode: 201,
    })
})


app.put("/order/update/:id", (req, res) => {
    const body = req.body;
    const schema = Joi.object().keys({
        status: Joi.string().required(),
    })
    const isValidResult = schema.validate(body)
    if (isValidResult?.error) {
        return res.status(400).json({
            error: true,
            statusCode: 400,
            message: `${isValidResult?.error?.message}`
        })
    }
    //SIGNUP TO DB
    return res.status(201).json({
        error: false,
        message: "User signed up successfully",
        statusCode: 201,
    })
})

app.listen(port, () => {
    console.log(`app is live on ${port}`)
})