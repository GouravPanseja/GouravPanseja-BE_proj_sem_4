import {motion, useAnimation} from "framer-motion"
import { useEffect } from "react";
import ShowcaseItem from "../components/ShowcaseItem";
import {sCDiversiy,sCEducation,sCGov,sCHealthcare,sCMarket,sCCustomer} from "../assets/assets"

export default function Showcase(){

    const data =[
        {
            title:"Government",
            subTitle1:"Yep",
            subTitle2:"idk",
            media: sCGov,
        },
        {
            title:"Healthcare",
            subTitle1:"Yep",
            subTitle2:"idk",
            media: sCHealthcare,
        },
        {
            title:"Education",
            subTitle1:"Yep",
            subTitle2:"idk",
            media: sCEducation,

        },
        {
            title:"Market",
            subTitle1:"Yep",
            subTitle2:"idk",
            media: sCMarket,
        },
        {
            title:"Diversity",
            subTitle1:"Yep",
            subTitle2:"idk",
            media: sCDiversiy,
        },
        {
            title:"Customer",
            subTitle1:"Yep",
            subTitle2:"idk",
            media:sCCustomer,
        },
        // {
        //     title:"Covid",
        //     subTitle1:"Yep",
        //     subTitle2:"idk",
        //     media:grass
        // },
    ]
    return(
        <div className=" bg-[#fafafa] min-h-[500px]">

            {
                data.map((obj,idx)=>(
                    <ShowcaseItem idx={idx} data={obj}/>
                ))
            }

        </div>
    )
}

            {/* <div className="h-[120px] w-full px-[30px] bg-transparent flex  border-t relative overflow-hidden">
            
                <motion.div 
                    className="showcase-overlay absolute top-[-100%] h-full w-full z-[0]  left-0 bg-orange-400"
                    animate={controls}
                >

                </motion.div>
                <div 
                    className="showcase-base h-full w-full z-[10] flex justify-between items-center bg-transparent"
                >
                    <h2 className="text-[50px]">Government</h2>
                    <div className="text-center">
                        <p>Yep</p>
                        <p className="text-[#fafafa] text-[14px]">ENVIROMENTAL</p>
                    </div>
                </div>
            </div> */}

