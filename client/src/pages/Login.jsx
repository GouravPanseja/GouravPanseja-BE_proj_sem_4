import React, {useState} from "react";
import "../styles/Signup.css";
import {IoPersonSharp, MdOutlineMailOutline, IoIosLock,FaEye,FaEyeSlash,FaShieldHalved, googleLogo,microsoftLogo,signupImage, RiErrorWarningLine,signinImage} from "../assets/assets";
import {useForm} from "react-hook-form"
import { getValue } from "@testing-library/user-event/dist/utils";
import { useNavigate,Link } from "react-router-dom";
import {Otp} from "./Otp"
import toast from "react-hot-toast";
import axios from "axios";
import useUserStore from "../stores/UserStore";
import {motion} from "framer-motion"
import { Oval } from "react-loader-spinner";
export default function Login(){
    const navigate = useNavigate();

    const [isShowPassword, setIsShowPassword] =  useState(false);
    const [email , setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    var  error = false;

    const [isLoading , setIsLoading] = useState(false);

    const {userDetails, userToken, updateUserDetails, setUserToken} = useUserStore((state)=> ({
        userDetails: state.userDetails,
        userToken:state.userToken,
        updateUserDetails:state.updateUserDetails,
        setUserToken:state.setUserToken
    }));

    // store user credentials
    // store jwt

    const postData = async()=>{
        setIsLoading(true);
        try{    

            console.log(process.env.REACT_APP_BASE_URL);

            const response= await axios.post(`${process.env.REACT_APP_BASE_URL}/login`,{email, password});

            

            console.log(response);

            // update user details in the store
            console.log("from login " ,response.data.userDet);
             

            updateUserDetails(response.data.userDet);

            // update token in the store
            setUserToken(response.data.token);

            // save token and userDetials on local storage
            const local_data = JSON.stringify(response.data.userDet);

            localStorage.setItem("token",response.data.token);
            localStorage.setItem("userDetails",local_data);
            
            toast.success("Login succesful", {
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

            console.log(err);
            error = true;
            toast.error(err?.response?.data?.message || err.message, {
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

    

    const formSubmit = async (e)=>{

        try{
            e.preventDefault();
            console.log(email,password);
            
    
            await postData();
    
            setPassword("");
            setEmail("");
            setIsChecked(false);
    
            !error && navigate("/dashboard");
        }
        catch(err){
            console.log(err);
            setPassword("");
            setEmail("");
            setIsChecked(false);

        }
    }


    return (
        <motion.div 
            className="bg-[#191919] h-[100vh]  w-full flex flex-row "
        >

            {/* left part */}
            <motion.div 
                className="lg:w-[55%] w-full  flex items-center  bg-white lg:rounded-tr-xl lg:rounded-br-xl "
                key="signup"
                animate={{opacity:1}}
                initial={{opacity:0.97}}
                transition={{
                    duration:0.5,
                    ease:"easeInOut"
                }}
                exit={{opacity:0}}
            >

                
                <form onSubmit={formSubmit} className="w-full  p-[20px] flex flex-col justify-center items-center my-auto ">

                    {/* heading */}
                    <div className="flex flex-col justify-center items-center gap-4">
                        <h2 className="heading">Querify</h2>
                        <p className=" text-[0.8rem] sm:[1rem] md:text-[1.3rem] font-extralight text-center text-[#5E5E5E]">Hello, who's this ? </p>
                    </div>
                
                    {/* fields */}
                    <div className="w-full flex flex-col  items-center justify-center ">
                        
            
                        {/* email */}
                        <p className="min-h-7 text-red-500"></p>
                        <div className="flex gap-5 xxs:min-w-[300px] xxs:max-w-[300px] min-w-[250px] max-w-[250px] items-center justify-center border-[1px] border-black px-2 rounded-md">
                          
                            <label htmlFor="email">
                                <MdOutlineMailOutline className="text-xl"/>
                            </label>
                            <input 
                                type="email" 
                                name="email" 
                                id="email"
                                placeholder="Email" 
                                className="outline-none p-2 w-full h-[45px]"
                                value={email}
                                onChange = {(e)=> setEmail(e.target.value)}
                               
                            />
                        </div>
                        
                        {/* password */}
                        <p className="min-h-7 text-red-500"></p>
                        <div className="flex gap-5  xxs:min-w-[300px] xxs:max-w-[300px] min-w-[250px] max-w-[250px] items-center justify-center border-[1px] border-black px-2 rounded-md">
                            
                            <label htmlFor="pass">
                                <IoIosLock className="text-xl"/>
                            </label>

                            <input 
                                type={`${isShowPassword ? "text" : "password"}`} 
                                name="password" 
                                id="pass"
                                placeholder="Password" 
                                className="outline-none p-2 w-full h-[45px]"  
                                value={password}
                                onChange = {(e)=> setPassword(e.target.value)}
                                
                            />
                            {
                                isShowPassword ?
                                <FaEye onClick={()=> setIsShowPassword( prev => !prev)} className="text-[#c3c8ce] cursor-pointer text-md"/>
                                :
                                <FaEyeSlash onClick={()=> setIsShowPassword( prev => !prev)} className="text-[#c3c8ce] cursor-pointer text-md"/>
                            }
                            
                        </div>

                        <div className="mt-2  md:hidden xxs:min-w-[300px] xxs:max-w-[300px] min-w-[250px] max-w-[250px]">
                            <p className="text-sm text-gray-500"> 
                                Don't have an account ? <Link to="/signup" className="underline text-black">Signup</Link>
                            </p>
                        </div>

                        <div className="xxs:min-w-[300px] xxs:max-w-[300px] min-w-[250px] max-w-[250px] mt-4 ">
                            <div className="flex gap-4 items-baseline">
                                <input
                                    type="checkbox"
                                    value={isChecked}
                                    onChange = {()=> setIsChecked((prev) => !prev)}
                                    className="relative translate-y-1"
                                    required={true}
                            
                                />
                                <p className="text-[0.88rem]">
                                    I hereby acknowledge and  <Link className="underline">agree to abide by the terms</Link> set forth by Querify.
                                </p>
                            </div>
                        </div>

                        
                 
                        {/* sign in button */}
                        <div className="flex xxs:min-w-[300px] xxs:max-w-[300px] min-w-[250px] max-w-[250px] items-center justify-center mt-7">
                            <button 
                                className="bg-black w-full flex items-center justify-center text-white px-[4rem] hover:bg-gray-800 transition-all duration-100 py-3 rounded-md active:scale-[.98] disabled:bg-gray-400"
                                disabled = {isLoading}
                            >
                                { 
                                    
                                    isLoading ? 
                                    <Oval className="flex justify-center items-center" visible={true} height="25" width="25" color="#4fa94d" ariaLabel="oval-loading" wrapperStyle={{}} wrapperClass="" /> 
                                    : 
                                    "Signin to continue"
                                }
                      
                            </button>
                        </div>     
                        
                        {/* OR  */}
                        <div className="flex w-[40%] items-center mt-7">
                            <div className="bg-gray-400 h-[1px] w-full"></div>
                            <p className="p-2">OR</p>
                            <div className="bg-gray-400 h-[1px] w-full"></div>
                        </div>
                        
                        {/* other signup options */}
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

            {/* right part */}
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
                    <p className="text-white text-sm font-extralight">New to Querify ? </p>
                    <Link to="/signup" className="text-white font-extralight border-[1px] border-white px-2 rounded-md"> Signup </Link>
                </div>
                <div className=" text-center">
                    <p className="text-white text-[2.3rem] ">Login <br/> and come on in</p>
     
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