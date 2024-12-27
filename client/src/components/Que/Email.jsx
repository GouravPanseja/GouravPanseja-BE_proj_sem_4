import { useState } from "react";
import useEditStore from "../../stores/EditStatus"
import { IoMdAdd } from "../../assets/assets";
import {motion ,useAnimation} from "framer-motion"
import update from "../../utils/updateQue.js";
import useQueStore from "../../stores/QueStore"
import AddQue from "../AddQue"
import useFormStore from "../../stores/FormStore";
import { ClipLoader } from "react-spinners";
import { FaArrowRightLong } from "../../assets/assets";

export default function  Email({que,idx, windowSize}){

    const {visualData, updateVisualData} = useFormStore( (state)=>({
        visualData: state.visualData,
        updateVisualData: state.updateVisualData,
    }));

    const edit = useEditStore((state) => state.edit);

    const {ques, changeQueStatement} = useQueStore( ( state) => ({
        ques: state.ques,
        changeQueStatement: state.changeQueStatement,
    }));

    return (

        !que?
        <div className="absolute top-[50%] left-[50%]">
            <ClipLoader color="#000000" className="absolute top-[50%] left-[50%]" />
        </div>
        :

        <div className="h-full w-full flex flex-col gap-1 rounded-md transition-all duration-100 relative container que  ">

            
           
            <div
                className="w-full h-full mb-3 relative"
                >
                {
                    !edit ?
                    <p 
                        className="w-full h-max p-2 pl-0  italic relative " style={{color:visualData.queColor, fontFamily:visualData.fontFamily, fontSize:windowSize > 390 ? visualData.fontSize : "4vw"}}
                    > 
                         
                        {ques[idx-1]?.statement}
                    </p>:
                    <textarea 
                     
                        className="border w-full h-max pl-2 rounded-md bg-slate-200"
                        style={{fontSize:visualData.fontSize}}
                        value={ques[idx-1]?.statement}
                        onChange={(e)=> changeQueStatement(idx-1,e.target.value)}
                    />

                }
                <div className="absolute top-2 xs:flex hidden right-[100%] flex gap-2 items-center mr-2" style={{color:visualData.queColor}}>
                    {idx}
                    <FaArrowRightLong className="font-thin" style={{fill:visualData.queColor}}/>
                </div>
            </div>
            

            <div>
                <input 
                    type="email"
                    className="border-b border-zinc-800  w-full h-[40px] p-2 pl-0  bg-transparent "
                    placeholder="@gmail.com..."
                    style={{fontSize:windowSize > 390 ? visualData.fontSize : "4vw", borderColor:visualData.queColor}}
                />
            </div>
        </div>
    )
}
