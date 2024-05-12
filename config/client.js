// const mongoose=require('mongoose')
// const { MongoClient } = require('mongodb');
// const url = 'mongodb://localhost:27017';
// const client = new MongoClient(url);

// module.exports=client

const mongoose = require('mongoose');

// Wrap Mongoose around local connection to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Social_Network');

// Export connection
module.exports = mongoose.connection;
