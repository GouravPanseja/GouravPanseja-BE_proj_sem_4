import {useState, useEffect} from "react";
import {motion} from "framer-motion"
import { IoIosArrowDown } from "react-icons/io";
import {Link,NavLink, useLocation, useNavigate} from "react-router-dom";
import { CiMenuFries } from "react-icons/ci";
import {navLinks} from "../data/index";
import { HiOutlineMenuAlt1 } from "../assets/assets";
import { IoCloseOutline } from "react-icons/io5";
import useUserStore from "../stores/UserStore";

const Navbar = ({bgColor,border}) => {

    const location = useLocation();
    const path = location.pathname.split("/");

    const page = path[path.length - 1];


    const [toggle, setToggle] = useState(false);
    const [active, setActive] = useState('');
    const [isHovered,setIsHovered] = useState(null);
    const navigate = useNavigate();
    
    const userDetails = useUserStore ( ( state) => state.userDetails);

    const parentToggle = {
      "hidden":{
        scaleY:0,
        transition:{
          ease:"easeInOut",
          when:'beforeChildren',
          duration:0.4,
          delay:0.1,
          staggerChildren:0.2
        }
      },  
      "visible":{
        scaleY:1,
        transition:{
          ease:"easeInOut",
          when:"beforeChildren",
          duration:0.4,
          staggerChildren:0.2
        }
      }
    }
    
    const childToggle = {
      "hidden":{
        opacity:0,
        transition:{
          duration:0.05
        }
      }, 
      "visible":{
        opacity:1,
        transition:{
          delay:0.4
        }
      }
    }

    return (
      <nav className={`navbar px-4 ${page === 'about' ? 'block' : 'fixed'} h-[50px] w-screen top-0 left-0  flex  items-center py-1  z-20 bg-${bgColor} ${border ? "border" : ""} `}>
         
         <div className='w-screen flex justify-between items-center max-w-8xl '>
            
            <div
            
              className='flex items-center gap-5'
              onClick={()=> {
                navigate("/dashboard")
              }}
            >
              <img src="https://api.dicebear.com/5.x/initials/svg?seed=querfy%" alt="logo" className={`w-8 h-8 object-contain ${page === 'about' && 'hidden' } rounded-md`}/> 
              <p className={`text-black text-[18px] font-bold cursor-pointer ${page === 'about' ? 'hidden' : 'block'}`}>Querify</p>
            </div>
            
            <ul 
              className='list-none hidden lg:flex flex-row md:gap-14  gap-10'
            >
              {navLinks.map((link)=> (
                <li 
                  key={link.id} 
                  className={`flex items-center gap-4 text-[13px] font-normal tracking-wider text-black cursor-pointer`}
                  onMouseEnter = {()=>{setIsHovered(link.id)}}
                  onMouseLeave = {()=>{setIsHovered(null)}}
                >
                  <motion.span
                    animate={{
                    color: isHovered === link.id ? "gray" : "black"
                    }}
                    transition={{duration:0.2}}
                  >
                  {link.title}
                  </motion.span>
  
                  <motion.span
                    animate = {{
                      y: isHovered === link.id ? 4 : 0,
                      color: isHovered === link.id ? "gray" : "black"
                    }}
  
                    transition={{
                      duration:0.2,
                      ease:"easeInOut"
                      }}
                    
                  >   
                  {   page !== 'about' &&
                    <IoIosArrowDown/>
                  }
                    
                  </motion.span>
  
                </li>  
              ))}
  
            </ul>
            
            <div className='flex gap-8 items-center'>

              <button className={`h-[30px] w-max px-2 py-2 rounded-sm  hidden ${page === 'about' ? "hidden" : "lg:flex"} items-center text-[15px] bg-[#036351] whitespace-nowrap text-white`}> View Plans</button>

              <div className={`min-w-9 min-h-9 max-h-9 max-w-9 rounded-full bg-[#e6cef2] ${page === 'about' ? 'hidden' : 'flex'}  items-center justify-center`}>
                  <p className="text-[14px]">{( userDetails?.name?.split(" ")[0]?.charAt(0)?.toUpperCase()  +  (userDetails?.name?.split(" ")[1]?.charAt(0)?.toUpperCase()) && (userDetails?.name?.split(" ")[1]?.charAt(0)?.toUpperCase())) || "Q"}</p>
              </div>
  
              <div 
                className='lg:hidden flex justify-end items-center cursor-pointer'
                onClick ={()=> setToggle((prev)=> !prev)}

                >
                  <HiOutlineMenuAlt1/>
              </div>
  
              <motion.div 
                className={`drop-menu absolute bg-white h-[90vh] transform origin-top w-screen top-[54px] left-0 p-10`}
                variants={parentToggle}
                initial="hidden"
                animate= {toggle ? "visible" : "hidden"}
                
              >
                {
                  navLinks.map((link)=>(
                    <motion.div 
                      variants={childToggle}
                      animate={toggle ? "visible" : "hidden"}                   
                      key={link.id}
                      className='text-[30px] h-[72px] flex justify-between items-center cursor-pointer'
                      onClick={()=> setToggle((prev)=>!prev)}
                    >
                        <span>{link.title}</span>
                        <span className='text-[16px]'><IoIosArrowDown/></span>
                    </motion.div>
                  ))
                }
              </motion.div>
            </div>
            
         
         </div>
      
      </nav>
    )
}
  
export default Navbar 