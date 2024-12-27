import Bar from "../components/Charts/Bar";
import Line from "../components/Charts/Line";
import Area from "../components/Charts/Area";
import { useState } from "react";
import {AnimatePresence, motion} from "framer-motion"


export default function ChartContainer({form, que,idx,chartData,screenSize}) {

    const [chartType, setChartType] = useState("bar");

    return (
        <AnimatePresence>
            <motion.div
            className=""
            key="charts_container"
            animate={{
                opacity:1
            }}
            initial={{
                opacity:0
            }}
            exit={{
                opacity:0
            }}
            transition={{
                duration:0.5,
            }}
        >
            <div className="flex absolute bottom-[-20px] right-[50%] translate-x-[50%]  z-[10]">
                <div className={`py-1 px-4  text-white text-[14px] flex items-center cursor-pointer ${chartType === "bar" ? "bg-gray-700" : "bg-gray-400"}`} onClick={()=> setChartType("bar")}> Bar </div>
                <div className={`py-1 px-4  text-white text-[14px] flex items-center cursor-pointer ${chartType === "line" ? "bg-gray-700" : "bg-gray-400"}`} onClick={()=> setChartType("line")} >Line</div>
                <div className={`py-1 px-4  text-white text-[14px] flex items-center cursor-pointer ${chartType === "area" ? "bg-gray-700" : "bg-gray-400"}`} onClick={()=> setChartType("area")}>Area</div>
            </div>

            <h1 className="text-[22px]">
                {idx + 1}. {form?.data[que]?.statement}
            </h1>

            {
                chartType === "bar" ?

                <Bar que={que} idx={idx} form={form} chartData={chartData} screenSize={screenSize} /> :

                chartType === "line" ?

                <Line que={que} idx={idx} form={form} chartData={chartData} screenSize={screenSize}/> :

                chartType === "area" ?

                <Area que={que} idx={idx} form={form} chartData={chartData} screenSize={screenSize}/> :

                null
            }

        
            </motion.div>
        </AnimatePresence>
        
    );
}
