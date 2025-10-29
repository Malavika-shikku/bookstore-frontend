import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faLocationDot,faXmark } from '@fortawesome/free-solid-svg-icons'
import { applyJobApi, getAllJobApi } from '../../services/allApi'
import {ToastContainer, toast } from 'react-toastify'

const Careers = () => {

const [modelStatus,setModelStatus]=useState(false)
const [allJobs,setAllJobs] = useState("")
const [searchKey,setSearchKey] = useState("")
const [applicationDetails,setApplicationDetails]=useState({
  fullname:"",
  email:"",
  phone:"",
  qualification:"",
  coverLetter:"",
  resume:""

})

const [jobTitle,setJobTitle] = useState("")
console.log(applicationDetails);




const getAllJobs = async(searchKey)=>{
  const result = await getAllJobApi(searchKey)
  if(result.status == 200){
    setAllJobs(result.data)
    //console.log(result);
    
  }
}

const openModal = (title)=>{
  setModelStatus(true)
  setJobTitle(title)
}
console.log(jobTitle);



const handleReset = ()=>{
  setApplicationDetails({
  fullname:"",
  email:"",
  phone:"",
  qualification:"",
  coverLetter:"",
  resume:""

  })
  setJobTitle("");
  document.getElementById("fileInput").value="";
}

const handleSubmit = async (e) => {
  e.preventDefault();

  const { fullname, qualification, email, phone, coverLetter, resume } = applicationDetails;

  // Validation
  if (!fullname || !qualification || !email || !phone || !coverLetter || !resume) {
    toast.warning("Please fill all the fields!");
    return;
  }

  try {
    const reqBody = new FormData();
    for (let key in applicationDetails) {
      reqBody.append(key, applicationDetails[key]);
    }
    reqBody.append("jobTitle", jobTitle);

    const token = sessionStorage.getItem("token");
    const reqHeader = {
      
      "Authorization": `Bearer ${token}`,
    };

    const result = await applyJobApi(reqBody, reqHeader);

    if (result.status == 200) {
      toast.success("Application submitted successfully!");
      setTimeout(() => {
        setModelStatus(false);
        handleReset();
      }, 1500);
    } else if(result.status == 400){
      toast.warning(result?.response?.data);
      setModelStatus(false)
      handleReset();
    }
    else{
      toast.error("something went wrong!!!")
    }
  } catch (err) {
    console.error("Apply Job Error:", err);
    toast.error("Server error. Please try again later!");
  }
};



useEffect(()=>{
  getAllJobs(searchKey)

},[searchKey])

  return (
    <>
    <Header/>
    <div className='flex justify-center items-center flex-col md:px-40 px-10'>
        <h1 className='mt-3 font-medium'>Careers</h1>
        <p className='text-justify mt-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur quisquam a cumque rem ab fuga est numquam molestiae, assumenda mollitia odio, obcaecati distinctio blanditiis aliquam similique iure. Similique, ducimus quos!Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo dignissimos quis, sit blanditiis provident possimus ad magnam, eligendi aspernatur fugit maxime delectus, qui nesciunt nisi praesentium repudiandae exercitationem sapiente architecto!</p>
    </div>

    <div className='p-20'>
        <h1 className='text-2xl'>Current Openings</h1>

        <div className='flex my-8 w-full justify-center items-center'>
            <input value={searchKey}
            onChange={e=>setSearchKey(e.target.value)} type='text' placeholder='Search by Title' className='border boreder-gray-300 placeholder-gray-300 p-2 w-1/4 shadow md:w-1/4'></input>
            <button className='bg-green-900  text-white py-2 px-3 shadow hover:border hover:border-green-900 hover:text-green-900 hover:bg-white ms-2'>Search</button>
        </div>
        <div className='py-5 px-20'>
           {allJobs?.length>0 ? 
           allJobs?.map((item,index)=>(
             <div className='shadow border border-gray-300' key={index}>
                <div className='grid grid-cols-[8fr_1fr] p-5'>
                    <div>
                        <h1>{item?.title}</h1>
                        <hr></hr>
                        <p className='mt-3'><FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon>{item?.location}</p>
                        <p className='mt-3'>Job Type:{item?.JType}</p>
                        <p className='mt-3'>Salary:{item?.salary}</p>
                        <p className='mt-3'>Qualification:{item?.qualification}</p>
                        <p className='mt-3'>Experience:{item?.experience}</p>
                        <p className='text-justify'>Description : {item?.description} </p>
                        
                    </div>
                    <div className='flex md:justify-center items-start justify-end'>
                        <button  onClick={() =>openModal(item?.title)}className='bg-green-800 text-white p-3 rounded ms-3 hover:bg-white hover:border hover:border-green-800 hover:text-green-800 cursor-pointer'>Apply<FontAwesomeIcon icon={faArrowUpRightFromSquare}></FontAwesomeIcon></button>
                    </div>

                </div>

            </div>

           )):
           
            <div className='flex justify-center items-center'>
              <img src='https://www.greenhrm.in/public/common/images/novacancies.gif'></img>
              </div>}
        </div>
    </div>

   { modelStatus && 
    <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-gray-500/75 transition-opacity"
          aria-hidden="true"
        ></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              {/* title */}
              <div className="bg-gray-900 p-4 flex  sm:px-6 justify-between">
                <h1 className="text-white text-2xl">Application form</h1>
                <FontAwesomeIcon onClick={()=>setModelStatus(false)}
                  
                  icon={faXmark}
                  className="text-white fa-2x"
                />
              </div>

              {/* body */}
              <div className="bg-white px-4 pt-3 pb-4 sm:p-6 sm:pb-4">
                <div className="grid grid-cols-2">
                  <div className="p-3">
                    <div className="mb-3">
                      <input value={applicationDetails.fullname} onChange={(e)=>setApplicationDetails({...applicationDetails,fullname:e.target.value})}
                        type="text"
                        
                        placeholder="Full Name"
                        className="p-2 border border-gray-400 rounded placeholder-gray-500 w-full"
                      />
                    </div>
                    <div className="mb-3">
                      <input value={applicationDetails.email} onChange={(e)=>setApplicationDetails({...applicationDetails,email:e.target.value})}
                        type="text"
                        
                        placeholder="Email Id"
                        className="p-2 border border-gray-400 rounded placeholder-gray-500 w-full"
                      />
                    </div>
                  </div>

                  <div className="p-3">
                    <div className="mb-3">
                      <input 
                      value={applicationDetails.qualification} onChange={(e)=>setApplicationDetails({...applicationDetails,qualification:e.target.value})}
                        type="text"
                       
                        placeholder="Qualification"
                        className="p-2 border border-gray-400 rounded placeholder-gray-500 w-full"
                      />
                    </div>
                    <div className="mb-3">
                      <input
                      value={applicationDetails.phone} onChange={(e)=>setApplicationDetails({...applicationDetails,phone:e.target.value})}
                        type="text"
                        
                        placeholder="Phone"
                        className="p-2 border border-gray-400 rounded placeholder-gray-500 w-full"
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-3 px-3 w-full">
                  <textarea
                  value={applicationDetails.coverLetter} onChange={(e)=>setApplicationDetails({...applicationDetails,coverLetter:e.target.value})}
                    
                    
                    placeholder="Cover Letter"
                    className="p-2 border border-gray-400 rounded placeholder-gray-500 w-full"
                  ></textarea>
                </div>
                <div className="mb-3 px-3 w-full">
                  <p className="text-gray-400">Resume</p>
                  <input  onChange={(e)=>setApplicationDetails({...applicationDetails,resume:e.target.files[0]})}
                    
                    type="file"
                    id="fileInput"
                    name='resume'
                    className=" border border-gray-400 rounded placeholder-gray-500 w-full file:bg-gray-400 file:p-2 file:text-white"
                  />
                </div>
              </div>
              {/* footer of modal */}
              <div className="bg-gray-200 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button 
                onClick={handleSubmit}
                  
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-white sm:ml-3 sm:w-auto hover:text-black hover:border hover:border-gray-300"
                >
                  Submit
                </button>
                <button onClick={handleReset}
                  
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto hover:text-black"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
   }

   <ToastContainer autoClose={2000} position='top-center' theme="colored" />
    <Footer/>
    </>
  )
}

export default Careers