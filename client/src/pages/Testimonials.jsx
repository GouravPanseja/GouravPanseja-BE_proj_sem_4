import React, {useEffect} from "react";

import {testimonial1, testimonial2, testimonial3, testimonial4} from "../assets/assets";
import { gsap,ScrollTrigger } from "gsap/all";
export default function Testimonials(){


    useEffect(()=>{

        gsap.registerPlugin(ScrollTrigger);

        function addImageScaleAnimation(){
            gsap.utils.toArray("section").forEach((section, index)=>{
                console.log("animationScaleImage");
                const image = document.querySelector(`#preview-${index + 1} img`);

                const startCondition = index === 0 ? "top top" : "bottom bottom";
                console.log("image form scale",image ,index);
                if (image){
                    gsap.to(image,{
                        scale:3,
                        ease:"none",
                        scrollTrigger:{
                            scroller:".containerTest",
                            trigger: section,
                            start: startCondition,
                            end : ()=>{
                                const viewportHeight = window.innerHeight;      // height of the view port 
                                const sectionBottom = section.offsetTop +section.offsetHeight;      // distance between top of container element and the bottom of the section element
                                const additionalDistance = viewportHeight * 0.5;
                                const endValue = sectionBottom - viewportHeight + additionalDistance;      // this gives how far the bottom of the section is from the center of of the viewport
                                console.log(endValue);
                                return `+=${endValue}`
                            },
                            
                            scrub:1,  
                        }
                    })
                }
                
            })
        }

        addImageScaleAnimation();


        function animateClipPath(
            sectionId,
            previewId,
            startClipPath,
            endClipPath,
            start = "top center",
            end = "bottom top",
        ){
            console.log("animationClipPath");
            let section  =document.querySelector(sectionId);

            let preview = document.querySelector(previewId);

            // ScrollTrigger.create({
            //     trigger:section,
            //     start: start,
            //     end: end,
               
            //     onEnter: ()=>{

            //         gsap.to(preview,{
            //             clipPath:endClipPath,
            //             ease:"none",
            //             scrollTrigger:{
            //                 trigger:section,
            //                 start:start,
            //                 end:end,
            //                 scrub:0.125,
            //             },

            //         }

            //         )
            //     }
            // })

            console.log("section from clip path " , section);
            gsap.to(section, {
            
                clipPath:endClipPath,
                ease:"none",
                scrollTrigger: {
                  scroller:".containerTest",
                  trigger: section,
                  start: start, 
                  end: end,
                  markers: true ,
                  scrub:0.125,
                }
              });

        }

        animateClipPath(
            "#section-1",
            "#preview-1",
            "polygon(0% 100%, 100% 100%, 100% 100% 0% 100%)",
            "polygon(0% 0%, 100% 0%, 100% 100% 0% 100%)",
        );

        const totalSections = 7;

        for(let i = 2; i<= totalSections; i++){
            let currentSection = `#section-${i}`;
            let prevPreview = `#preview-${i - 1}`;
            let currentPreview = `#preview-${i}`;

            animateClipPath(
                currentSection,
                prevPreview,
                "polygon(0% 0%, 100% 0%, 100% 100% 0% 100%)",
                "polygon(0% 0%, 100% 0%, 100% 0% 0% 0%)",
                "top bottom",
                "center center",
            );

            if( i < totalSections){
                animateClipPath(
                    currentSection,
                    currentPreview,
                    "polygon(0% 100%, 100% 100%, 100% 100% 0% 100%)",
                    "polygon(0% 0%, 100% 0%, 100% 100% 0% 100%)",
                    "center center",
                    "bottom top"
                )
            }
        }
    },[])

    return(
        <main className="main2">
            <div className="containerTest h-screen w-screen">
                <div className="intro-copy">
                    <p className="pTest">This message won't go anywhere</p>
                    <p className="pTest">This message won't go anywhere</p>
                    <p className="pTest">This message won't go anywhere</p>
                    <p className="pTest">This message won't go anywhere</p>
                </div>

                <div className="headers">
                    <section className="sectionTest" id="section-1">
                        <h1 className="heading">Vaccum</h1>
                    </section>
                    <section className="sectionTest" id="section-2">
                        <h1 className="hTest">Ember</h1>
                    </section>
                    <section className="sectionTest" id="section-3">
                        <h1 className="hTest">Scratch</h1>
                    </section>
                    <section className="sectionTest" id="section-4">
                        <h1 className="hTest">Azure</h1>
                    </section>
                    <section className="sectionTest" id="section-5">
                        <h1 className="hTest">Synthesis</h1>
                    </section>
                    <section className="sectionTest" id="section-6">
                        <h1 className="hTest">Euphoria</h1>
                    </section>
                    <section className="sectionTest" id="section-7">
                        <h1 className="hTest">The End</h1>
                    </section>

                    <div className="section-previews">
                        <div className="img" id="preview-1">
                            <img className="imgTest" src={testimonial1} alt=""/>
                        </div>
                        <div className="img" id="preview-2">
                            <img className="imgTest" src={testimonial2} alt=""/>
                        </div>
                        <div className="img" id="preview-3">
                            <img className="imgTest" src={testimonial3} alt=""/>
                        </div>
                        <div className="img" id="preview-4">
                            <img className="imgTest" src={testimonial4} alt=""/>
                        </div>
                        <div className="img" id="preview-5">
                            <img className="imgTest" src={testimonial4} alt=""/>
                        </div>
                        <div className="img" id="preview-6">
                            <img className="imgTest" src={testimonial4} alt=""/>
                        </div>
                    </div>
                    <div className="spacer"></div>
                </div>
            </div>
        </main>
    )
}