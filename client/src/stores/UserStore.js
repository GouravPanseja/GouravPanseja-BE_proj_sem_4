import  {create}  from "zustand";

const UserStore = (set)=>({

    userDetails:null,
    userToken: null,

    updateUserDetails: (data)=> { 
      set( (state)  =>( { 
        userDetails:data
      }));
    },

    setUserToken: (data) => {
      set( (state) => ({
        userToken: data,
      }))
    }
});

const useUserStore = create(UserStore);

export default useUserStore;