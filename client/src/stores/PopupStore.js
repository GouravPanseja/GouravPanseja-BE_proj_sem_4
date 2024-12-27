import { create } from "zustand";

const popupStore = (set) => ({
  showLogout: false, // Variable to keep track of whether the logout popup is shown
  
  setShowLogout: (value) => {
    set((state) => ({
      showLogout: value,
    }));
  },
});

const usePopupStore = create(popupStore);

export default usePopupStore;



// import { create } from "zustand";

// const editStore = (set) => ({ 
//   edit: false,                                    // variable to keep track of

//   setEdit: (data) => {
//     set( (state) => ({
//       edit: data,
//     }))
//   }
// });

// const useEditStore  = create(editStore);

// export default useEditStore;




