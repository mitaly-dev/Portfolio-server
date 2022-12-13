const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000
require('dotenv').config()

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ojtfupc.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const projectCollection=client.db("Portfolio_Mitaly").collection('projects')

        app.get('/projects',async(req,res)=>{
            const result =await projectCollection.find({}).toArray()
            res.send(result)
        })

        app.get('/projects/:id',async(req,res)=>{
            const id = req.params.id 
            const query={_id:ObjectId(id) }
            const result = await projectCollection.findOne(query)
            console.log(result)
            res.send(result)
        })

        app.post('/projects',async(req,res)=>{
            const project = req.body
            console.log(project)
            // const result = await projectCollection.insertOne(project)
            // console.log(result)
            // res.send(result)
        })

    }
    finally{

    }
}
run().catch(error=>console.log(error))



app.get('/',(req,res)=>{

})
app.listen(port,()=>{
    console.log(`portfolio running on ${port}`)
})