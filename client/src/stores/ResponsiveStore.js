import  {create}  from "zustand";


const ResponsiveStore = (set)=>({

    screenSize:null,
    
    setScreenSize: (data) => {
      set( (state) => ({
        screenSize: data,
      }))
    }
});

const useResponsiveStore = create(ResponsiveStore);

export default useResponsiveStore;