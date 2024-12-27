import {AnimatePresence, motion} from "framer-motion"
export default function Insights({form,responses}){

    const avgCompletionTime = ()=>{

        if(!responses){
            return "---"
        }
        var sum = 0;
        
        for(var response of responses){
            sum += response?.completionTime ? response.completionTime : 0 ;

        }
        return ((sum /responses?.length)/ 1000).toFixed(2);
    }

    return(
        <AnimatePresence mode="wait">
            <motion.div
                animate ={{
                    opacity:1
                }}
                initial={{
                    opacity:0
                }}
                exit={{
                    opacity:0
                }}
                transition={{
                    duration:0.5
                }}
                key = "insight"
            >
                        <h1 className="text-[28px] font-semibold"> Big Picture</h1>
                        
                        <div className="result_table mt-7 w-full">

                            <div className="flex justify-between flex-wrap">

                                <div className="flex flex-col gap-11 items-center justify-center m-6">
                                    <div className="flex flex-col items-center">
                                        <div className="text-[14px] text-[#808080]">Views</div>
                                        <div className="xbs:text-[36px] text-[26px] tracking-widest font-thin text-center">
                                            {form?.views}
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center">
                                        <div className="text-[14px] text-[#808080]">Created at</div>
                                        <div className="xbs:text-[26px] text-[18px] tracking-widest font-thin text-center">
                                            {form?.createdAt?.split("T")[0]}
                                        </div>
                                    </div>

                                </div>
                                
                                <div className="flex flex-col gap-11 items-center justify-center xbs:m-6 m-4">
                                    <div className="flex flex-col items-center">
                                        <div className="text-[14px] text-[#808080]" >Submissions</div>
                                        <div className="xbs:text-[36px] text-[26px] tracking-widest font-thin text-center">
                                            {form.responses?.length}
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="text-[14px] text-[#808080]" >Live since</div>
                                        <div className="xbs:text-[26px] text-[18px] tracking-widest font-thin text-center">
                                            {form?.startAt?.split("T")[0]}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-11 items-center justify-center  xbs:m-6 m-4">
                                    <div className="flex flex-col items-center">
                                        <div className="text-[14px] text-[#808080]">Submission Rate</div>
                                        <div className="xbs:text-[36px] text-[26px] tracking-widest font-thin text-center">
                                            {((form.responses?.length/form?.views) * 100).toFixed(2)}%
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="text-[14px] text-[#808080]">Expires at</div>
                                        <div className="xbs:text-[26px] text-[18px] tracking-widest font-thin text-center">
                                            {form.expireAt?.split("T")[0] }
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-11 items-center justify-center  xbs:m-6 m-4">
                                    <div className="flex flex-col items-center">
                                        <div className="text-[14px] text-[#808080]">Time to Complete</div>
                                        <div className="xbs:text-[36px] text-[26px] tracking-widest font-thin text-center">
                                            {isNaN(avgCompletionTime()) ? "---" : avgCompletionTime()}s
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="text-[14px] text-[#808080]">Participants left</div>
                                        <div className="xbs:text-[26px] text-[18px] tracking-widest font-thin text-center">
                                            {(form?.participantCount - form?.responses?.length)}
                                        </div>
                                    </div>
                                </div>

                            </div>

                                    
                
                        </div>
            </motion.div>
        </AnimatePresence>
        
    )
}