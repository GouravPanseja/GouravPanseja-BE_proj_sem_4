import { useState,useEffect } from "react";
import useEditStore from "../../stores/EditStatus"
import AddQues from "../AddQue";
import useQueStore from "../../stores/QueStore";
import useFormStore from "../../stores/FormStore";
import { ClipLoader } from "react-spinners";
import { FaArrowRightLong } from "../../assets/assets";
export default function  Matrix({que,idx,windowSize}){

    const edit = useEditStore((state) => state.edit);
    const [statementValue,setStatementValue] = useState(que.statement);


    const [rowObj, setRowObj] = useState({});
    const [colObj, setColObj] = useState({});

    useEffect(() => {

        const rowsObject = {};
        const colsObject = {};

        

        que.matrixRows.forEach((option, idx) => {
            rowsObject[idx] = option;
        });
        
        setRowObj(rowsObject);


        que.matrixColumns.forEach((option, idx) => {
            colsObject[idx] = option;
        });
        
        setColObj(colsObject);

    }, []);

    const {visualData, updateVisualData} = useFormStore( (state)=>({
        visualData: state.visualData,
        updateVisualData: state.updateVisualData,
    }));



    const {ques, changeQueStatement,updateMatrixCols,updateMatrixRows} = useQueStore( ( state) => ({
        ques: state.ques,
        changeQueStatement: state.changeQueStatement,
        updateMatrixCols:state.updateMatrixCols,
        updateMatrixRows:state.updateMatrixRows
    }));




    return (

        !que?
        <div className="absolute top-[50%] left-[50%]">
            <ClipLoader color="#000000" className="absolute top-[50%] left-[50%]" />
        </div>
        :
        <div className="h-full w-full flex flex-col relative que transition-all duration-100 overflow-x-scroll">

            

            {/* statement */}
            <div
                className="w-full h-full mb-6"
            >   
            
                {
                    !edit ?
                    <p 
                        className="w-full h-max p-2 pl-0 text-[24px] italic relative" style={{color:visualData.queColor, fontFamily:visualData.fontFamily, fontSize:windowSize > 390 ? visualData.fontSize : "4vw"}}
                    > 
                         <div className="absolute top-2 right-[100%] flex gap-2 items-center mr-2" style={{color:visualData.queColor}}>
                            {idx}
                            <FaArrowRightLong className="font-thin" style={{fill:visualData.queColor}}/>
                        </div>
                        {ques[idx-1]?.statement}
                    </p>:
                    <textarea 
                        type="text"
                        className="border min-h-max w-full rounded-md bg-slate-200"
                        style={{fontSize:visualData.fontSize}}
                        value={ques[idx-1]?.statement}
                        onChange={(e)=> changeQueStatement(idx-1,e.target.value)}
                    />

                }
            </div>

            <table className="min-w-max overflow-x-scroll">
                <tr className=" ml-[20%] w-[70%] h-[30px] flex justify-between mt-7 items-center ">
                        {
                            que?.matrixColumns.map((col,colIdx)=>(
                                <th className="">
                                    { !edit ? 
                           
                                        <p className=" mx-2 w-[90%] text-[12px]" style={{color:visualData.labelColor, fontFamily:visualData.fontFamily}}>{ques[idx-1]?.matrixColumns[colIdx]}</p> 
                                        : 
                                        <input 
                                            type="text" 
                                            className={`border w-[90%] bg-slate-200`} 
                                            style={{fontSize:visualData.fontSize}}
                                            value={ques[idx-1]?.matrixColumns[colIdx]}
                                            onChange={(e)=> updateMatrixCols(idx-1,colIdx,e.target.value)}
                                       

                                        /> }
                                </th>
                            ))
                        }
                </tr>

                    {
                        que?.matrixRows.map((row,rowIdx)=>(

                            <tr className="flex  gap-2 w-full justify-between items-center">

                                <td className="w-[30%]">
                                    {
                                        !edit ? 
                                      <p style={{color:visualData.labelColor,fontFamily:visualData.fontFamily,fontSize:windowSize > 390 ? visualData.fontSize : "4vw"}}>{ques[idx-1]?.matrixRows[rowIdx]}</p>   :
                                        <input 
                                            type="text"
                                            value={ ques[idx-1]?.matrixRows[rowIdx]}
                                            className="bg-slate-200"
                                            style={{fontSize:visualData.fontSize}}
                                            onChange={(e)=> updateMatrixRows(idx-1,rowIdx, e.target.value)}
                                        /> 
                                    }
                                </td>


                                {
                                    que?.matrixColumns.map((col,idx)=>(
                                        <td>
                                            <label className="cursor-pointer">
                                                <input 
                                                    type="radio" 
                                                    name={row + rowIdx}
                                                    style={{fontSize:visualData.fontSize}}

                                                />
                                                <span class="custom-radio" style={{borderColor:visualData.buttonColor,fontSize:visualData.fontSize}}></span>
                                                
                                            </label>
                                        </td>
                                        
                                    ))
                                }

                                
                            </tr>
                        ))
                    }

            </table>

                
        </div>
    )
}   