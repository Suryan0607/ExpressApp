const { expressjwt:jwt } = require('express-jwt');
const User = require('../models/usermodels')

exports.requireSignIn = jwt({
    secret: process.env.SECRET_KEY,
    algorithms: ["HS256"],
    userProperty: "auth"
});

exports.isAuth = (req, res, next) =>{
    console.log("Auth: ", req.auth._id)
    // let user = req.profile && req.auth && req.profile._id == req.auth._id;
    let user = req.auth._id === req.query.id;

    if(!user){
        return res.status(403).json({
            err: "Access denied"
        });
    }

    next();
};

exports.isAdmin = (req ,res , next) =>{
    if(req.role===0){
        res.status(403).json({
            err:"Admin Resourse: Access Denied"
        });
    }
    next()
    }

