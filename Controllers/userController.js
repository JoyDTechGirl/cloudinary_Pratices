const userModel = require('../models/user')
const cloudinary = require('../Config/cloudinary')
const bcrypt = require('bcrypt')
const fs = require('fs')

exports.register = async(req,res) => {
  try{
    const {fullName,email,password} = req.body;
    // const file = req.file;
    
    const emailExists = await userModel.findOne({email:email.toLowerCase()});

    if(emailExists){
      await cloudinary.uploader.destroy(result,public_id)
      return res.status(400).json({message: `User with email: ${email} already exists`})
    }

    const result = await cloudinary.uploader.upload(req.file.path);
    fs.unlinkSync(req.file.path);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    
    const user = new userModel({
      fullName,
      email,
      password:hashedPassword,
      profilePicture: {
        imageUrl: result.secure_url,
        publicId: result.public_id
      }
    });
    await user.save();
    res.status(200).json({message: 'User registered Successfully',data:user})
  }catch(err){
    console.log(err.message)
    res.status(500).json({message: 'Internal Server Error'})
  }
};


exports.getOne = async(req,res) => {
  try{
    const {id} = req.params;

    const {fullName,email,password} = req.body;

    const user = await userModel.findById(id)
    if(!user){
      return res.status(404).json({message: 'User Not Found'})
    }

    res.status(200).json({message: 'User Found',data:user})
  }catch(err){
    console.log(err.message)
    res.status(500).json({message: 'Internal Server Error'})
  }
};




exports.getAll = async(req,res) => {
  try{
    const {fullName,email,password} = req.body;

    const user = await userModel.find().populate('profilePicture')
    if(!user){
      return res.status(404).json({message: 'User Not Found'})
    }

    res.status(200).json({message: 'User Found',data:user})
  }catch(err){
    console.log(err.message)
    res.status(500).json({message: 'Internal Server Error'})
  }
};


exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, email, password } = req.body;

    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User Not Found' });
    }

    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    
    const data = {
      fullName,
      email,
      password: hashedPassword
    };

    
    if (req.file) {
      await cloudinary.uploader.destroy(user.profilePicture.publicId);

      const result = await cloudinary.uploader.upload(req.file.path);
      fs.unlinkSync(req.file.path);

      user.profilePicture.imageUrl = result.secure_url;
      user.profilePicture.publicId = result.public_id;
    }

    const userUpdated = await userModel.findByIdAndUpdate(id,data,{new: true});
    res.status(200).json({ message: 'User updated Successfully', data: userUpdated });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User Not Found' });
    }

    await cloudinary.uploader.destroy(user.profilePicture.publicId);

    
   const deletedUser = await userModel.findByIdAndDelete(id);

    res.status(200).json({ message: 'User deleted Successfully',data:deletedUser });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
