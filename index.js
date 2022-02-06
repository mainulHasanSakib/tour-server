const express = require('express')
const app = express()
const cors=require('cors')
require('dotenv').config()
const { MongoClient } = require('mongodb');
const port =process.env.PORT || 5000

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sm9ey.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
  try {
    await client.connect();
    const database = client.db("tourDB");
    const services = database.collection("services");
//get
app.get('/services', async(req, res)=>{
  const cursor=services.find({});
    const service= await cursor.toArray();
    res.send(service);
})
//post
app.post('/services', async(req, res)=>{
  const service=req.body
   const result = await services.insertOne(service)      
  res.json(result)
})

  }
  finally {
   
  }

}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello server')
})

app.listen(port, () => {
  console.log(` listening on port ${port}`)
})