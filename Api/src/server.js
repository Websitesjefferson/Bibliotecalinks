require("express-async-errors")

const migrationsRun = require("./database/sqlite/migrations")
const AppErro = require("./utils/AppErro")
const uploadConfig = require("./configs/update")

const cors = require("cors")

const express = require("express")

const routes = require("./routes")
const { request, response } = require("express")

migrationsRun()

const app = express()
app.use(cors()) 
app.use(express.json())

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes)



app.use((error, request, response, next) => {
    if(error instanceof AppErro){
        return response.status(error.statusCode).json({
            status: "error",
            message:  error.message
        }) 
    }

    console.error(error)

    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    })
})

const PORT = 3333
app.listen(PORT, ()=> console.log(`server is running on port ${PORT}`))