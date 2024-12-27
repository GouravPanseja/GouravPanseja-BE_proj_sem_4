import Iframe from "react-iframe"
import { useState } from "react";
import {motion} from "framer-motion"
import { MdOutlineCancel ,IoChatbubbles } from "../assets/assets";
export default function Bot (){


    const [showBot, setShowBot] = useState(false);

    
    return(


        <div>

            <div  
                className={`fixed bottom-0 right-0 bg-[#000] py-1 px-3 text-white z-[999] rounded-t-sm cursor-pointer flex gap-3 items-center transition-opacity duration-200 ${ showBot ? "opacity-0": "opacity-100"}`}
                onClick={() =>setShowBot( (prev)=> !prev)}
            ><IoChatbubbles className={`fill-white transition-opacity duration-150 ${ showBot ? "opacity-0": "opacity-100"}`}/>
            
                Bot
            </div>
            <motion.div 
                className="fixed bottom-0 right-0  z-[9999] shadow-xl"
                animate={showBot ? { y : 0, opacity:1 } : { y : "100%", opacity:0} }
                initial={{
                    y:"100%",
                    opacity:0
                }}
                transition={{
                    type:"spring",
                    damping:8,
                    stiffness:60
                }}
                drag={true}
            >

                <div 
                    className=" bot_cross_cont absolute top-3 right-3 h-6 w-6 hover:shadow-xl   flex items-center justify-center hover:bg-gray-300 transition-all duration-200  rounded-full"
                    onClick={()=> setShowBot((prev)=> !prev)}
                > 
                    <MdOutlineCancel className="bot_cross fill-white text-white h-4 w-4 cursor-pointer shadow-md "/>
                    
                </div>
                <Iframe title="bot" className=' rounded-md  h-[400px] w-[300px] ' url="https://web.powerva.microsoft.com/environments/Default-451ec92a-0b41-4561-b1b4-94e638141e07/bots/cr863_querifyBot/webchat?__version__=2" frameborder="0" > </Iframe>
            
            </motion.div>
        </div>
        
    )
}