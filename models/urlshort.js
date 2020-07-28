const mongoose=require('mongoose');

const urlshema=mongoose.Schema({
    longurl:{
        type:String,
        required: true //validation
    },
    shorturl:{
        type:String,
        unique: true
    },
    clickcount:{
        type:Number,
        default:0
    }
});

const urlmodel=mongoose.model('urlshort',urlshema);

//import into another file // obj re-structuring

module.exports={urlmodel};