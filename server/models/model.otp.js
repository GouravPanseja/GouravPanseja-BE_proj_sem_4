const mongoose = require("mongoose");
const mailSender = require("../utils/util.mailSender");

const OtpSchema = mongoose.Schema({

    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true
    },
    timeStamp:{
        type:Date,
        default:Date.now(),
        expires:5*60,
    },

    
})

// function to send emails
const  sendVerificationEmail=  async(email,otp)=>{
    try{
        console.log('email is -------->', email);
        const emailResponse = await mailSender(email, "Verification email from Qeurify", otp);
        console.log("Email sent succesfully");
        // console.log("emailResponse",emailResponse);
    }       

    catch(err){
        console.log("error occured while sending mail");
        console.log("error" ,err.message);
        throw err;
    }
}
// pre-save middleware

OtpSchema.pre("save", async function(next){

    try{
        console.log('email was ---> ---> ' ,this.email);
        await sendVerificationEmail(this.email, this.otp);

    }

    catch(err){
        console.log("error in presave middlware " ,err);

    }
    next();
    
} )
module.exports = mongoose.model("Otp",OtpSchema);