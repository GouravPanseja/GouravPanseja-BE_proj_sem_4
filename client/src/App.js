import { Routes, Route, useLocation } from 'react-router-dom';
import {Home , Error, Signup, Otp, Login, Dashboard, TemplateBank, Preview, ShareForm, Form, FormGif, FormResults, About, Extra} from "./pages"
import { Toaster } from 'react-hot-toast';
import Bot from "./components/Bot"
import { AnimatePresence } from 'framer-motion';
import { useEffect ,useState } from 'react';
import useResponseStore from './stores/ResponsiveStore';
import alanBtn from '@alan-ai/alan-sdk-web';
import { useNavigate } from 'react-router-dom';
import useAlanStore from './stores/AlanStore';

function App() {

  const {alanInstance, setAlanInstance, alanResponse, setAlanResponse} = useAlanStore((state)=>({
    alanInstance : state.alanInstance,
    setAlanInstance: state.setAlanInstance,
    alanResponse: state.alanResponse,
    setAlanResponse: state.setAlanResponse,
  }))

  const [dest, setDest] = useState(null);
  const navigate = useNavigate();

  const location = useLocation();

  const path = location.pathname.split("/");

  const page = path[path.length - 2];

  const page_2 = path[path.length -1];

  console.log(path);

  console.log(page);

  console.log("api is "   + process.env.REACT_APP_BASE_URL);

  useEffect(() => {
    console.log("entered useEffet")
      
        const instance = alanBtn({

            key: '01f976559a89b1987c20590bc5921e5d2e956eca572e1d8b807a3e2338fdd0dc/stage',

            onCommand: (response) => {

              setAlanResponse(response);


        }});
        console.log("alaninstace is", instance);
        setAlanInstance(instance);

  }, []);

  useEffect(()=>{
    console.log("processing....")
    if(alanResponse == null || alanInstance == null) return;

    if (alanResponse.command === "navigateRequest"){
      let page = alanResponse.page;

      page = page.toLowerCase();

      if(page === "template" || page === "templates") page = "templateBank";

      if(page === "sign up") page = "signup";

      if( page !== 'home'){

        console.log("navigate request recieved")
        navigate(`/${page}`);
      }
      else{
        navigate('/');
      }
    }
    else if( alanResponse.command==="back"){
      console.log("fjksal;")
      navigate(-1);
    }

  },[alanResponse,alanInstance])

  console.log("current page", page_2);
  
  return (
    <div className='app w-screen h-screen'>
    {/* {
      (page !== "form" && page_2 !== 'about' && page_2 !== 'login' && page_2 !== 'signup' && location.pathname !== "/") 

      &&  <Bot/>
    } */}

  {/* Cookies */}
      <Toaster
        position="bottom-left"
        reverseOrder={false}
      />
    
      <Routes> 
        <Route path='/' element={<Home/>}/>
        <Route path="/error" element={<Error/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/otpVerification" element={<Otp/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/templateBank" element={<TemplateBank/>}/>
        <Route path="/template/:id" element={<Preview/>}/>
        <Route path="/shareForm" element={<ShareForm/>}/>
        <Route path="/form/:id" element={<Form/>}/>
        <Route path="/submissionSucess" element={<FormGif/>} />
        <Route path="/formResults/:id" element={<FormResults/>} />
        <Route path="/about" element={<About/>} />
        <Route path='extra' element={<Extra/>} />
        <Route path="*" element={<Error/>} />
      </Routes>
   
    
    
    </div>
  );
}

export default App;
