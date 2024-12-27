import { IoIosSearch,IoIosArrowDown,FaMoneyCheckDollar,MdSentimentVerySatisfied,RiGovernmentLine,MdLocalHospital,MdSchool ,heroDevice, FaVirusCovid,MdDiversity3} from "../assets/assets";
import { useState,useEffect } from "react";
import useTemplateStore from "../stores/templateStore";
import { capitalize } from "@mui/material";
import {fonts} from "../data/fonts";
import useQueStore from "../stores/QueStore";
import useFormStore from "../stores/FormStore";

export default function DropDownB (){

    const [isDropDown, setIsDropDown] = useState(false);

    const [selected, setSelected]  = useState("Arial, sans-serif");


    const {visualData,updateVisualData} = useFormStore((state)=> ({
        visualData:state.visualData,
        updateVisualData:state.updateVisualData
    }));
 
    return(
        <div className={` h-[30px] w-[240px] flex justify-between items-center rounded-sm ${isDropDown && "rounded-b-[0px]"} bg-[#fff] border-[1px] border-[#bbbbbb] cursor-pointer relative`} >

            <div className="flex justify-between items-center h-full w-full hover:bg-gray-200 transition-all duration-200"  onClick={()=> setIsDropDown((prev)=>!prev)}>
                <p className="ml-2 text-[14px] whitespace-nowrap overflow-hidden">
                    {visualData.fontFamily}
                </p>

                <div className="mr-2">
                    <IoIosArrowDown className="fill-[#737373]"/>
                </div>
            </div>


            <div className={`${ isDropDown ? "h-[250px]" : "h-0"} w-full overflow-y-scroll z-[99]  absolute top-[100%] left-0 bg-[#fff] ${isDropDown && "border border-[#bbbbbb]"}  overflow-hidden rounded-b-md transition-height bg-white `}>

                {
                    fonts.map((font)=>(
                        <div className="flex bg-white  justify-between items-center h-[40px] w-full border-b" onClick={()=> {updateVisualData({fontFamily:font}); setIsDropDown((prev)=> !prev)}}>
                            <p className="ml-2 text-[14px] bg-white">{font}</p>
                        </div>
                    ))
                }

            </div>

        </div>
    )
}