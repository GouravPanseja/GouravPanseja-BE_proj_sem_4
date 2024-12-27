import React, { useEffect,useState } from "react";
import {  useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {IoIosArrowRoundBack,FaRegEye, MdEdit,IoMdAdd,MdOutlineMailOutline,TiTick,SiMatrix,AiOutlineNumber,BsBodyText,formImg1,BsThreeDots,FaMagnifyingGlass, IoIosArrowForward,FaArrowRightLong,MdOutlineCancel} from "../assets/assets";
import { useNavigate } from "react-router-dom";
import {Checkbox , Date, Matrix ,Range, Radio, Text, Textarea,Email} from "../components/Que/index.js";
import useEditStore from "../stores/EditStatus";
import useQueStore from "../stores/QueStore";
import DesignSubMenu from "../components/DesignSubMenu"
import LogicSubMenu from "../components/LogicSubMenu";
import useFormStore from "../stores/FormStore";
import {motion} from "framer-motion";
import OtherSubMenu from "../components/OtherSubMenu"
import {HiOutlineMenuAlt1} from "../assets/assets"
import update from "../utils/updateQue"
import { Tooltip } from "@mui/material";
import { Dog } from "../assets/assets";
export default function Preview(){

    const [formColor, setFormColor] = useState("#fafafa");
    const [template, setTemplate] = useState();
    const [customise, setIsCustomise] = useState(false);
    const [sideMenu, setSideMenu] = useState("design");
    const [loading , setLoading] = useState(false);
    const [currentNav, setCurrentNav] = useState("preview")
    const [showQueOpions , setShowQueOptions] = useState(false);
    const [showAddQue, setShowAddQue] = useState(false);
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    const [showSidebarLeft, setShowSidebarLeft] = useState(true);
    const [showSidebarRight, setShowSidebarRight] = useState(true);


    const fontFamily = useQueStore((state)=> state.fontFamily);
    
    const location = useLocation();
    const navigate = useNavigate();

    const path = location.pathname.split("/")
    const id = path[path.length -1];

    const insertQue = (type, idx)=>{

        update(type,idx,updateQues);
        setShowAddQue((prev)=> !prev);
    }

    const queProvider = ()=>{


        
        switch(currQue?.type){

            case "text" :
                return <Text que={currQue}  idx={ques.indexOf(currQue)+1} windowSize ={windowSize}/> ;
            case "email" :
                return <Email que={currQue} idx={ques.indexOf(currQue)+1} windowSize ={windowSize}/> ;
            case "checkbox" :
                return <Checkbox que={currQue} idx={ques.indexOf(currQue)+1} windowSize ={windowSize}/>;
            case "matrix" :
                return <Matrix que={currQue} idx={ques.indexOf(currQue)+1} windowSize ={windowSize}/>;
            case "radio" :
                return <Radio que={currQue} idx={ques.indexOf(currQue)+1} windowSize ={windowSize}/>;
            case "range" :
                return <Range que={currQue} idx={ques.indexOf(currQue)+1} windowSize ={windowSize}/> ;
            case "textarea" :
                return <Textarea que={currQue} idx={ques.indexOf(currQue)+1} windowSize ={windowSize}/>;
            case "date" :
                return <Date que={currQue} idx={ques.indexOf(currQue)+1} windowSize ={windowSize}/> ;

            default:
                return ""
        }
    }

    const iconProvider = (q)=>{

        switch(q.type){

            case "text" :
                return <MdEdit/>;
            case "email" :
                return <MdOutlineMailOutline/>;
            case "checkbox" :
                return "";
            case "matrix" :
                return <SiMatrix/>;
            case "radio" :
                return <TiTick/>;
            case "range" :
                return <AiOutlineNumber/>;
            case "textarea" :
                return <BsBodyText/>;
            case "date" :
                return "";

            default:
                return ""
        }
    }

    const bgProvider = (q)=>{

        switch(q.type){

            case "text" :
                return "#df84b3";
            case "email" :
                return "#9bcefd";
            case "checkbox" :
                return "#fbce36";
            case "matrix" :
                return "#fba136";
            case "radio" :
                return "#5dd5c8";
            case "range" :
                return "#379cfb";
            case "textarea" :
                return "#f1ece3";
            case "date" :
                return "#fdd09b";

            default:
                return ""
        }
    }
    const {visualData, updateVisualData, logo} = useFormStore( (state)=>({
        visualData: state.visualData,
        updateVisualData: state.updateVisualData,
        logo : state.logo,
    }));
    
    const {ques, setQues,title,updateTitle,currQue,setCurrQue, deleteQue,updateQues} = useQueStore((state)=>({
        ques: state.ques,
        setQues:state.setQues,
        title:state.title,
        updateTitle:state.updateTitle,
        currQue : state.currQue,
        setCurrQue: state.setCurrQue,
        deleteQue: state.deleteQue,
        updateQues: state.updateQues,
    }));


    console.log(currQue?.statement);


    const {edit, setEdit} = useEditStore((state) => ({
        edit: state.edit,
        setEdit:state.setEdit,
    }));

    const fetchTemplate = async ()=>{

        try{   
            setLoading(true);
            const token = localStorage.getItem("token");

            const response =  await axios.post(`${process.env.REACT_APP_BASE_URL}/getTemplate`,{id}, {

                headers:{
                    Authorization: `Bearer ${token}`
                },
            });


            console.log(response.data.data);

            setTemplate(response.data.data);   
            
            updateTitle(response.data.data.title);
            const questions = (response.data.data.data);

            for(let i = 0 ; i < questions.length; i++){
                delete questions[i]._id ;
            }

            console.log(questions);
            setQues(questions);           // giving array of questions

            setCurrQue(questions[0]);

            toast.success("data fetched succesfully", {
                style: {
                  border: '1px solid green',
                  padding: '6px',
                  color: 'green',
                },
                iconTheme: {
                  primary: 'green',
                  secondary: '#FFFAEE',
                },
            });


        }
        catch(err){
            console.log(err);

            toast.error(err?.response?.data?.message || err?.message, {
                style: {
                  border: '1px solid red',
                  padding: '6px',
                  color: '#red',
                },
                iconTheme: {
                  primary: 'red',
                  secondary: '#FFFAEE',
                },
            });
        }
        setLoading(false);
    }

    useEffect( ()=>{
        

        fetchTemplate();



    },[])

    useEffect( ()=>{

        const handleResize = ()=>{

            const size = window.innerWidth;
            setWindowSize(size);

            console.log(size);
            if(size <= 1024 ){
                setShowSidebarLeft(false);
                setShowSidebarRight(false);
       
            }
            else{ 
                setShowSidebarRight(true);
                setShowSidebarLeft(true);
            };

        }

        window.addEventListener("resize", handleResize);
        handleResize();

        return ()=> window.removeEventListener("resize",handleResize);

    },[])

    useEffect(()=>{
        setFormColor(visualData.background)
    },[visualData.background]);

    console.log("show add que status"  + showAddQue)


    return(
        <div className="w-screen min-h-screen h-max bg-[#fafafa] relative">

            

            {/* Right Sidebar */}
            <div className={`sidebar fixed top-[50px] z-[99999] right-0 ${showSidebarRight ? "w-[256px]" : "w-0" }  h-screen p-0 overflow-x-hidden shadow-md bg-white border border-l`}>

                {
                    !customise ? 
                    <div className={`w-full ${showSidebarRight && "p-[20px]"} h-full flex flex-col gap-5`}>
                        {/* close */}

                        <div 
                            className="absolute top-3 left-3 lg:hidden shadow-md rounded-full h-7 w-7 flex items-center justify-center hover:shadow-lg transition-all duration-200"
                            onClick={()=> setShowSidebarRight((prev)=> !prev)}
                        >
                            <MdOutlineCancel/>
                        </div>

                        <div className={`flex flex-col gap-2 ${windowSize < 1024 && "mt-[20px]" }`}>
                            <p className="text-[1.2em] px-4 min-h-[30px] font-semibold">{title}</p>
                            <p className="text-[13px] text-[#676666]">{template?.description}</p>
                        </div>

                        {/* question */}
                        <div>   
                            <p className="text-[13px] text-[#676666]">Questions</p>
                            <p className="text-[22px] font-semibold">{ques.length}</p> 
                        </div>
                        <div>   
                            <p className="text-[13px] text-[#676666]">No of times used</p>
                            <p className="text-[22px] font-semibold">1240</p> 
                        </div>
                        <div>   
                            <p className="text-[13px] text-[#676666]">Estd compeletion time</p>
                            <p className="text-[22px] font-semibold">{template?.estimatedTime}</p> 
                        </div>
                        <div className="flex items-center justify-center mt-2 ">
                            <button 
                                className="text-[14px] bg-black text-white px-3 py-3 rounded-md shadow-lg hover:bg-slate-700 transition-all duration-100"
                                onClick={()=> setIsCustomise((prev)=> !prev)}
                                >Customise </button>
                        </div>
                    </div> :

                    <div className="w-full h-full">

                        {/* Back button */}
                        <div className="w-full h-[49px]  ">
                            <div className="flex gap-3 w-full h-[49px] px-[16px] items-center mb-5 cursor-pointer " onClick={()=> setIsCustomise((prev)=> !prev)}>
                                <IoIosArrowRoundBack/>
                                <button>back</button>
                            </div>
                        </div>

                        {/* subMenues */}
                        <div className="w-full h-[49px] border-b ">

                                    <div className="w-full h-full px-[16px] flex justify-between items-center">
                                        <div 
                                            className={`text-[14px] relative h-full ${ sideMenu === "design" ? "text-black" : "text-[#949393]"} flex items-center cursor-pointer hover:text-[#2d2d2dc1]`}
                                            onClick={()=> setSideMenu("design")}

                                        >
                                            Design
                                            {
                                                sideMenu === "design" &&
                                                <span className="w-full h-[2px] bg-black absolute bottom-0 left-0"></span>
                                            }
                                            
                                        </div>
                                        <div 
                                            className={`text-[14px] relative h-full ${ sideMenu === "logic" ? "text-black" : "text-[#949393]"} flex items-center cursor-pointer hover:text-[#2d2d2dc1]`}
                                            onClick={()=> setSideMenu("logic")}
                                        >
                                            Logic
                                            {
                                                sideMenu === "logic" &&
                                                <span className="w-full h-[2px] bg-black absolute bottom-0 left-0"></span>
                                            }
                                            
                                        </div>
                                        <div 
                                            className={`text-[14px] relative h-full ${ sideMenu === "settings" ? "text-black" : "text-[#949393]"} flex items-center cursor-pointer hover:text-[#2d2d2dc1]`}
                                            onClick={()=> setSideMenu("settings")}
                                        >
                                            Settings
                                            {
                                                sideMenu === "settings" &&
                                                <span className="w-full h-[2px] bg-black absolute bottom-0 left-0"></span>
                                            }
                                            
                                        </div>

            
                                    </div>
                        </div>


                        {
                            sideMenu === "design" ? 
                                <DesignSubMenu/>
                            :
                            sideMenu === "logic" ? 
                                <LogicSubMenu /> 
                            :
                            sideMenu === "settings" ?
                                <OtherSubMenu/> : null
                        }
                    </div>
                }

                
                
            </div>

             {/* Navbar */}
            <div className={`preview-navbar fixed top-0 flex  items-center justify-center  gap-2 h-[50px] w-screen bg-white shadow-sm z-[100] border border-l-0`}>

                <div 
                    className={`h-full px-3 lg:hidden flex items-center justify-center gap-1  cursor-pointer absolute left-[5px] `}
                    
                >
                    

                </div>
                
                <div 
                    className={`h-full px-3 flex items-center justify-center gap-1 cursor-pointer`} 
                    onClick={()=> {setEdit(false); setCurrentNav("preview")}}
                > 
                   
                   <p className={`${currentNav === "preview" ? "text-black border-black " : "text-[#8c8c8c]"} text-[15px] border h-full border-b-2 border-transparent flex items-center font-semibold`}>preview</p>  
                </div>
                <div 
                    className={`h-full px-3 flex items-center justify-center gap-1  cursor-pointer`}
                    onClick={()=> {setEdit(true); setCurrentNav("create")}}
                >
                    
                    <p className={`${currentNav === "create" ? "text-black" : "text-[#8c8c8c]"} text-[15px]  flex items-center border border-b-2 border-transparent  font-semibold `}>create</p>  
                </div>
                <div 
                    className={`h-full sm:hidden  flex items-center justify-center gap-1  cursor-pointer`}
                    onClick={()=> {navigate("/shareForm")}}
                >
                    
                    <p className="text-[14px] px-2 rounded-md py-[7px] font-semibold text-[#036351] hover:text-white hover:bg-[#036351d1] transition-all duration-200 ">Publish</p>
                </div>



                <div 
                    className={`h-full px-3 sm:flex hidden items-center justify-center gap-1  cursor-pointer absolute right-[50px] `}
                    onClick={()=> {navigate("/shareForm")}}
                >
                    
                    <p className="text-[14px] bg-[#036351] text-white py-[7px] font-semibold px-4 rounded-md shadow-lg hover:bg-[#036351d1] transition-all duration-200 hover:shadow-xl">Publish</p>
                </div>
                
               
            </div>

            {/* Left Sidebar */}
            <div className={` sidebar_right fixed left-0 top-[50px]  ${showSidebarLeft ? "w-[256px]" : "w-0" } h-screen bg-white shadow-md  border border-l z-[99] `}>
                <div className="h-full w-full">
                    
                    <div className="flex justify-between items-center mb-5 cursor-pointer px-[20px] pt-[16px]">
                        
                        <div className=" flex gap-2 items-center " onClick={()=> navigate("/templateBank")}>
                            <IoIosArrowRoundBack/>
                            <button className="text-[14px]">Back</button>
                        </div>
                        <div className={`${windowSize  > 1024 ? "hidden" : "flex"} text-[14px]`} onClick={()=>setShowSidebarLeft((prev)=> !prev)}>
                            Close
                        </div>
                        
                    </div>
                    <div className="py-[16px] flex justify-between items-center relative px-[20px] z-[9999]">

                        {/* Add que  */}
                        <motion.div
                            className="min-w-max scale-0 min-h-[400px] z-[9999] flex flex-col gap-5 bg-white shadow-lg opacity-0 absolute left-[260px] top-[30px] rounded-md origin-top-left"
                            initial={{
                                scale:0,
                                opacity:0,
                            }}
                            animate={{
                                scale: showAddQue ? [0.8,0.8,1] :[1,0.8,0],
                                opacity: showAddQue ? [0,0.8,1] :0,
                            }}
                            
                            transition={{
                                type:"spring",
                                stiffness:250,
                                damping:15,
                                duration:0.3
                            }}
                            
                        >
                            <div className="flex border-b px-4 py-2 items-center gap-2 text-[14px]">
                                <div >
                                    <FaMagnifyingGlass className="text-[#898989] fill-[#898989]"/>
                                </div>
                                <div>
                                    <input 
                                        type="text"
                                        placeholder="Find a question type..."
                                    />
                                </div>

                            </div>

                            <div className="flex w-full h-full  items-center justify-between px-4 gap-[20px]">
                                <div className="flex flex-col gap-4">
                                    <p className="text-[14px] text-[#5c5c5c] font-semibold"> Recommended</p>
                                    
                                    <div 
                                        onClick={()=> insertQue("text", ques?.indexOf(currQue))}
                                        className="flex gap-2 w-full px-2 py-2 rounded-sm items-center cursor-pointer hover:bg-[#dbdadab4] transition-all duration-200">
                                        <div className="h-[25px] w-[25px] rounded-sm flex items-center justify-center" style={{backgroundColor:bgProvider({type:"text"})}}>
                                            <svg class="SVGInline-svg" style={{width: "14px",height: "6px"}} width="14" height="6" viewBox="0 0 14 6" fill="black" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h7v2H0V0zM9 0h5v2H9V0zM0 4h3v2H0V4zM5 4h9c0 1.10457-.8954 2-2 2H5V4z"></path></svg>
                                        </div>
                                        <p className="text-[14px]">
                                            Short Text
                                        </p>
                                    </div>
                                    <div 
                                        onClick={()=> insertQue("textarea", ques?.indexOf(currQue))}
                                        className="flex gap-2 w-full px-2 py-2 rounded-sm items-center cursor-pointer hover:bg-[#dbdadab4] transition-all duration-200">
                                        <div className="h-[25px] w-[25px] rounded-sm bg-green-200 flex items-center justify-center" style={{backgroundColor:bgProvider({type:"textarea"})}}>
                                            <svg class="SVGInline-svg" style={{width: "14px",height: "10px"}} width="14" height="10" viewBox="0 0 14 10" fill="black" xmlns="http://www.w3.org/2000/svg"><path d="M8 8h6c0 1.10457-.8954 2-2 2H8V8zM0 8h6v2H0V8zM5 4h9v2H5V4zM0 4h3v2H0V4zM10 0h4v2h-4V0zM0 0h8v2H0V0z"></path></svg>
                                        </div>
                                        <p className="text-[14px]">
                                            Long Text
                                        </p>
                                    </div>
                                    <div 
                                        onClick={()=> insertQue("email", ques?.indexOf(currQue))}
                                        className="flex gap-2 w-full px-2 py-2 rounded-sm items-center cursor-pointer hover:bg-[#dbdadab4] transition-all duration-200">
                                        <div className="h-[25px] w-[25px] rounded-sm bg-green-200 flex items-center justify-center" style={{backgroundColor:bgProvider({type:"email"})}}>
                                            <svg class="SVGInline-svg" style={{width: "14px",height: "12px"}} width="16" height="12" viewBox="0 0 16 12" fill="black" xmlns="http://www.w3.org/2000/svg"><path d="M9.898 7.182C9.391 7.689 8.717 7.968 8 7.968C7.2825 7.968 6.6085 7.6885 6.102 7.1815L0 1.08V10C0 11.1045 0.8955 12 2 12H14C15.1045 12 16 11.1045 16 10V1.08L9.898 7.182Z"></path><path d="M8 6.505C8.3165 6.505 8.633 6.3875 8.8685 6.1525L15.0205 0H0.9795L7.1315 6.1525C7.367 6.3875 7.6835 6.505 8 6.505Z"></path></svg>
                                        </div>
                                        <p className="text-[14px]">
                                            Email
                                        </p>
                                    </div>
                                    <div 
                                        onClick={()=> insertQue("date", ques?.indexOf(currQue))}
                                        className="flex gap-2 w-full px-2 py-2 rounded-sm items-center cursor-pointer hover:bg-[#dbdadab4] transition-all duration-200">
                                        <div className="h-[25px] w-[25px] rounded-sm bg-green-200 flex items-center justify-center" style={{backgroundColor:bgProvider({type:"date"})}}>
                                        <svg class="SVGInline-svg" style={{width: "14px",height: "16px",}} width="14" height="16" viewBox="0 0 14 16" fill="black" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 2V0C11.6715 0 11 0.6715 11 1.5V2H3V1.5C3 0.6715 2.3285 0 1.5 0V2H0V14C0 15.1045 0.8955 16 2 16H12C13.1045 16 14 15.1045 14 14V2H12.5ZM12.5 14C12.5 14.2755 12.2755 14.5 12 14.5H2C1.7245 14.5 1.5 14.2755 1.5 14V6H12.5V14Z"></path> <path d="M9.25 10C9.94036 10 10.5 9.44036 10.5 8.75C10.5 8.05964 9.94036 7.5 9.25 7.5C8.55964 7.5 8 8.05964 8 8.75C8 9.44036 8.55964 10 9.25 10Z"></path></svg>
                                        </div>
                                        <p className="text-[14px]">
                                            Date
                                        </p>
                                    </div>
                                    
                                </div>

                                <div className="flex flex-col gap-4">
                                    <p className="text-[14px] text-[#5c5c5c] font-semibold"> Choices</p>
                                    <div 
                                        onClick={()=> insertQue("radio", ques?.indexOf(currQue))}
                                        className="flex gap-2 w-full px-2 py-2 rounded-sm items-center cursor-pointer hover:bg-[#dbdadab4] transition-all duration-200">
                                        <div className="h-[25px] w-[25px] rounded-sm bg-green-200 flex items-center justify-center" style={{backgroundColor:bgProvider({type:"radio"})}}>
                                        
                                        <svg class="SVGInline-svg" style={{width: "17px",height: "17px"}} width="17" height="17" viewBox="0 0 17 17" fill="black" xmlns="http://www.w3.org/2000/svg"><path d="M8.13086.368561C3.71236.368561.130859 3.95006.130859 8.36856c0 4.41854 3.581501 8.00004 8.000001 8.00004 4.41854 0 8.00004-3.5815 8.00004-8.00004 0-4.4185-3.5815-7.999999-8.00004-7.999999zm0 14.500039c-3.584 0-6.5-2.916-6.5-6.50004 0-3.584 2.916-6.5 6.5-6.5V14.8686z"></path></svg>
                                        </div>
                                        <p className="text-[14px]">
                                            Radio
                                        </p>
                                    </div>
                                    <div 
                                        onClick={()=> insertQue("matrix", ques?.indexOf(currQue))}
                                        className="flex gap-2 w-full px-2 py-2 rounded-sm items-center cursor-pointer hover:bg-[#dbdadab4] transition-all duration-200">
                                        <div className="h-[25px] w-[25px] rounded-sm bg-green-200 flex items-center justify-center" style={{backgroundColor:bgProvider({type:"matrix"})}}>
                                        <svg class="SVGInline-svg" style={{width: "16px",height: "14px"}}  width="16" height="14" viewBox="0 0 20 18" fill="black" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 8.75H1.752l-.002 6.73c0 .165.128.27.25.27h8v-7c0 .165.122 0 0 0h8.25v-7h-8.248l-.002 7zM.005 0L0 15.48a2.01 2.01 0 002 2.02h16c1.105 0 2-.904 2-2.02V0H.005z"></path></svg>
                                        </div>
                                        <p className="text-[14px]">
                                            Matrix
                                        </p>
                                    </div>
                                    <div 
                                        onClick={()=> insertQue("checkbox", ques?.indexOf(currQue))}
                                        className="flex gap-2 w-full px-2 py-2 rounded-sm items-center cursor-pointer hover:bg-[#dbdadab4] transition-all duration-200">
                                        <div className="h-[25px] w-[25px] rounded-sm bg-green-200 flex items-center justify-center" style={{backgroundColor:bgProvider({type:"checkbox"})}}>
                                        <svg class="SVGInline-svg" style={{width: "14px",height: "10px"}} width="14" height="10" viewBox="0 0 14 10" fill="black" xmlns="http://www.w3.org/2000/svg" data-qa="check-svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.7072.707124L5.00008 9.41423.292969 4.70712c.781051-.78104 2.047381-.78104 2.828431 0L5.00008 6.5858 10.8788.707124c.781-.7810482 2.0473-.7810482 2.8284 0z"></path></svg>
                                        </div>
                                        <p className="text-[14px]">
                                            Checkbox
                                        </p>
                                    </div>
                                    <div 
                                        onClick={()=> insertQue("range", ques?.indexOf(currQue))}
                                        className="flex gap-2 w-full px-2 py-2 rounded-sm items-center cursor-pointer hover:bg-[#dbdadab4] transition-all duration-200">
                                        <div className="h-[25px] w-[25px] rounded-sm bg-green-200 flex items-center justify-center" style={{backgroundColor:bgProvider({type:"range"})}}>
                                        <svg class="SVGInline-svg" style={{width: "14px",height: "14px"}} width="14" height="14" viewBox="0 0 14 14" fill="black" xmlns="http://www.w3.org/2000/svg"><path d="M7.64345.467259L8.98398 4.5934h4.33832c.6554 0 .9275.83827.3977 1.22371l-3.5097 2.55024 1.3405 4.12615c.2026.623-.5105 1.1414-1.0408.7564l-3.50969-2.5506-3.50969 2.5502c-.53026.385-1.24339-.133-1.04083-.7565l1.34053-4.12609-3.510132-2.5498C-.250072 5.4321.022496 4.5934.677883 4.5934H5.01622L6.35674.467259c.20257-.623012 1.08458-.623012 1.28671 0z"></path></svg>
                                        </div>
                                        <p className="text-[14px]">
                                            Rating
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </motion.div>


                        <p className="text-[14px] text-[#262627] font-[500]">Content</p>

                        <Tooltip
                            title="Add Question"
                            arrow={true}
                        >
                            <div 
                                className="bg-[#E3E3E3] p-[8px] rounded-md cursor-pointer"
                                onClick={()=> {console.log("adding... quee"); setShowAddQue((prev)=> !prev)}}
                            >
                                <IoMdAdd/>
                            </div>
                        </Tooltip>
                        
                        
                    </div>
                    <div className="scrollable max-h-[60%] overflow-x-hidden overflow-y-scroll  py-[20px] flex flex-col gap-2 ">

                    {
                        ques.map((que,idx)=>(
                            <div 
                                onClick={()=> setCurrQue(que)}
                                className={`w-full h-full px-[20px] min-h-[50px] max-h-[60px] flex justify-between items-center gap-5 py-[8px] hover:bg-zinc-200 ${currQue === que ? "bg-zinc-200" : ""} transition-all duration-100 cursor-pointer rounded-sm`}>
                            
                                <p className="text-[12px]">{que?.statement?.length >= 30 ? `${que?.statement?.substr(0,30)}...` : que?.statement}</p>
                                <div className="min-w-[50px] h-[22px]  rounded-sm flex justify-between  items-center p-1" style={{background:bgProvider(que)}}>
                                    <div className="text-[12px] font-bold">

                                        {iconProvider(que)}
                                    </div>
                                    <div className="text-[12px] font-bold">
                                        {idx+1}
                                    </div>                                
                                </div>                          
                            
                            </div>
                        ))
                    }
                        
                    </div>
                </div>
            </div>


            {/* Main2 */}

        {
            ques.length === 0 ?

            <div className={`preview-main w-screen ${showSidebarLeft === true && showSidebarRight === true ? "ml-[256px]" : "mx-auto" } min-h-screen h-screen  flex items-center justify-center px-[20px] z-[-19]`}>
                <div
                    className="h-[500px] w-[500px] flex flex-col gap-6 items-center justify-center"
                >
                    <img
                        className="object-cover "
                        src={Dog}
                        alt="empty"
                    />

                    <p className="text-center text-[18px]">Data coming soon. In the meantime, enjoy the suspense!</p>
                </div>
            </div>
            :
            <div className={`preview-main w-screen ${showSidebarLeft ? "ml-[256px]" : "mx-auto" } flex-col gap-3 min-h-screen h-max   flex items-center justify-center px-[20px] z-[-1]`}>

                <div className="w-full h-[50px] lg:hidden flex justify-center items-center gap-3 py-2 mt-[10px]"> 
                    <button 
                        className="min-w-[90px] h-full px-2 px-1 bg-black text-white rounded-sm text-[13px]"
                        onClick={()=> setShowSidebarLeft((prev)=> !prev)}
                    >
                        List
                    </button>
                    <button 
                        className="min-w-[90px] h-full px-2 px-1 bg-black text-white rounded-sm text-[13px]"
                        onClick={()=> setShowSidebarRight((prev)=> !prev)}                        
                    >
                        Settings
                    </button>
                    
                </div>
                <motion.div 
                    className={`que_card lg:min-h-[480px] lg:max-h-[462px] max-h-[400px] min-h-[400px] w-full items-center  shadow-md rounded-md ${visualData.layout === "fl" || visualData.layout === "sl" ? "pl-0 xxs:pr-[50px] pr-0 flex-row-reverse" : "pr-0 xxs:pl-[50px] pl-0"} flex justify-between  items-center relative`} 
                    style={{backgroundColor:formColor, background:`url(${visualData.backgroundImage})`}}
                    initial={{
                        scale:0.7,
                        opacity:0.7
                    }}
                    animate={{
                        scale:1,
                        opacity:1
                    }}
                    transition={{
                        duration:0.3,

                    }}
                >
                    <div 
                            className="absolute top-3 left-3  h-[30px] w-[30px] rounded-full cursor-pointer flex items-center justify-center hover:bg-[#dbdada] transition-all duration-200 z-[99]"
                            onClick={()=> setShowQueOptions((prev)=> !prev)}
                        >
                            <BsThreeDots className="text-xl"/>
                            <motion.div 
                                className={`preview_que_options absolute  ${showQueOpions ? "h-[100px]" : "h-0"} justify-center items-start top-[100%] w-[120px] overflow-hidden left-[100%] flex flex-col gap-2 rounded-sm bg-white`} 
                                style={{}}
                                animate={{
                                    height: showQueOpions ? 100 : 0,
                                }}
                                transition={{
                                    type:"tween",
                                    stiffness:150,
                                    
                                }}
                            >
                                <p className="px-3 py-1 text-[16px] hover:bg-[#dbdada] transition-all duration-100 w-full">Duplicate</p>
                                <p 
                                    className="text-red-400 px-3 py-1 text-[16px] hover:bg-[#dbdada] transition-all duration-100 w-full"
                                    onClick={()=> {setCurrQue(ques[ques.indexOf(currQue)-1]); deleteQue(ques.indexOf(currQue)); }}
                                >Delete</p> 

                            </motion.div>
                    </div>  
                    
                    <div className="h-full xs:w-[50%] w-full flex justify-center items-center">
                        <div className="max-w-full flex justify-center relative">                    
                            { queProvider() }
                        </div>
                    </div>

                    <div className="md:max-w-[50%] lg:min-w-[50%]  xs:min-w-[40%] xs:max-w-[40%] xs:static absolute w-full h-full z-[-1] xs:translate-y-0 xs:translate-x-0 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  h-full  flex justify-center items-center">
                        <img
                            className={` object-cover object-center z-[-1] ${visualData.layout === "sr" || visualData.layout === "sl" ? "w-[50%] h-[250px]" : visualData.layout === "f" ? "w-[200%] h-[400px]": `w-full  ${windowSize > 1024 ? "h-[480px]" : "h-[400px]"}`}`}
                            src={formImg1}
                            alt="formImg"
                        />
                    </div>
                </motion.div>
            </div>  
        }
        </div>

        

    )
}

