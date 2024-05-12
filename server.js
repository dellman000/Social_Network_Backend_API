const express =require('express')
const clinet=require('./config/client')
const app= express()
const PORT= process.env.PORT||3333
// let db
// const DBName='Social_Network'
const user_api=require('./routes/api_routes')
const thought_api= require('./routes/thought_api')
app.use(express.json())
app.use('/api',user_api)
app.use('/api',thought_api)

clinet.once('open',()=>{
    app.listen(PORT,()=> console.log(`Server started on port:${PORT}`))
})