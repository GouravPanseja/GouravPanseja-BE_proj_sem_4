import { IoIosSearch,IoIosArrowDown,FaMoneyCheckDollar,MdSentimentVerySatisfied,RiGovernmentLine,MdLocalHospital,MdSchool ,heroDevice, FaVirusCovid,MdDiversity3} from "../assets/assets";
import { useState,useEffect } from "react";
import useTemplateStore from "../stores/templateStore";
import { capitalize } from "@mui/material";
import {fonts} from "../data/fonts";
import useQueStore from "../stores/QueStore";
import useFormStore from "../stores/FormStore";
import useFormsStore from "../stores/FormsStore";
import {motion} from "framer-motion"

export default function DropDownD (){

    const {formsData,updateFormsData} = useFormsStore( (state)=>({
        formsData : state.formsData,
        updateFormsData: state.updateFormsData,
    }))

    const [isDropDown, setIsDropDown] = useState(false);

    const [selected, setSelected]  = useState("Sort");

    useEffect((prev)=>{

        if(selected === "alpha"){
            updateFormsData( [ ...formsData.sort( ( a, b)=> a.title.localeCompare(b.title))])
        }
        else if(selected === "date"){
            updateFormsData( [ ...formsData.sort( ( a, b)=>  new Date(a.createdAt) - new Date(b.createdAt))])
        }
        else if(selected === "responses"){
            updateFormsData( [ ...formsData.sort( ( a, b)=> b.responses.length -  a.responses.length)])
        }


    },[selected])

 
    return(
        <div className={` h-[33px] w-[160px] flex justify-between rounded-md items-center  ${isDropDown && "rounded-b-[0px]"} bg-[#fff]  cursor-pointer relative`} >

            <div className={`flex justify-between bg-[#e3e3e3] rounded-md  border-0  ${isDropDown && "rounded-b-[0px]"} items-center h-full w-full hover:bg-zinc-300 transition-all duration-200`}  onClick={()=> setIsDropDown((prev)=>!prev)}>
                <p className="ml-2 text-[14px] whitespace-nowrap overflow-hidden">
                    {selected}
                </p>

                <div className="mr-2">
                    <IoIosArrowDown className="fill-[#737373]"/>
                </div>
            </div>

 
            <motion.div 
                className={` w-full overflow-y-scroll z-[99] bg-[#e3e3e3]  absolute top-[100%] left-0  overflow-hidden rounded-b-md transition-height `}
                animate={ isDropDown ? {height: "max-content"} : {height : "0px"}}
            >


              
                <div className="flex bg-[#e3e3e3] justify-between items-center  h-[40px] w-full border-b" onClick={()=> { setSelected( "alpha"); setIsDropDown((prev)=> !prev)}}>
                    <p className="ml-2 text-[14px] bg-[#e3e3e3] ">Alphabatically</p>
                   
                </div>
                <div className="flex bg-[#e3e3e3]  justify-between  items-center h-[40px] w-full border-b" onClick={()=> { setSelected( "date"); setIsDropDown((prev)=> !prev)}}>
                    <p className="ml-2 text-[14px] bg-[#e3e3e3] ">Date created</p>
                </div>
                <div className="flex bg-[#e3e3e3]  justify-between  items-center h-[40px] w-full border-b" onClick={()=> { setSelected( "responses"); setIsDropDown((prev)=> !prev)}}>
                    <p className="ml-2 text-[14px] bg-[#e3e3e3] ">Responses</p>
                </div>
   
            </motion.div>

        </div>
    )
}