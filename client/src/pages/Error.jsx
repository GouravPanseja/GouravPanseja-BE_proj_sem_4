import { useState } from "react";


export default function Error(){

    const [val, setVal] = useState([]);

    const submitHandler = ()=>{

    }

    const removeVal = (arr,elem)=>{        

        arr.splice(arr.indexOf(elem),1);

        return arr;
    }
    const ClickHandler = (e) =>{
        setVal( (prev)=>(
            e.target.checked ? [...val, e.target.value] : removeVal(prev,e.target.value) 
        )  )
    }
    
    console.log(val);

    return(

        <div className="w-screen h-screen flex items-center justify-center">
            <div className="h-max p-2 flex flex-col gap-4 items-center">
                <div> 
                    <img className="h-[300px] w-[300px] object-cover" src="https://public-assets.typeform.com/app-shell/app-shell.051bfe9431943d44194f.png" alt="error" />
                </div>
                
                <div>
                    <p className="sm:text-[22px] text-[16px] text-center">404: Page Not Found<br/> But our Intern is Looking for it!</p>
                </div>
            </div>
        </div>

    )
}