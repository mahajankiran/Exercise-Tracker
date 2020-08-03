const express =  require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const port = 5000;
const url = process.env.MONGODB_ATLAS_CONNECTION;

app.use(cors()); //Setting up the cors middleware

app.use(express.json()); //to parse the incoming data and outgoing data into json format

//To handle the routes
const userRouter = require('./routes/users');
const exerciseRouter = require('./routes/exercises');

app.use('/users',userRouter);
app.use('/exercises',exerciseRouter);



mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }).then(res=>{
          console.log("DB Connected!")
  }).catch(err => {
    console.log(Error, err.message);
  })
    


const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Connection established");
});

app.listen(port, () => {
  console.log("Server Started on "+port);
});
