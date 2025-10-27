const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

// User Profile
exports.getUserProfile = async(req, res) => {

  try{

    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(404).json({message: 'No token found'});
    } 

    const access_token = authHeader.split(" ")[1];

    const decoded = jwt.verify(access_token, process.env.ACCESS_SECRET);

    const user_id = decoded.id;

    if(!user_id) return res.status(400).json({message: 'user not defined'});

    const userProfile = await User.findOne({where: { id: user_id }});

    if(!userProfile) return res.status(400).json({message: 'invalid user.'});

    res.status(200).json({message: 'data fetched properly', data: userProfile });

  } catch(err){

    console.error(err);
    return res.status(400).json({message: 'error occured in fetching the user.'});

  }
}


// Update user profile
exports.updateProfile = async(req, res) => {

try{

  const { name, age, gender, phone, email } = req.body;

  const user_id = User.findOne({where: {email: email}});

  if(!user_id) return res.status(400).json({message:'user not found'});

  const updatedData = {};
  
  if(name) updatedData.name = name;
  if(age) updatedData.age = age;
  if(gender) updatedData.gender = gender;
  if(phone) updatedData.phone = phone;

  await User.update(updatedData, {where: {email: email}});
  
  res.status(200).json({ message: 'Profile updated successfully' });

}catch(err){

  console.error(err);
  return res.status(404).json({message:'error occured while updating the profile'});
}

}


//update password
exports.updatePassword = async(req, res) =>{

  const {password, newPassword, email} = req.body;

  if(!email || !password) return res.status(400).json({message: "email, password not found"});

  try{

    const user_db = await User.findOne({where:{email: email}});

    const checkPassword = await bcrypt.compare(password, user_db.password);

    // console.log(user_db);

    if(!checkPassword) return res.status(400).json({message: "wrong password!!!"});

    const newHashedPass = await bcrypt.hash(newPassword, 10);

    await User.update(
      {password: newHashedPass}, 
      {where: {email}});

    res.status(200).json({ message: "Password updated successfully" });

  
  }catch(err){

  console.error(err);
  return res.status(404).json({message:'error occured while updating the profile'});
}
  
}

