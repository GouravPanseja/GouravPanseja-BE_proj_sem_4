import { useState,useEffect } from "react";
import useEditStore from "../../stores/EditStatus"
import AddQues from "../AddQue";
import useQueStore from "../../stores/QueStore";
import useFormStore from "../../stores/FormStore";
import useResponseStore from "../../stores/ResponseStore";
import {FaArrowRightLong, TiTick,AiOutlineEnter} from "../../assets/assets"
import {motion, useAnimation } from "framer-motion";

export default function  Matrix({form,que,idx}){

    const {responses, updateResponses} = useResponseStore( (state)=>({
        
        responses:state.responses,
        updateResponses:state.updateResponses,
    }));

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

        const handleKey = (e)=>{
            if(e.key === "/"){
                console.log("/ pressed");

                const inpField = document.querySelector(`.inpFocus`);
                inpField.focus();
            }
        }
        window.addEventListener("keydown",handleKey)

        return ()=>{ window.removeEventListener("keydown", handleKey)}
    },[])

    const {currentQue, updateCurrentQue, setPopup} = useFormStore((state)=>({
        currentQue : state.currentQue,
        updateCurrentQue: state.updateCurrentQue,
      }))


    return (
        <motion.div 
           

            className="h-max w-full  flex flex-col relative que transition-all duration-100 overflow-x-scroll"
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

            {/* statement */}
            <div className="w-[90%] h-full mb-6">      
            <div
                    className="w-full h-max pl-0 text-[24px] italic relative" style={{color:form.visualData.queColor, fontFamily:form.visualData.fontFamily, fontSize:form.visualData.fontSize}}
                > 
                    <div className="absolute top-2 right-[100%] gap-2 flex items-center mr-2 w-max" style={{color:form.visualData.queColor}}>
                        <p className="text-black " style={{color:form.visualData.queColor}}>{idx}</p>
                        <FaArrowRightLong className="font-thin" style={{fill:form.visualData.queColor}}/>
                    </div>
                   
                    {form.data[idx-1]?.statement}
                </div>

            </div>

            <table className="">
                <tr className=" ml-[30%] w-[70%] h-[30px] flex justify-between mt-7 items-center ">
                        {
                            que.matrixColumns.map((col,colIdx)=>(
                                <th className="text-[13px] ">
                                    <p style={{color:form.visualData.labelColor, fontFamily:form.visualData.fontFamily}}>{col}</p> 
                                </th>
                            ))
                        }
                </tr>

                    {
                        que.matrixRows.map((row,rowIdx)=>(

                            <tr className="flex  gap-2 w-full justify-between items-center">

                                <td className="w-[30%]">

                                    <p style={{color:form.visualData.labelColor,fontFamily:form.visualData.fontFamily,fontSize:form.visualData.fontSize}}>{row}</p>  

                                </td>


                                {
                                    que.matrixColumns.map((col,colIdx)=>(
                                        <td>
                                            <label className="cursor-pointer">
                                                <input 
                                                    type="radio" 
                                                    name={row + rowIdx}
                                                    className="inpFocus que"
                                                    style={{fontSize:form.visualData.fontSize}}
                                                    value={{row : col}}
                                                    onChange={(e) => {
                                                        const { name, value } = e.target;
                                                        const rowKey = name.substring(0, name.indexOf(' ')); // Extracting the row key from the input name
                                                        const updatedResponse = { ...responses[`q${idx - 1}`], [rowKey]: value };
                                                        updateResponses({ [`q${idx - 1}`]: updatedResponse });
                                                        clickHandler();
                                                        
                                                    }}

                                                />
                                                <span class="custom-radio" style={{borderColor:form.visualData.buttonColor,fontSize:form.visualData.fontSize}}></span>
                                                
                                            </label>
                                        </td>
                                        
                                    ))
                                }

                                
                            </tr>
                        ))
                    }

            </table>

                
        </motion.div>
    )
}   