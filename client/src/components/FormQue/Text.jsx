import useResponseStore from "../../stores/ResponseStore";
import {FaArrowRightLong, TiTick,AiOutlineEnter} from "../../assets/assets"
import useFormStore from "../../stores/FormStore";
import {AnimatePresence, motion, useAnimation} from "framer-motion"
import { useEffect } from "react";
export default function  Text({que,form,idx}){

    const controls = useAnimation();

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


    const {responses, updateResponses} = useResponseStore( (state)=>({
        
        responses:state.responses,
        updateResponses:state.updateResponses,
    }));

    const {currentQue, updateCurrentQue,setPopup} = useFormStore((state)=>({
        currentQue : state.currentQue,
        updateCurrentQue: state.updateCurrentQue,
        setPopup : state.setPopup,
      }))

    const keyDownHandler= (e)=>{

        if(e.key === "Enter"){
            if(idx === form?.data.length){
                setPopup();
                return;
            }
            clickHandler();
        }     

       
    }

    return (
    <AnimatePresence >

        <motion.div 
            className="h-max w-full justify-center flex gap-1 relative que transition-all duration-100 overflow-hidden "
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

            <div className="w-[80%] flex flex-col gap-2 justify-center items-start">
                <div className=" mb-3" >

                    <p 
                        className="w-full h-max p-2 pl-0 text-[24px] italic relative" style={{color:form.visualData.queColor, fontFamily:form.visualData.fontFamily, fontSize:form.visualData.fontSize}}
                    > 
                        <div className="absolute top-2 right-[100%] flex gap-2 items-center mr-2 w-max" style={{color:form.visualData.queColor}}>
                            <p className="text-black" style={{color:form.visualData.queColor}}>{idx}</p>
                            <FaArrowRightLong className="font-thin" style={{fill:form.visualData.queColor}}/>
                        </div>
                    
                        {form.data[idx-1]?.statement}
                    </p>
                </div>

                <div className="flex flex-col gap-4 w-full">
                    <input 
     
                        type="text"
                        id={`inp${idx}`}
                        className="border-b border-zinc-700 w-full h-[40px] p-2  pl-0 bg-transparent"
                        placeholder="Type your answer here..."
                        style={{fontSize:form.visualData.fontSize, borderColor:form.visualData.queColor}}
                        value={responses[`q${idx-1}`]}
                        onKeyDown={keyDownHandler}
                        onChange={(e)=>  updateResponses({[`q${idx-1}`] : e.target.value})}
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
            </div>

            
            
        </motion.div>
    
    </AnimatePresence>
    )
}

// !que?
// <div className="absolute top-[50%] left-[50%]">
//     <ClipLoader color="#000000" className="absolute top-[50%] left-[50%]" />
// </div>
// :
// // h-full w-full flex flex-col gap-2 relative que hover:shadow-lg hover:bg-slate-50 transition-all duration-100
// <div className="h-full w-full flex flex-col gap-1 relative que  transition-all duration-100 ">

//     <div >
            
//             <div
//                 className="w-full h-full py-2 mb-3"
//             >{
//                 !edit ?
//                 <p 
//                 className="w-full h-max p-2 pl-0 text-[24px] italic relative" style={{color:visualData.queColor, fontFamily:visualData.fontFamily, fontSize:visualData.fontSize}}
//             > 
//                  <div className="absolute top-2 right-[100%] flex gap-2 items-center mr-2" style={{color:visualData.queColor}}>
//                     {idx }
//                     <FaArrowRightLong className="font-thin" style={{fill:visualData.queColor}}/>
//                 </div>
//                 {ques[idx-1]?.statement}
//             </p>:
//                 <textarea 
//                     type="text"
//                     className="border w-full h-[40px] pl-2 rounded-md bg-slate-200"
//                     value={ques[idx-1]?.statement}
//                     style={{fontSize:visualData.fontSize}}
//                     onChange={(e)=> changeQueStatement(idx-1,e.target.value)}
//                 />

//             }
//             </div>

//             <div>
//                 <input 
//                     type="text"
//                     className="border-b border-zinc-700 max-w-max min-w-[60%] h-[40px] p-2  pl-0 bg-transparent"
//                     placeholder="Type your answer here..."
//                     style={{fontSize:visualData.fontSize, borderColor:visualData.queColor}}
//                 />
//             </div>
//     </div>

    
    
// </div>