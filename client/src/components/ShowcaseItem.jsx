import {motion, useAnimation} from "framer-motion";

import { useEffect, useRef } from "react";

import useAboutStore from "../stores/AboutStore"
export default function ShowcaseItem({idx, data}){

    const showCaseItem = useRef(null);
    const controls = useAnimation();

    const {showcaseMedia , setShowcaseMedia} = useAboutStore((state)=>({
        showcaseMedia: state.showcaseMedia,
        setShowcaseMedia:state.setShowcaseMedia
    }));


    useEffect(()=>{

        const base = document.querySelector(`.showcase-base-${idx}`);

        base.addEventListener("mouseenter",()=>{
            controls.start({
                top:0,
            })
        })
        base.addEventListener("mouseleave",()=>{
            controls.start({
                top:"-100%",
            })
        })

        showCaseItem.current.addEventListener("mouseenter",()=>{
            setShowcaseMedia(data.media);
        })

        return()=>{
            base.removeEventListener("mouseenter",()=>{
                controls.start({
                    top:0,
                })
            })
            base.removeEventListener("mouseleave",()=>{
                controls.start({
                    top:"-100%",
                })
            })
        }
    },[])

    return(
        <div ref={showCaseItem} className="h-[120px] w-full px-[30px] bg-transparent flex  border-t relative overflow-hidden">
            
                <motion.div 
                    className="showcase-overlay absolute top-[-100%] h-full w-full z-[0]  left-0 bg-orange-400"
                    animate={controls}
                >

                </motion.div>
                <div 
                    className={`showcase-base-${idx} h-full w-full z-[10] flex justify-between items-center bg-transparent`}
                >
                    <h2 className="text-[50px]">{data.title}</h2>
                    <div className="text-center">
                        <p>{data.subTitle1}</p>
                        <p className="text-[#797979] text-[14px]">{data.subTitle2}</p>
                    </div>
                </div>
            </div>
    )
}