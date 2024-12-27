import { useState } from "react";
import useEditStore from "../../stores/EditStatus"
import AddQues from "../AddQue";
import useQueStore from "../../stores/QueStore";
import useFormStore from "../../stores/FormStore";
import { ClipLoader } from "react-spinners";
import {FaArrowRightLong} from "../../assets/assets"
import {motion} from "framer-motion"
export default function  Text({que,idx,windowSize}){

    const edit = useEditStore((state) => state.edit);

    const {visualData, updateVisualData} = useFormStore( (state)=>({
        visualData: state.visualData,
        updateVisualData: state.updateVisualData,
    }));

    const {ques, changeQueStatement} = useQueStore( ( state) => ({
        ques: state.ques,
        changeQueStatement: state.changeQueStatement,
    }));

    console.log("errror" + que)

    return (

        !que?
        <div className="absolute top-[50%] left-[50%]">
            <ClipLoader color="#000000" className="absolute top-[50%] left-[50%]" />
        </div>
        :
        // h-full w-full flex flex-col gap-2 relative que hover:shadow-lg hover:bg-slate-50 transition-all duration-100
        <motion.div className="h-full w-full flex flex-col gap-1 relative que  transition-all duration-100 ">

  
            <div>
                    
                    <div
                        className="w-full h-full py-2 mb-3"
                    >{
                        !edit ?
                        <p 
                            className="w-full h-max p-2 pl-0 text-[24px] italic relative xs:text-left text-center" style={{color:visualData.queColor, fontFamily:visualData.fontFamily, fontSize:windowSize > 390 ? visualData.fontSize : "4vw"}}
                            > 
                            <div className="absolute xs:flex hidden top-2 right-[100%]  gap-2 items-center mr-2" style={{color:visualData.queColor}}>
                                {idx }
                                <FaArrowRightLong className="font-thin" style={{fill:visualData.queColor}}/>
                            </div>
                            {ques[idx-1]?.statement}
                        </p>
                        :
                        <textarea 
                            type="text"
                            className="border w-full h-max pl-2 rounded-md bg-slate-200"
                            value={ques[idx-1]?.statement}
                            style={{fontSize:visualData.fontSize}}
                            onChange={(e)=> changeQueStatement(idx-1,e.target.value)}
                        />

                    }
                    </div>

                    <div>
                        <input 
                            type="text"
                            className="border-b border-zinc-700 max-w-max min-w-[60%] h-[40px] p-2  pl-0 bg-transparent"
                            placeholder="Type your answer here..."
                            style={{fontSize:windowSize > 390 ? visualData.fontSize : "4vw", borderColor:visualData.queColor}}
                        />
                    </div>
            </div>

            
            
        </motion.div>
    )
}