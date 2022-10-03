const mongoose = require('mongoose');

const quoteschema = mongoose.Schema({
    quote:{
        required:true,
        type:String,
        trim:true
    },
    author:{
        required:true,
        type:String,
        trim:true
    },
    created_at:{
        required:true,
        type: Date
    }
});

module.exports = mongoose.model('Quotes',quoteschema)