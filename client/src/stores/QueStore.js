import  {create}  from "zustand";

const QueStore = (set)=>({

    ques:[],

    currQue:null,

    setCurrQue : (data)=>{
      set( (state)=>({
        currQue: data,
      }))
    },

    title:null,
    
    updateTitle: (data)=> {
      set( (state) => ({
        title : data
      }))
    },
    
    setQues: (data)=> { 
      set( (state)  =>( { 
        ques:data
      }));
    },

    changeQueStatement: (idx,updatedStatement) =>{

      set( (state)  => {
        const copy = [...state.ques];

        copy[idx].statement = updatedStatement;


        return({ ques:copy  });

      });
    },

    updateQues: (que, idx) =>{            // to add a que 
      set ( (state)=>{
        const copy = [...state.ques];

        copy.splice(idx, 0, que); 
        console.log( "copy "  ,copy);
        return {ques:copy};
      })
    },    
    deleteQue: (idx)=>{                   // to delete a que
      set ( (state)=>{
        const copy = [...state.ques];
        copy.splice(idx,1);
        console.log("copy after deletetion", copy);
        return {ques:copy};
      })
    },

    updateRadioOpt: (queIdx,optIdx,updatedOpt)=>{

      set((state)=> {

        const copy = [...state.ques];


        copy[queIdx].options[optIdx] = updatedOpt;

        return ({ques: copy})
      })

    },

    updateMatrixRows:(queIdx,rowIdx,updatedRow) =>{
      set((state)=>{

        const copy = [...state.ques];

        copy[queIdx].matrixRows[rowIdx] = updatedRow;
        

        return {ques:copy}
      })
    },
    updateMatrixCols:(queIdx,colIdx,updatedCol) =>{
      set((state)=>{

        const copy = [...state.ques];

        copy[queIdx].matrixColumns[colIdx] = updatedCol;
        

        return {ques:copy}
      })
    }
});

const useQueStore = create(QueStore);

export default useQueStore;