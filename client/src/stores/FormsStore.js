import { create } from "zustand";

const formsStore = (set) => ({ 
  formsData: [],                                    // variable to keep track of

  updateFormsData: (data) => {
    set( (state) => ({
      formsData: data,
    }))
  }
});

const useFormsStore = create(formsStore);

export default useFormsStore;




