import "../styles/Home.css";
import React, {useRef,useEffect} from "react";
import { gsap,ScrollTrigger } from "gsap/all";
import  animateVideo,{animate} from "../utils/animate"
import mainVideo from "../assets/mainVideo.mp4";
import { useLocation, useNavigate } from "react-router-dom";
import {home9,home10,home11,home12, HeroVid, heroEndVid} from "../assets/assets"
import {projects} from "../data/projects";
import { animateProjects,scrollBlogPosts,scrollCircle,scrollDiscover } from "../utils/animate";
import { blogPosts } from "../data/projects";
import endVid from "../assets/endVid.mp4"
import { LocomotiveScrollProvider } from 'react-locomotive-scroll'
import "../styles/locomotive-scroll.css"
import Shery from "sheryjs";

export default function Home(){

    

    const navigate = useNavigate();

    const refSecTwoText = useRef(null);
    const refMain = useRef(null);
    const refTrigger =  useRef(null);
    const refTrigger2 = useRef(null);
    const refVideo =    useRef(null);
    const refTextHeaderLeft = useRef(null);
    const refTextHeaderRight = useRef(null);
    const refProjects = useRef(null);
    const refProjectsSlider = useRef(null);
    const refProjectsSticky = useRef(null);
    const refBlog0 = useRef(null);
    const refBlogImage0 = useRef(null);
    const refBlog1 = useRef(null);
    const refBlogImage1 = useRef(null);
    const refBlog2 = useRef(null);
    const refBlogImage2 = useRef(null);
    const refBlogSection = useRef(null);
    const refCircleSection = useRef(null);
    const refCircle = useRef(null);
    const refDiscoverTextLeft = useRef(null);
    const refDiscoverTextRight = useRef(null);
    const refDiscoverContainer = useRef(null);
    const refFooterSection = useRef(null);
    let refSeparators = useRef([]);

    let refMainText = useRef([]);
   
        console.log( useLocation().pathname);
    
        // useEffect(()=>{
        //     gsap.registerPlugin(ScrollTrigger);
    
        //     const tl = gsap.timeline();
    
        //     tl.to(refVideo.current,{
        //         scale:0.70,
        //         duration:1,
        //         scrollTrigger:{
        //             trigger:refTrigger.current,
        //             start:"top bottom",
        //             end:"bottom bottom",
        //             scrub:3,
        //         }
        //     })
    
        //     tl.fromTo(refVideo.current,
        //         {scale:0.70},
        //         {   
        //             scale:0.95,
        //             scrollTrigger:{
        //                 trigger:refTrigger2.current,
        //                 start:"50% bottom",
        //                 end:"bottom bottom",
        //                 pin:refVideo.current,
        //                 scrub:3,
                      
        //             }
        //         } 
        //     )
     
    
        // },[])

        const navItemAnimEnter = ()=>{
            const tl = gsap.timeline();
            tl.to(".navRevealText",{
                width:"100%",
                duration:0.5,
                ease:'power5.out'
            },0)
            tl.to(".hero_text_reveal",{
                opacity:1,
            },0.2)
        }
        const navItemAnimLeave = ()=>{
            const tl = gsap.timeline();
            tl.to(".navRevealText",{
                width:60,
                duration:0.5,
                ease:'power5.out'
            },0)
            tl.to(".hero_text_reveal",{
                opacity:0,
            },0.2)
        }
        const navItemAnimEnter2 = ()=>{
            const tl = gsap.timeline();
            tl.to(".navRevealText2",{
                width:"100%",
                duration:0.3,
                ease:'power5.out'
            },0)
            tl.to(".hero_text_reveal2",{
                opacity:1,
            },0.1)
        }
        const navItemAnimLeave2 = ()=>{
            const tl = gsap.timeline();
            tl.to(".navRevealText2",{
                width:60,
                duration:0.3,
                ease:'power5.out'
            },0)
            tl.to(".hero_text_reveal2",{
                opacity:0,
            },0.1)
        }
    
        useEffect(()=>{

            

            function squareAnimation(){
                const squareContainer = document.getElementById("square-container");

                const squareSize = 100;

                const screenWidth = window.innerWidth;
                const screenHeight= window.innerHeight;

                const numCols = Math.ceil(screenWidth / squareSize);

                const numRows = Math.ceil(screenHeight / squareSize);

                const numSquares = numRows * numCols;

                squareContainer.style.width = `${numCols * squareSize}px`
                squareContainer.style.height = `${numRows * squareSize}px`
                
                let squares =[];

                function createSquares(){

                    for(let i = 0; i < numSquares; i++){
                        const square = document.createElement("div");
                        square.classList.add("square");
                        squareContainer.appendChild(square);
                        squares.push(square);
                    }
                    
                    
                }
                function animateSquares(){
                    gsap.fromTo(squares,{
                        opacity:0
                    },
                    {
                        opacity:1,
                        delay:0.5,
                        duration: 0.0005,
                        stagger:{
                            each:0.004,
                            from:"random"
                        }
                    }
                    );
                    gsap.to(squares,{
                        opacity:0,
                        delay:1.5,
                        duration:0.0005,
                        stagger:{
                            each:0.004,
                            from:"random"
                        }
                    })
                }
                createSquares();
                animateSquares();
                
            }
            // squareAnimation();

            function loaderAnim(){
                
                const tl = gsap.timeline();

                tl.from(".loader p",{
                    x:40,
                    opacity:0,
                    stagger:0.3,
        
                })
                
                tl.to(".loader p",{
                    x:-40,
                    opacity:0,
                    stagger:0.1,
              
                })
                tl.to(".loader",{
                    opacity:0,
                })
                tl.to(".loader",{
                    scale:0,
                })
            }

            loaderAnim();

            refMain.current.addEventListener("mousemove",(event)=>{
                
                gsap.to(".cursor",{
                    x:event.pageX + 10,
                    y:event.pageY + 10,
                    ease:"easeInOut"
                })
            })

            refMain.current.addEventListener("scroll",()=>{
                
                animateVideo(refTrigger2.current,refVideo.current,refTextHeaderLeft.current, refTextHeaderRight.current);
                scrollBlogPosts(refBlogSection.current,[refBlogImage0.current, refBlogImage1.current, refBlogImage2.current]);
                scrollCircle(refCircleSection.current, refCircle.current);

            })  

            console.log(refVideo.current.getBoundingClientRect());


            gsap.registerPlugin(ScrollTrigger);

            const tl = gsap.timeline();
            
            // welcome hero section animation

            const heroAnim = ()=>{
                tl.from(".reveal_span_main",{
            
                    y:"105%",
                    duration:0.8,
                    delay:2,
                    stagger:0.15,
                    ease:"easeInOut",
    
                },0)
                tl.from(".hero_text",{
                    opacity:0,
                    stagger:0.2,
                    y:20,
                })
            }
            heroAnim();
            
            gsap.from(".separator",{
                opacity:0,
                duration:1,
                stagger:0.2,
                ease:"easeInOut"
            })

            gsap.to(refSecTwoText.current,{
                color:"black",
                scrollTrigger:{
                    scroller:refMain.current,
                    trigger:"#about",
                    scrub:true,
                    start:"top 80%",
                    end:"top 40%",
        

                }
            })

            // video scaling
            // gsap.to(refVideo.current,{
            //     scale:1,
            //     scrollTrigger:{
            //         trigger:refTrigger2.current,
            //         scroller:refMain.current,
            //         start:"top bottom",
            //         end:"bottom bottom",
            //         scrub:1,
            //         markers:true,
            //     }
            // })

            // video slider horizontal scroll
            gsap.to(refProjectsSlider.current,{
                x:"-100%",
                scrollTrigger:{
                    scroller:refMain.current,
                    trigger:refProjects.current,
                    start:"top top",
                    end:"bottom  bottom",
                    scrub:1,
          
                    pin:refProjectsSticky.current,
                }
            })  

            // blogs animation
            // gsap.to(refBlogImage0.current,{
            //     scale:0.75,
            //     opacity:0,
            //     scrollTrigger:{
            //         scroller:refMain.current,
            //         trigger:refBlog0.current,
            //         start:"top top",
            //         end:"bottom top",
            //         scrub:1,
            //         pin:refBlog0.current,
        
            //     }
            // })
            // gsap.to(refBlogImage1.current,{
            //     scale:0.75,
            //     opacity:0,
            //     scrollTrigger:{
            //         scroller:refMain.current,
            //         trigger:refBlog1.current,
            //         start:"top top",
            //         end:"bottom top",
            //         scrub:1,
            //         pin:refBlog1.current,
                
            //     }
            // })
            // gsap.to(refBlogImage2.current,{
            //     scale:0.75,
            //     opacity:0,
            //     scrollTrigger:{
            //         scroller:refMain.current,
            //         trigger:refBlog2.current,
            //         start:"top top",
            //         end:"top top",
            //         scrub:1,
            //         pin:refBlog2.current,
          
            //     }
            // })

            // blog reveal text
            gsap.from(".reveal_span_blog",{
                y:"110%",
                duration:1,
                stagger:0.2,
                ease:"easeInOut",
                scrollTrigger:{
                    trigger:refBlogSection.current,
                    scroller:refMain.current,
                    start:"top top",
            

                }
            })

            // discover text left
            gsap.from(refDiscoverTextLeft.current,{

                x:"-50%",
                opacity:0.5,
                scrollTrigger:{
                    trigger:refDiscoverContainer.current,
                    scroller:refMain.current,
                    start:"44% bottom",
                    end:"top top",
                    scrub:2,
                }
            })
            // dicover text right
            gsap.from(refDiscoverTextRight.current,{

                x:"50%",
                opacity:0.5,
                scrollTrigger:{
                    trigger:refDiscoverContainer.current,
                    scroller:refMain.current,
                    start:"44% bottom",
                    end:"top top",
                    scrub:2,
                }
            })
           
            // reveal text endText
            gsap.from(".reveal_span_endText",{
                y:"110%",
                duration:1,
                stagger:0.2,
                ease:"easeInOut",
                scrollTrigger:{
                    trigger:refFooterSection.current,
                    scroller:refMain.current,
                    start:"top 70%",

 

                }
            })

        },[])


    return(
        <div className="bg-[#fafafa]">
            <div className="loader min-h-[100vh] min-w-[100vw] fixed top-0 left-0 bg-black text-white flex justify-center items-center z-[9999]">
                <p className="text-white text-[24px]">&nbsp;Survey </p>
                <p className="text-white text-[24px]"> &nbsp;Future,</p>
                <p className="text-white text-[24px]">&nbsp; Now</p>
            </div>

            <div id="square-container"></div>
            <div className="line_container">

                <div className="separator"></div>
                <div className="separator"></div>
                <div className="separator"></div>
            </div>

            <div className="bg-white cursor h-4 w-4 rounded-full mix-blend-difference absolute z-[99] "></div>

            <LocomotiveScrollProvider 
                options={{ smooth: true}}
                watch={[]}
                containerRef={refMain}
            >

            

            <main ref={refMain} data-scroll-container>
                <div className="scroll_container" data-scroll-section>

                <section id="hero">
                    <div className="hero_container">
                        <div className="hero_title ">
                            <h1 className="hero_title_header text_reveal font-extrabold ">
                                
                                <span className="reveal_span_main font-light">Q</span>
                                <span className="reveal_span_main font-light">U</span>
                                <span className="reveal_span_main font-light">E</span>
                                <span className="reveal_span_main font-light">R</span>
                                <span className="reveal_span_main font-light">I</span>
                                <span className="reveal_span_main font-light">F</span>
                                <span className="reveal_span_main font-light">Y</span>
                            </h1>
                        </div>

                        <div className="w-full flex justify-center items-center">
                            <div className="w-[30%] gap-[10px] flex justify-between overflow-x-visible">
                                
                                    <div 
                                        onClick={()=> navigate("/signup")} className=" hero_cta text-[2rem] flex items-baseline cursor-pointer px-2   transition-all duration-500  rounded-full relative"
                                        onMouseEnter={()=> navItemAnimEnter()}
                                        onMouseLeave={navItemAnimLeave}
                                    >  
                                        <p className="hero_text text-[2vw] navRevealText px-[20px] w-[60px] overflow-hidden border-r border-l border-black hover:border-black cursor-pointer  flex justify-center items-center rounded-full mix-blend-difference ">
                                            C 
                                            <span className="hero_text_reveal opacity-0">
                                                ontinue
                                            </span>
                                        </p>
                                        {/* <div class="overlay"></div> */}
                                    </div>

                                   
                                
                                    <div    
                                        onClick={()=> navigate("/about")} className=" hero_cta text-[2rem] flex justify-self-end items-baseline cursor-pointer px-2 transition-all duration-500  rounded-full relative"
                                        onMouseEnter={navItemAnimEnter2}
                                        onMouseLeave={navItemAnimLeave2}
                                    >  
                                        <p className="hero_text text-[2vw] navRevealText2 px-[20px] w-[60px] overflow-hidden border-r border-l border-black hover:border-black cursor-pointer flex justify-center items-center rounded-full mix-blend-difference ">
                                            A 
                                            <span className="hero_text_reveal2 opacity-0">
                                                bout
                                            </span>
                                        </p>
                                        {/* <div class="overlay"></div> */}
                                    </div>
                               

                                
                            </div>
                        </div>
                        
                        
                    </div>
                </section> 
                
    
                <section id="about">
                    <div className="about_container">
                        <div className="about_text">
                            <p ref={refSecTwoText} className="text-[#0000006a]">Elevate your surveying experience with Querify. Our platform offers a wide range of professionally crafted forms across all categories. From customer feedback to event polls, Querify provides intuitive tools to create impactful surveys effortlessly. Join us to unlock valuable insights and drive meaningful connections today.</p>
                        </div>
                    </div>
                </section>  

                {/* Video section */}
                <section ref={refTrigger2} id="video">
                    {/* // sim is transparent div to prevent the playing of video when user on mobile touches it */}
                    
                    <div className="shim"/>
                    
                    <div ref={refTrigger} className="video_sticky">
                       
                        <video className="main_video" ref={refVideo}  autoPlay={true} muted={true} loop={true} playsInline={true} src={HeroVid}></video>
                        
                        <div className="video_text_overlay ">
                            
                            <h2 ref={refTextHeaderLeft}  className="text_header_left text-[180px]">SURVEY</h2>
                            <h2 ref={refTextHeaderRight} className="text_header_right text-[180px]">FUTURE</h2>
                            
                        </div>
                   
                    </div>
                
                </section> 

                {/* slider */}
                <section ref={refProjects} id="projects">
                    <div ref={refProjectsSticky} class="projects_sticky">
                        <div class="slider_container">
                            <div ref={refProjectsSlider} class="projects_slider">
                            { projects.map((project,idx)=>(

                                <div className={`project ${project.pos}`}>
                                    <div className="image_container h-[250px] w-[320px] rounded-lg shadow-md">
                                        <img src={project.image} alt={`img_${idx}`} className="project_image h-[250px] w-[320px] object-cover"/>
                                    </div>
                                    <div className="project_details flex items-center">
                                            <p className="text-center text-[15px] w-full">{project.name}</p>
                                    </div>
                                </div>
                                ))
                            }
                            </div>
                        </div>
                    </div>
                </section>  

                {/* Blog */}

                <section ref={refBlogSection} id="blog">
                    <div className="blog_hero">
                        <h2 className="text_reveal">
                            <span className="reveal_span_blog font-light">B</span>
                            <span className="reveal_span_blog font-light">L</span>
                            <span className="reveal_span_blog font-light">O</span>
                            <span className="reveal_span_blog font-light">G</span>
                        </h2>
                    </div>

                   
                    <div ref={refBlog0} className="blog_post">
                        <div ref={refBlogImage0} className="post">
                            <div  className="post_image_container">
                                <img  src={home9} alt="blogImg" className="blog_post_image backdrop-brightness-75"/>
                            </div>
                                        

                        </div>
                    </div>  

                    <div ref={refBlog1} className="blog_post">
                        <div ref={refBlogImage1} className="post">
                            <div className="post_image_container">
                                <img src={home10} alt="blogImg" className="blog_post_image backdrop-brightness-75"/>
                            </div>
                                        

                        </div>
                    </div>      
                    <div ref={refBlog2} className="blog_post">
                        <div ref={refBlogImage2} className="post">
                            <div className="post_image_container">
                                <img src={home12} alt="blogImg" className="blog_post_image backdrop-brightness-75"/>
                            </div>
                                
                        </div>
                    </div>      

                </section>

                {/* Circle */}
                <section ref={refCircleSection} id="circle_section">

                    <div className="circle_sticky">
                     
                            <h2 className="text-[#fafafa] tracking-tighter leading-[200px] text-[60px]">
                                Revolutionize <br/>Surveying<br/> Now
                            </h2>
       
                       
                        <div className="circle_container">
                            <div ref={refCircle} className="circle_home">

                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Discover */}
                <section id="discover">
                    <div ref={refDiscoverContainer} className="discover_container">
                        <p ref={refDiscoverTextLeft} className="text_left">THIS SITE WAS DESIGNED BY QUERIFIER COMMUNITY</p>
                        <p ref={refDiscoverTextRight} className="text_right">LET'S SURVEY THE FUTURE TOGETHER</p>

                        <div className="mt-7">
                            <button className="discover_button">DISCOVER</button>
                        </div>  
                    </div>
                </section>
            
                {/* End  Video */}
                
                <section id="end_video">
                    <div class="shim"></div>
                    <div className="end_video_container">
                    <video className="end_video brightness-75"   autoPlay={true} muted={true} loop={true} playsInline={true} src={heroEndVid}></video>
                    </div>
                </section>
            
                {/* Footer */}

                <section ref={refFooterSection} id="footer">
                    <div className="footer_container">
                        <div className="footer_title">
                            <h2 className="text_reveal">
                                <span className="reveal_span_endText font-light">Q</span>
                                <span className="reveal_span_endText font-light">U</span>
                                <span className="reveal_span_endText font-light">E</span>
                                <span className="reveal_span_endText font-light">R</span>
                                <span className="reveal_span_endText font-light">I</span>
                                <span className="reveal_span_endText font-light">F</span>
                                <span className="reveal_span_endText font-light">Y</span>
                            </h2>
                        </div>
                    </div>
                </section>
                </div>
            </main>
            </LocomotiveScrollProvider>
        </div>
        
    )
}



    
