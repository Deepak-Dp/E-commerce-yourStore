
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");  
const morgan = require("morgan");
const helmet = require('helmet');
const cloudinary = require('./config/cloudinary')
const  DBConnect  = require("./config/DBConnection");
const UserRoutes = require('./routes/user.routes')
const uploadRoutes = require('./routes/upload.routes')
const fileUpload = require('express-fileupload');

const categoryRoutes = require('./routes/Category.routes')
const productRoutes = require('./routes/product.routes')
const cartRoutes = require('./routes/cart.routes')
const addressRoutes = require('./routes/address.routes')
const orderRoute = require("../server/routes/order.routes")
require('dotenv').config()



const app = express()
app.use(cors({
    credentials: true,
    origin : 'https://e-commerce-your-store.vercel.app'
}))
DBConnect()
app.use(express.json())
app.use(cookieParser())
app.use(morgan())
app.use(helmet({
    crossOriginResourcePolicy: false
}))
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}))
cloudinary.cloudinaryConnect();

app.get('/', (req, res)=>{
    res.send('hello dost!!!!!!')
})

app.use('/api/user', UserRoutes)

app.use('/api/file',uploadRoutes)

app.use('/api/category', categoryRoutes)
app.use('/api/product', productRoutes)

app.use('/api/cart', cartRoutes)
app.use('/api/address', addressRoutes)
app.use('/api/order', orderRoute)


const port = process.env.PORT || 8000

app.listen(port , ()=>{
    console.log('server start on port no. ', port)
    console.log('http://localhost:' + port);
    
})
