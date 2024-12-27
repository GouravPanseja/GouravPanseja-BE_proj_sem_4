const User = require("../models/model.user");
const Otp = require("../models/model.otp");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const mailSender = require("../utils/util.mailSender");
const jwt = require("jsonwebtoken")

require("dotenv").config()

exports.sendOtp = async (req,res)=>{

    try{
        // fetch required data
        const {email} = req.body            // fetch email from body

        console.log(req.body);

        // validation
        if(!email){
            console.log("email not there in the body")
            return res.status(400).json({
                success:false,
                message:"email is required"
            })
        }
        
        // check if user is already registered
        const isUserPresent = await User.findOne({email});

        console.log("isUserPresent" ,isUserPresent);
        if(isUserPresent){
            return res.status(400).json({
                success:false,
                message:"email already in use"
            })
        }

        // generate otp
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        });

        console.log("otp generated " + otp);

        var isOtpPresent = await Otp.findOne({otp});       // check if any doc already has same OTP

        while(isOtpPresent){                              // in loop create new OTPs untill we find one that isn't already present

            otp = otpGenerator.generate(6,{

                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false

            })

            isOtpPresent = await Otp.find({otp});               // check if the currently generated otp is already present in the db
        }
        
        
        const createdOtpDoc = await Otp.create({email,otp});  // create entry in db 

        console.log("created otp doc", createdOtpDoc);

        res.status(200).json({
            success:true,
            message:"Otp sent succesfully",
            data:createdOtpDoc,
        })

    }
    catch(err){
        console.log("error" ,err);
        console.log("Something went wrong! Can't send Otp")

        return res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}

//signup
exports.signup = async(req,res)=>{
    try{

        // data fetch from body
        const {
            name,
            email,
            password,
            confirmPassword,
            otp,

        }  = req.body;

        console.log(req.body);

        // validation

        if(!name || !email || !password || !confirmPassword  || !otp){        // role will absolutly will be there because we have switch button in the Front end for this
            return res.status(400).json({
                success:false,
                message:"All fields are not filled"
            })
        }

        // compare confirm pass and pass
        
        if(confirmPassword != password){
            return res.status(400).json({
                success:false,
                message:"Password and Confirm password doens't match"
            })
        }

        var recentOtp = await Otp.findOne({email}); // []

        // check if there is any otp found... here, recentOtp should should be an array of length 1;
        if(recentOtp.length == 0){    
            return res.status(400).json({
                success:false,
                message:"OTP wasn't created"
            })
        }

        // compare the actual otp with given otp
        if(recentOtp === otp){
            console.log("otp recieved " , otp , "otp from db", recentOtp.otp)
            return res.status(400).json({
                success:false,
                message:"Otp doesn't match"
            })
        }

        // finally create entry in db for the user
        const createdUser = await User.create({
            name,
            email,
            password,
        });

        
        // return res
        res.status(200).json({
            success:true,
            message:"User is registered",
            data:createdUser,
        })
    }

    catch(err){
        console.log("error",err);
        
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

// login 
exports.login = async(req,res)=>{
    try{
       
        const {email, password} = req.body;                                                  // extract data from req body

     
        if(!email || !password){                                                             // validation of data 
            return res.status(400).json({
                success:false,
                message:"please enter all details"
            })
        }

       
        const userDet = await User.findOne({email});                                         // check if user is registered

        if(!userDet){
            return res.status(401).json({
                success:false,
                message:"User is not registerd. Please signup",
            })
        }
        
        const isPassMatched = (password === userDet.password);             // compare the pass
        
        if(isPassMatched){                                                                 

            // create cookie and send response
            res.status(200).json({
                success:true,
                message:"logged in successfully",
            })
        }
        
        else{
            return res.status(400).json({
                success:false,
                message:"password doesn't match",
            })
        } 
    }
    catch(err){
        console.log("error",err);

        return res.status(500).json({
            success:false,
            message:"Login failiure. Please try again"
        })
    }
}
