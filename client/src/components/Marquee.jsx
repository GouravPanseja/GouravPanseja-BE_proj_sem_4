import MarqueeSection from "./MarqueeSection"
export default function Marqee(){
    return(
            <div className="marqSec max-h-[50vh] min-h-[100vh]  w-full  overflow-auto  gap-2 flex">

                <MarqueeSection/>
                <MarqueeSection/>
                <MarqueeSection/>
                <MarqueeSection/>
                <MarqueeSection/>
                <MarqueeSection/>
                <MarqueeSection/>
            </div> 
    )
}