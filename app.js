const express = require('express')
require('dotenv').config(); //enable .env file to store private urls or keys
var cors = require('cors')
const errorHandler = require('./middlewares/error-handler');
const bookRoute = require('./routes/book')
const userRoute = require('./routes/user')


const app = express()

app.use(cors())
app.use(express.static('public')),  //make the public directory public
app.use(express.json())
app.use(express.urlencoded({extended: true}))


//Router Request Handeler..
app.use('/api/book', bookRoute)
app.use('/api/user', userRoute)


//Error Handelar..
app.use(errorHandler.extra);



app.listen(8080, () => {
    console.log('listening 8080')
})




