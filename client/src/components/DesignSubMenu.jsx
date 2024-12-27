import { IoIosArrowDown,FaDroplet,IoIosArrowRoundBack,FaRegEye, MdEdit} from "../assets/assets";
import DropDownB from "./DropDownB";
import useFormStore from "../stores/FormStore";
import { useState } from "react";
import DropDownF from "./DropDownF";
import toast from "react-hot-toast";
import {motion} from "framer-motion"

export default function DesignSubMenu() {

    const [showLayout, setShowLayout] = useState(false);

    const layoutProvider = ()=>{

      switch(visualData.layout){
        
        case "fr":
          return <svg name="desktop+split-right" width="32" style={{fill:"#036b8c"}} height="24" viewBox="0 0 32 24"  xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 3a1 1 0 0 1 1-1h11a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H17a1 1 0 0 1-1-1V3ZM5 13.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75ZM5.75 10a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Z" ></path></svg>;
        case "fl":
          return <svg name="desktop+split-left" width="32" height="24" style={{fill:"#036b8c"}} viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 4a2 2 0 0 1 2-2h11a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H4a2 2 0 0 1-2-2V4Zm17 9.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Zm.75-3.75a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Z" ></path></svg>;
        case "sl":
          return <svg name="desktop+float-left" width="32" height="24" style={{fill:"#036b8c"}} viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 10a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-4ZM18 13.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75ZM18.75 10a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Z" ></path></svg>;
        case "sr":
          return <svg name="desktop+float-right" width="32" height="24" viewBox="0 0 32 24" style={{fill:"#036b8c"}} fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 10a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2v-4ZM5 13.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75ZM5.75 10a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Z" ></path></svg>;
        case "f":
          return <svg name="desktop+wallpaper" width="f" height="24" style={{fill:"#036b8c"}} viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 4a2 2 0 0 1 2-2h24a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm6 9.75a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H8.75a.75.75 0 0 1-.75-.75ZM8.75 9a.75.75 0 0 0 0 1.5h14.5a.75.75 0 0 0 0-1.5H8.75Z" ></path></svg>;
        default :
          return ""
      }
    }
  

    const {visualData, updateVisualData,setLogo,logo} = useFormStore( (state)=>({
        visualData: state.visualData,
        updateVisualData: state.updateVisualData,
        setLogo: state.setLogo,
        logo: state.logo
    }));

    console.log(visualData);

    const handleFileInput = (e)=>{
      const imageFile =  e.target.files[0];

      setLogo(imageFile);

      toast.success(`Image uploaded : ${imageFile.name}`, {
        style: {
          border: '1px solid green',
          padding: '6px',
          color: '#green',
          width: "max-content",
          maxWidth:"400px",
          overflow:"hidden",
        },
        iconTheme: {
          primary: 'green',
          secondary: '#FFFAEE',
        },
      });

    }

  return (
    <div className="w-full h-full flex flex-col ">
      <div>
        {/* Font family field */}
        <div className="w-full h-[120px] px-[16px] flex flex-col justify-center ">
          <div className="h-[50%] flex items-center ">
            <p className="font-semibold">My Theme</p>
          </div>
          <div className="h-[50%] flex items-center justify-center">
            <DropDownB />
          </div>
        </div>
        {/* Font Size Field */}
        <div className="w-full h-max px-[16px] py-5 flex justify-between border-b ">
          <div className="h-[50%] flex items-center ">
            <p className="font-semibold">Font Size</p>
          </div>
          <div className="h-[50%] w-[35%] flex items-center justify-center">
            <DropDownF/>
          </div>
        </div>

        {/* Color fields */}
        <div className="w-full p-[16px] flex flex-col gap-4">
          <div className="w-full flex justify-between items-center ">
            <p className="text-[15px]">Questions</p>
            <div className="flex border p-2 rounded-md items-center gap-2 relative hover:bg-gray-200 transition-all duration-200">
              
              <input 
                type="color" 
                className="color_input" 
                value={visualData.queColor}
                onChange={(e)=> updateVisualData({queColor:e.target.value})}
            />

              <FaDroplet className={` color_icon`} style={{fill:visualData.queColor}}/>

              <IoIosArrowDown />
            </div>
          </div>
          <div className="w-full flex justify-between items-center">
            <p className="text-[15px]">Answers</p>
            <div className="flex border p-2 rounded-md items-center gap-2 relative hover:bg-gray-200 transition-all duration-200">
              <input 
                type="color" 
                className="color_input" 
                value = {visualData.ansColor}
                onChange={(e)=> updateVisualData({ansColor: e.target.value})}
            />

              <FaDroplet className=" color_icon" style={{fill:visualData.ansColor}}/>

              <IoIosArrowDown />
            </div>
          </div>
          <div className="w-full flex justify-between items-center">
            <p className="text-[15px]">Background</p>
            <div className="flex border p-2 rounded-md items-center gap-2 relative hover:bg-gray-200 transition-all duration-200">
              <input 
                type="color" 
                className="color_input" 
                value = {visualData.background}
                onChange={(e)=> updateVisualData({background: e.target.value})}
            />

              <FaDroplet className="fill-green-200 color_icon" style={{fill:visualData.background}} />

              <IoIosArrowDown />
            </div>
          </div>
          <div className="w-full flex justify-between items-center">
            <p className="text-[15px]">Labels</p>
            <div className="flex border p-2 rounded-md items-center gap-2 relative hover:bg-gray-200 transition-all duration-200">
              <input 
                type="color" 
                className="color_input" 
                value = {visualData.labelColor}
                onChange={(e)=> updateVisualData({labelColor: e.target.value})}
            />

              <FaDroplet className="fill-green-200 color_icon" style={{fill:visualData.labelColor}} />

              <IoIosArrowDown />
            </div>
          </div>
          <div className="w-full flex justify-between items-center">
            <p className="text-[15px]">Buttons</p>
            <div className="flex border p-2 rounded-md items-center gap-2 relative hover:bg-gray-200 transition-all duration-200">
              <input 
                type="color" 
                className="color_input" 
                value = {visualData.buttonColor}
                onChange={(e)=> updateVisualData({buttonColor: e.target.value})}
            />

              <FaDroplet className="fill-green-200 color_icon" style={{fill:visualData.buttonColor}} />

              <IoIosArrowDown />
            </div>
          </div>
        </div>

        {/* Logo field */}
        <div className="w-full px-[16px] flex flex-col gap-4 border">
          <div className="relative flex justify-between items-center w-full pt-3">
            <p className="text-[15px]">Logo</p>

            <div className="relative w-[60px] rounded-md h-[30px] overflow-hidden border cursor-pointer hover:bg-gray-200 transition-all duration-200">
              <input
                type="file"
                className="w-full h-full absolute top-0 right-0 opacity-0 cursor-pointer"
                onChange={handleFileInput}
              />
              <p className="text-[14px] w-full h-full flex items-center  text-center ml-3">
                Add
              </p>
            </div>
          </div>

          <div className="w-full  py-2 mb-2"> 
            <div className="flex flex-col justify-between w-full gap-4">
                <p className="text-">Logo Radius</p>
                <input
                  type="range"
                  min={0} 
                  max={50} 
                  className="slider border-blue"
                  value={visualData.logoBorderRadius}
                  onChange={(e) => updateVisualData({logoBorderRadius:e.target.value})}
                />
            </div>
          </div>

        </div>
        
        {/* Layout */}
        <div className="flex flex-col px-[16px] py-[20px] gap-5 min-h-[500px]">
          <p className="text-[14px] font-semibold">
            Layout
          </p>

          <div className="flex justify-between items-center relative">
            <p className="text-[14px] text-[#868383]">
              Desktop
            </p>
            <div 
              className="w-[70px] h-[35px] rounded-md flex relative px-2 border border-[#868383]  justify-between py-3 items-center gap-2 cursor-pointer hover:bg-gray-200 transition-all duration-200"
              onClick = {()=> {setShowLayout((prev)=> !prev); console.log("now")}}
            >
                <div>
                  {layoutProvider()}
                  
                </div>
                <div>
                  <IoIosArrowDown/>
                </div>
            </div>
            <motion.div 
              className={`flex max-w-[136px] min-w-[136px] items-center justify-evenly absolute top-[110%] right-0 bg-white shadow-md ${showLayout && "border"} border-[#868383] outline-2 outline-[#605d5d] rounded-md h-[80px] gap-2 overflow-hidden`}
              animate={{
                height:showLayout ? 80 : 0,
              }}
            >
                  <div className="flex flex-col items-center justify-center h-full  gap-1 rounded-md">
                    <div 
                      className="border border-[#bdbdbc] rounded-sm"
                      onClick={()=> {updateVisualData({layout: "sr"}); setShowLayout((prev)=> !prev)}}
                    >
                      <svg name="desktop+float-right" width="32" height="24" viewBox="0 0 32 24" style={{fill:"#036b8c"}} fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 10a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2v-4ZM5 13.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75ZM5.75 10a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Z" ></path></svg>
                    </div>
                    <div 
                      className="border border-[#bdbdbc] rounded-sm"
                      onClick={()=> {updateVisualData({layout: "fr"}); setShowLayout((prev)=> !prev)}}
                    >
                      <svg name="desktop+split-right" width="32" style={{fill:"#036b8c"}} height="24" viewBox="0 0 32 24"  xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 3a1 1 0 0 1 1-1h11a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H17a1 1 0 0 1-1-1V3ZM5 13.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75ZM5.75 10a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Z" ></path></svg>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center h-full gap-1">
                    <div 
                      className="border border-[#bdbdbc] rounded-sm"
                      onClick={()=> {updateVisualData({layout: "fl"}); setShowLayout((prev)=> !prev)}}
                    >
                      <svg name="desktop+split-left" width="32" height="24" style={{fill:"#036b8c"}} viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 4a2 2 0 0 1 2-2h11a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H4a2 2 0 0 1-2-2V4Zm17 9.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Zm.75-3.75a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Z" ></path></svg>
                    </div>
                    <div 
                      className="border border-[#bdbdbc] rounded-sm"
                      onClick={()=> {updateVisualData({layout: "sl"}); setShowLayout((prev)=> !prev)}}
                    >
                      <svg name="desktop+float-left" width="32" height="24" style={{fill:"#036b8c"}} viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 10a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-4ZM18 13.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75ZM18.75 10a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Z" ></path></svg>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center h-full gap-1">
                    <div 
                      className="border border-[#bdbdbc] rounded-sm"
                      onClick={()=> {updateVisualData({layout: "f"}); setShowLayout((prev)=> !prev)}}
                    >
                      <svg name="desktop+wallpaper" width="f" height="24" style={{fill:"#036b8c"}} viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 4a2 2 0 0 1 2-2h24a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm6 9.75a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H8.75a.75.75 0 0 1-.75-.75ZM8.75 9a.75.75 0 0 0 0 1.5h14.5a.75.75 0 0 0 0-1.5H8.75Z" ></path></svg>
                    </div>
                    
                  </div>
            </motion.div> 
            
          </div>
          
                 
        </div>
        
      </div>
    </div>
  );
}
