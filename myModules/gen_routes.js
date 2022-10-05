const express = require ('express');
const router =  express.Router();

router.get('/', (req, res) => {
    res.status(200).send('Welcome to my App')
})


router.get('/hello',async(req,res)=>{
    //const userName = req.quary.name;
    await  res.status(200).send(`Hello ! How are you`)

});

module.exports = router;