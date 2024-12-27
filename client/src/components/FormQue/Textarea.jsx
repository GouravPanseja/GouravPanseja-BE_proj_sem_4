import { useState,useEffect } from "react";
import useEditStore from "../../stores/EditStatus"
import AddQues from "../AddQue";
import useQueStore from "../../stores/QueStore";
import useFormStore from "../../stores/FormStore";
import useResponseStore from "../../stores/ResponseStore";
import {FaArrowRightLong, TiTick,AiOutlineEnter} from "../../assets/assets"
import {motion, useAnimation} from "framer-motion";

export default function Textarea({que,form,idx}){

    const controls = useAnimation();

    const keyDownHandler= (e)=>{

        if(e.key === "Enter"){
            if(idx === form?.data.length){
                setPopup();
                return;
            }
            clickHandler();
        }            
    }

    const clickHandler = ()=>{
        controls.start({
            y:-400,
            opacity:0.4,
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


    const {currentQue, updateCurrentQue,setPopup} = useFormStore((state)=>({
        currentQue : state.currentQue,
        updateCurrentQue: state.updateCurrentQue,
        setPopup : state.setPopup,
      }))

    const {responses, updateResponses} = useResponseStore( (state)=>({
        
        responses:state.responses,
        updateResponses:state.updateResponses,
    }));

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
            className="h-max w-[80%] flex flex-col gap-1 relative que mb-3  transition-all duration-100 pb-[30px]"
            key={idx}
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

            <div className="flex w-full flex-col gap-4">
                <textarea 
                    id={`inp${idx}`}
                    className="border-b border-zinc-700 w-full h-[40px] p-2  pl-0 bg-transparent"
                    style={{fontSize:form.visualData.fontSize, borderColor:form.visualData.queColor}}
                    placeholder="Enter your reply here..."
                    value={responses[`q${idx-1}`]}
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
                            onClick={setPopup}
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