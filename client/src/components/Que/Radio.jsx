import useEditStore from "../../stores/EditStatus";
import { useState,useEffect } from "react";
import AddQues from "../AddQue";
import useQueStore from "../../stores/QueStore";
import useFormStore from "../../stores/FormStore";
import { ClipLoader } from "react-spinners";
import {FaArrowRightLong} from "../../assets/assets"
export default function  Radio({que,idx, windowSize}){

    const edit = useEditStore((state) => state.edit);

    const {ques, changeQueStatement,updateRadioOpt} = useQueStore( ( state) => ({
        ques: state.ques,
        changeQueStatement: state.changeQueStatement,
        updateRadioOpt: state.updateRadioOpt
    }));

    const {visualData, updateVisualData} = useFormStore( (state)=>({
        visualData: state.visualData,
        updateVisualData: state.updateVisualData,
    }));



    return (


        !que?
        <div className="absolute top-[50%] left-[50%]">
            <ClipLoader color="#000000" className="absolute top-[50%] left-[50%]" />
        </div>
        :

        <div className="h-full w-full flex flex-col gap-2 relative que  transition-all duration-100 ">
            
            <div
                className="w-full h-max mb-3"
            >{
                !edit ?
                <p 
                    className="w-full h-max p-2 pl-0 text-[24px] italic relative" style={{color:visualData.queColor, fontFamily:visualData.fontFamily, fontSize:windowSize > 390 ? visualData.fontSize : "5vw"}}
                > 
                    <div className="absolute xs:flex hidden top-2 right-[100%] flex gap-2 items-center mr-2" style={{color:visualData.queColor}}>
                        {idx}
                        <FaArrowRightLong className="font-thin" style={{fill:visualData.queColor}}/>
                    </div>
                    {ques[idx-1]?.statement}
                </p>:
                
                <textarea 
                    type="text"
                    className="border min-w-full w-max h-max  rounded-md bg-slate-200"
                    value={ques[idx-1]?.statement}
                    style={{fontSize:windowSize > 390 ? visualData.fontSize : "5vw"}}
                    onChange={(e)=> changeQueStatement(idx-1,e.target.value)}
                />
            }
            </div>

            <div className="flex flex-col gap-2">
                {
                    que.options.map((opt, optIdx)=>(
                        
                        <label className="flex gap-3 items-center cursor-pointer" htmlFor={`${idx} + ${optIdx}`} > 
                            <input 
                                type="radio" 
                                className="border"
                                name={`que${idx}`}  
                                id={`${idx} + ${optIdx}`} 
                                style={{fontSize:visualData.fontSize}}

                            /> 
                                <div className="custom-radio" style={{borderColor:visualData.buttonColor,borderRadius:"5px"}}></div>

                                {
                                    !edit ?
                                    <p style={{color:visualData.labelColor, fontFamily:visualData.fontFamily,fontSize:windowSize > 390 ? visualData.fontSize : "5vw"}}>{ques[idx-1]?.options[optIdx]}</p>
                                    :
                                    <input 
                                        type="text" 
                                        value={ques[idx-1]?.options[optIdx]} 
                                        onChange={(e)=> updateRadioOpt(idx-1, optIdx, e.target.value)}
                                        className="border rounded-md bg-slate-200 h-max w-full rounded-full"
                                        style={{fontSize:windowSize > 390 ? visualData.fontSize : "5vw"}}
                                    />
                                    
                                }

                        </label>
                       
                    ))
                }
            </div>
        </div>
    )
}