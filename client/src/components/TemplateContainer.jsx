import React,{ useEffect,useRef } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar,EffectFade,Autoplay } from 'swiper/modules';
import "swiper/css/bundle"
import { IoIosArrowForward,IoIosArrowBack } from "../assets/assets";
import TemplateCard from "./TemplateCard";

export default function TemplateContainer({templates}){

    useEffect(()=>{


        // fetch data
    })

    const swiperRef = useRef();

    const prevHandler = ()=>{

        swiperRef.current.swiper.slidePrev();
    }
    const nextHandler = ()=>{

        swiperRef.current.swiper.slideNext();
    }

    return(

        <div className="flex flex-col h-[430px] w-full bg-[#fafafa]">
            <div className="w-full flex my-7 justify-between items-center">
                <p className="text-[30px] font-semibold">{templates[0].category.charAt(0).toUpperCase() + templates[0].category.slice(1)}</p>

                <div className="flex gap-3">
                    <button className="" onClick={prevHandler}>
                        <IoIosArrowBack/>
                    </button>
                    <button className="mr-3" onClick={nextHandler}>
                        <IoIosArrowForward/>
                    </button>
                </div>
            </div>



            <Swiper

                modules={[Navigation,EffectFade,Autoplay]}
                spaceBetween={30}
                slidesPerView={3}
                autoplay={{delay:3000}}
                ref={swiperRef}
                className="w-[100%] h-[300px] flex justify-center items-center"

                breakpoints={{
                    1600:{
                        slidesPerView:4,
                        spaceBetween:20
                    },
                    768:{
                        slidesPerView:3,
                        spaceBetween:30
                    },
                    640:{
                        slidesPerView:2,
                        spaceBetween:40
                    },
                    550:{
                        slidesPerView:2,
                        spaceBetween:20
                    },
                    300:{
                        slidesPerView:1,
                        spaceBetween:20
                    },

                
                }}
                
            >

            {

                templates && 
                templates.map((template)=>(

                    <SwiperSlide className="min-w-[220px] flex items-center">
                         {/* CARD */}
                        <TemplateCard template={template}/>
                    </SwiperSlide>
                ))
                
            }
                
 
            
                


            </Swiper>

 
                

            
        </div>
        
    )
}
