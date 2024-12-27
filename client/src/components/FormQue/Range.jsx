import { useState, version,useEffect } from "react";
import useEditStore from "../../stores/EditStatus"
import AddQues from "../AddQue";
import useQueStore from "../../stores/QueStore";
import useFormStore from "../../stores/FormStore";
import useResponseStore from "../../stores/ResponseStore";
import {FaArrowRightLong, TiTick,AiOutlineEnter} from "../../assets/assets"
import {motion,useAnimation} from "framer-motion"
export default function  Range({que,form,idx}){


    const controls = useAnimation();

    const clickHandler = ()=>{
        controls.start({
            y:-400,
            opacity:0,
        })
        setTimeout(()=>{
            if(idx === form?.data.length){
                setPopup();
                return;
            }
            updateCurrentQue(idx  === form.data.length ? form.data[0] : form.data[idx]);
        },500)
    }

    useEffect(()=>{
        controls.start({
            y:0,
            opacity:1
        })
    },[])

    const arr = [];

    for(var i = que.rangeMin; i <= que.rangeMax; i++){
        arr.push(i);
    }

    const {currentQue, updateCurrentQue, setPopup} = useFormStore((state)=>({
        currentQue : state.currentQue,
        updateCurrentQue: state.updateCurrentQue,
        setPopup:state.setPopup,
      }))

    const {responses, updateResponses} = useResponseStore( (state)=>({
        
        responses:state.responses,
        updateResponses:state.updateResponses,
    }));

    
    return (
        <motion.div 
            className="h-max w-[80%] flex  rounded-lg  flex-col relative mb-3    transition-all duration-100"
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
          
            <div className="w-full h-full mb-3">

                <p 
                    className="w-full h-max p-2 pl-0 text-[24px] italic relative" style={{color:form.visualData.queColor, fontFamily:form.visualData.fontFamily, fontSize:form.visualData.fontSize}}
                > 
                    <div className="absolute top-2 right-[100%] flex gap-2 items-center mr-2 w-max" style={{color:form.visualData.queColor}}>
                        <p className="text-black " style={{color:form.visualData.queColor}}>{idx}</p>
                        <FaArrowRightLong className="font-thin" style={{fill:form.visualData.queColor}}/>
                    </div>
                    
                    {form.data[idx-1]?.statement}
                </p>
            </div>

            <div className="w-full mt-7">

                
                <input
                    type="range" 
                    min={que.rangeMin} 
                    max={que.rangeMax} 
                    onMouseUp={clickHandler}
                    className="slider que w-full"
                    style={{borderColor:form.visualData.buttonColor, fontFamily:form.visualData.fontFamily}}
                    value={responses[`q${idx-1}`]}
                    onChange={(e)=> updateResponses({ [`q${idx-1}`] :  e.target.value })}
                />
                <div 
                    className="w-full flex justify-between"
                    
                >
                    {
                        arr.map((val, idx)=>(

                            <span className="text-sm" key={idx}  style={{color:form.visualData.queColor, fontFamily:form.visualData.fontFamily}}>{val}</span>
                        ))
                    }

                </div>
            </div>

            {
                form?.data.length === idx && 
                <button 
                    className="flex gap-2 items-center py-1 mt-[30px]  w-[90px] text-white rounded-sm justify-center hover:bg-[#2a61bb] cursor-pointer" style={{backgroundColor:form.visualData.queColor}}
                    onClick={setPopup}
                >
                            
                Submit
                            
                </button> 
            }

            
        </motion.div>
    )
}