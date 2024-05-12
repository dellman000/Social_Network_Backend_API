const express =require('express')
const clinet=require('./config/client')
const app= express()
const PORT= process.env.PORT||3333
// let db
// const DBName='Social_Network'
const router_api=require('./routes/api_routes')

app.use(express.json())
app.use('/api',router_api)


clinet.once('open',()=>{
    app.listen(PORT,()=> console.log(`Server started on port:${PORT}`))
})