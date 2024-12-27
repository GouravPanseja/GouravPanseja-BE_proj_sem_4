import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Insights from "../components/Insights";
import ChartContainer from "../components/ChartContainer";
import {motion, AnimatePresence} from "framer-motion"
import { TiTick } from "react-icons/ti";
import { ClipLoader } from "react-spinners";
export default function FormResults(){

    const [loading ,setLoading] = useState(false);

    const [chartType, setChartType] = useState("bar");

    const [form, setForm]  = useState({});

    const [responses, setResponses] = useState([]);

    const location = useLocation();
    
    const [radioQues, setRadioQues] = useState([]);

    const [chartData ,setChartData] = useState({});
    
    const path = location.pathname.split("/");

    const formId = path[path.length -1];

    const [selected, setSelected] = useState("insights");



    const [screenSize, setScreenSize] = useState(window.innerWidth);

    useEffect( ()=>{

        const handleResize = ()=>{

            const windowSize = window.innerWidth;

            setScreenSize(windowSize);

            console.log(windowSize);

        }

        window.addEventListener("resize", handleResize);
        handleResize();

        return ()=> window.removeEventListener("resize",handleResize);

    },[])


    const obj =   {
        
        "email":'gourav@gmial.com',
        "name":'gourav',
        "age":19,
        "gender":"male",
        "commentBody":"good",
        "createdAt":"today"
    }
    // const gSheetHandler = async()=>{
        
    //     try{
    //         const result  = fetch('https://script.google.com/macros/s/AKfycbzRWwAx-9JXM-ZHncXmbheGKv0Uh7TJC_8pK5NLgZA-xSF_y_puxm9j9ysV3gQkhkRWAg/exec', {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             data:[obj]
    //         })
    //         })
    //         .then((response) => response.json())
    //         .then((data) => console.log(data));


    //         console.log("result of gsheet ",result);
    //     }
    //     catch(err){
    //         console.log(err);
    //     }
    // }

    const fetchResponses = async()=>{

        
        try{


            const token = localStorage.getItem("token");

            console.log("formId" ,formId);

            const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/getAllResponse`,{formId},{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setResponses(result.data.data);
            console.log("responses fetched" ,result.data.data);

        }
        catch(err){
            console.log(err);
        }
        setLoading(false);
    }

    const fetchForm = async()=>{
        try{
            setLoading(true);
            const token = localStorage.getItem("token");


            const result = await  axios.post(`${process.env.REACT_APP_BASE_URL}/getForm`, {formId},{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("form" ,result.data.data);

            setForm(result.data.data);
        }
        catch(err){
            console.log(err);

        }
    }

    useEffect(()=>{



        fetchForm();
        fetchResponses();
        
    },[])

    useEffect(()=>{
        const findRadios = ()=>{

            const arr = [];
            
            if(form){

                for(let i = 0; i < form?.data?.length ;i++){

                    if(form.data[i].type === "radio"){
                        arr.push(i);
                    }
                }
            }
            
            console.log("radio ques" ,arr);
            setRadioQues(arr);
        }

        findRadios();
    },[form]);

    useEffect(()=>{

        const freqConstruct = ()=>{

            const data = {};

            // create freq tracker for all selected options
            radioQues.forEach((que)=>{

                const obj = {};

                responses.forEach((resp)=>{

                    obj[resp.data[`q${que}`]] =   obj[resp.data[`q${que}`]] ? obj[resp.data[`q${que}`]] + 1 : 1;

                })

                data[que] = obj;
            });

            var ans = {};

            // data preprocessing 

            for(let que in data){
                
                var arr = Array.from(Object.keys(data[que]));               // create array of selected options 
                
                const queOptions = form?.data[que]?.options             // array of all available options for the que

                console.log("len" ,queOptions?.length);

                if(queOptions?.length > arr.length ){

                    for(var i = 1 ; i <= queOptions.length; i++){           // put the missing options
                        
                        if(!arr.includes(`opt${i}`)){
                            
                            arr.push(`opt${i}`)
                        }
                    }
                }
                
                arr = arr.sort((a,b)=> {

                    return a[a.length-1] -  b[b.length-1] ;
                })

                arr = arr.map((opt)=> data[que][opt] ? data[que][opt] : 0);

                ans[que] = arr;

            }



            console.log("Final answer is " ,ans);

            setChartData(ans);
        
        }
        freqConstruct();
    },[radioQues,responses])


    


    return (
        <div className="w-screen  min-h-screen h-max relative bg-[#fafafa]" >
            <Navbar bgColor={"white"} border={1}/>

            {/* lower-navbar */}
            <div className="lower_navbar w-screen fixed top-[48px] h-[54px] border-b flex  bg-white z-[100] border-t justify-center">
                
                <div className="h-[54px] w-[70%] flex items-center gap-5">
                    <div 
                        className={`relative flex items-center h-full ${ selected === "insights" && "border-b-[2px] border-black" }`}
                        onClick={()=> setSelected("insights")}
                        >
                                                
                        <p 
                            className={`text-[13px]  cursor-pointer tracking-widest  ${ selected === "insights" ? "text-[#00000]" : "text-[#9b9a9a] hover:text-[#000000ce] transition-all duration-100" }`}
                        >
                            INSIGHTS
                        </p>
                
                    </div>
                    <div 
                        className={`relative flex items-center h-full ${ selected === "visual" && "border-b-[2px] border-black" }`}
                        onClick={()=> setSelected("visual")}
                    >
                        <p 
                            className={`text-[13px] cursor-pointer tracking-widest  ${ selected === "visual" ? "text-[#000000]" : "text-[#9b9a9a] hover:text-[#000000ce] transition-all duration-100" }`}
                        >
                            VISUALS
                        </p>
                    </div>
                    <div 
                        className={`relative flex items-center h-full ${ selected === "responses" && "border-b-[2px] border-black" }`}
                        onClick={()=> setSelected("responses")}
                    >
                        <p 
                            className={`text-[13px] cursor-pointer  tracking-widest ${ selected === "responses" ? "text-[#000000]" : "text-[#9b9a9a] hover:text-[#000000ce] transition-all duration-100" }`}
                        >
                            RESPONSES
                        </p>
                    </div>
                </div>
            </div>  


            {
                loading ?
                <ClipLoader color="#000000" className="absolute top-[50%] left-[50%]" />
                :
                <div className="sm:w-[70%] w-[90%] mx-auto   h-max  py-[30px] top-[104px] relative " style={{height: "calc( 100vh - 106px )"}}>
                    {

                    selected === "insights" 
                    ?
                    <Insights form={form} responses={responses}/>
                    :
                    selected === "visual"
                    ?
                    <div className=" h-max min-h-screen w-full flex flex-col gap-[50px] ">

                    {
                        radioQues.map((que,idx)=>(
                            
                            <div className="my-11  relative  h-max">

                                <ChartContainer form={form} que={que} idx={idx} chartData={chartData}  screenSize={screenSize}/>
                            </div>
                        ))
                    }

                    </div>
                    :
                    selected === "responses" ?
                    
                    <AnimatePresence mode="wait">
                        <motion.div 
                            className=" mt-[30px]  max-h-screen "

                            key="responses"
                            animate={{
                                opacity:1,
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
                        >
                            <div className="mt-[25px] flex flex-col gap-5 w-full">
                                <p className="text-[24px] tracking-wide font-light"> Response Summary </p> 

                                <div className="flex justify-center gap-3 w-full" >

                                    <div className="flex flex-col h-[352px] c1:min-w-[704px] w-full  bg-white rouned-md " style={{boxShadow:"0 1px 2px 0 rgba(0, 0, 0, 0.04), 0 2px 8px 0 rgba(0, 0, 0, 0.04)"}}>
                                        <div className="w-full h-[98px] pt-[24px] px-[32px] flex flex-col gap-2">

                                            <div className="flex items-center  gap-4 bg-[#69B5FC] w-max px-1 py-[2px] rounded-md">
                                                <svg className="SVGInline-svg fill-black text-lg" style={{width:"16px" ,height:"16px"}} xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15 1.5H3C2.72386 1.5 2.5 1.72386 2.5 2V14C2.5 14.2761 2.72386 14.5 3 14.5H15C15.2761 14.5 15.5 14.2761 15.5 14V2C15.5 1.72386 15.2761 1.5 15 1.5ZM3 0C1.89543 0 1 0.895431 1 2V3C0.447715 3 0 3.44772 0 4V6C0 6.55228 0.447715 7 1 7V9C0.447715 9 0 9.44772 0 10V12C0 12.5523 0.447715 13 1 13V14C1 15.1046 1.89543 16 3 16H15C16.1046 16 17 15.1046 17 14V2C17 0.895431 16.1046 0 15 0H3ZM11 6C11 7.10457 10.1046 8 9 8C7.89543 8 7 7.10457 7 6C7 4.89543 7.89543 4 9 4C10.1046 4 11 4.89543 11 6ZM13 12V10.3836C11.8964 9.51963 10.5102 9 9.00001 9C7.48982 9 6.10364 9.51963 5 10.3836V12H13Z"></path>
                                                </svg>
                                                <div className="text-sm">
                                                    {form?.responses?.length}
                                                </div>

                                            </div>

                                            <p className="text-[12px] text-[#807e7e] pl-[50px]">{ (responses.filter((resp)=> resp.name)).length} out of {responses.length} people provided their personal details</p>

                                        </div>  

                                        <div className="w-full c1:px-[96px] px-[10px] pb-[56px] ">

                                            <div className="w-full max-h-[200px] mt-[10px] overflow-y-scroll" >

                                            {
                                                responses.filter((resp)=> resp.name).map((response)=>(
                                                    <div className=" w-full flex flex-col justify-center h-[180px] max-h-[200px] p-[30px] border-b" >
                                                    
                                                        <div className="flex gap-3 mb-2">
                                                            <p className="p-0 min-w-[15%] overflow-y-hidden whitespace-nowrap text-[13px] text-[#807e7e]"> name </p>
                                                            <p className="p-0 text-[14px]"> {response.name}</p>
                                                        </div>
                                                        <div className="flex gap-3 mb-2">
                                                            <p className="p-0 min-w-[15%] overflow-y-hidden whitespace-nowrap text-[13px] text-[#807e7e]"> email </p>
                                                            <p className="p-0 text-[14px]"> {response.email}</p>
                                                        </div>
                                                        <div className="flex gap-3 mb-2">
                                                            <p className="p-0 min-w-[15%] overflow-y-hidden whitespace-nowrap text-[13px] text-[#807e7e]"> age </p>
                                                            <p className="p-0 text-[14px]"> {response.age}</p>
                                                        </div>
                                                        <div className="flex gap-3 mb-2">
                                                            <p className="p-0 min-w-[15%] overflow-y-hidden whitespace-nowrap text-[13px] text-[#807e7e]"> gender </p>
                                                            <p className="p-0 text-[14px]"> {response.gender}</p>
                                                        </div>
                                                        

                                                    </div>  
                                                ))
                                            }


                                            </div>
                                        </div>
                                    </div>

                                    {/* right part */}

                                    <div className="lg:flex hidden flex-col gap-5 min-w-[256px] max-w-[256px]">

                                        <div className="p-[20px] w-full bg-white rounded-md flex gap-5">
                                            <div>
                                                <svg height="36" width="24" viewBox="0 0 212 283"><g fill="none" fill-rule="evenodd"><path d="M17 0h124l71 71v195c0 9.389-7.611 17-17 17H17c-9.389 0-17-7.611-17-17V17C0 7.611 7.611 0 17 0z" fill="#13A562"></path><g fill="#F1F1F1"><path d="M55 158h103v12H55z"></path><path d="M101 138h12v83h-12z"></path><path d="M55 188h103v12H55z"></path><path d="M60 142v75h93v-75H60zm-12-12h117v99H48v-99z" fill-rule="nonzero"></path></g><path d="M146 66l66 67V70.992z" fill="#049052"></path><path d="M141 0l71 71h-54c-9.389 0-17-7.611-17-17V0z" fill="#8BD1AF"></path></g></svg>
                                            </div>
                                            <div className="flex flex-col">
                                                <p>Google Sheets</p>
                                                <p className="text-[12px] ">{
                                                    form.spreadsheetUrl ? 
                                                    <p className="flex gap-3 mt-7 items-center text-[16px]"><TiTick className="fill-green-500 text-[24px]"/> Integrated</p>
                                                    : 
                                                    <p>Connect and send your data straight to a spreadsheet.</p>
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                        <div className="p-[20px] w-full bg-[#f0f0f0] rounded-md">
                                            <p className="text-[14px]">Share your results with anyone. Your report automatically updates as new answers come in.</p>
                                        </div>
                                        <div 
                                            className="px-[50px] py-1 rounded-md flex items-center justify-center text-white bg-black cursor-pointer hover:bg-zinc-600 transition-all duration-200 text-[14px]"
                                            
                                        > 
                                            
                                            Generate a report 
                                        </div>

                                        

                                        
                                    </div>
                                </div>

                            </div>
                            
                        </motion.div>
                    </AnimatePresence>
                    
                    :
                    null
                    }

                
                </div>
            }   

            



        </div>

    )
}