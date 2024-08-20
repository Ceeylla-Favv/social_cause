const mongoose = require('mongoose')
const hotelSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    otherImage: {
        type: String,
    },
    hotelName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    owner:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        require:true
    }
})

const hotelModel = new mongoose.model('Hotel', hotelSchema)

module.exports = hotelModel