import { IoIosSearch,IoIosArrowDown,FaMoneyCheckDollar,MdSentimentVerySatisfied,RiGovernmentLine,MdLocalHospital,MdSchool ,heroDevice, FaVirusCovid,MdDiversity3} from "../assets/assets";
import { useState,useEffect } from "react";
import useTemplateStore from "../stores/templateStore";
import { capitalize } from "@mui/material";
import useQueStore from "../stores/QueStore";
import useFormStore from "../stores/FormStore";



export default function DropDownF (){

    const data = [2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72];

    const [isDropDown, setIsDropDown] = useState(false);


    const {visualData,updateVisualData} = useFormStore((state)=> ({
        visualData:state.visualData,
        updateVisualData:state.updateVisualData
    }));
 
    return(
        <div className={` h-[30px] w-[240px] flex justify-between items-center rounded-sm ${isDropDown && "rounded-b-[0px]"} bg-[#fff] border-[1px] border-[#bbbbbb] cursor-pointer relative`} >

            <div className="flex justify-between items-center h-full w-full hover:bg-gray-200 transition-all duration-200"  onClick={()=> setIsDropDown((prev)=>!prev)}>
                <p className="ml-2 text-[14px] whitespace-nowrap overflow-hidden">
                    {visualData.fontSize}
                </p>

                <div className="mr-2">
                    <IoIosArrowDown className="fill-[#737373]"/>
                </div>
            </div>


            <div className={`${ isDropDown ? "h-[250px]" : "h-0"} w-full overflow-y-scroll z-[99]  absolute top-[100%] left-0 bg-[#fff] ${isDropDown && "border border-[#bbbbbb]"}  overflow-hidden rounded-b-md transition-height bg-white `}>

                {
                    data.map((value)=>(
                        <div className="flex bg-white  justify-between items-center h-[40px] w-full border-b" onClick={()=> {updateVisualData({fontSize:value + "px"}); setIsDropDown((prev)=> !prev)}}>
                            <p className="ml-2  bg-white text-[13px]">{value}px</p>
                        </div>
                    ))
                }
                
                

                

            </div>

        </div>
    )
}