const mongoose = require('mongoose');
require('dotenv').config()


const uri = process.env.MONGODB_URI;


const connectDatabase = async () => {

  try {
    // Connect the client to the server	(optional starting in v4.7)
    await mongoose.connect(uri)
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch(error) {
    console.error("error " , error)
    
  }
}

module.exports = connectDatabase;


