const mongoose = require('mongoose');

const dbConnect = async () => {
    return mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("MongoDB connection error:", error);
    });
    
}



module.exports = dbConnect;  

