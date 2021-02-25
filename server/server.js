const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routesUrls = require('./routes/routes')
const addUsersRouter = require('./routes/desktop-app/addUsers');
const getUsersRouter = require('./routes/desktop-app/getUsers');
const cors = require('cors')
const bodyParser = require('body-parser')



dotenv.config()
const connectDB = async() => {
       await mongoose.connect(process.env.DATABASE_ACCESS,{
        useUnifiedTopology: true,
        useNewUrlParser: true, 
        useCreateIndex: true,
}, ()=> console.log('Database connected'))
}


app.use(bodyParser.json({limit: '10mb' }));
app.use(express.urlencoded({limit: '10mb', extended: false }));
app.use(express.json())
app.use(cors())
app.use('/app', routesUrls)
app.use("/addUser",addUsersRouter);
app.use("/getUsers",getUsersRouter);
app.listen(5000, () => console.log("Server is running"))

connectDB();