import { formSubmission } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import bg from "../assets/successResponseImg.png";

export default function FormGif(){
    
    const navigate = useNavigate();

    return(
        <div className="h-screen w-screen flex justify-center items-center" style={{backgroundImage:`url(${bg})`}}>
            <div className="flex flex-col w-[60%]  gap-7 justify-center items-center">
                <img className="md:w-[500px] w-[90%]  md:h-[350px] object-cover" alt="succesfull submission" src={formSubmission} />
                <p className="text-white sm:text-[20px] md:text-[24px] text-center"> Your have been really helpful!</p>
                <p className="text-white sm:text-[20px] md:text-[24px] text-center">Thanks for your input. For any questions or feedback, please don't hesitate to contact us  </p>
            </div>

            <div className="h-[50px] fixed bottom-0 left-0 w-full flex items-center justify-center sm:justify-end bg-[#00000022]">

                <div className="flex gap-2 items-center mr-3">
                    <p className="text-[14px] text-white hidden sm:block"> How you ask is everyting</p>
                    <button className="bg-white text-[14px] flex items-center gap-1 px-2 py-[2px] rounded-sm " onClick={()=> navigate("/")}> Create with <span className="text-[#696868] font-semibold">Querify</span> </button>
                </div>
                
            </div>
        </div>
    )
}