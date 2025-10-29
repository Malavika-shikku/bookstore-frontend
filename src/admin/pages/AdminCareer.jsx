import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
 
  faTrash,
  faLocation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import AdminHeader from "../components/AdminHeader";
import Footer from "../../components/Footer";
import AdminSidebar from "../components/AdminSidebar";
import { toast, ToastContainer } from "react-toastify";
import { addJobApi, deleteAJobApi, getAllJobApi, getAllPPlicationApi } from "../../services/allApi";
import { Link } from "react-router-dom";
import { serverUrl } from "../../services/serverUrl";

const AdminCareer = () => {
     const [modelStatus,setModelStatus]=useState(false)
     const [postStatus,setPostStatus]=useState(true)
      const [applicantStatus,setApplicantStatus]=useState(false)
      const[jobDetails,setJobDetails] = useState({
        title:"",
        location:"",
        JType:"",
        salary:"",
        qualification:"",
        experience:"",
        description:""
        
      })

      const [allJobs,setAllJobs] = useState([])
      const [addJobStatus,setAddJobStatus] = useState({});
       const [deleteJobStatus,setDeleteJobStatus] = useState([]);

      const [searchKey,setSearchKey] =useState("")
      const[allApplication,setAllApplication] = useState([])
      console.log(searchKey);
      

      console.log(jobDetails);

    const handleReset = ()=>{
      setJobDetails({
         title:"",
        location:"",
        JType:"",
        salary:"",
        qualification:"",
        experience:"",
        description:""

      })

    }

    const handleAdd =async ()=>{
      const {title,
        location,
        JType,
        salary,
        qualification,
        experience,
        description}=jobDetails

        if(!title || !location || !JType ||!salary || !qualification || !experience || !description){
          toast.info("Please fill the form completely....")
        }else{
         const result = await addJobApi({title,
        location,
        JType,
        salary,
        qualification,
        experience,
        description}) 
        console.log(result);

        if(result.status == 200){
          toast.success("job added successfully..")
          handleReset()
          setModelStatus(false)
          setAddJobStatus(result.data)
        }
        else if(result.status == 400){
          toast.warning(result.response.data)
          handleReset()
        }else{
          toast.error("something went wrong..")
          handleReset()
        }
        

        }

    }

    const gettAllJobs = async(searchKey)=>{
      const result = await getAllJobApi(searchKey)
      if (result.status ==200){
        setAllJobs(result.data)
      }
    }
 console.log(allJobs);

   const deleteJob = async(id)=>{
    const result = await deleteAJobApi(id)
    if(result.status == 200){
      setDeleteJobStatus(result)
    }

   }

   const getAllApplications = async()=>{
    const result = await getAllPPlicationApi()
    if(result.status == 200){
      setAllApplication(result.data)

    }
   }
   console.log(allApplication);
   

   
 
    useEffect(()=>{

      if(postStatus == true){
        gettAllJobs(searchKey)
      }
      else if(applicantStatus == true){
        getAllApplications()
      }else{
        console.log("something went wrong....");
        
      }

    },[addJobStatus,searchKey,deleteJobStatus,applicantStatus,postStatus])
      
  return (
   
    <>
      <AdminHeader />
      <div className='grid grid-cols-[1fr_4fr]'>
      <div className='bg-blue-100 flex flex-col items-center'>
      <AdminSidebar/>
      </div>
      <div> {/* Main content */}
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Careers</h1>

          {/* Tabs */}
          <div className="flex justify-center items-center my-10">
            <p onClick={()=>{setPostStatus(true);setApplicantStatus(false)}}
            className={postStatus ? 'p-4 text-blue-600 border-1 border-t border-r border-gray-200 rounded cursor-pointer':'p-4 text-black border-b border-gray-200 cursor-pointer'}>Job Post</p>
            <p onClick={()=>{setPostStatus(false);setApplicantStatus(true)}}
                className={applicantStatus ? 'p-4 text-blue-600 border-1 border-t border-r border-gray-200 rounded cursor-pointer':'p-4 text-black border-b border-gray-200 cursor-pointer'}>View Applicant</p>
            </div>

             


             { modelStatus && 
                <div
                    class="relative z-10"
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
                            <div className="grid ">
                              <div className="p-3">
                                <div className="mb-3">
                                  <input value={jobDetails.title}
                                  onChange={(e)=>setJobDetails({...jobDetails,title:e.target.value})}
                                    type="text"
                                    
                                    placeholder="Job title"
                                    className="p-2 border border-gray-400 rounded placeholder-gray-500 w-full"
                                  />
                                </div>
                                <div className="mb-3">
                                  <input value={jobDetails.location}
                                   onChange={(e)=>setJobDetails({...jobDetails,location:e.target.value})}
                                    type="text"
                                    
                                    placeholder="Location"
                                    className="p-2 border border-gray-400 rounded placeholder-gray-500 w-full"
                                  />
                                </div>
                                 <div className="mb-3">
                                  <input value={jobDetails.JType}
                                   onChange={(e)=>setJobDetails({...jobDetails,JType:e.target.value})}
                                    type="text"
                                    
                                    placeholder="Job type"
                                    className="p-2 border border-gray-400 rounded placeholder-gray-500 w-full"
                                  />
                                </div>

                                 <div className="mb-3">
                                  <input value={jobDetails.salary}
                                   onChange={(e)=>setJobDetails({...jobDetails,salary:e.target.value})}
                                    type="text"
                                    
                                    placeholder="salary"
                                    className="p-2 border border-gray-400 rounded placeholder-gray-500 w-full"
                                  />
                                </div>
                                 <div className="mb-3">
                                  <input value={jobDetails.qualification}
                                   onChange={(e)=>setJobDetails({...jobDetails,qualification:e.target.value})}
                                    type="text"
                                    
                                    placeholder="qualification"
                                    className="p-2 border border-gray-400 rounded placeholder-gray-500 w-full"
                                  />
                                </div>
                                <div className="mb-3">
                                  <input value={jobDetails.experience}
                                   onChange={(e)=>setJobDetails({...jobDetails,experience:e.target.value})}
                                    type="text"
                                    
                                    placeholder="experience"
                                    className="p-2 border border-gray-400 rounded placeholder-gray-500 w-full"
                                  />
                                </div>
                              </div>
            
                             
                            </div>
                            <div className="mb-3 px-3 w-full">
                              <textarea
                                value={jobDetails.description}
                                 onChange={(e)=>setJobDetails({...jobDetails,description:e.target.value})}
                                
                                placeholder="Description"
                                className="p-2 border border-gray-400 rounded placeholder-gray-500 w-full"
                              ></textarea>
                            </div>
                           
                          </div>
                          {/* footer of modal */}
                          <div class="bg-gray-200 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  onClick={handleAdd}
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-white sm:ml-3 sm:w-auto hover:text-black hover:border hover:border-gray-300"
                >
                  Add
                </button>
                <button
                  onClick={handleReset}
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto hover:text-black"
                >
                  Reset
                </button>
              </div>
                        </div>
                      </div>
                    </div>
                </div>
               }

          {/* Search + Add Job */}
    {/* Job Post Section */}
{postStatus && (
  <div>
    {/* Search + Add Job */}
    <div className="flex justify-between items-center mb-6">
      <div className="flex">
        <input
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          type="text"
          placeholder="Job Title"
          className="border border-gray-300 rounded-l px-4 py-2 w-64 focus:outline-none"
        />
        <button className="bg-green-600 text-white px-4 rounded-r">Search</button>
      </div>
      <button
        onClick={() => setModelStatus(true)}
        className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50"
      >
        Add Job
      </button>
    </div>

    {/* Job List */}
    {allJobs?.length > 0 ? (
      allJobs.map((item) => (
        <div
          key={item._id}
          className="bg-white shadow rounded p-6 relative mb-4"
        >
          {/* Delete button */}
          <button
            onClick={() => deleteJob(item?._id)}
            className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded flex items-center gap-2"
          >
            Delete <FontAwesomeIcon icon={faTrash} />
          </button>

          <h2 className="text-lg font-semibold mb-2">{item?.title}</h2>
          <hr />
          <p className="text-gray-600 mb-2">
            <FontAwesomeIcon
              icon={faLocation}
              className="text-blue-600 me-2"
            />
            {item?.location}
          </p>
          <p className="text-gray-700">Job Type: {item?.JType}</p>
          <p className="text-gray-700">Salary: {item?.salary}</p>
          <p className="text-gray-700">Qualification: {item?.qualification}</p>
          <p className="text-gray-700 mb-4">Experience: {item?.experience}</p>
          <p className="text-gray-600 text-sm leading-relaxed">
            Description: {item?.description}
          </p>
        </div>
      ))
    ) : (
      <div className="flex justify-center items-center min-h-[300px]">
        <img
          src="/no-jobs.gif"
          alt="No jobs available"
          className="w-60 h-60 object-contain"
        />
      </div>
    )}
  </div>
)}

{/* Applicant Table Section */}
{applicantStatus && (
  <div className="p-6 bg-white shadow rounded">
    <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">
      All Applications
    </h2>

    {allApplication?.length > 0 ? (
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="px-4 py-2 border">No</th>
              <th className="px-4 py-2 border">Full Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Job Title</th>
              <th className="px-4 py-2 border">Qualification</th>
              <th className="px-4 py-2 border">Cover Letter</th>
              <th className="px-4 py-2 border">Resume</th>
            </tr>
          </thead>
          <tbody className="bg-blue-200">
            {allApplication.map((app, index) => (
              <tr key={index} className="text-center hover:bg-blue-50">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{app.fullname}</td>
                <td className="px-4 py-2 border">{app.email}</td>
                <td className="px-4 py-2 border">{app.phone}</td>
                <td className="px-4 py-2 border">{app.jobTitle}</td>
                <td className="px-4 py-2 border">{app.qualification}</td>
                <td className="px-4 py-2 border">{app.coverLetter}</td>
                <td className="px-4 py-2 border">
                  <Link
                    className="text-blue-600"
                    to={`${serverUrl}/pdfUploads/${app?.resume}`}
                    target="_blank"
                  >
                    View Resume
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <div className="flex justify-center items-center min-h-[300px]">
        <img
          src="/no-applications.gif"
          alt="No applications yet"
          className="w-60 h-60 object-contain"
        />
      </div>
    )}
  </div>
)}



          
        </main></div>
    </div>

       <ToastContainer theme="colored" position="top-center" autoClose={2000}></ToastContainer>
      
      <Footer />
    </>
  )
}

export default AdminCareer