const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
const connectDb = require('./db/connect')
const notFound = require('./errors/notFound')


// Routes import
const ProductsRoute = require('./routes/productsRoute')
const usersRoute = require('./routes/userRoutes')
const cartRoutes = require('./routes/cartRoutes')
const ordersRoutes = require('./routes/orderRoutes')
//Middle ware
app.use(cors())
app.use(express.json({ limit: '20mb' }));

app.use(express.urlencoded({ limit: '20mb', extended: true }));

app.use('/app/v1/products',ProductsRoute)
app.use('/app/v1/users' , usersRoute)
app.use('/app/v1/cart', cartRoutes)
app.use('/app/v1/orders', ordersRoutes) 
app.get('/', (req, res)=>{
    res.send('<h1>Welcome to the QuickKart</h1>')
})


app.use(notFound)
app.use((err, req, res, next) => {
    if (res.headersSent) return next(err);
    const statusCode = err.statusCode || 500
    const message = err.message || 'Something went wrong'
    res.status(statusCode).json({ error: message })
})


// routes

const port = process.env.PORT || 3000
const monogoUrl = process.env.MONGO_URI

const start = async()=>{
    try {
        await connectDb(monogoUrl)
        app.listen(port , ()=>{
           console.log(`server is listening on the port : ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()