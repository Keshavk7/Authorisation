const express= require('express')
require('./db/mongoose')
const userRouter= require('./router/user')

const app=express()
const port=process.env.port

app.use(express.json())
app.use(userRouter)

app.listen(port,()=>{
    console.log('Server is started on port '+port)
})