require('dotenv').config();

const {DB_URI} = process.env;

module.exports ={
  mongodb: {
    connectTo: (database) => 
    `mongodb+srv://coder_c20:coder_c20_pwd@cluster0.qm7sph7.mongodb.net/${database}?retryWrites=true&w=majority`
  }
} 