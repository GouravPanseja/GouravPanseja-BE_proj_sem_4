import {images} from "../data/images"
import useFormStore from "../stores/FormStore";

export default function OtherSubMenu(){


    const {visualData, updateVisualData} = useFormStore( (state)=>({
        visualData:state.visualData,
        updateVisualData:state.updateVisualData,
    })) 


    return(
        <div className="h-full w-full">
            
            <div className="w-full h-[500px] pb-7 border-b">
                <div className="w-full px-[16px]">
                    <p className="py-3">Background image</p>
                </div>

                <div className="flex flex-wrap">
                    {
                        images.map((img)=>(
 
                            <div className="w-[50%] h-[100px] p-1" onClick={()=> updateVisualData({backgroundImage: img})}> 
                                <img src={img} className="object-cover h-full w-full rounded-sm" alt="bg" />
                            </div>
          
                        ))
                    }
                </div>

                
            </div>
        </div>
    )
}