const mongoose = require('mongoose');
const {Schema, model} = mongoose;
const userSchema = new Schema({
    email :{type: String},
    username :{type: String},
    password :{type: String},
    hotel:{
        type: mongoose.Types.ObjectId,
        ref:"Hotel"
    },
    role:{
        type:String,
        enum:['user','moderator', 'admin'],
        default:"user"
    }
});

const userModel = model("User", userSchema)

module.exports = userModel