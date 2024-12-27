import { IoPersonSharp,IoMdAdd,IoIosSearch, IoSettings, MdKeyboardArrowRight, IoIosLogOut, SiGoogleanalytics} from "../assets/assets";
import { BsFillPersonFill } from "react-icons/bs";
import React,{useState} from "react";
import { Tooltip } from "@mui/material";
import { NavLink,useNavigate } from "react-router-dom";
import useFormsStore from "../stores/FormsStore";
import useUserStore from "../stores/UserStore";
import toast from "react-hot-toast";
import usePopupStore from "../stores/PopupStore";
import {motion, AnimatePresence} from "framer-motion"
import { ClipLoader } from "react-spinners";
export default function Sidebar(){

    const navigate = useNavigate();

    const formsData = useFormsStore((state) => state.formsData);

    const userDetails = useUserStore((state)=> state.userDetails);

    const {showLogout, setShowLogout} = usePopupStore( (state)=>({
        showLogout: state.showLogout,
        setShowLogout: state.setShowLogout,
    }));


    // var userDetails = localStorage.getItem("userDetails");
    // userDetails = JSON.parse(userDetails);
    // console.log("user" ,userDetails);
    // give flex grow to scroller in project and enable scroll over whole sidebar for smaller devices


    
    return (

        <AnimatePresence mode="wait">
            <motion.div 
                className=" w-full overflow-y-auto  flex flex-col sidebar-container mt-3" 
                animate={{opacity:1}}
                initial={{opacity:0}}
                exit={{opacity:0}}
                key="sidebar"
            >

                {/* Searchbar */}
                <div className="h-[40px] flex justify-center items-center p-[16px] ">

                    <div className="w-full flex items-center justify-center bg-[#f0f0f0] rounded-md mt-2">
                        <IoIosSearch className="text-gray-700"/>
                        <input
                            type="text"
                            className="h-[30px] rounded-md bg-[#f0f0f0] outline-none pl-2 text-sm text-black"
                            placeholder="Find your data here"
                        /> 

                    </div>
                </div>

                
                    
                    {/* Subheading */}
                    <div className="flex h-[50px] w-full items-center justify-between p-[16px] pt-[40px]">
                        <div className="flex items-center gap-3 ">   
                            <BsFillPersonFill className=" text-sm fill-[#737373]"  />
                            <Tooltip
                                title="Your projects"
                                arrow={true}
                            >
                                <p className="text-sm tracking-wide font-semibold text-[#737373]">PROJECTS</p>
                            </Tooltip>
                            
                        </div>

                        <Tooltip
                            title="Add new project"
                            arrow={true}
                        >
                            <div 
                                className="bg-[#e3e3e3] w-8 h-8 flex justify-center items-center rounded-md cursor-pointer"
                                onClick={()=> navigate("/templateBank")}
                            > 
                                <IoMdAdd/>
                            </div>
                        </Tooltip>
                        
                    </div>  


                    {/* scroller */}
                    <div className=" h-[50%] flex-grow flex-col overflow-y-scroll sidebar-scroll relative pt-[20px]">

                    {
                        formsData 
                        && 
                        formsData.map((form)=>(
                            <div 
                                key={form._id} 
                                className="flex justify-between items-center h-[45px] text-sm  cursor-pointer hover:bg-[#f0f0f0] p-4 hover:text-black transition-all ease-in-out duration-200" 
                                onClick={()=> navigate(`/form/${form._id}`)}
                            > 
                                <p className=" text-[#737373] whitespace-nowrap w-full overflow-hidden text-[14px]">{form.title.length >= 24 ? `${form.title.substr(0,24)}...` : form.title}</p>
                                <p className="text-[#737373] text-[14px]">{form.responses.length}</p>
                            </div>
                        ))
                    }
                        
                        
                        
                        
                    </div>

                <div className="h-[50px] w-full border-t p-[16px] cursor-pointer hover:bg-[#f0f0f0] hover:text-black transition-all ease-in-out duration-200">
                    <div className=" settings_scrollbar h-full w-full flex justify-between items-center"> 
                        <div className="flex jusitify-center items-center gap-3">
                            <SiGoogleanalytics  className="text-lg fill-[#898989]" />
                            <p className="text-[14px] font-[400]">Analytics</p>
                        </div>
                        <div className="arrow_right">
                            <MdKeyboardArrowRight/>
                        </div>                    
                    </div>
                </div>

                {/* Account */}
                <div className="relative h-[150px] w-[256px] p-[16px] border-t flex flex-col gap-4 border-b pb-0">
                
                        <div class="pulsating-circle left-[50%] top-0 translate-x-[-50%]"></div>
    
                        <div className="flex items-center "> 
                            <p className="font-bold text-[17px]">{userDetails?.name}'s &nbsp;</p>
                            <p>account</p>
                        </div>
                        
                        <div className="flex flex-col gap-3  w-full">

                            <p className="text-md text-[#737373]">Current Level</p>
                            <div className="h-[4px] w-full bg-[#f0f0f0] rounded-full ">
                                <div className={`h-[4px] w-[${((!userDetails ? 0 : userDetails.level )/10)*10}%] bg-[#0287af] rounded-full`} > </div>                     
                            </div>
                            <div className="flex gap-1 items-center">
                                <p className="text-lg font-semibold">{userDetails?.level}</p>
                                <p className="text-xs text-[#737373]">/10</p>
                            </div>    
                        </div> 
                        
                </div>

                
                <div className="h-[50px] w-full border-b p-[16px] cursor-pointer hover:bg-[#f0f0f0] hover:text-black transition-all ease-in-out duration-200">
                    <div 
                        className="settings_scrollbar h-full w-full flex justify-between items-center"
                        onClick={()=> setShowLogout(true)}
                    > 
                        <div className="flex justify-center items-center gap-3">
                            <IoIosLogOut  className="text-lg  fill-red-500 font-[500]" />
                            <p className="text-[14px] font-[400]">Log out</p>
                        </div>
                        <div className="arrow_right">
                            <MdKeyboardArrowRight/>
                        </div>                    
                    </div>
                </div>
                
            </motion.div>
        </AnimatePresence>
    )
}

