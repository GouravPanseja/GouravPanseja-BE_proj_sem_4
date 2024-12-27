import { useNavigate } from "react-router-dom"
import {motion} from "framer-motion"
import useAlanStore from "../stores/AlanStore";

export default function TemplateCard ({template}){

    const {currentTemp} = useAlanStore((state)=>({
        currentTemp : state.currentTemp,
    }))

    
    
    const navigate = useNavigate();

    const clickHandler = ()=>{
        console.log("hie");
        navigate(`/template/${template._id}`)
    }
    //  ${template === currentTemp ? "border-[#024f95]": "border-transparent"}
    return (

            <motion.div 
                animate={{opacity:1}}
                initial={{opacity:0}}
                exit={{opacity:0}}
                key={template.title}
                className={`form_card xl:h-[280px] xl:w-[256px] h-[280px] w-[256px] md:h-[240px] md:w-[220px] rounded-lg bg-white  border-b-2 ${template === currentTemp ? "border-[#024f95] shadow-lg": "border-transparent"} cursor-pointer tempCard z-[0]  transition-all duration-300 relative top-2 overflow-hidden1`}
                style={{}}
                onClick={clickHandler}
            >

                <div className="h-[55%] w-full rounded-t-lg overflow-hidden">
                    <motion.img 
                        whileHover={{scale:1.4}}
                        transition={{
                            ease:"easeInOut",
                            
                        }}
                        src={template.thumbnail}
                        alt="tempImg"
                        className="h-full w-full object-cover rounded-t-lg"
                    />
                </div>

                <div className="w-full p-[12px] ">
                    <h5 className="text-[14px] tracking-tight mb-2">{template.title}</h5>

                    <p className="text-[12px] hidden xl:block text-[#5E5E5E] ">{template.description.length >= 80 ? template.description.substr(0,80) + "...": template.description}</p>
                    <p className="text-[12px] block xl:hidden text-[#5E5E5E]  ">{template.description.length >= 50 ? template.description.substr(0,50) + "...": template.description}</p>
                </div>  
            </motion.div>
    )
}