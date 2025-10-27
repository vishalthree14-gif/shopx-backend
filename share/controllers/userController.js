const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const RefreshToken = require('../models/RefreshToken');


// Authentication
// POST /signup
exports.signup = async (req, res) => {
  try {
    const { name, age, gender, email, phone, password } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'Email already registered' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      name,
      age,
      gender,
      email,
      phone,
      password: hashedPassword,
      role_id: 2 // regular user
    });

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
};

// POST /login
exports.login = async (req, res) => {

  try{

    const { email, password } = req.body;

    const user = await User.findOne({where:{email}});

    if(!user) return res.status(400).json({message: 'wrong email or password'});

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) return res.status(400).json({message: 'invalid email or password'});

    const accesstoken = jwt.sign(
      // {id:user.id, email:user.email},
      {id: user.user_id},
      process.env.ACCESS_SECRET,
      {expiresIn: '1h'}
    );

      const refreshtoken = jwt.sign(
      {id:user.id},
      process.env.REFRESH_SECRET,
      {expiresIn: '7d'}
    );

      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);

      await RefreshToken.destroy({ where: { userId: user.id } });

    const userCreated = await RefreshToken.create({
      token: refreshtoken,
      userId: user.id,
      expiresAt
    })

    if(!userCreated) return res.json({message: 'some problem occur'});

    res.json({message: 'login successfully', access_token: accesstoken, refresh_token: refreshtoken});
  }
  catch(err){
    console.log(err);
    res.status(500).json({message: 'Error while login in', error: err.message});
  }
};






