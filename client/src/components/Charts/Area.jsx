import { LineChart } from "@mui/x-charts";

export default function Area({form, que, idx,chartData,screenSize}){

    return(
        <LineChart
            xAxis={[
                {
                    id:"options",
                    data:form?.data[que]?.options,
                    scaleType:"band"
                }
            ]}

            series={[
                {
                    data: chartData[que],
                    area:true
                }   
            ]}
            height={500}
            width={ (0.8*screenSize) > 800 ?    800 : (0.8*screenSize)}
        />
    )
}