import { create } from "zustand";

const ResponseStore = (set) => ({
  responses: {},
  
  updateResponses: (data) => {
      const updatedResponses = { ...data };
      set((state) => ({
          responses: { ...state.responses, ...updatedResponses },
      }));
  },
});

const useResponseStore  = create(ResponseStore);

export default useResponseStore;




