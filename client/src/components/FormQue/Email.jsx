import useEditStore from "../../stores/EditStatus"
import useQueStore from "../../stores/QueStore"
import AddQue from "../AddQue"
import useFormStore from "../../stores/FormStore";
import useResponseStore from "../../stores/ResponseStore";
import {FaArrowRightLong, TiTick,AiOutlineEnter} from "../../assets/assets"
import {motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
export default function  Email({form,que,idx}){


    const controls = useAnimation();

    const clickHandler = ()=>{
        controls.start({
            y:-400,
            opacity:0,
        })
        setTimeout(()=>{
            updateCurrentQue(idx  === form.data.length ? form.data[0] : form.data[idx]);
        },500)
    }

    useEffect(()=>{
        console.log("coming up");
        controls.start({
            y:0,
            opacity:1
        })
    },[])

    const {currentQue, updateCurrentQue, setPopup} = useFormStore((state)=>({
        currentQue : state.currentQue,
        updateCurrentQue: state.updateCurrentQue,
      }))


    const {responses, updateResponses} = useResponseStore( (state)=>({
        
        responses:state.responses,
        updateResponses:state.updateResponses,
    }));

    const scrollNext = ()=>{
        const element = document.getElementById(`form_${idx}`);

        console.log(element);
        element.scrollIntoView();   
    }

    const keyDownHandler= (e)=>{

        if(e.key === "Enter"){
            console.log("Enter is pressed");

            if(idx === form?.data.length){
                setPopup();
                return;
            }
            clickHandler();
        }            
    }

    useEffect(()=>{

        const handleKey = (e)=>{
            if(e.key === "/"){
                console.log("/ pressed");

                const inpField = document.getElementById(`inp${idx}`);
                inpField.focus();
            }
        }
        window.addEventListener("keydown",handleKey)

          return ()=>{ window.removeEventListener("keydown", handleKey)}
    },[])

    return (
        <motion.div 
            className="h-max w-[80%] flex  flex-col gap-1  transition-all duration-100  container que relative"

            animate={controls}

            transition={{
                type:'tween',
                duration:0.4,

            }}
            initial={{
                y:400,
                opacity:0
            }}
        >
           
            <div className="mb-3">
  
                <div
                    className="w-full h-max p-2 pl-0 text-[24px] italic relative" style={{color:form.visualData.queColor, fontFamily:form.visualData.fontFamily, fontSize:form.visualData.fontSize}}
                > 
                    <div className="absolute top-2 right-[100%] gap-2 flex items-center mr-2 w-max" style={{color:form.visualData.queColor}}>
                        <p className="text-black " style={{color:form.visualData.queColor}}>{idx}</p>
                        <FaArrowRightLong className="font-thin" style={{fill:form.visualData.queColor}}/>
                    </div>
                   
                    {form.data[idx-1]?.statement}
                </div>
                    
            </div>


            <div className="flex flex-col gap-4 w-full">
                <input 
            
                    type="email"
                    id={`inp${idx}`}
                    className="border-b border-zinc-700 w-full h-[40px] p-2  pl-0 bg-transparent"
                    style={{fontSize:form.visualData.fontSize, borderColor:form.visualData.queColor}}
                    value={responses[`q${idx-1}`]}
                    placeholder="@gmail.com..."
                    onKeyDown={keyDownHandler}
                    onChange={(e)=> updateResponses({[`q${idx-1}`] : e.target.value})}
                />
                <div className="flex gap-2">
                    {

                        idx !== form.data.length ?
                        <div 
                            className="flex gap-2 items-center py-1  w-[60px] rounded-sm justify-center hover:bg-[#2a61bb]  cursor-pointer" style={{backgroundColor:form.visualData.queColor}}
                            onClick={clickHandler}
                        >
                            
                            <p className="text-white text-[14px] ">OK</p>
                            <TiTick className="text-[16px] fill-white font-thin"/>
                        </div>
                        :
                        <button 
                            className="flex gap-2 items-center py-1   w-[90px] text-white rounded-sm justify-center hover:bg-[#2a61bb] cursor-pointer" style={{backgroundColor:form.visualData.queColor}}
                            onClick={clickHandler}
                        >
                            
                            Submit
                            
                        </button> 
                    }

                    <div className="flex gap-1 items-center text-[14px]">press <span className="font-semibold">enter</span> <div><AiOutlineEnter className="font-semibold"/></div></div>
                </div>

            </div>

            

        </motion.div>
    )
}
