const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userModel = new mongoose.Schema({
    name:{
        type: String,
        required:[true , 'Please provide the Name']
    },
    email : {
        type:String,
        required:[true , 'Please provide the E-mail'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'please provide valid email'],
        unique:true,
    },
    password:{
        type: String,
        required:[true , 'Please provide the Password']
    },
    role:{
        type:String,
        enum : ['admin' , 'user' , 'seller'],
        default : 'user'
    },
    savedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
})

userModel.pre("save" , async function(){
    if (!this.isModified('password')) return
    const gensalt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password , gensalt)
})

userModel.methods.createJwt = function(){
    return jwt.sign({userId : this.id , userRole : this.role} , process.env.JWT_SECRET , {
        expiresIn : '30d'
    })
}

userModel.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword , this.password)
    return isMatch
}

module.exports = mongoose.model('User' , userModel)