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
        type: String,
        required: true
    },
})

const hotelModel = new mongoose.model('hotel', hotelSchema)

module.exports = hotelModel