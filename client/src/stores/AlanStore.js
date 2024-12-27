import { create } from "zustand";

const alanStore = (set) => ({ 
    alanResponse : null,

    alanInstance : null,                                // variable to keep track of


    currentTemp : null,

    setCurrentTemp: (data)=>{
        set( (state)=>({
            currentTemp : data,
        }))
    },
    setAlanResponse: (data) =>{
        set((state)=>({
            alanResponse:data,
        }))
    },
    setAlanInstance: (data) => {
        set( (state) => ({
            alanInstance: data,
        }))
    }
});

const useAlanStore  = create(alanStore);

export default useAlanStore;




