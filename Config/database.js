const mongoose  = require('mongoose')

const DB = process.env.MONGODB_URI;

mongoose.connect(DB).then(() => {
  console.log('Connection To Database is Successful')
})
.catch((err) => {
  console.log('Error Connectin To Database')
})