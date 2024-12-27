import {BsThreeDots} from "../assets/assets";
import {useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import useFormsStore from "../stores/FormsStore";

export default function FormCard({form}){
    const navigate = useNavigate();

    const updateFormsData = useFormsStore( (state)=> state.updateFormsData);

    const [showFormOpt, setShowFormOpt] = useState(false);

    const copyToClipboard = async ()=>{

        try{

        
            const baseUrl = window.location.origin

            await  navigator.clipboard.writeText(`${baseUrl}/form/${form._id}`);


            toast.success("Link coppied", {
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

        }

        catch(err){
            console.log(err);

            toast.error("Link can't be coppied", {
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

       

    }

    const deleteForm = async ()=>{
        try{    

            const token = localStorage.getItem("token");

            const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/deleteForm`,{formId:form._id},{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(result.data);

            updateFormsData(result.data.data);

        }
        catch(err){
            console.log(err);
        }
    }

    const onClickHandler = ()=>{
        navigate(`/form/${form._id}`)
    }

    // form?.title?.length >= 16 ? `${form?.title?.substr(0,16)}...` : form?.title}
    
    return(
        <div 
            className="form_card md:h-[210px] h-[188px] w-[156px] md:w-[1768px] max-h-[220px] max-w-[180px] bg-white  rounded-lg hover:scale-[1.002] transition-all duration-200 cursor-pointer "
           
        >

            <div className="md:h-[148px] h-[128px] w-full border-b bg-center bg-cover bg-no-repeat rounded-t-lg flex items-center justify-center" style={{backgroundImage:`url(${form?.logo})`}} onClick={onClickHandler}>
                <p className="text-[14px]">{form?.title?.length >= 16 ? `${form?.title?.substr(0,16)}...` : form?.title}</p>
            </div>
                <div className="max-w-[180px] max-h-[220px] flex flex-col p-3 justify-center">
                <div  className="flex items-center justify-between">

                    <p className={`text-[12px] ${form.responses?.length > 0 ? "text-black" : "text-[#BBBBBB]" }`}>
                        { form?.responses?.length ===0 ? "no response" : form?.responses?.length === 1 ? "1 response" : `${form?.responses?.length} responses` }
                    </p>
                    <p 
                        className="h-8 w-8 bg-white flex justify-center items-center rounded-md hover:bg-[#e3e3e3] transition-all duration-100 relative z-0"
                        onClick={()=> setShowFormOpt((prev)=> !prev)}
                    > 

                        {
                            showFormOpt && 
                            
                            <div className="absolute top-0 left-[100%] h-max py-3 w-[170px] flex flex-col bg-[#ffffff] shadow-lg rounded-md z-[200]">

                                <div className="mb-1 border-b">
                                    <div>
                                        <p 
                                            className="text-[14px] py-[6px] px-[23px] hover:bg-[#0000001d] transition-all duration-100"
                                            onClick={()=> navigate(`/form/${form._id}`)}
                                        >
                                        
                                        Open</p>
                                    </div>
                                    <div className=""> 
                                        <p 
                                            className="text-[14px] py-[6px] px-[23px] hover:bg-[#0000001d] transition-all duration-100"
                                            onClick={()=> copyToClipboard()}
                                        >
                                            Copy link
                                        </p>
                                    </div>
                                </div>

                                <div className="mb-1 border-b">
                                    <div 
                                        className=""
                                        onClick={() => navigate(`/formResults/${form._id}`)}
                                    >
                                        <p className="text-[14px] py-[6px] px-[23px] hover:bg-[#0000001d] transition-all duration-100" >Results</p>
                                    </div>
                                    <div className="">
                                        <p className="text-[14px] py-[6px] px-[23px] hover:bg-[#0000001d] transition-all duration-100">Rename</p>
                                    </div>
                                </div>
                                
                                <div className="">
                                    <p 
                                        className="text-[14px] py-[6px] px-[23px] text-red-500 hover:bg-[#0000001d] transition-all duration-100"
                                        onClick={deleteForm}
                                    >
                                        Delete</p>
                                </div>
                            </div>  
                        }
                        <BsThreeDots className="z-[0]"/>
                    </p>
                </div>
            </div>
        </div>
    )
}