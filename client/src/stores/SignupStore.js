import  {create}  from "zustand";

const SignupStore = (set)=>({

    formData:{},

    setFormData:(data)=>{
        set ( (state)=> ({
            formData: data,
        }))
    }
});

const useSignupStore = create(SignupStore);

export default useSignupStore;