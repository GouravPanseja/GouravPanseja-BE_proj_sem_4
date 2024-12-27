import React, {useState} from "react";
import "../styles/Signup.css";
import {IoPersonSharp, MdOutlineMailOutline, IoIosLock,FaEye,FaEyeSlash,FaShieldHalved, googleLogo,microsoftLogo,signupImage, RiErrorWarningLine} from "../assets/assets";
import {useForm} from "react-hook-form"
import { getValue } from "@testing-library/user-event/dist/utils";
import { useNavigate,Link } from "react-router-dom";
import {Otp} from "./Otp"
import toast from "react-hot-toast";
import axios from "axios";
import useSignupStore from "../stores/SignupStore";
import {Oval} from "react-loader-spinner";
import {motion} from "framer-motion"

export default function Signup(){

    console.log(process.env.REACT_APP_GOOD);
    const navigate = useNavigate();

    const [isShowPassword_1, setIsShowPassword_1] =  useState(false);
    const [isShowPassword_2, setIsShowPassword_2] =  useState(false);

    const {formData, setFormData} = useSignupStore( (state)=> ({
        formData : state.formData,
        setFormData: state.setFormData,
    }))

    const [error , setError] = useState(null);
    const [isLoading , setIsLoading] = useState(false);

    var error_2 = false;                // had to use non-state

    
    const {register, handleSubmit,formState, watch, setValue} = useForm();
    const errors = formState.errors;                                                    // errors object consists of errors corresponding to all the fields with provided names of the fields in register function as the keys


    const postData = async(data)=>{
     

        try{
            console.log(data);
            const response= await axios.post(`${process.env.REACT_APP_BASE_URL}/signup`,data);

            console.log(response);

            toast.success("signup succesfull", {
                style: {
                  border: '1px solid green',
                  padding: '6px',
                  color: '#green',
                },
                iconTheme: {
                  primary: 'green',
                  secondary: '#FFFAEE',
                },
            });
        }
        catch(err){
            console.error(err);

            setError(err.response?.data || err.message);
            error_2 = true;
            

            toast.error(err?.response?.data?.message || err?.message, {
                style: {
                  border: '1px solid #713200',
                  padding: '6px',
                  color: '#713200',
                },
                iconTheme: {
                  primary: '#713200',
                  secondary: '#FFFAEE',
                },
              });

 
        }

    }
    

    const formSubmit = async (data)=>{
        
        try{

            console.log("authenticating.........")
            data && console.log(data);  
        
            // validation
            if(data?.password !== data?.confirmPassword){

            toast.error("Password doesn't match", {
                style: {
                  border: '1px solid #713200',
                  padding: '6px',
                  color: '#713200',
                },
                iconTheme: {
                  primary: '#713200',
                  secondary: '#FFFAEE',
                },
              });
              return;
            }


            setFormData(data);
            setIsLoading(true);
            console.log(process.env.REACT_APP_BASE_URL);

            const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/sendOtp`, {email:data.email});

            console.log(result.data);
                    
            setValue('email','');
            setValue('name','');
            setValue('password','');
            setValue('confirmPassword','');

            console.log("error is " ,error);


            toast.success("Verification email sent", {
                style: {
                  border: '1px solid green',
                  padding: '6px',
                  color: '#green',
                },
                iconTheme: {
                  primary: 'green',
                  secondary: '#FFFAEE',
                },
            });

            !error_2 &&  navigate("/otpVerification");
        }
        catch(err){
            console.log(err);

            toast.error(err?.response?.data?.message || err?.message, {
                style: {
                  border: '1px solid #713200',
                  padding: '6px',
                  color: '#713200',
                },
                iconTheme: {
                  primary: '#713200',
                  secondary: '#FFFAEE',
                },
              });

        }

        setIsLoading(false);        
    }


    return (
        <motion.div
            
            className="bg-[#191919] h-[100vh] w-full flex flex-row ">

            <motion.div 
                key="signup"
                animate={{opacity:1}}
                initial={{opacity:0.97}}
                transition={{
                    duration:0.5,
                    ease:"easeInOut"
                }}
                exit={{opacity:0}}
                className="lg:w-[55%] w-full  flex items-center  bg-white lg:rounded-tr-xl lg:rounded-br-xl ">

                
                <form onSubmit={handleSubmit(formSubmit)} className="w-full  p-[20px] flex flex-col justify-center items-center my-auto ">

                    {/* heading */}
                    <div className="flex flex-col justify-center items-center gap-7">
                        <h2 className="heading">Register</h2>
                        <p className=" text-[0.8rem] sm:[1rem] lg:text-[1.3rem] font-extralight text-center text-[#5E5E5E]">Get better data with conversational forms, surveys,<br/> quizzes & more.</p>
                    </div>

                    {/* fields */}
                    <div className="w-full flex flex-col  items-center justify-center ">
                        
                      
                        <p className="min-h-7 text-red-500">{errors.name && errors.name.message}</p>
                        <div className="flex gap-5  xxs:min-w-[300px] xxs:max-w-[300px] min-w-[250px] max-w-[250px] items-center justify-center relative border-[1px] border-black px-2 rounded-md">
                           
                            <label htmlFor="name">
                                <IoPersonSharp className="text-xl"/>
                            </label>
                            
                            <input 
                                type="text" 
                                name="name" 
                                id="name"
                                placeholder="Name" 
                                className="outline-none p-2 w-full h-[45px]"
                                value={watch('name','')}
                                onChange = {(e)=> setValue('name', e.target.value)}
                                {...register("name",{
                                    required:"Name is required"
                                })}
                            />
                        </div>

                        <p className="min-h-7 text-red-500">{errors.email && errors.email.message}</p>
                        <div className="flex gap-5  xxs:min-w-[300px] xxs:max-w-[300px] min-w-[250px] max-w-[250px] items-center justify-center border-[1px] border-black px-2 rounded-md">
                          
                            <label htmlFor="email">
                                <MdOutlineMailOutline className="text-xl"/>
                            </label>
                            <input 
                                type="email" 
                                name="email" 
                                id="email"
                                placeholder="Email" 
                                className="outline-none p-2 w-full h-[45px]"
                                value={watch('email','')}
                                onChange = {(e)=> setValue('email', e.target.value)}
                                {...register("email",{
                                    required:"Eamil is required",
                                    validate: (value) => {if(value.includes("@"))return true; else return "email must contian '@' "; }})
                                }
                            />
                        </div>

                        <p className="min-h-7 text-red-500">{errors.password && errors.password.message}</p>
                        <div className="flex gap-5 xxs:min-w-[300px] xxs:max-w-[300px] min-w-[250px] max-w-[250px] items-center justify-center border-[1px] border-black px-2 rounded-md">
                            
                            <label htmlFor="pass">
                                <IoIosLock className="text-xl"/>
                            </label>

                            <input 
                                type={`${isShowPassword_1 ? "text" : "password"}`} 
                                name="password" 
                                id="pass"
                                placeholder="Password" 
                                className="outline-none p-2 w-full h-[45px]"  
                                value={watch('password','')}
                                onChange = {(e)=> setValue('password', e.target.value)}
                                {...register("password",{
                                    required:"password is required",
                                    // validate: (value) =>  { if( value.length < 8 ) return "Password must contian atleast 8 characters"; else return true}, // the returned value other than true will be considered as errors.__.messaege in case validation fails
                                    minLength:{
                                        value:8,
                                        message:"Password must consits of atleast 8 characters"
                                    }
                                })}
                            />
                            {
                                isShowPassword_1 ?
                                <FaEye onClick={()=> setIsShowPassword_1( prev => !prev)} className="text-[#c3c8ce] cursor-pointer text-md"/>
                                :
                                <FaEyeSlash onClick={()=> setIsShowPassword_1( prev => !prev)} className="text-[#c3c8ce] cursor-pointer text-md"/>
                            }
                            
                        </div>

                        <p className="min-h-7 text-red-500">{errors.confirmPassword && errors.confirmPassword.message}</p>
                        <div className="flex gap-5  xxs:min-w-[300px] xxs:max-w-[300px] min-w-[250px] max-w-[250px] items-center justify-center border-[1px] border-black px-2 rounded-md">

                            <label htmlFor="confirmPassword">
                                <FaShieldHalved className="text-xl"/> 
                            </label>

                            <input 
                                type={`${isShowPassword_2 ? "text" : "password"}`} 
                                name="confirmPassword" 
                                id="confirmPassword"
                                placeholder="Confirm Password" 
                                className="outline-none p-2 w-full h-[45px]"  
                                rounded={true} 
                                value={watch('confirmPassword','')}
                                onChange = {(e)=> setValue('confirmPassword', e.target.value)}
                                {...register("confirmPassword",{
                                    required:"confirm password is required",
                                    minLength:{
                                        value:8,
                                        message:"password must be of atleast 8 characters"
                                    }
                                })}
                            />
                            {
                                isShowPassword_2 ?
                                <FaEye onClick={()=> setIsShowPassword_2( prev => !prev)} className="text-[#c3c8ce] cursor-pointer text-md"/>
                                :
                                <FaEyeSlash onClick={()=> setIsShowPassword_2( prev => !prev)} className="text-[#c3c8ce] cursor-pointer text-md"/>
                            }
                            
                        </div>  
                        
                        <div className="mt-2  md:hidden">
                            <p className="text-sm text-gray-500"> 
                                Already have an account ? <Link to="/login" className="underline text-black">Sign in</Link>
                            </p>
                        </div>

                        

                        <div className="flex md:w-[40%] items-center justify-center mt-7">
                            <button 
                                className="bg-black xxs:min-w-[300px] xxs:max-w-[300px] min-w-[250px] max-w-[250px] flex items-center justify-center text-white px-[4rem] hover:bg-gray-800 transition-all duration-100 py-3 rounded-md active:scale-[.98] disabled:active:scale-[1] disabled:bg-gray-600"
                                disabled = {isLoading}
                            >
                                <p className="no-wrap whitespace-nowrap text-white ">
                                { 
                                    isLoading ? 
                                    <Oval visible={true} height="25" width="25" color="#4fa94d" ariaLabel="oval-loading" wrapperStyle={{}} wrapperClass="" /> 
                                :   "Sign up with email"}
                                </p>
                            </button>
                        </div>     
              
                        <div className="flex w-[40%] items-center mt-7">
                            <div className="bg-gray-400 h-[1px] w-full"></div>
                            <p className="p-2">OR</p>
                            <div className="bg-gray-400 h-[1px] w-full"></div>
                        </div>

                        <div className="flex flex-row gap-5 md:w-[45%] items-center justify-center">
                            <div className="max-w-[150px] py-2 px-3 flex justify-between items-center xxs:border-[1px] border-black rounded-lg cursor-pointer">
                                <img 
                                    src={googleLogo}
                                    alt="google logo"
                                    className="h-8 w-8 "
                                /> 
                                <p className="xxs:block hidden mx-2"> Google </p>
                            </div>
                            <div className="max-w-[150px] py-2 px-3 flex justify-between items-center xxs:border-[1px] border-black rounded-lg cursor-pointer">
                                <img 
                                    src={microsoftLogo}
                                    alt="microsoft logo object-cover"
                                    className="h-8 w-8 object-cover"
                                /> 
                                <p className="xxs:block hidden mx-2"> Microsoft </p>
                            </div>
                      
                           
                        </div>                      
                        
                       

                    </div>
                </form>
                 
            </motion.div>

            <motion.div 
                key="signup"
                animate={{opacity:1}}
                initial={{opacity:0.97}}
                transition={{
                    duration:0.5,
                    ease:"easeInOut"
                }}
                exit={{opacity:0}}
                className="lg:flex hidden gap-3 flex-col items-center  justify-center w-[45%] overflow-hidden relative">   

                <div className="absolute top-3 right-0 flex items-center gap-5 mr-4">
                    <p className="text-white text-sm font-extralight">Already have an account ? </p>
                    <Link to="/login" className="text-white font-extralight border-[1px] border-white px-2 rounded-md"> Login </Link>
                </div>
                <div className=" text-center">
                    <p className="text-white text-[2.3rem] ">Sign up <br/> and come on in</p>
     
                </div>

                <div className="xl:w-[350px] w-[300px] xl:h-[350px] h-[300px] mt-3">
                    <img
                        src={signupImage}
                        alt="signupImage"
                        className="object-contain"
                    />
                </div>

                <p className="text-gray-200">&#169; Querify</p>
            </motion.div>

        </motion.div>
    )
}