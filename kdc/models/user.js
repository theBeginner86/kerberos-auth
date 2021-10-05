const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        default: ''
    },
    email: {
        type: String,
        required: true,
        default: '',
    },
    password: {
        type: String,
        required: true,
        default: ''
    },
    userSecrectKey: {
        type: String,
        default: ''
    }
})

UserSchema.pre('save', async function (next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    const userSecrectKey = crypto.randomBytes(64).toString('hex');
    user.userSecrectKey = userSecrectKey;
    next();
})

module.exports = mongoose.model('User', UserSchema);
