import { HiOutlineMenuAlt1,IoMdAdd } from "../assets/assets";
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import {useState,useEffect} from "react"
import useResponsiveStore from "../stores/ResponsiveStore";
import axios from "axios";
import useFormsStore from "../stores/FormsStore";
import toast from "react-hot-toast";
import useUserStore from "../stores/UserStore";
import FormCard from "../components/FormCard";
import { Link, useNavigate } from "react-router-dom";
import DropDownD from "../components/DropDownD";
import {motion} from "framer-motion"
import usePopupStore from "../stores/PopupStore";
import {ClipLoader} from "react-spinners"
import useAlanStore from "../stores/AlanStore";
export default function Dashboard(){
    const navigate = useNavigate();

    const updateUserDetails = useUserStore((state)=> state.updateUserDetails);

    const {showLogout, setShowLogout} = usePopupStore( (state)=>({
        showLogout: state.showLogout,
        setShowLogout: state.setShowLogout,
    }));
    
    const [activeSidebar, setActiveSidebar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [forms, setForms] = useState([]);
    
    const {screenSize, setScreenSize} = useResponsiveStore((state) =>({
        screenSize: state.screenSize,   
        setScreenSize:state.setScreenSize,
    }))

    const {formsData, updateFormsData} = useFormsStore((state)=>({
        formsData: state.formsData,
        updateFormsData:state.updateFormsData,
    }))

    const logoutHandler = ()=>{

        localStorage.removeItem("token");

        toast.success("Logout succesfull", {
            style: {
              border: '1px solid green',
              padding: '6px',
              color: '#green',
            },
            iconTheme: {
              primary: 'green',
              secondary: '#FFFAEE',
            },
        });
        setShowLogout(false);
        navigate("/");

    }

    const handleResize = ()=>{
        setScreenSize(window.innerWidth);

        if(window.innerWidth >= 760) setActiveSidebar(true);
        else setActiveSidebar(false);
        
    }

    useEffect(()=>{  

        window.addEventListener("resize",handleResize);

        handleResize();
        return ()=>{
            window.removeEventListener("resize",handleResize);
        }
    },[])

    const getUserDetails = async()=>{

        try{
            const token = localStorage.getItem("token");

            const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/getUser`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
          
    
            updateUserDetails(result.data.data);
        }
        catch(err){
            console.log(err);
            
        }
        

    }

    useEffect(()=>{

        getUserDetails();

    },[])

    const getForms = async ()=>{
        setLoading(true);
        try{
            const token = localStorage.getItem("token");

         

            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/getAllForms`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(response.data);
            
            setForms(response.data.data);
            console.log("data given to update" , response.data.data)
            updateFormsData(response.data.data);
        }

        catch(err){
            console.log(err);

            toast.error(err?.response?.data?.message || err?.message, {
                style: {
                  border: '1px solid #713200',
                  padding: '6px',
                  color: '#713200',
                },
                iconTheme: {
                  primary: '#713200',
                  secondary: '#FFFAEE',
                },
              });
        }

        setLoading(false);
    }

    useEffect( ()=>{
        
        getForms();

    },[])

    return (
        <div className="w-screen min-h-screen h-max  bg-[#fafafa] pt-[54px] relative" >

            <Navbar bgColor={"white"} border={1}/>

  
            <motion.div
                className={`   h-screen w-screen fixed z-[1000] top-0 left-0 bg-[#0000009a] flex items-center justify-center`}
                animate={ 
                    showLogout ? 
                    {
                        y : 0,
                        opacity:1
                    } : 
                    {y : "-100vh",
                    opacity:0
                    }}
                    
                initial ={{
                    y:"200vh",
                    opacity:0,
                }}
  
                transition={{
                    type:'tween',
                    duration:0.5,
                    ease:"easeInOut"

                }}
            >
                <motion.div
                        className="w-[400px] h-[200px] bg-white rounded-lg  flex flex-col gap-10 p-11 items-center justify-center"

                        animate={{
                            y: showLogout ? 0 : 20,
                            opacity: showLogout ? 1 : 0,
                        }}

                        initial={{
                            y:20,
                            opacity:0,
                        }}

                        transition={{
                            delay:0.6
                        }}
                    >
                    <h1 className="text-[22px] font-semibold">Are you sure you want to log out?</h1> 

                    <div className="flex gap-3">
                        <button 
                            className="min-w-[100px] py-2 px-3 border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-all duration-200"
                            onClick={logoutHandler}
                        > 
                            Logout 
                        </button>
                        <button
                            className="min-w-[100px] py-2 px-3 border border-black rounded-md  hover:bg-black hover:text-white transition-all duration-200"
                            onClick={()=> setShowLogout(false)}
                        > 
                            Cancel 
                        </button>
                    </div>

                </motion.div>
            </motion.div>
            
          
            
            {/* show or not show the sidebar */}
            {activeSidebar ? 
                (
                    <div className=" w-[256px]  fixed sidebar top-[45px] md:overflow-hidden overflow-y-scroll border-r-[1px] bg-white" >
                        <Sidebar/>
                    </div>
                ):(
                // collapse the sidebar if false
                    <div className=" w-0  fixed sidebar top-[45px] md:overflow-hidden overflow-y-scroll border-r-[1px] bg-white z-[999]">
                        <Sidebar/>
                    </div>
                )}
                
            {/*  Main  */}


            <div className={`${activeSidebar ? "ml-[256px]" : ""} flex flex-col p-[20px] pt-0  `}>
                
                {/* Navbar */}

 
                <div className={`fixed ${ activeSidebar ? "left-[256px]" : "left-0" } top-[50px] z-[10] bg-[#fafafa] h-[80px]   flex items-center px-[20px]  border-b  justify-between`} style={ activeSidebar ? {width:"calc(100vw - 256px)"} : {width : "100vw"} }>
            
                    <div className="flex gap-3">
                        <div 
                            className="bg-[#e3e3e3] w-8 h-8 rounded-md md:hidden justify-center items-center cursor-pointer flex"
                            onClick={()=> setActiveSidebar((prev)=> !prev)}
                        >
                            <HiOutlineMenuAlt1 className="text-lg text-white"/>
                        </div>
                        <div className="px-4 h-8 bg-[#262627] py-2 rounded-md text-sm text-white md:flex hidden justify-center gap-1 items-center cursor-pointer hover:bg-zinc-700 transition-all duration-200">
                            <Link to="/templateBank">Create new form</Link>
                            <IoMdAdd className="fill-white"/>
                        </div>

                        
                        <div className="h-8 px-3 bg-[#e3e3e3] flex items-center justify-center rounded-md md:hidden">
                            <svg class="SVGInline-svg"  width="23" height="22" viewBox="0 0 19 18" fill="#8a51dd" xmlns="http://www.w3.org/2000/svg"><path d="M15.102 6.99833C15.1627 7.18067 15.4207 7.18067 15.4814 6.99833L16.2917 4.56754L18.7225 3.75728C18.9048 3.6965 18.9048 3.43859 18.7225 3.37781L16.2917 2.56754L15.4814 0.136755C15.4207 -0.0455847 15.1627 -0.0455849 15.102 0.136754L14.2917 2.56754L11.8609 3.37781C11.6786 3.43859 11.6786 3.6965 11.8609 3.75728L14.2917 4.56754L15.102 6.99833ZM9.79169 8.06754L7.74688 3.56895C7.56924 3.17815 7.01415 3.17815 6.83651 3.56895L4.7917 8.06754L0.293099 10.1124C-0.0976992 10.29 -0.0976999 10.8451 0.293098 11.0227L4.7917 13.0675L6.83651 17.5661C7.01415 17.9569 7.56924 17.9569 7.74688 17.5661L9.79169 13.0675L14.2903 11.0227C14.6811 10.8451 14.6811 10.29 14.2903 10.1124L9.79169 8.06754Z"></path></svg>
                        </div>
                    </div>
                    <div className="flex gap-3 ">
                        <div className="md:flex gap-2 items-center bg-[#e3e3e3] text-white h-8 rounded-md px-3 cursor-pointer hidden">
                            <svg class="SVGInline-svg"  width="23" height="22" viewBox="0 0 19 18" fill="#8a51dd" xmlns="http://www.w3.org/2000/svg"><path d="M15.102 6.99833C15.1627 7.18067 15.4207 7.18067 15.4814 6.99833L16.2917 4.56754L18.7225 3.75728C18.9048 3.6965 18.9048 3.43859 18.7225 3.37781L16.2917 2.56754L15.4814 0.136755C15.4207 -0.0455847 15.1627 -0.0455849 15.102 0.136754L14.2917 2.56754L11.8609 3.37781C11.6786 3.43859 11.6786 3.6965 11.8609 3.75728L14.2917 4.56754L15.102 6.99833ZM9.79169 8.06754L7.74688 3.56895C7.56924 3.17815 7.01415 3.17815 6.83651 3.56895L4.7917 8.06754L0.293099 10.1124C-0.0976992 10.29 -0.0976999 10.8451 0.293098 11.0227L4.7917 13.0675L6.83651 17.5661C7.01415 17.9569 7.56924 17.9569 7.74688 17.5661L9.79169 13.0675L14.2903 11.0227C14.6811 10.8451 14.6811 10.29 14.2903 10.1124L9.79169 8.06754Z"></path></svg>
                            <p className="text-sm ">Generate with AI</p>
                        </div>
                        <DropDownD/>
                        
                    </div>

                </div>

                
                
                {/* All Cards */}   
                <div className="flex flex-wrap gap-4 mt-[120px] ">

                    {
                        loading ?
                        <ClipLoader color="#000000" className="absolute top-[50%] left-[50%]" />:

                        formsData.map((form)=>(

                            <FormCard form={form} key={form._id}/>
                            
                        ))
                        
                    }
                </div>

            </div>


            

        </div>
    )
}
