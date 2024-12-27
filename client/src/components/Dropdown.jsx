import { IoIosSearch,IoIosArrowDown,FaMoneyCheckDollar,MdSentimentVerySatisfied,RiGovernmentLine,MdLocalHospital,MdSchool ,heroDevice, FaVirusCovid,MdDiversity3} from "../assets/assets";
import { useState,useEffect } from "react";
import useTemplateStore from "../stores/templateStore";
import { capitalize } from "@mui/material";
import {motion} from "framer-motion"
export default function Dropdown (){

    const [isDropDown, setIsDropDown] = useState(false);
    const [dropDownValue, setDropDowValue] = useState("All")

    const {updateCategory, category} = useTemplateStore((state)=> ({
        updateCategory:state.updateCategory,
        category:state.category,
    }))

    const update = (category)=>{
        updateCategory(category);
        setIsDropDown((prev) => !prev);
    }

    const arr = ["Education" , "Healthcare","Customer","Government" ,"Market", "Diversity", "Covid-19", "All"]
 
    return(
        <div className={` sm:h-full h-[50px] sm:w-[240px] w-full rounded-md ${isDropDown && "rounded-b-[0px]"} bg-[#ffffff] cursor-pointer relative z-8`} style={{zIndex:"10"}} >

            <div className={`flex justify-between items-center w-full sm:h-full h-[50px] shadow-md transition-all duration-200  border-gray-400 rounded-md `}  onClick={()=> setIsDropDown((prev)=>!prev)}>
                <p className="ml-2 text-[14px]">
                    {category}
                </p>

                <div className="mr-2">
                    <IoIosArrowDown/>
                </div>
            </div>


            <motion.div 
                className={` sm:w-[240px] w-full  absolute top-[40px] left-0 bg-[#ffffff] overflow-hidden rounded-b-md transition-all duration-500 shadow-lg`}
                animate={ isDropDown ? { height :"340px"} : {height : 0}}
                transition={{
                    type:"tween",
                    duration:0.01,
                    delay:0
                }}
            >
                {
                    arr.map((elem)=>(
                        <div className="flex  justify-between items-center h-[40px] w-full border-b hover:bg-zinc-300 transition-all duration-200" onClick={()=> update(elem.toLowerCase())}>

                            <p className="ml-2 text-[14px]">{elem}</p>

                            <div className="mr-2"> </div>
                        </div>
                    ))
                }
                

                

            </motion.div>

        </div>
    )
}