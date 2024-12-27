import { useEffect } from "react"
import axios from "axios";
import useFormStore from "../stores/FormStore";
import useQueStore from "../stores/QueStore";
import toast from "react-hot-toast";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useLocation } from "react-router-dom";
import { BsClipboard } from "react-icons/bs";
import { Tooltip } from "@mui/material";
import QRCode from "qrcode.react";
import {FaFacebook,FaLinkedin,FaSquareXTwitter,IoQrCodeOutline,IoMdMail} from "../assets/assets"
import {motion} from "framer-motion"
import Iframe from 'react-iframe'
import useUserStore from "../stores/UserStore";
import { Oval } from "react-loader-spinner";
import { FaCode } from "../assets/assets";
import { ClipLoader } from "react-spinners";
export default function ShareForm(){

    const [showSidebar, setShowSidebar] = useState(false);
    const [screenSize, setScreenSize] = useState(window.innerWidth);

    useEffect( ()=>{

        const handleResize = ()=>{

            const windowSize = window.innerWidth;
            setScreenSize(windowSize);

            console.log(windowSize);
            if(windowSize <= 1020 ){

                setShowSidebar(false);
            }
            else{ setShowSidebar(true)};

        }

        window.addEventListener("resize", handleResize);
        handleResize();

        return ()=> window.removeEventListener("resize",handleResize);

    },[])

    const [showQr, setShowQr] = useState(false);

    const {ques, title} = useQueStore((state)=>({
        ques:state.ques,
        title:state.title
    }))

    const [spLoading, setSpLoading ] = useState(false);

    const [spUrl , setSpUrl] = useState("");

    const [showWeb, setShowWeb] = useState(false);

    const [showSpreadsheet, setShowSpreadsheet] = useState(false);

    const [loading,setLoading] = useState(false);

    const [uniqueLink, setUniqueLink] = useState(null);

    const [view, setView] = useState("desktop");

    const {userDetails} = useUserStore((state)=> ({
        userDetails: state.userDetails,
    }));

    const [sidebarValue, setSidebarValue] =useState("link");


    const {visualData, logicData, logo,setNewForm,newForm} = useFormStore((state)=>({
        visualData: state.visualData,
        logicData: state.logicData,
        logo:state.logo,
        setNewForm: state.setNewForm,
        newForm: state.newForm,
    }));


    const postForm = async ()=>{

        try{
            setLoading(true);
            // form the required data for form creation
            const token = localStorage.getItem("token");


            const data = { 
                quesData:ques,
                title, 
                visualData, 
                expireAt: logicData.expiresAt, 
                startAt: logicData.startAt, 
                participantCount: logicData.participantCount,
            }

            console.log(logo);

            const formData = new FormData();

            formData.append('file',logo);
            formData.append('data',JSON.stringify(data));


            console.log(logo);

            const responseForm = await axios.post(`${process.env.REACT_APP_BASE_URL}/createForm`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                }   
            });
           
            console.log(responseForm.data.data1);

            setNewForm(responseForm.data.data1);

            const baseUrl = window.location.origin;
        
            const link = baseUrl + `/form/${responseForm.data.data1._id}`;
            
            setUniqueLink(link);

            toast.success("form created succesfull", {
                style: {
                  border: '1px solid green',
                  padding: '6px',
                  color: 'green',
                },
                iconTheme: {
                  primary: 'green',
                  secondary: '#FFFAEE',
                },
            });


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
        setLoading(false);
    }


    const copyToClipboard = async (text)=>{

        try{
            await  navigator.clipboard.writeText(text);


            toast.success("Link coppied", {
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

            toast.error("Link can't be coppied", {
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

    const updateSpreadSheet = async()=>{

        setSpLoading(true);

        const token = localStorage.getItem("token");


        try{


            const response =  await axios.post( `${process.env.REACT_APP_BASE_URL}/updateSpreadsheet`,{spUrl, formId: newForm._id}, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(response.data.data);

            toast.success("Integeration succesfull", {
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

            toast.error("something went wrong", {
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

            setSpLoading(false);
            setShowSpreadsheet(false);
    }

    
    const getLatestform = async()=>{

        const token =localStorage.getItem("token");

        console.log("yaaaayyyyyyy" ,token);

        try{

            const result  = await axios.post(`${process.env.REACT_APP_BASE_URL}/latestForm`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });


            console.log("latest form fetched " ,result.data.data);

            setNewForm(result.data.data);

            const baseUrl = window.location.origin;
        
            const link = baseUrl + `/form/${result.data.data._id}`;

            setUniqueLink(link);

            toast.success("Latest form fetched successfully", {
                style: {
                  border: '1px solid green',
                  padding: '6px',
                  color: 'green',
                },
                iconTheme: {
                  primary: 'green',
                  secondary: '#FFFAEE',
                },
            });



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
    }

    useEffect(()=>{

       

            postForm();

  
        
    },[]);


    const mailHandler = ()=>{
        const subject = `participation request for the survey by ${userDetails?.name && ""}`;
        const body = `We request you to spare some time to pariticipate in the survey '${newForm?.title}' by ${userDetails?.name && ""}`
        const link = `mailto:${""}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

        window.open(link);
    }

    console.log(showQr);
    return (
        <div className="h-screen w-screen flex flex-col relative top-[51px]" style={{height:"calc(100vh - 54px)"}}>


            
            {/* sidebar */}
            <div className={` ${showSidebar ? "w-[256px]" : "w-0" }  h-screen fixed left-0 top-[50px]  bg-[#ffffff] border-r overflow-hidden`}>
                <div 
                    className={`h-[50px] border-b flex items-center px-4 text-[15px] ${sidebarValue === "link" && "bg-[#e3e3e3]"} cursor-pointer hover:bg-gray-400 transition-all duration-100`}
                    onClick={()=> setSidebarValue("link")}
                >
                    Share the link
                </div>
                <div 
                    className={`h-[50px] border-b flex items-center  ${sidebarValue === "web" && "bg-[#e3e3e3]"} px-4 text-[15px] cursor-pointer hover:bg-gray-400 transition-all duration-100`}
                    onClick={()=> {setSidebarValue("web"); setShowWeb( (prev)=> !prev)}}
                >
                    Embedded in a webpage
                </div>
                <div 
                    className={`h-[50px] border-b flex items-center  ${sidebarValue === "spreadsheet" && "bg-[#e3e3e3]"} px-4 text-[15px] cursor-pointer hover:bg-gray-400 transition-all duration-100`}
                    onClick={()=> {setSidebarValue("spreadsheet"); setShowSpreadsheet((prev)=> !prev)}}
                >
                    Integerate with spreadsheet
                </div>
            </div>
            
            <Navbar bgColor={"#ffffff"} border={1}/>

            <motion.div className={` ${!showQr && "hidden" }  h-screen w-screen fixed z-[1000] top-0 left-0 bg-[#0000009a] flex items-center justify-center`}>
                <motion.div className="w-[450px] h-[500px] bg-white rounded-lg p-[30px] pt-[30px] flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                        <p className="text-[24px] text-light" > Get the QR Code</p>

                        <p className="text-gray-500 text-[14.5px]">Scan the code to launch your typeform. Works online and offline (though you’ll need a printer, obviously).</p>
                    </div>

                    <div className="w-full h-max py-7 flex items-center justify-center">
                        <QRCode value={uniqueLink} size={220} />
                    </div>
                    <div className="flex gap-3 self-end pt-4">
                        <button className="px-2 py-1 bg-[#e3e3e3] rounded-sm text-[15px]" onClick={()=> setShowQr((prev)=> !prev)}>Cancel</button>
                        <button className="px-2 py-1 bg-black text-white rounded-sm text-[15px]">Download QR code</button>
                    </div>
                </motion.div>
            </motion.div>  

            <motion.div className={` ${!showWeb && "hidden" }  h-screen w-screen fixed z-[1000] top-0 left-0 bg-[#0000009a] flex items-center justify-center`}>
                <motion.div className="w-[450px] h-[350px] bg-white rounded-lg p-[30px] pt-[30px] flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                        <p className="text-[24px] text-light" >Copy the embedded link below</p>

                        <p className="text-gray-500 text-[14.5px]">Embedd the code in your code to display the form</p>
                    </div>

                    <div className="w-full h-max py-7 flex items-center justify-center">

                        <textarea 
                            rows={50}
                            className="max-h-[100px] min-h-max"
                            value={`<iframe title="form" url=${uniqueLink}></iframe>`}
                        />
                        {}
                    </div>
                    <div className="flex gap-3 self-end items-ene pt-4">
                        <button className="px-2 py-1 bg-[#e3e3e3] rounded-sm text-[15px]" onClick={()=> setShowWeb((prev)=> !prev)}>Cancel</button>
                        <button 
                            className="px-2 py-1 bg-black text-white rounded-sm text-[15px] hover:bg-gray-800 active:scale-[0.9] transition-all duration-200"
                            onClick={()=> copyToClipboard(`<iframe title="form" url=${uniqueLink}></iframe>`)}
                        >Copy code</button>
                    </div>
                </motion.div>
            </motion.div>  

            <motion.div className={` ${!showSpreadsheet && "hidden" }  h-screen w-screen fixed z-[1000] top-0 left-0 bg-[#0000009a] flex items-center justify-center`}>
                <motion.div className="w-[450px] h-[350px] bg-white rounded-lg p-[30px] pt-[30px] flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                        <p className="text-[24px] text-light" >Google Spreadsheet Integration</p>

                        <p className="text-gray-500 text-[14.5px]">Put your <a href="https://sheetdb.io/" target="#" className="text-[14.5px] text-gray-800 underline translate-y-[2px] cursor-pointer hover:text-gray-600"> sheetDb </a> api here to integerate with your google sheet</p>
                    </div>

                    <div className="w-full h-max py-7 flex items-center justify-center">

                        <input 
                            type="text"
                            className="max-h-[100px] w-full outline-none p-2 border border-[#2d2d2d] rounded-md"
                            value={spUrl}
                            onChange={(e)=> setSpUrl(e.target.value)}
                            
                        />
                        {}
                    </div>
                    <div className="flex gap-3 self-end items-center pt-4 h-[80px]">
                        <button className="px-2 py-1  max-h-full bg-[#e3e3e3] rounded-sm text-[15px]" onClick={()=> setShowSpreadsheet((prev)=> !prev)}>Cancel</button>
                        <button 
                            className="px-2 py-1 max-h-full min-w-[150px] flex items-center justify-center rounded-sm bg-black text-white text-[15px] hover:bg-gray-800 active:scale-[0.9] transition-all duration-200"
                            onClick={updateSpreadSheet}
                        >
                            {
                                spLoading ?
                                <Oval visible={true} height="25" width="25" color="#4fa94d" ariaLabel="oval-loading" wrapperStyle={{fill:"white"}} wrapperClass="" /> 
                                : "Sign up with email"
                            }
                        </button>
                    </div>
                </motion.div>
            </motion.div>  
        
        {
            !loading ?

                <div className={`h-screen ${showSidebar ? "ml-[256px]" : " w-screen"} bg-[#fafafa]  flex flex-col gap-3`} >

                    <div className="w-full py-3 px-5  flex flex-col gap-[30px]">
                        
                        {/* // heading */}
                        <div className="w-full pt-3">
                            <p className="xs:text-[24px] xxs:text-[20px] text-[18px]"> Your Form has been successfully created!</p>
                        </div>

                        {/* // input & icons */}
                        <div className="flex flex-col  h-max gap-[30px] justify-center  ">
                            <div className="flex gap-5 items-center">
                                {/* // input field */}
                                <div className=" flex items-center h-[30px] bg-gray-200  border border-black border-l-0 ">
                                    <input 
                                        type="text" 
                                        value={uniqueLink}  
                                        className={` text-black outline-none px-2   max-w-[300px] xxs:min-w-[300px] min-w-[200px] min-h-[30px] bg-gray-50 border border-black text-[14px]`}
                                        placeholder="Click button to generate form url"
                                    />

                                    <Tooltip
                                        title="Copy to clipboard"
                                        arrow={true}
                                    >
                                        <div 
                                            className={`text-[15px] h-full px-2  text-white bg-black min-h-[25px] whitespace-nowrap cursor-pointer  flex items-center hover:bg-gray-700 transition-all duration-200 active:scale-[0.80] justify-center`}
                                            onClick={()=>copyToClipboard(uniqueLink)}
                                        > 

                                        copy link
                                     </div>
                                    </Tooltip>
                                    
                                </div>

                                <div className={`flex gap-5 ${screenSize < 568 && "hidden"}`}>
                                    <Tooltip  title="QR code" arrow={true}> 
                                        <div onClick={()=> setShowQr((prev)=> !prev)} >
                                            <IoQrCodeOutline className="text-[20px] cursor-pointer"/>
                                        </div>
                                    
                                    </Tooltip>                             
                                
                                    <Tooltip  title="Mail" arrow={true}> 
                                        <div >
                                            <IoMdMail className="text-[22px] cursor-pointer" onClick={mailHandler}/>
                                        </div>
                                    
                                    </Tooltip>                             
                                
                                </div>  
                            </div>

                        </div>
                        {/* share icons */}
                        <div className="flex gap-4 items-center">

                            <p className="xxs:text-[20px] text-[14px] text-[#8b8b8b]">Share via</p>

                            <div className="flex gap-4">
                                <Tooltip  title="Facebook" arrow={true}> 
                                    <div>
                                        <FaFacebook className="fill-[#1972ec] text-[20px] cursor-pointer"/>
                                    </div>
                                   
                                </Tooltip>
                                <Tooltip  title="LinkedIn" arrow={true}> 
                                    <div>
                                        <FaLinkedin className="fill-[#0b65c2] text-[20px] cursor-pointer"/>
                                    </div>
                                   
                                </Tooltip>
                                <Tooltip  title="Twitter" arrow={true}> 
                                    <div>
                                        <FaSquareXTwitter className="fill-[#000000] text-[20px] cursor-pointer"/>
                                    </div>
                                   
                                </Tooltip>
                                <Tooltip  title="Embed in code" arrow={true}> 
                                    <div 
                                        className={`cursor-pointer ${showSidebar && "hidden"}`} 
                                        onClick={()=> setShowWeb( (prev)=> !prev)}
                                    >
                                        <FaCode className="text-[22px] cursor-pointer " onClick={FaCode}/>
                                    </div>
                                    
                                </Tooltip>  
                                <Tooltip  title="Sheets" arrow={true}> 
                                    <div 
                                        className={`cursor-pointer ${showSidebar && "hidden"}`}
                                        onClick={()=> setShowSpreadsheet( (prev)=> !prev)}
                                    >
                                        <svg height="23"  width="24" viewBox="0 0 212 283"><g fill="none" fill-rule="evenodd"><path d="M17 0h124l71 71v195c0 9.389-7.611 17-17 17H17c-9.389 0-17-7.611-17-17V17C0 7.611 7.611 0 17 0z" fill="#13A562"></path><g fill="#F1F1F1"><path d="M55 158h103v12H55z"></path><path d="M101 138h12v83h-12z"></path><path d="M55 188h103v12H55z"></path><path d="M60 142v75h93v-75H60zm-12-12h117v99H48v-99z" fill-rule="nonzero"></path></g><path d="M146 66l66 67V70.992z" fill="#049052"></path><path d="M141 0l71 71h-54c-9.389 0-17-7.611-17-17V0z" fill="#8BD1AF"></path></g></svg>
                                    </div>
                                    
                                </Tooltip> 
                                <Tooltip  title="QR code" arrow={true}> 
                                    <div onClick={()=> setShowQr((prev)=> !prev)} >
                                        <IoQrCodeOutline className={`text-[20px] cursor-pointer xs:hidden`}/>
                                    </div>
                                    
                                </Tooltip>                             
                                
                                <Tooltip  title="Mail" arrow={true}> 
                                    <div >
                                        <IoMdMail className="text-[22px] cursor-pointer xs:hidden" onClick={mailHandler}/>
                                    </div>
                                    
                                </Tooltip>  
                                 
                            </div>


                        </div>
                                                      
                    </div>

                    <div className=" w-full items-center gap-6  flex justify-center flex-col">
                        <div>
                            <Iframe 
                                title="form" 
                                url={ `${uniqueLink}`} 
                                height="450px" 
                                width={ 
                                    view === 'desktop' && screenSize >= 1120 ? 850 :  
                                    view === 'desktop' && screenSize >= 756 ? 670 :  
                                    view === 'desktop' && screenSize >= 568 ? 500 :
                                    view === 'mobile' ? 350 : null
                                    } className="rounded-md " styles={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}></Iframe >
                        </div>
                        
                        <div className={`flex ${screenSize < 568 && "hidden"}`}>
                            <div 
                                className={`px-2 ${ view === "desktop" ? "bg-[#737373] text-white" : "bg-gray-200 text-black hover:bg-gray-300"} shadow-r cursor-pointer py-1 rounded-l-sm text-[15px]`}
                                onClick={()=> setView("desktop")}
                            >
                                Desktop
                            </div>
                            <div 
                                className={`px-2 py-1 ${view === "mobile" ? "bg-[#737373] text-white" : "bg-gray-200 text-black hover:bg-gray-300"}  cursor-pointer  rounded-r-sm`}
                                onClick={()=> setView("mobile")}
                            >
                                Mobile
                            </div>
                        </div> 
                    </div>

                </div>


            :
            <ClipLoader color="#000000" className="absolute top-[50%] left-[50%]" />
        }

           
        </div>
    )
}