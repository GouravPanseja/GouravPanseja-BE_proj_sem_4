import { create } from "zustand";

let today = new Date();
let timestamp = today.getTime();
timestamp += 30 * 24 * 60 * 60 * 1000;
today.setTime(timestamp);

const formStore = (set) => ({ 

    currentQue:null,

    popup: false,

    visualData:{
        queColor:"#0445AF",
        ansColor:"0445AF",
        background:"#ffffff",
        fontFamily:"Space Grotesk",
        fontSize:"16px",
        labelColor:"#0445AF",
        buttonColor:"#6788cc",
        logoBorderRadius:"0px",
        titleColor:"black",
        titleSize:"22px",
        backgroundImage:"",
        layout:"fr"
    },

    logicData:{
        startAt:new Date().toISOString().split('T')[0],
        expiresAt: today.toISOString().split('T')[0],
        participantCount:100,
    },
    
    logo:null,

    newForm:{},

    setPopup: ()=>{
        set( (state)=>({
            popup : !state.popup
        }))
    },

    setLogo: (file)=>{
        set( (state)=>( { logo: file}));
    },

    updateLogicData: (data)=>{
        set((state)=>{
            const obj = {...state.logicData, ...data }

            return({logicData: obj})
        })
    },

    updateVisualData: (data)=>{
        set((state)=>{
            const obj = {...state.visualData, ...data }

            return({visualData: obj})
        })
    },

    updateCurrentQue: (data)=>{
        set((state)=>({
            currentQue: data,
        }))
    },

    setNewForm: (data)=> {
        set((state)=> ({newForm:data}));
    }
});

const useFormStore = create(formStore);

export default useFormStore;




