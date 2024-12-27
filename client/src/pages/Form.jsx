import { useLocation, useNavigate } from "react-router-dom";
import { useEffect,useRef } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import {
  Email,
  Matrix,
  Text,
  Textarea,
  Radio,
  Checkbox,
  Range,
} from "../components/FormQue";
import { Dog, formNotStartedImg, ResponseLimitImg,formImg1,MdOutlineCancel,  IoIosArrowDown,IoIosArrowUp} from "../assets/assets";
import useResponseStore from "../stores/ResponseStore";
import { motion, useAnimate, useAnimation } from "framer-motion";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { IoIosArrowRoundBack } from "../assets/assets";
import { ClipLoader } from "react-spinners";
import useFormStore from "../stores/FormStore";
import useAlanStore from "../stores/AlanStore.js";
import wordsToNumbers from 'words-to-numbers';

export default function Form() {



  const {alanInstance, setAlanInstance, alanResponse, setAlanResponse, currentTemp, setCurrentTemp} = useAlanStore((state)=>({
    alanInstance : state.alanInstance,
    setAlanInstance: state.setAlanInstance,
    alanResponse: state.alanResponse,
    setAlanResponse: state.setAlanResponse,
    currentTemp : state.currentTemp,
    setCurrentTemp : state.setCurrentTemp,
  }));

  const {currentQue, updateCurrentQue,popup, setPopup} = useFormStore((state)=>({
    currentQue : state.currentQue,
    updateCurrentQue: state.updateCurrentQue,
    popup: state.popup,
    setPopup: state.setPopup,
  }))

  const [windowSize, setWindowSize] = useState(window.innerWidth);
  
  const [form, setForm] = useState(null);

  const [startTime, setStartTime] = useState(new Date().getTime());

  const [loading, setLoading] = useState(false);

  const [loading2, setLoading2] = useState(false);

  const navigate = useNavigate();

  const { responses, updateResponses } = useResponseStore((state) => ({
    responses: state.responses,
    updateResponses: state.updateResponses,
  }));

  const [hasStarted, setHasStarted] = useState(true);

  const [details, setDetails] = useState({
    name: "",
    email: "",
    gender: "",
    age: "",
    commentBody: "",
  });


  const [showDetailsMenu, setShowDetialsMenu] = useState(false);

  const location = useLocation();

  const path = location.pathname.split("/");

  const formId = path[path.length - 1];

  const [expiration, setExpiration] = useState(false);

  const controls = useAnimation();

  console.log(formId);

  useEffect(()=>{

    updateCurrentQue(form?.data[0]);
  },[form])


  useEffect(()=>{
    console.log("starting '/' animation")

    controls.start({
      y:0,
      opacity:1,
    })
  },[])


  useEffect(()=>{

    if(alanResponse === null ) return;

    if(alanResponse.command === "readQue"){

      alanInstance.playText(`question ${form?.data.indexOf(currentQue) + 1} is ${currentQue.statement}`);

      setAlanResponse(null);
    } 

    else if(alanResponse.command === "nextQue"){
      updateCurrentQue(form.data.indexOf(currentQue) === form.data.length - 1 ? form.data[0] :  form.data[form.data.indexOf(currentQue) + 1]);
    }

    else if(alanResponse.command === "submitForm"){
      setPopup(true);
    }   

    else if(alanResponse.command === "reachLast"){
      updateCurrentQue(form?.data[form?.data.length -1]);
    }
    else if(alanResponse.command === "submitAnonymously"){
      postResponse("anonymous");
    }

    else if(alanResponse.command === "giveDetails"){
      setShowDetialsMenu(true);
    }
    else if(alanResponse.command === "queData"){
      var data  = alanResponse.data;
      
      if(currentQue.type === 'email'){
        updateResponses({[`q${form.data.indexOf(currentQue)}`] : `${data}@gmail.com`});
        return;
      }
      if(currentQue.type === 'radio'){  
        data = wordsToNumbers(alanResponse.data, {fuzzy:true});
        updateResponses({[`q${form.data.indexOf(currentQue)}`] : `opt${data}`});
        return;
      } 
      
      updateResponses({[`q${form.data.indexOf(currentQue)}`] : data});
      console.log(data);
    }


  },[alanResponse])

  useEffect( ()=>{

    const handleResize = ()=>{

        const size = window.innerWidth;
        setWindowSize(size);
   
    }
    window.addEventListener("resize", handleResize);
    handleResize();

    return ()=> window.removeEventListener("resize",handleResize);

  },[])


  const queProvider = ()=>{



    switch(currentQue?.type){

        case "text" :
            return <Text form={form} que={currentQue} key={form?.data.indexOf(currentQue)+1}  idx={form?.data.indexOf(currentQue)+1}/> ;
        case "email" :
            return <Email form={form} que={currentQue} key={form?.data.indexOf(currentQue)+1} idx={form?.data.indexOf(currentQue)+1}/> ;
        case "checkbox" :
            return <Checkbox form={form} que={currentQue} key={form?.data.indexOf(currentQue)+1} idx={form?.data.indexOf(currentQue)+1}/>;
        case "matrix" :
            return <Matrix form={form} que={currentQue} key={form?.data.indexOf(currentQue)+1} idx={form?.data.indexOf(currentQue)+1}/>;
        case "radio" :
            return <Radio form={form} que={currentQue} key={form?.data.indexOf(currentQue)+1} idx={form?.data.indexOf(currentQue)+1}/>;
        case "range" :
            return <Range form={form} que={currentQue} key={form?.data.indexOf(currentQue)+1} idx={form?.data.indexOf(currentQue)+1}/> ;
        case "textarea" :
            return <Textarea form={form} que={currentQue} key={form?.data.indexOf(currentQue)+1} idx={form?.data.indexOf(currentQue)+1}/>;
 
        default:
            return ""
    }
}

  console.log("current que ", currentQue);

  console.log(details);

  const fetchForm = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/getForm`,
        { formId, viewInc: true }
      );

      console.log("response  ", response);
      console.log("form fetched ", response.data.data);

      const expirationDate = new Date(response.data.data.expireAt);

      const startDate = new Date(response.data.data.startAt);

      if (startDate > new Date()) {
        setHasStarted(false);
      }

      console.log(expirationDate);

      if (expirationDate < new Date()) {
        console.log("form has expired");
        setExpiration(true);
      }

      setForm(response.data.data);

      var obj = {};

      for (let i = 0; i < response?.data?.data?.data?.length; i++) {
        obj[`q${i}`] = "";
      }

      console.log("obj", obj);

      updateResponses(obj);

      toast.success("form fetched succefully", {
        style: {
          border: "1px solid green",
          padding: "6px",
          color: "green",
        },
        iconTheme: {
          primary: "green",
          secondary: "#FFFAEE",
        },
      });
    } catch (err) {
      console.log(err);

      toast.error(err?.response?.data?.message || err?.message, {
        style: {
          border: "1px solid #713200",
          padding: "6px",
          color: "#713200",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });
    }
    setLoading(false);
  };
  console.log("responses", responses);

  useEffect(() => {
    fetchForm();
  }, []);

  const gSheetHandler = async (spUrl, data) => {
    try {
      const result = fetch(spUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: [data],
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));

      console.log("result of gsheet ", result);
    } catch (err) {
      console.log(err);
    }
  };

  const postResponse = async (anonymous) => {
    try {
      setLoading2(true);

      console.log("anonymous value ", anonymous);

      const completionTime = new Date().getTime() - startTime;

      for (let key in responses) {
        if (!responses[key]) {
          console.log(key);

          toast.error("Please fill all form fields", {
            style: {
              border: "1px solid #713200",
              padding: "6px",
              color: "#713200",
            },
            iconTheme: {
              primary: "#713200",
              secondary: "#FFFAEE",
            },
          });

          return;
        }
      }

      const body = !anonymous
        ? { data: responses, formId, ...details, completionTime }
        : { data: responses, formId, completionTime };

      console.log("body ", body);

      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/createResponse`,
        body
      );

      if (form.spreadsheetUrl) {
        const resp = result.data.data;

        const obj = {
          name: resp.name,
          email: resp.email,
          age: resp.age,
          gender: resp.gender,
          commentBody: resp.commentBody,
          createdAt: resp.createdAt,
        };

        gSheetHandler(form.spreadsheetUrl, obj);
      }

      console.log("response generated ", result.data);

      toast.success("Form submitted succesfully", {
        style: {
          border: "1px solid green",
          padding: "6px",
          color: "#green",
        },
        iconTheme: {
          primary: "green",
          secondary: "#FFFAEE",
        },
      });
      setLoading2(false);
      navigate("/submissionSucess");
    } catch (err) { 
      console.log("set loading to false");
      setLoading2(false);
      console.log(err);

      toast.error(err?.response?.data?.message || err?.message, {
        style: {
          border: "1px solid #713200",
          padding: "6px",
          color: "#713200",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
          
        },
      });

     
    }

    setLoading2(false);
  };

  console.log(form);


  // form not started
  if (!hasStarted) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="fixed bottom-1 sm:block left-1 hidden">
          <div 
            className="bg-black py-1 px-3"
          >
            <p 
              className="text-[15px] text-white"
              
            >
              Powered by | Querify
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6 items-center object-cover sm:h-[400px] sm:w-[400px] h-[200px] w-[200px]">
          <div>
            <img src={formNotStartedImg} alt="Error" />
          </div>
          <div className="flex flex-col gap-2">
            <p className="md:text-[20px] text-[16px] text-center">
              Wow! You are early, the form will start at
            </p>
            <p className="md:text-[20px] text-[16px] text-center">
              {new Date(form.startAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    );
  }
  // responses length exceded
  if (form?.responses.length >= form?.participantCount) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="flex flex-col gap-6 items-center">
          <div>
            <img src={ResponseLimitImg} alt="Error" />
          </div>
          <div className="flex flex-col gap-2">
            <p className="md:text-[20px] text-[16px] text-center">
              Sorry! The Responses limit for the form has been reached
            </p>
            <p className="md:text-[20px] text-[16px] text-center">
              Stay tuned!
            </p>
          </div>
        </div>
      </div>
    );
  }
  // form has expired
  if (expiration) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="flex flex-col gap-6 items-center">
          <div>
            <img src={Dog} alt="Error" />
          </div>

          <p className="md:text-[20px] text-[16px] text-center">
            Sorry the form has been closed by the Admin
          </p>
        </div>
      </div>
    );
  }
  return loading  ? (
    <ClipLoader color="#000000" className="absolute top-[50%] left-[50%]" />
  ) : (
    <div className={`w-screen h-screen min-h-screen bg-[#ffffff] relative`}> 


      <motion.div
        className={` h-screen w-screen fixed z-[1000] left-0 bg-[#0000009a] flex items-center justify-center`}
        animate={{
          y: popup ? "0vh" : "-100vh",
          opacity: popup ? 1 : 0,
        }}
        initial={{
          y: "-100vh",
          opacity: 0,
        }}
        transition={{
          type: "spring",
          duration: 0.3,
          stiffness: 200,
          damping: 30,
        }}
      >
        <motion.div
          className="w-screen h-screen bg-white   flex flex-col gap-2"
          animate={{
            y: popup ? 0 : 20,
            opacity: popup ? 1 : 0,
          }}
          initial={{
            y: 20,
            opacity: 0,
          }}
          transition={{
            delay: 0.6,
          }}
        >
          <div className=" flex  w-full h-full">
            {/* // querify  */}
            <div
              className="fixed z-[99999] c1:top-7 top-[95vh] right-7 bg-gray-800 px-3 py-1 rounded-sm text-white flex  gap-1 items-center cursor-pointer"
              onClick={() => navigate("/")}
            >
              {" "}
              Querify <span className="sm:block hidden text-white">|</span>
              <p className="text-gray-300 sm:block hidden">
                let's survey the future
              </p>
            </div>

            {/* back button */}
            <div
              className="h-[50px] fixed top-0 flex px-7 items-center gap-3 cursor-pointer"
              onClick={() => setPopup(false)}
            >
              <IoIosArrowRoundBack />
              <p>back</p>
            </div>

            {/* // left part  */}
            <div className="c1:w-[50%] w-full h-full py-[30px] flex flex-col justify-center items-center overflow-hidden">
              <motion.div
                className="h-[80%] w-full my-auto flex  "
                animate={{
                  x: showDetailsMenu ? "-100%" : "0%",
                }}
                transition={{
                  type: "spring",
                  damping: "15",
                  stiffnes: "400",
                }}
              >
                {/* first half of left */}
                <div className=" h-full min-w-full px-7 flex flex-col gap-7">
                  <h1 className="text-[21px] mt-40 text-center">
                    {" "}
                    Would you like to share your information with the Form
                    Admin?{" "}
                  </h1>

                  <div className="flex gap-3 justify-center ">
                    <p
                      className="py-1 px-3 bg-gray-800 text-white rounded-sm cursor-pointer hover:bg-gray-600 transition-all duration-200"
                      onClick={() => setShowDetialsMenu(true)}
                    >
                      Yes sure!
                    </p>
                    <p
                      className="py-1 px-3 bg-gray-500 text-white rounded-sm cursor-pointer hover:bg-gray-600 transition-all duration-200"
                      onClick={() => postResponse("anonymous")}
                    >
                      Submit anonymously
                    </p>
                  </div>
                </div>

                {/* second half of left */}
                <div className="h-full min-w-full  flex justify-start flex-col items-center">
                  {/* // heading  */}

                  {/* // form */}
                  <form className=" c1:w-[50%] w-full flex flex-col gap-5 items-center">
                    <h1 className="md:text-[24px] text-[22px] py-3">
                      Let us know you better
                    </h1>

                    <div className="flex flex-col gap-1 max-w-[350px] min-w-[300px]">
                      <label htmlFor="name" className="text-[14px]">
                        Name
                      </label>
                      <input
                        type="text"
                        className="w-full border border-[#cccccc] h-[50px] p-3 rounded-md outline-none hover:border-black duration-100"
                        placeholder="name"
                        id="name"
                        required={true}
                        value={details.name}
                        onChange={(e) =>
                          setDetails((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-1 max-w-[350px] min-w-[300px]">
                      <label htmlFor="name" className="text-[14px]">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full border border-[#cccccc] h-[50px] p-3 rounded-md outline-none hover:border-black transition-all duration-100"
                        placeholder="email"
                        id="email"
                        required={true}
                        value={details.email}
                        onChange={(e) =>
                          setDetails((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                      />
                    </div>

                    <div className="h-[50x] flex gap-1 max-w-[350px] min-w-[300px]">
                      <FormControl fullWidth>
                        <InputLabel
                          id="demo-simple-select-label"
                          className="text-[14px]"
                        >
                          Gender
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Gender"
                          className="outline-none"
                          required={true}
                          onChange={(e) =>
                            setDetails((prev) => ({
                              ...prev,
                              gender: e.target.value,
                            }))
                          }
                        >
                          <MenuItem value="male">Male</MenuItem>
                          <MenuItem value="female">Female</MenuItem>
                          <MenuItem value="other">Other</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl fullWidth>
                        <InputLabel
                          id="demo-simple-select-label"
                          className="text-[14px]"
                        >
                          Age
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Age"
                          required={true}
                          className="outline-none"
                          onChange={(e) =>
                            setDetails((prev) => ({
                              ...prev,
                              age: e.target.value,
                            }))
                          }
                        >
                          <MenuItem value={20}>under 20</MenuItem>
                          <MenuItem value={40}>under 40</MenuItem>
                          <MenuItem value={60}>under 60</MenuItem>
                        </Select>
                      </FormControl>
                    </div>

                    <div className="flex flex-col gap-1 max-h-[350px] overflow-hidden max-w-[350px] min-w-[300px]">
                      <label htmlFor="comment" className="text-[14px]">
                        Comment{" "}
                      </label>

                      <textarea
                        className="w-full border border-[#cccccc] max-h-[350px] outline-none p-2 rounded-md hover:border-black transition-all duration-100 text-[14px]"
                        value={details.commentBody}
                        required={true}
                        onChange={(e) =>
                          setDetails((prev) => ({
                            ...prev,
                            commentBody: e.target.value,
                          }))
                        }
                        placeholder="Your feedback will be seen by the form admin"
                      />
                    </div>

                    <button
                      type="submit"
                      className="border relative min-w-[300px] max-h-[50px] min-h-[50px] outline-none flex justify-center items-center max-w-[350px] border-[#cccccc] py-3 bg-gray-800 disabled:bg-gray-600 rounded-md text-white hover:bg-gray-600 transition-all duration-200 "
                      disabled={loading2}
                      onClick={(e) => {
                        e.preventDefault();
                        postResponse();
                      }}
                    >
                      {loading2 ? (
                        <ClipLoader
                          color="#000000"
                          className=""
                        />
                      ) : (
                        " Submit Response"
                      )}
                    </button>

                    <p
                      className="text-[14px] underline cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowDetialsMenu(false);
                      }}
                    >
                      {" "}
                      Would rather be anonymous ?
                    </p>
                  </form>
                </div>
              </motion.div>
            </div>

            {/* // right part  */}
            <div className="lg:w-[50%] w-[40%] h-full bg-red-200 c1:flex hidden justify-center items-center">
              <img
                className="h-full w-full object-cover"
                alt="img"
                src="https://img.freepik.com/free-vector/setup-concept-illustration_114360-372.jpg?w=1380&t=st=1710445954~exp=1710446554~hmac=84899da8546e8970308b1fde3521e65e798ec5ed3b3dc32aecf864f52edf4085"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Progress Bar */}

      <div 
        className="h-[5px] fixed top-0 w-screen bg-[#0000001d]"
      >
        <div
          className={`h-full  transition-all duration-200 ease-out`}
          style={{backgroundColor:form?.visualData.queColor, width :((form?.data.indexOf(!currentQue ? 0 : currentQue) + 1) / form?.data.length)*100 + "%"}}
        >

        </div>
      </div>

      <div className="w-full h-full flex justify-between relative">
        <div className="xbs:w-[50%] w-full h-full flex xbs:px-[30px] px-[15px] justify-center items-center overflow-visible z-[1] bg-center bg-cover relative" style={{backgroundImage:windowSize < 500 ? `url(${formImg1})`: ""}}>
            {form && queProvider()}

            <div className="absolute top-5 left-5 text-[#656564] text-[14px]">{(form?.data.indexOf(currentQue) + 1)+ " / " + form?.data.length}</div>

            {/* <motion.div 
              className="absolute bottom-3 right-3 focus-info h-[40px] w-max bg-zinc-700 flex items-center justify-center text-white p-[10px] text-[13px] rounded-md z-[99]"
              
              animate={{
                y:0,
                opacity:1,
              }}

              transition={{
                delay:2,
              }}

              initial={{
                  y:200,
                  opacity:0,
              }}

            >
              <div className="absolute top-0 right-0 h-4 w-4 rounded-full flex translate-x-[50%] translate-y-[-50%] text-[20px] cursor-pointer justify-center items-center bg-white">
                <MdOutlineCancel/>
              </div>
              Press / to jump to the input field
            </motion.div>  */}
        </div>
        <div className="lg:max-w-[50%] lg:min-w-[50%] max-w-[40%] min-w-[40%] xbs:flex hidden h-full  justify-center items-center">
          <img
            className={` object-cover flex items-center justify-center  ${form?.visualData.layout === "sr" || form?.visualData.layout === "sl" ? "w-[50%] h-[450px]" : form?.visualData.layout === "f" ? "w-full h-full" : "w-full h-full"}`}
            src={formImg1}
            alt="formImg"
          />
        </div>
      </div>
      
      {/* Next prev navigator */}
      <div className="absolute bottom-[28px] right-[28px] flex  h-[32px] gap-3 z-[10]">
                <div className="w-[74px] h-full  flex rounded-sm">
                    <button 
                      className="w-[50%] flex justify-center items-center bg-[#0445af] hover:bg-[#2a61bb] transition-all duration-100 cursor-pointer"
                      onClick={()=> updateCurrentQue(form.data.indexOf(currentQue) === form.data.length - 1 ? form.data[0] :  form.data[form.data.indexOf(currentQue) + 1])}
                    >
                      <IoIosArrowDown className="fill-white text-[20px]"/>
                    </button>
                    <div className="h-full w-[2px] bg-[#3461bc]"></div>`
                    <button 
                      className="w-[50%] flex justify-center items-center bg-[#0445af] hover:bg-[#2a61bb] transition-all duration-100 cursor-pointer"
                      onClick={()=> updateCurrentQue(form.data.indexOf(currentQue) === 0 ? form.data[form.data.length -1] :  form.data[form.data.indexOf(currentQue) - 1])}
                    >
                    <IoIosArrowUp className="fill-white text-[20px]"/>
                    </button>
                </div>

                <div 
                  className="h-full px-[10px] py-[5px] bg-[#0445af] hover:bg-[#2a61bb] rounded-sm  transition-all duration-100 cursor-pointer"
                  onClick={()=> navigate("/")}
                >
                   <p className="flex items-center text-white text-[14px]">powered by <span className="font-semibold text-white text-[14px]">&nbsp;Querify</span></p>
                </div>
      </div>
        
    </div>
  );
}


/* <div className="flex flex-col gap-3 w-[50%] ">
                                <div className="flex gap-2 flex-col w-full">
                                    <TextField id="name" label="Name" variant="outlined" />
                                </div>
                                <div className="flex gap-2 flex-col w-full">
                                    <TextField id="email" label="Email" variant="outlined" />
                                </div>
                                <div className="flex gap-2 w-full">
                                    <div className="flex flex-col w-[50%]">
                                
                                        <Select
                                            labelId="gender-label"
                                            id="gender"
                                            placeholder="Gender"
                                        >
                                            <MenuItem value="male">Male</MenuItem>
                                            <MenuItem value="female">Female</MenuItem>
                                            <MenuItem value="other">Other</MenuItem>
                                        </Select>
                                    </div>
                                    <div className="flex flex-col w-[50%] border">
                                
                                        <input 
                                            type="text"
                                            classNmae="w-full h-full py-3 bg-red-200"
                                        />
                                    </div>
                                </div>
                            </div> */

// <div className="flex flex-col">
//             {form?.data?.map((que, idx) =>
//               que.type === "text" ? (
//                 <div
//                   id={`form_${idx}`}
//                   className="w-full h-screen flex justify-center items-center border-b border-black "
//                 >
//                   <Text que={que} form={form} idx={idx + 1} />
//                 </div>
//               ) : que.type === "textarea" ? (
//                 <div
//                   id={`form_${idx}`}
//                   className="w-full h-screen flex justify-center items-center border-b border-black "
//                 >
//                   <Textarea que={que} form={form} idx={idx + 1} />
//                 </div>
//               ) : que.type === "radio" ? (
//                 <div
//                   id={`form_${idx}`}
//                   className="w-full h-screen flex justify-center items-center border-b border-black "
//                 >
//                   <Radio que={que} form={form} idx={idx + 1} />
//                 </div>
//               ) : que.type === "checkbox" ? (
//                 <div
//                   id={`form_${idx}`}
//                   className="w-full h-screen flex justify-center items-center border-b border-black "
//                 >
//                   <Checkbox que={que} form={form} idx={idx + 1} />
//                 </div>
//               ) : que.type === "range" ? (
//                 <div
//                   id={`form_${idx}`}
//                   className="w-full h-screen flex justify-center items-center border-b border-black "
//                 >
//                   <Range que={que} form={form} idx={idx + 1} />
//                 </div>
//               ) : que.type === "matrix" ? (
//                 <div
//                   id={`form_${idx}`}
//                   className="w-full h-screen flex justify-center items-center border-b border-black "
//                 >
//                   <Matrix que={que} form={form} idx={idx + 1} />
//                 </div>
//               ) : que.type === "email" ? (
//                 <div
//                   id={`form_${idx}`}
//                   className="w-full h-screen flex justify-center items-center border-b border-black "
//                 >
//                   <Email que={que} form={form} idx={idx + 1} />
//                 </div>
//               ) : null
//             )}
//           </div>