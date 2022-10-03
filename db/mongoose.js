const mongoose = require('mongoose');

exports.Db =() =>{
      mongoose.connect(`${process.env.MONGO_URI}`).then(()=>{
         console.log('connection established...')
      }).catch((err)=>{
        console.log('connection lost',err)
      })
}