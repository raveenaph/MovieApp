import app from "./server.js"
import mongodb from "mongodb"
//import ReviewsDAO from "./dao/reviewsDAO.js"
import { error } from "console"

const MongoClient = mongodb.MongoClient
const mongo_username = "raveenaphadnis"
const mongo_password = "arjun123"

const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.f7eic.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const port = 8000

MongoClient.connect(
    uri,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    })
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })