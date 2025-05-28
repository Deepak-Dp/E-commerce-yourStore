const mongoose = require('mongoose');


require('dotenv').config()


 const DBConnect= async()=>{
     
    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('Data Base connected');
    })
    .catch((err)=>{
        console.log('DB connection failed', err);
    })
   
}
module.exports = DBConnect;