import { useState } from "react";
import useEditStore from "../../stores/EditStatus"
import AddQues from "../AddQue";
import useQueStore from "../../stores/QueStore";
import useFormStore from "../../stores/FormStore";
import { ClipLoader } from "react-spinners";
import { FaArrowRightLong } from "../../assets/assets";

export default function Textarea({que,idx}){

    const edit = useEditStore((state) => state.edit);

    const {visualData, updateVisualData} = useFormStore( (state)=>({
        visualData: state.visualData,
        updateVisualData: state.updateVisualData,
    }));

    const [statementValue,setStatementValue] = useState(que.statement);

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
        <div className="h-full w-full flex flex-col gap-1 relative que mb-3 transition-all duration-100 ">
            
            <div
                className="w-full h-full mb-3"
            >{
                !edit ?
                <p 
                        className="w-full h-max p-2 pl-0 text-[24px] italic relative" style={{color:visualData.queColor, fontFamily:visualData.fontFamily, fontSize:visualData.fontSize}}
                    > 
                         <div className="absolute top-2 right-[100%] flex gap-2 items-center mr-2" style={{color:visualData.queColor}}>
                            {idx }
                            <FaArrowRightLong className="font-thin" style={{fill:visualData.queColor}}/>
                        </div>
                        {ques[idx-1]?.statement}
                    </p>:
                <textarea
                    className="border w-full h-[40px]  rounded-md bg-slate-200"
                    style={{fontSize:visualData.fontSize}}
                    value={ques[idx-1]?.statement}
                    onChange={(e)=> changeQueStatement(idx-1,e.target.value)}
                />

            }
            </div>

            <div>
                <textarea 
                    className="border-b border-zinc-800 w-[60%] h-[40px] py-2 bg-transparent py"
                    placeholder="Your reply..."
                    style={{fontSize:visualData.fontSize,borderColor:visualData.queColor}}
                />
            </div>
        </div>
    )
}