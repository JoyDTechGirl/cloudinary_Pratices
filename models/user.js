const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  fullName:{
    type:String,
    require: true
  },
  email:{
    type:String,
    require: true,
    lowercase: true
  },
  password:{
    type:String,
    require: true
  },
  profilePicture: {
    imageUrl: {
      type:String,
    require:true,
    },
    publicId: {
      type:String,
    require:true,
    }
  },
  postId:[{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Posts'
  }],
},{
  timestamps: true
});

const userModel = mongoose.model('Users',userSchema);

module.exports = userModel;