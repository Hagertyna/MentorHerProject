const { timeStamp } = require("console")
const mongoose = require("mongoose")

const Exercise = new mongoose.Schema(
    {
        type: {
          type: String,
          required: true,  
        },
        description: {
            type: String,
            required: true,
        },
        
        duration:{
            type: Number,
            required: true,

        }
    },{timestamps: true}
)
module.exports = mongoose.model('Exercise',Exercise)