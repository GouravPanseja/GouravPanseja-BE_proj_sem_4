import  {create}  from "zustand";

const TemplateStore = (set)=>({

    category:"all",
    
    updateCategory: (data)=> { 
      set( (state)  =>( { 
        category:data
      }));
    },
});

const useTemplateStore = create(TemplateStore);

export default useTemplateStore;