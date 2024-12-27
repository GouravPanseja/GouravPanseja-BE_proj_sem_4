import "../styles/About.css";
import Navbar from "../components/Navbar";
import {FaArrowRightLong, pinkgreenplant, pinkplant,cloud ,sea, bottle, back, circleVid, aboutVid1, aboutEnd,aboutImg1,aboutImg3, aboutImg6, aboutImg8, aboutImgSmall} from "../assets/assets";
import { useEffect, useRef, useState } from "react";
import { LocomotiveScrollProvider } from 'react-locomotive-scroll'
import "../styles/locomotive-scroll.css";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Shery from "sheryjs";
import {motion, useAnimation} from "framer-motion"
import { useNavigate } from "react-router-dom";
import Marquee from "../components/Marquee"
import Showcase from "../components/Showcase"
import useAboutStore from "../stores/AboutStore";
import "../index.css"
export default function About(){

    const controls2 = useAnimation();

    const showcaseMedia = useAboutStore((state)=> state.showcaseMedia);

    const parentVar={

        inital:{
            opaicty:1,
        },
        final:{
            opaicty:1,
            transition:{
                staggerChildren:0.2,
                
            }
        }
    }
    const childVar={

        inital:{
            y:"100%",
        },
        final:{
            y:0,
        }
    }

    const [scroll, setScroll] = useState(0);

    const scrollerRef = useRef(null);

    const navigate = useNavigate();

    useEffect(()=>{


        // showcase animation
        const showcaseCont = document.querySelector(".showcase-container");
        showcaseCont.addEventListener("mouseenter", ()=>{
            controls2.start({
                opacity:1,
            })
        })  
        showcaseCont.addEventListener("mouseleave", ()=>{
            controls2.start({
                opacity:0,
            })
        })  

        function vidCircleAnim(){
            window.addEventListener("mousemove",(e)=>{
                console.log("hi");
                
                gsap.to(".vid-cursor",{
                    x:e.clientX,
                    y:e.clientY,
                    duration:1,
                    ease:"linear"
                })
             
            })

            const vidSection = document.querySelector(".vid-section");
            
            vidSection.addEventListener("mouseenter",()=>{
                gsap.to(".vid-cursor",{
                    scale:1,
                    opacity:1,
                   
                })
            })
            vidSection.addEventListener("mouseleave",()=>{
                gsap.to(".vid-cursor",{
                    scale:0,
                    opacity:0,
                   
                })
            })
        }

        vidCircleAnim();

        window.addEventListener("scroll",(e)=>{
            console.log(window.scrollY)
        })


    
        gsap.to(".nav_item",{
            top:0,
            delay:0.8,
            opacity:1,
            stagger:0.1,
            duration:1,
            ease:"power3"
            
        })  

        document.querySelector('#vidBtn')
        .addEventListener("mouseover",()=>{
            gsap.to("#vid",{
                opacity:1,
                duration:1,
                ease:"power3"
            })
        })
        document.querySelector('#vidBtn')
        .addEventListener("mouseleave",()=>{
            gsap.to("#vid",{
                opacity:0,
                duration:1,
                ease:"power3"

            })
        })
        
        // gsap.to(".a_text",{
        //     width:500,

        //     scrollTrigger:{
               
        //         scroller:scrollerRef.current,
        //         start:"50% top ",
        //         end:"top top",
        //         scrub:2,
        //         markers:true,
        //     }
        // })

        Shery.makeMagnet(".imgAnim2" /* Element to target.*/, {
            //Parameters are optional.
            ease: "cubic-bezier(0.23, 1, 0.320, 1)",
            duration: 1,
        });

        Shery.hoverWithMediaCircle(".imgAnim1" /* Element to target.*/, {
            videos: [back],
        });


        // Shery.imageEffect(".imgAnim1",{
        //     style:3,
        //     gooey:true,
        //     debug:true,

        //    config : {"uFrequencyX":{"value":12,"range":[0,100]},"uFrequencyY":{"value":12,"range":[0,100]},"uFrequencyZ":{"value":10,"range":[0,100]},"geoVertex":{"range":[1,64],"value":32},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.6296296296296297},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":true},"growSize":{"value":6.77,"range":[1,15]},"durationOut":{"value":1.97,"range":[0.1,5]},"durationIn":{"value":2.87,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":false},"maskVal":{"value":1,"range":[1,5]},"scrollType":{"value":0},"noEffectGooey":{"value":true},"onMouse":{"value":0},"noise_speed":{"value":4.73,"range":[0,10]},"metaball":{"value":0.2,"range":[0,2],"_gsap":{"id":29}},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0.05,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}}
        // })

        Shery.textAnimate(".a_headings h1", {
            
            style: 2,
            y: 10,
            delay: 0.1,
            duration: 1.5,
            ease: "cubic-bezier(0.23, 1, 0.320, 1)",
            multiplier: 0.1,
        });

        gsap.from(".anim2",{
            stagger:0.2,
            y:80,
            delay:0.8,
            opacity:0,
            ease: "power3",
            duration:1,
        })


    },[]);

    const containerRef = useRef(null)
    console.log("scroll is " + window.scrollY);
    return(
        
       
       <div>

            <motion.div 
                animate={controls2}
                className="showcase-media shadow-lg opacity-0 w-[300px] h-[400px] fixed top-[30vh] right-[25vw] pointer-events-none rounded-lg z-[999]"
            >
                <img className="h-[400px] w-[300px] object-cover rounded-lg" src={showcaseMedia} alt="img" />

            </motion.div>
            
            <div className="vid-cursor rotate-90 fixed scale-0  h-[80px] w-[80px] translate-x-[-50%] translate-y-[-50%] pointer-events-none z-[10] rounded-full bg-black text-white flex justify-center items-center">Signup</div>

            

            <div className="line_container">
                <div className="separator"></div>
                <div className="separator"></div>
                <div className="separator"></div>
            </div>

            
            
            <LocomotiveScrollProvider
                options={{ smooth: true}}
                watch={[]}
                containerRef={containerRef}
            >
                <div id="a_main" ref={containerRef} className="bg-[#fafafa]" data-scroll-container >
                    
                    <div ref={scrollerRef} className="h-max scrollerContainer" data-scroll-section>

                        <div id="a_home" className="">
                            {/* navbar */}
                            <div className="a_navbar">
                                <div className="lg:hidden flex">
                                    <Navbar />
                                </div>
                                <div className="w-full lg:flex hidden h-[50px]  justify-center items-center ">
                                    <div className="h-max w-max flex text-[13px] gap-[85px]">
                                        <div className="nav_item cursor-pointer hover:text-gray-500 transition-all duration-200 relative top-[10px] opacity-0" onClick={()=> navigate("/")}>Home</div>
                                        <div className="nav_item cursor-pointer hover:text-gray-500 transition-all duration-200 relative top-[10px] opacity-0">Solutions</div>
                                        <div className="nav_item cursor-pointer hover:text-gray-500 transition-all duration-200 relative top-[10px] opacity-0">Templates</div>
                                        <div className="nav_item cursor-pointer hover:text-gray-500 transition-all duration-200 relative top-[10px] opacity-0">Integerations</div>
                                    </div>
                                </div>
                            </div>

                            {/* hero section */}
                            <div id="a_hero" className="w-full h-max mt-[14vw] py-[3vw] px-[10vw] flex justify-between items-center ">
                                
                                <div className="anim2 hero_1 w-[200px] max-h-[450px] overflow-hidden">
                                    <h5 className="text-[12px]">01.</h5>
                                    <h2 className="text-[18px]">Subtle Serenity</h2>
                                    <p className="text-[12px] w-[95%] capitalize my-[10px]  tracking-wide text-[#5e5e5e] leading-[15px]">Discover the quiet elegance of Inquiry Insights.</p>
                                    <div className="image-wrapper w-[85%] h-[270px] ">
                                        <img src={aboutImgSmall} className="w-full imgAnim2 h-[95%] object-cover" alt="img1" />
                                    </div>
                                </div>  

                                <div className="hero_2 w-[30vw] max-h-max   relative " >
                                    <div className="a_headings leading-[70px] absolute top-[-17%] left-[-10%] z-[99]">
                                        <h1 className="text-[5vw] tracking-[-0.17vw] font-[200]">Questionnaire </h1>
                                        <h1 className="text-[5vw] tracking-[-0.17vw] font-[200]">Splendor.</h1>
                                    </div>
                                    <div className="anim2 imgAnim2">
                                        <video src={aboutVid1} className=" w-[100%] object-left relative h-[550px] object-cover" autoPlay={true} muted={true} loop={true} style={{opacity:1}} alt="img"/>
                                        <p className="max-w-[48%]  text-[15px] font-semibold my-3">
                                            Embark on journey of Subtle Elegance of Profound Inquiry Insights.
                                        </p>
                                    </div>
                                    
                                    
                                </div>

                                <div id="visit" className="anim2 hero_3 flex gap-[10px] items-center ">
                                    <div id="circlev" className="w-[3vw] h-[3vw] rounded-full border border-[#5e5e5e] flex items-center justify-center">
                                        <FaArrowRightLong className="rotate-90 fill-[#5e5e5e] text-[#5e5e5e] scale-[0.7]"/>
                                    </div>
                                    <h3 className="text-[#5e5e5e]">scroll</h3>                       
                                </div>
                            </div>  
                            
                            {/* about para */}
                            <div className=" about min-h-[65vh] w-full  flex flex-col  items-center overlfow-hidden  motive px-[3vw] py-[3vw] my-6  gap-[30px] relative">
                                
                                <motion.div 
                                    className=" min-h-[1.5px] origin-left w-full bg-[#0000009c] "
                                    whileInView={{
                                        scale:1,
                                        opacity:1,
                                    }}
                                    initial={{
                                        scale:0,
                                        opaicty:0,
                                    }}
                                    transition={{
                                        ease:"easeOut",
                                        delay:0.7,
                                        duration:1
                                    }}
                                />
                                    
                                <div className="min-h-full min-w-full relative">
                                    
                                    <motion.div 
                                        className="w-full text-left absolute top-0 left-0  overflow-hidden leading-[83px] mt-[30px]"
                                    >
                                        
                                        <motion.p className=" z-[2] text-[62px] whitespace-nowrap overflow-hidden tracking-tight " whileInView={{y:0,opacity:1}} initial={{y:50,opacity:0}} transition={{delay:1, damping:50}}> Craft captivating surveys effortlessly.</motion.p>
                                        <motion.p className=" text-[62px] whitespace-nowrap overflow-hidden tracking-tight " whileInView={{y:0,opacity:1}} initial={{y:50,opacity:0}} transition={{delay:1, damping:50}}> Your hub for captivating surveys and forms.</motion.p>
                                        <motion.p className=" text-[62px] whitespace-nowrap overflow-hidden tracking-tight  " whileInView={{y:0,opacity:1}} initial={{y:50,opacity:0}} transition={{delay:1, damping:50}}> Create dynamic, experiences effortlessly.</motion.p>
                                        <motion.p className=" text-[62px] whitespace-nowrap overflow-hidden tracking-tight " whileInView={{y:0,opacity:1}} initial={{y:50,opacity:0}} transition={{delay:1, damping:50}}> Revolutionize data with seamless customization.</motion.p>
                                        <motion.p className=" text-[62px] whitespace-nowrap overflow-hidden tracking-tigth  " whileInView={{y:0,opacity:1}}initial={{y:50,opacity:0}} transition={{delay:1, damping:50}}> Transform data with effortless customization</motion.p>
                                    </motion.div>
                                    
                                </div>   
                            </div>
                        </div>
                                
                        <div className="vid-section h-screen  w-full relative flex items-center justify-center">
                            <div className="absolute flex flex-col justify-center items-center" >
                                <p className=" text-white font-semibold text-[32px] text-center">
                                    Get Premium 
                                </p>
                                <p className=" text-white font-semibold text-[24px] text-center">
                                    Now!
                                </p>
                            </div>
                            
                            <video className="h-full w-[56%] object-cover " autoPlay={true} loop={true} muted={true} src={circleVid}/> 
                            <svg class="abs tl:0 fit transform rotate:-90deg absolute w-[35%]" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="49" stroke="#b8b8b881" stroke-width="0.25" fill="none" class="o:0.3 $$2$$ $$3$$ $$4$$ (.in-view):tween:all,2.8s,easeOutSlow dasharray:308 dashoffset:616 (.in-view):dashoffset:492.8"></circle>
                                <circle cx="50" cy="50" r="49" stroke="#b8b8b881" stroke-width="0.25" fill="none" class="$$5$$ $$6$$ $$7$$ (.in-view):tween:all,2.8s,easeOutSlow dasharray:308 dashoffset:308 (.in-view):dashoffset:184.79999999999998"></circle>
                            </svg>
                            <div className="w-[35%] absolute animate-pulse duration-500">
                                <svg class="abs tl:0 fit transform rotate:0 $$8$$ (.in-view):tween:all,2.8s,easeOutSlow (.in-view):rotate:144deg" viewBox="0 0 100 100">
                                    <circle cx="50" cy="1" r="1" fill="#fff"></circle>
                                </svg>
                            </div>

                        </div>

                        <div className=" about min-h-[45vh] w-full items-end  flex flex-col   overlfow-hidden  motive px-[3vw] gap-[30px] relative">
                                
                                <motion.div 
                                    className=" min-h-[1.5px] origin-right w-full bg-[#0000009c] "
                                    whileInView={{
                                        scale:1,
                                        opacity:1,
                                    }}
                                    initial={{
                                        scale:0,
                                        opaicty:0,
                                    }}
                                    transition={{
                                        ease:"easeOut",
                                        delay:0.7,
                                        duration:1
                                    }}
                                />
                                    
                                <div className="min-h-full min-w-full relative">
                                    
                                    <motion.div 
                                        className="w-full text-left absolute top-0 left-0  overflow-hidden leading-[83px] mt-[30px]"
                                    >
                                        <motion.p className=" text-[62px] whitespace-nowrap overflow-hidden tracking-tight text-right" whileInView={{y:0,opacity:1}} initial={{y:50,opacity:0}} transition={{delay:0.8, damping:50}}> Craft captivating surveys effortlessly.</motion.p>
                                        <motion.p className=" text-[62px] whitespace-nowrap overflow-hidden tracking-tight  text-right" whileInView={{y:0,opacity:1}} initial={{y:50,opacity:0}} transition={{delay:0.8, damping:50}}> Create dynamic, experiences effortlessly.</motion.p>
                                        <motion.p className=" text-[62px] whitespace-nowrap overflow-hidden tracking-tight text-right" whileInView={{y:0,opacity:1}} initial={{y:50,opacity:0}} transition={{delay:0.8, damping:50}}> Your hub for captivating surveys and forms.</motion.p>      
                                     
                                        <motion.p className=" text-[62px] whitespace-nowrap overflow-hidden tracking-tight  text-right" whileInView={{y:0,opacity:1}} initial={{y:50,opacity:0}} transition={{delay:0.8, damping:50}}> Revolutionize your data management with ease.</motion.p>
                                    </motion.div>
                                    
                                </div>   
                        </div>

                        <div className="pictures px-[5vw] py-[3vw] flex mt-[10vh] relative">
                            <div className="blurCont absolute w-full h-full translate-x-[15%] translate-y-[45%] z-[10]">
                                <div 
                                    className="blurItem-1 absolute right-0  w-[400px]  h-[400px] bg-[#03618f] blur-[30px] rounded-full  bottom-[-50%]"
                                />
                                <div 
                                    className="blurItem-2 absolute w-[400px]  h-[400px] bg-[#03618f] blur-[30px] rounded-full right-0  bottom-[-50%]"
                                />
                              
                            </div>


                            {/* <div className="spacer max-w-[100px] min-w-[130px]"/> */}

                         

                                <div div className="w-full h-full  flex items-center justify-between">
                                    <div  className=" w-[30vw] h-[30vw] mb-[1vw] flex items-center justify-center">
                                        <img  src={aboutImg6} alt="img" className="w-full h-full imgAnim1 object-contain object-center"/> 
                                    </div>
                                
                                    <div className=" w-[30vw] h-[30vw] mb-[1vw]  flex items-center justify-center">
                                        <img src={aboutImg8} alt="img" className="w-full h-full imgAnim1 object-cover object-center"/> 
                                    </div>
                                
                                </div>

                          

                        </div>
                        <div className="w-full h-max relative">
                            <div className="rotate-[0deg] ">
                                <Marquee/> 
                            </div>
                        </div>
                        

                        <div className="showcase-container h-max w-full bg-red-200">
                            <Showcase/>
                        </div>                          

                        <div className="future w-full h-[100vh] bg-[#fafafa] flex items-center justify-center flex-col relative">
                                    <video id="vid" src={aboutEnd} autoPlay={true} muted={true} loop={true} playsInline={true} className="opacity-0 min-h-full min-w-full object-cover" />

                                    <div className="absolute flex flex-col justify-center items-center min-w-[200px]">
                                        <p className="w-[200px] px-2 py-2 text-[20px] text-white flex items-center justify-center cursor-pointer mix-blend-difference">
                                            Shape the Future
                                        </p>  

                                        <button 
                                            id="vidBtn" 
                                            className="w-full border py-2 px-2 text-white mix-blend-difference rounded-full text-[14px]"
                                            onClick={()=> {
                                                navigate("/login")
                                               
                                            }}
                                        >
                                            Continue 
                                        </button>
                                    </div>
                        </div>

                    </div> 

                    
                </div>
            </LocomotiveScrollProvider>
           
        </div>
    )
}

{/* <p className="text-[20px] leading-9 mt-3 text-right ">
                                    Welcome to Querify 
                                    <span id="span1" className="inline-block rounded-[100px] relative border top-[10px] h-[35px] w-[50px] mx-1"></span>– where every question comes to life.
                                    Querify is hub for captivating surveys and forms. Create dynamic, <span id="span2" className="inline-block rounded-[100px] border relative top-[10px] h-[35px] w-[70px] mx-1"></span>
                                    interactive experiences effortlessly. Revolutionize your data collection with seamless customization options. 
                                    <span id="span3" className="inline-block rounded-[100px] border relative top-[10px] h-[35px] w-[50px] mx-1"></span>
                                    Join us in transforming surveys into engaging conversations.
                                </p> */}


{/* <div 
                                        className="w-max text-left leading-[67px]"
                                    >
                                        <p className="cover overflow-y-hidden">  
                                            <p className=" text-[62px] whitespace-nowrap opacity-[0] relative left-0 tracking-tighter"> Your hub for captivating surveys and forms</p>
                                        </p>
                                        <p className="cover overflow-y-hidden">  
                                            <p className=" text-[62px] whitespace-nowrap opacity-[0] tracking-tighter" variants={childVar}> Create dynamic, experiences effortlessly</p>
                                        </p>
                                        <p className="cover overflow-y-hidden">  
                                            <p className=" text-[62px] whitespace-nowrap opacity-[0] tracking-tighter" variants={childVar}> Create dynamic, experiences effortlessly</p>
                                        </p>
                                        <p className="cover overflow-hidden"> 
                                            <p className=" text-[62px] whitespace-nowrap opacity-[0] tracking-tighter" variants={childVar}> Create dynamic, experiences effortlessly</p>
                                        </p>
                                        <p className="cover overflow-hidden">
                                            <p className=" text-[62px] whitespace-nowrap opacity-[0] tracking-tighter" variants={childVar}> Revolutionize data with seamless customization</p>
                                        </p>   
                                    </div> */}