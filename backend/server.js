import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

const port = process.env.PORT || 5001;

connectDB();

const app = express()

//Middleware for parsing body

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use(cookieParser())

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.get('/', (req, res) => { 
    res.send('API is running...')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.use(notFound);
app.use(errorHandler)

app.listen(port, () => console.log(`Server running on port ${port}`))