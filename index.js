const express = require("express")
const cors = require("cors")
const { connection } = require("./db")
const { noteRouter } = require("./routes/note.routes")
require("dotenv").config()
const {userRouter} = require("./routes/user.routes")

const port = process.env.PORT


const app = express()

//middleware
app.use(express.json())
app.use(cors())
app.use("/user",userRouter)
app.use("/note", noteRouter)

app.get("/", (req,res) => {
    res.send({
        message: "API is working now"
    })
})

app.listen(port, async()=>{
    try{
        await connection
        console.log("database connected")
    }catch (error){
        console.log(`Here is the error ${error}`)
    }

    console.log("server is running on the port number", port)
})