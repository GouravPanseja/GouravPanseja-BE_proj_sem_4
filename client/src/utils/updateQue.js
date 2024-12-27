import useQueStore from "../stores/QueStore"


const dummyText = {
    type: "text",
    statement:"Dummy",
}

const dummyTextarea = {
    type:"textarea",
    statement:"dummy",
}

const dummyRadio = {
    type:"radio",
    statement:"dummy",
    options:["opt1","opt2","otp3"],
}

const dummyCheckbox ={
    type:"checkbox",
    statement:"dummy",
    options:["opt1","opt2","opt3"]
}

const dummyEmail = {
    type:"email",
    statement:"dummy"
}

const dummyDate = {
    type:"text",
    statement:"dummy"
}

const dummyRange = {
    type:"range",
    statement:"dummy",
    rangeMin:1,
    rangeMax:5
}

const dummyMatrix = {
    type:"matrix",
    statement:"dummy",
    matrixRows:["row1","row2","row3","row4"],
    matrixColumns:["col1","col2","col3","col4","col5"]
}


export default function update(type, idx,updateQues){

    console.log("upate que type " , type);
    console.log("upate que idx " , idx);
    console.log("upate que updateQues " , updateQues);


    
    if(type === "text") updateQues(dummyText, idx);
    else if(type === "email") updateQues(dummyEmail, idx);
    else if(type === "radio") updateQues(dummyRadio, idx);
    else if(type === "textarea") updateQues(dummyTextarea, idx);
    else if(type === "checkbox") updateQues(dummyCheckbox,idx);
    else if(type === "date") updateQues(dummyDate, idx);
    else if(type === "range") updateQues(dummyRange, idx);
    else if(type === "matrix") updateQues(dummyMatrix,idx);
    else updateQues(dummyText,idx);
}