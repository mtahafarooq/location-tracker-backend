const express = require('express');
const router = express.Router();
const jwt =  require('jsonwebtoken')
const mongoose = require('mongoose');

const User = mongoose.model('User')

router.post('/signup', async(req, res)=>{
    const { email, password } = req.body;

    try{
    const user = new User({ email, password})
    await user.save();
    const token = jwt.sign({userId: user._id}, 'MY_SECRET_KEY')
    res.send({ token })
    }
    catch(err){
       return res.status(442).send(err.message)
    }
});

module.exports = router;
