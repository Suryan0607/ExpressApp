const express = require('express');
const router = express.Router();
const User = require('../models/usermodels')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//signup
router.post("/signup",async(req,res)=>{
try {
    const payload = req.body;

    payload.hashedPassword = await bcrypt.hash(payload.password,10);

    delete payload.password;

    let user = new User(payload);

    await user.save((err,data)=>{
        if (err) {
           
            return res.status(400).send({
                massage:"some error while registering..."
            });
        }
        return res.status(201).send({
            massage:"user has been registered successfully."
        })    
            
       
    })
} catch (error) {
    return res.status(500).send({
        massage:"internal server error"
    })
}

});

//signin
router.post("/signin",async(req,res)=>{
    try {

        const {email,password}=req.body;
        const existingUser = await User.findOne({email:email});
        
        if (existingUser) {
            const isValidUser = await bcrypt.compare(password,existingUser.hashedPassword);
            if (isValidUser) {

                const token = jwt.sign({_id:existingUser._id},process.env.SECRET_KEY);
             
                //persist the token at "entryToken" in cookie with expire date
                res.cookie('entryToken',token,{ expires: new Date(Date.now() + 900000), httpOnly: true });
                
                //return response with user and token to frontend client
                const{_id,name,email}=existingUser;

                return res.status(200).json({ token : token , user :{_id, email, name} });

            }

            return res.status(400).send({
                massage:"email/password are not valid."
            })
        }
        return res.status(400).send({
            massage:"user doesn't exist."
        });
    } catch (error) {
        return res.status(500).send({
            massage:"internal server error"
        })
    }
});

//signout
router.get("/signout",async(req,res)=>{
    await res.clearCookie('entryToken');

    return res.status(200).send({
        massage:"successfully signed out!"
    })
});


module.exports=router;







