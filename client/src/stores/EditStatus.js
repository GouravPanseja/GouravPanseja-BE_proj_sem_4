import { create } from "zustand";

const editStore = (set) => ({ 
  edit: false,                                    // variable to keep track of

  setEdit: (data) => {
    set( (state) => ({
      edit: data,
    }))
  }
});

const useEditStore  = create(editStore);

export default useEditStore;




