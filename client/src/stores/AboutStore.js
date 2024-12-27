import { create } from "zustand";

const aboutStore = (set) => ({ 
  showcaseMedia: null,                                    // variable to keep track of

  setShowcaseMedia: (data) => {
    set( (state) => ({
      showcaseMedia: data,
    }))
  }
});

const useAboutStore  = create(aboutStore);

export default useAboutStore;

