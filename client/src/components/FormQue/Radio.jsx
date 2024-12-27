import useEditStore from "../../stores/EditStatus";
import { useState,useEffect } from "react";
import AddQues from "../AddQue";
import useQueStore from "../../stores/QueStore";
import useFormStore from "../../stores/FormStore";
import useResponseStore from "../../stores/ResponseStore";
import {FaArrowRightLong, TiTick,AiOutlineEnter} from "../../assets/assets"
import {motion, useAnimation} from "framer-motion";

export default function  Radio({que,form,idx}){

    const fader = (opacity) =>{

        const colorStr =  form.visualData.labelColor;
        // "#e328f2"
        console.log("hi");
        const red = parseInt(colorStr.substring(1,3),16);
        const green = parseInt(colorStr.substring(3,5),16);
        const blue = parseInt(colorStr.substring(5,7),16);

        return (`rgb(0${red},${green},${blue},${opacity})`);

    }

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


    console.log("fader"  +fader(0.2));

    const {currentQue, updateCurrentQue,setPopup} = useFormStore((state)=>({
        currentQue : state.currentQue,
        updateCurrentQue: state.updateCurrentQue,
      }))

    const {responses, updateResponses} = useResponseStore( (state)=>({
        
        responses:state.responses,
        updateResponses:state.updateResponses,
    }));

    return (

        <motion.div 
            key={idx}
            className={`gili gili chuu h-max w-[80%]  gap-1 flex flex-col relative ${idx}`}
           
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
            <div className="w-full h-max mb-3">

                <div
                    className="w-full h-max p-2 pl-0 text-[24px] italic relative" style={{color:form.visualData.queColor, fontFamily:form.visualData.fontFamily, fontSize:form.visualData.fontSize}}
                > 
                    <div className="absolute top-2 right-[100%] flex gap-2 items-center mr-2 w-max" style={{color:form.visualData.queColor}}>
                        <p className="text-black " style={{color:form.visualData.queColor}}>{idx}</p>
                        <FaArrowRightLong className="font-thin" style={{fill:form.visualData.queColor}}/>
                    </div>
                        
                    {form.data[idx-1]?.statement}
                </div>

            </div>

            <div className="flex w-full flex-col gap-2 justify-center">
                {
                    que.options.map((opt, optIdx)=>(
                        
                        <motion.label 
                            className={`flex gap-3 w-[60%] py-1 px-1 rounded-md items-center cursor-pointer border transition-all duration-150`} htmlFor={`${idx} + ${optIdx}`} 
                            whileHover={{
                                backgroundColor:fader(0.4)
                            }}
                            transition={{
                                duration:0.4
                            }}
                            style={{backgroundColor:fader(0.1), borderColor:form.visualData.labelColor}}
                        > 
                            
                            <input 
                                type="radio" 
                                className="inpFocus border que"
                                required={true}
                                name={`que${idx}`}  
                                id={`${idx} + ${optIdx}`} 
                                style={{fontSize:form.visualData.fontSize}}
                                value={`opt${optIdx+1}`}
                                checked= {responses[`q${idx - 1}`] === `opt${optIdx + 1}` }
                                onChange={(e)=> updateResponses({ [`q${idx-1}`] :  e.target.value })}
                                onClick={clickHandler}

                            /> 
                            <div className="custom-radio" style={{borderColor:form.visualData.buttonColor,borderRadius:"5px"}}></div>

                            <p style={{color:form.visualData.labelColor, fontFamily:form.visualData.fontFamily,fontSize:form.visualData.fontSize}}>{opt}</p>

                        </motion.label>
                       
                    ))
                }

                
            </div>
        </motion.div>
    )
}