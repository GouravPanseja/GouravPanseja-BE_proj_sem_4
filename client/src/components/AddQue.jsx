import {motion} from "framer-motion"
import { useState } from "react";
import useQueStore from "../stores/QueStore";
import update from "../utils/updateQue";
import {MdDelete, IoMdAdd} from "../assets/assets"

export default function AddQues({idx, visible}){
    const [menuOpen, setIsMenuOpen] = useState(false);

    const {ques, updateQues, deleteQue,setCurrQue} = useQueStore((state)=>({
        setCurrQue:state.setCurrQue,
        ques:state.ques,
        updateQues:state.updateQues,
        deleteQue:state.deleteQue,
    }))


    return(


        <div className={` absolute right-0 z-[99] addBtn w-max h-max  ${ visible ? "block" : "hidden"}`}>

            <div>
                
            </div>
            <div className="flex ">
                <div 
                    className=" w-[50px] h-7  rounded-bl-none border-r border-gray-300  bg-gray-400 flex justify-center items-center cursor-pointer hover:shadow-md text-white absoltute transtion-all duration-100 hover:bg-slate-300"
                    onClick = {()=> setIsMenuOpen((prev)=> !prev)}
                >
                    <IoMdAdd className="fill-black"/>
                </div>
                <div 
                    className=" w-[50px] h-7  rounded-bl-none  bg-gray-400 flex justify-center items-center cursor-pointer hover:shadow-md text-white absoltute transtion-all duration-100  hover:bg-slate-300"
                    onClick = {()=> {
                            deleteQue(idx-1) ;
                            setCurrQue(ques[idx-2]);
                            }}
                >
                    <MdDelete className="fill-black"/>
                </div>
            </div>
            

            <motion.div 
                className= {` ${ menuOpen ? "h-max" : "h-0"}   bg-[#4b5563] flex flex-col  rounded-md rounded-tl-none z-[100] justify-center w-[150px] pl-2 overflow-hidden` } style={{ transition: 'height 0.5s ease-in-out' }}
                animate={menuOpen ?  {height:260} : {height:0}}
                transition={{
                    type:"tween",
                    duration:0.001,

                    }}

                >
                <p 
                    className="text-[14px] text-white py-1 border-b border-gray-200  hover:bg-gray-500 w-full transition-all duration-100 cursor-pointer"
                    onClick={()=>update("checkBox",idx,updateQues)}
                >
                    MCQ
                </p>
                <p 
                    className="text-[14px] text-white py-1 border-b border-gray-200  hover:bg-gray-500 w-full transition-all duration-100 cursor-pointer"
                    onClick={()=>update("date",idx,updateQues)}
                >
                    Date
                </p>
                <p 
                    className="text-[14px] text-white py-1 border-b border-gray-200 hover:bg-gray-500 w-full transition-all duration-100 cursor-pointer"
                    onClick={()=>update("matrix",idx,updateQues)}
                >
                    Matrix
                </p>
                <p 
                    className="text-[14px] text-white py-1 border-b border-gray-200  hover:bg-gray-500 w-full transition-all duration-100 cursor-pointer"
                    onClick={()=>update("email",idx,updateQues)}
                >
                    Email
                </p>
                <p 
                    className="text-[14px] text-white py-1 border-b border-gray-200  hover:bg-gray-500 w-full transition-all duration-100 cursor-pointer"
                    onClick={()=>update("range",idx,updateQues)}
                >
                    Range
                </p>
                <p 
                    className="text-[14px] text-white py-1 border-b border-gray-200  hover:bg-gray-500 w-full transition-all duration-100 cursor-pointer"
                    onClick={()=>update("radio",idx,updateQues)}
                >
                    Radio
                </p>
                <p 
                    className="text-[14px] text-white py-1 border-b border-gray-200  hover:bg-gray-500 w-full transition-all duration-100 cursor-pointer"
                    onClick={()=>update("text",idx,updateQues)}
                >
                    Text
                </p>
                <p 
                    className="text-[14px] text-white py-1 border-b border-gray-200  hover:bg-gray-500 w-full transition-all duration-100 cursor-pointer"
                    onClick={()=>update("textarea",idx,updateQues)}
                >
                    Textarea
                </p>
            </motion.div>


        </div>
        
    )
}