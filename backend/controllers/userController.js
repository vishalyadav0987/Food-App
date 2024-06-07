const UserSchema = require('../modals/UserSchema');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcrypt');
const validator = require('validator');

//LOGIN USER
const Login = async (req, res) => {
    const {email,password}=req.body;
    try {
        const user = await UserSchema.findOne({email});
        if(!user){
            return res.json({success:false,message:"User doesn't exsist!"});
        }
        const isMatch =await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:"Invalid Credential!"});
        }
        const token = generateToken(user._id);
        res.json({success:true,token,message:"User succesfully logged in!"});
    } catch (error) {
        console.log("Error in Login Function:",error);
        res.json({success:false,message:"Something went wrong",error}); 
    }
}

// REGISTER USER
const Register = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        //CHECKING USER EXSIST OR NOT
    const checkUser = await UserSchema.findOne({ email });
    if (checkUser) {
        return res.json({ success: false, message: "User already exsist!" });
    }
    // VALIDATING EMAIL
    if (!validator.isEmail(email)) {
        return res.json({ success: false, message: "Please enter a valid email" });
    }
    //CHECK PASSWORD
    if (password.length < 8) {
        return res.json({ success: false, message: "Please enter a strong password" });
    }
    // HASHING PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserSchema({
        name,
        password: hashedPassword,
        email,
    })
    const user = await newUser.save();
    const token = generateToken(user._id);
    res.json({success:true,token,message:"User succesfully register"});
    } catch (error) {
        console.log("Error in Register Function:",error);
        res.json({success:false,message:"Something went wrong",error}); 
    }
}

module.exports = {
    Login,
    Register
}