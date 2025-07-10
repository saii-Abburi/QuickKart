const CustomError = require('../errors/CustomError')
const userModel = require('../models/userModel')

const GetUser = async (req, res, next) => {
    try {
        const user = await userModel.find({_id: req.params.id})

        if (!user) {
            throw new CustomError(404, 'No user found with this ID')
        }

        return res.status(200).json({ user:user })
    } catch (error) {
        next(error)
    }
}
const CreateUser = async(req,res)=>{
    console.log(req.body);
    
    const user = await userModel.create(req.body)
    const token =user.createJwt();
    res.status(201).json({token:token , msg:'User created successfully' ,user: { role:user.role , id:user._id} })
}
const UpdateUser = async(req,res)=>{
    console.log(req.params , req.body)
    const user = await userModel.findOneAndUpdate({_id:req.params.id} , req.body , {
        new:true
    })
    res.status(201).json({user:user})
}
const DeleteUser = async(req,res)=>{
    const user = await userModel.findOneAndDelete({_id:req.params.id})
    if(!user){
        res.status(404).json({msg:'No user found'})
    }
    res.status(200).json({msg:'User deleted successfully'})
    
}
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new CustomError(400, 'Please provide email and password');
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      throw new CustomError(401, 'Invalid Credentials');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new CustomError(401, 'Invalid Credentials');
    }

    const token = user.createJwt();

    res.status(200).json({
      msg: 'Login successful',
      token,
      user: { name: user.name, role: user.role, email: user.email , id: user._id },
    });
  } catch (err) {
    next(err);
  }
};


module.exports = {GetUser , CreateUser , UpdateUser , DeleteUser , loginUser}
