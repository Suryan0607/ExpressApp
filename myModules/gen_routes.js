const express = require ('express');
const router =  express.Router();

router.get('/hello',async(req,res)=>{
    const userName = req.quary.name;
    await  res.status(200).send(`Hello ${userName ?? ' '}! How are you`)

});

module.exports = router;