import { IoMdAdd,FaMinus } from "../assets/assets";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {AnimatePresence, motion } from "framer-motion"
export default function TempSubMenu({templates, title}) {

    const navigate = useNavigate();

    const  [isActiveMenu, setActiveMenu] = useState(false);

  return (


    <div className="flex flex-col h-max cursor-pointer">
      <div
        className={`flex justify-between py-4 ${!isActiveMenu && "border-b border-gray-300"}`}
        onClick={() => setActiveMenu((prev) => !prev)}
      >
        <p className={`${isActiveMenu && "font-semibold"}`}>{title}</p>
        {
            isActiveMenu ? 
            <FaMinus className="text-[14px]"/>
            :
            <IoMdAdd /> 
        }
        
      </div>

      {isActiveMenu && (

        <AnimatePresence>
            <motion.div 
                className={`pt-2 ${isActiveMenu && "border-b border-gray-300"} ml-5`}
                animate={{opacity:1}}
                initial={{opacity:0}}
                exit={{opacity:0}}
                key={title}
                transition={{duration:0.5}}
            >

            {templates.map((temp) => (
                <p
                className={`flex justify-between py-1 text-[14px] cursor-pointer hover:text-gray-300`}
                onClick={() => navigate(`/template/${temp._id}`)}
                >
                {temp.title.replace("Template", "").replace("Survey","")}
                </p>
            ))}

            </motion.div>
        </AnimatePresence>
        

      )}
    </div>
  );
}
