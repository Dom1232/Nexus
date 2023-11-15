const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const config = require('../../config/config');
const {expressjwt} = require('express-jwt');

//Sign In 
exports.signIn = async (req, res) => {
    try {
      const { email, password } = req.body;
      // Find user by email
      const user = await User.findOne({ email });  
      // Check if the user exists
      if (!user) {
        return res.status(401).json({ message: 'User not Found' });
      }
      // Compare password with  hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }
      //Create token
      const token = jwt.sign({ _id: user._id }, config.jwtSecret) 
      res.cookie('t', token, { expire: new Date() + 9999 }) 
      return res.json({
        token, 
        user: {
        _id: user._id, 
        name: user.name,
        email: user.email 
        }
    })
    } catch (error) {
      console.error('Error signing in:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
}

//Verify Tokens
exports.requireSignin = (req, res, next) => {
    const middleware = expressjwt({
      secret: config.jwtSecret,
      algorithms: ["HS256"],
      userProperty: 'auth'
    });
  
    //Handle Errors
    middleware(req, res, (err) => {
      if (err) {
        if (err.name === 'UnauthorizedError') {
          return res.status(401).json({ error: 'Invalid or missing token' });
        }
        return res.status(500).json({ error: 'Internal server error' });
      }
      next();
    });
}

exports.signOut = (req, res) => {
  res.clearCookie("t");
  return res.status(200).json({
    message: "signed out"
  });
};

exports.isAuthorized = (req, res, next) => {
    const authorized = req.params.userId === req.auth._id;
    if (!authorized) {
      return res.status(403).json({
        error: "User is not authorized"
      });
    }
    next();
}


  