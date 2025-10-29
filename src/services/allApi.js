import { commonApi } from "./commonApi";
import { serverUrl } from "./serverUrl";

//register - POST,reqBody,content  type-application/json
export const registerApi = async(reqBody)=>{
    return await commonApi("POST",`${serverUrl}/register`,reqBody)
}

//login -POST,reqBody
export const loginApi = async(reqBody)=>{
    return await commonApi("POST",`${serverUrl}/login`,reqBody)
}

//google login-POST,reqBody
export const googleLoginApi = async(reqBody)=>{
    return await commonApi("POST",`${serverUrl}/google-login`,reqBody)
}

//get home book
 export const homeBookApi = async()=>{
    return await commonApi("GET",`${serverUrl}/all-home-books`,'')
 }

// ------------------------------------- USER API ---------------------------------

//upload a book
 export const uploadBookApi = async(reqBody,reqHeader)=>{
    return await commonApi("POST",`${serverUrl}/add-book`,reqBody,reqHeader)
 }

  export const getAllBookApi = async(searchKey,reqHeader)=>{
    //query -base url key value
    return await commonApi("GET",`${serverUrl}/all-books?search=${searchKey}`,'',reqHeader)
 }

 //get a view book
  export const getABookApi = async(id)=>{
  return await commonApi("GET",`${serverUrl}/view-book/${id}`,'')
 }


  //get all jobs
  export const getAllJobApi = async(searchKey)=>{
  return await commonApi("GET",`${serverUrl}/all-jobs?search=${searchKey}`)
 }
 //apply job
 
export const applyJobApi = async (reqBody, reqHeader) => {
  //console.log("API URL:", `${serverUrl}/apply-job`);
  return await commonApi("POST", `${serverUrl}/apply-job`, reqBody, reqHeader);
};

export const updateUserProfileApi = async (reqBody, reqHeader) => {
  return await commonApi(
    "put",
    `${serverUrl}/update-user`,
    reqBody,
    reqHeader
  );
};

//get all user books api

  export const getAllUserBookApi = async(reqHeader)=>{
  return await commonApi("GET",`${serverUrl}/user-books`,'',reqHeader)
 }

 //api to make payment
 export const makePaymentApi = async (data, headers) => {
  return await commonApi("POST", `${serverUrl}/make-payment`, data, headers);
};


 //delete user book
 export const deleteUserBookApi = async (id, reqHeader) => {
return await commonApi("DELETE", `${serverUrl}/delete-user-books/${id}`, '', reqHeader);
}




// get all brought books by user
  export const getAllUserBroughtBookApi = async(reqHeader)=>{
  return await commonApi("GET",`${serverUrl}/user-brought-books`,'',reqHeader)
 }

 



 //------------admin--------------

 //get all bokk admin
 export const getAllAdminBookApi = async(reqHeader)=>{
    
    return await commonApi("GET",`${serverUrl}/admin-all-books`,'',reqHeader)
 }

 //approve book
 export const approveBookApi = async(reqBody,reqHeader)=>{
    
    return await commonApi("PUT",`${serverUrl}/approve-book`,reqBody,reqHeader)
 }

 //get all users
 export const getAllUserApi = async(reqHeader)=>{
   return await commonApi('GET',`${serverUrl}/all-users`,'',reqHeader)
 }

 //api to add job
 export const addJobApi = async(reqBody)=>{
   return await commonApi('POST',`${serverUrl}/add-job`,reqBody)
 }

  //delete a job
 export const deleteAJobApi = async(id)=>{
  return await commonApi("GET",`${serverUrl}/delete-job/${id}`)
 }

 //get all applications
 export const getAllPPlicationApi = async()=>{
  return await commonApi("GET",`${serverUrl}/all-application`)
 }

 
 //update profile
 export const updateProfileApi = async(reqBody,reqHeader)=>{
  return await commonApi("PUT",`${serverUrl}/admin-profile-update`,reqBody,reqHeader)
 }
 