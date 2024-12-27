import React,{useEffect,useState} from "react"
import OtpInput from "otp-input-react"
import image from "../assets/bench-accounting-nvzvOPQW0gc-unsplash.jpg"

import axios from "axios";
import toast from "react-hot-toast";
import useSignupStore from "../stores/SignupStore";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { OtpImg } from "../assets/assets";
export default function Otp(){

    const navigate = useNavigate();

    const [otp, setOtp] = useState(null);
    const [isLoading_otp, setLoading_otp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [timeLeft , setTimeLeft] = useState(300);


    const formData = useSignupStore( (state)=> state.formData);



    const postData = async()=>{
        setIsLoading(true);
        try{
            const data = { ...formData, otp };
            console.log("data with otp is ------->" ,data);

            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/signup`,data);

            console.log(response);


            toast.success("Signup successfull", {
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

            navigate("/login")

        }
        catch(err){

            console.error(err);

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

    const formSubmit = async (e)=>{
        e.preventDefault();
        
        postData(); 
        
    }

    // const getOtp = async()=>{
    //     setLoading_otp(true);
    //     try{
    //         const email = formData.email;

    //         const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/sendOtp`,{email});

    //         console.log("response " + response);

    //         toast.success("Otp send succesfully", {
    //             style: {
    //               border: '1px solid #713200',
    //               padding: '6px',
    //               color: '#713200',
    //             },
    //             iconTheme: {
    //               primary: '#713200',
    //               secondary: '#FFFAEE',
    //             },
    //           });

    //     }
    //     catch(err){
    //         console.log("'fjkdjaf");
    //         console.log(err);
    //         toast.error("Otp couldn't be sent", {
    //             style: {
    //               border: '1px solid #713200',
    //               padding: '6px',
    //               color: '#713200',
    //             },
    //             iconTheme: {
    //               primary: '#713200',
    //               secondary: '#FFFAEE',
    //             },
    //           });

    //     }
    //     setLoading_otp(false);
    // }




    useEffect(()=>{
        // send otp request 

        

        // set counter
        let counter = setInterval(()=>{

            setTimeLeft((prev)=> {
                if(prev === 0 ) {
                    clearInterval(counter);
                    return 0;
                }
                else return prev -1;
            });

        },1000)


        return () => clearInterval(counter);

    },[])


    const formattedTime = (seconds)=>{

        let remainingMins = Math.floor(seconds/60);

        let remainingSecs = seconds % 60;

        return `${remainingMins} : ${remainingSecs}`
    }

    return(
        <div className="bg-[#ebecee] h-[100vh] w-full flex flex-row">
            
            <form onSubmit={formSubmit} className="w-[800px]  bg-[#fff] md:rounded-tr-xl md:rounded-br-xl flex items-start justify-center relative">

                <div className="flex gap-3 absolute top-2 right-2 ">
                    <div 
                        className="py-1 px-2 border border-black text-black rounded-md min-w-[80px] flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition-all duration-200"
                        onClick={()=> navigate("/login")}
                        >
                        
                        Login
                    </div> 
                    <div 
                        className="py-1 px-2 border border-black text-black rounded-md min-w-[80px] flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition-all duration-200"
                        onClick={()=> navigate("/signup")}
                    > 
                        Signup
                    </div>
                </div>

                <div className=" h-[80%] w-[60%] p-7 flex flex-col gap-7 items-center justify-center">
                    <div className="flex flex-col gap-7 ">
                        <h2 className="text-[2rem] text-center"> Verify Your Email</h2>
                        <p className="text-gray-600 text-center">Enter OTP sent on your email</p>
                    </div>

                    <div className="otp-inp flex flex-col gap-2 justify-center items-center">
                        <OtpInput
                            OTPLength={6}
                            value={otp}
                            onChange={setOtp}
                            autoFocus 
                            otpType="number" 
                            disabled={false} 
                        />
                    </div>

                    
                    <div className="mt-3 flex min-w-[50%] flex-col items-bottom">
                        <button 
                            type="submit" 
                            disabled={isLoading} 
                            className="bg-black min-w-full w-full flex justify-center items-center whitespace-nowrap text-white py-2 px-5 rounded-lg transition-all disabled:bg-gray-600 hover:bg-transparent hover:border hover:border-black hover:text-black active:scale-[0.95] disabled:active:scale-[1]"

                        >

                            { 
                                isLoading ? 
                                <Oval visible={true} height="25" width="25" color="#4fa94d" ariaLabel="oval-loading" wrapperStyle={{}} wrapperClass="" /> 
                                :  "Sign up with email"
                            }

                       
                        </button>
                        <p className=" text-xs self-end mt-2">
                           Time left: {formattedTime(timeLeft)}
                        </p>
                    </div>
                </div> 
            </form>

            <div className="otp-right relative flex gap-3 flex-col items-center bg-[#191919]  justify-center w-0 md:w-[45%] overflow-hidden bg-cover bg-center no-repeat" >   

                <div className=" text-center flex flex-start ">
                    <img className="text-white text-[1.8rem]  translate-x-[-90px]" src={OtpImg} style={{filter: "drop-shadow(5px 5px 5px #876e35)"}}/>
                        
 
                </div>

              
            </div>

        </div>
    )
}












