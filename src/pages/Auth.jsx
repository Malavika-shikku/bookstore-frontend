
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { googleLoginApi, loginApi, registerApi } from '../services/allApi';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode'

const Auth = ({register}) => {
 const [userDetails,setUserDetails] = useState({
  username:"",
  email:"",
  password:"",
 })
 const navigate = useNavigate()
 console.log(userDetails);
 

 console.log(userDetails);

 const handleRegister = async()=>{
  console.log("inside register");
  const{username,email,password} = userDetails

  if(username && email && password){
    const result = await registerApi({username,email,password})
    console.log(result);
    if(result.status==200){
      toast.success("Register successfull....")
      setUserDetails({username:"",email:"",password:""})
      navigate('/login')
    }else if(result.status==400){
      toast.warning(result.response.data)
      setUserDetails({
        username:"",
        email:"",
        password:""})

    }else{
      toast.error("something went wrong!!!")
       setUserDetails({
        username:"",
        email:"",
        password:""})

    }
    
    
  }else{
    toast.info("please fill the form")
  }
  
 }

 const handleLogin = async()=>{
  const {email,password} = userDetails
  if(email && password){
    const result = await loginApi({email,password})
    console.log(result);

    if(result.status==200){
      toast.success("Login Successfull....")
      sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
      sessionStorage.setItem("token",result.data.token)

     setTimeout(()=>{
       if(result.data.existingUser.email=="adminbook@gmail.com")
        {
        navigate('/admin-home')
      }else{
        navigate('/')
      }
     },2500)
    }else if(result.status == 401){
      toast.warning(result.response.data)
      setUserDetails({
        username:"",
        email:"",
        password:""
      })
    }else if(result.status == 404){
      toast.warning(result.response.data)
      setUserDetails({
        username:"",
        email:"",
        password:""
      })

    }else{
      toast.error("Something went wrong!!!")
      setUserDetails({
        username:"",
        email:"",
        password:""
      })
    }

  }
  else{
    toast.info("Please fill the complete data.....!!!")
  }
  
 };
 //google login

 const handleGoogleLogin = async(credentialResponse)=>{
  const details = jwtDecode(credentialResponse.credential)
  console.log(details);

  const result = await googleLoginApi({username:details.name,email:details.email,
    password:'googlepswd',photo:details.picture
  })
  console.log(result);
 
    if(result.status==200){
      toast.success("Login Successfull....")
      sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
      sessionStorage.setItem("token",result.data.token)

     setTimeout(()=>{
       if(result.data.existingUser.email=="adminbook@gmail.com")
        {
        navigate('/admin-home')
      }else{
        navigate('/')
      }
     },2500)
    }else{
      toast.error("something went wrong....")
    }
 }

  return (
    <div id='loginPage' className='flex justify-center items-center'>

      <div className='md:grid grid-cols-3 w-full'>
        <div></div>
        <div className='flex justify-center items-center flex-col'>
         <h1 className='text-3xl mb-5 font-bold text-white'>BOOK STORE</h1>
         <form className='w-full bg-gray-900 p-10 flex justify-center items-center flex-col rounded'>
          <div style={{width:'70px',height:'70px',borderRadius:'50%'}} className='border border-white flex justify-center items-center'>
            <FontAwesomeIcon icon={faUser} className='text-white fa-2x'/>
          </div>
          {register ?<h1 className='text-white mt-6 text-3xl'>Register</h1>:
          <h1 className='text-white mt-6 text-3xl'>Login</h1>}
          {register && 
           <div className='mb-5 w-full mt-4'>
            <input value={userDetails.username} onChange={(e)=>setUserDetails({...userDetails,username:e.target.value})} type='text' placeholder='UserName' className='p-2 rounded placeholder-gray-600 bg-white w-full'></input>
          </div>

          }
          <div className='mb-5 w-full mt-8'>
            <input value={userDetails.email} onChange={(e)=>setUserDetails({...userDetails,email:e.target.value})}  type='text' placeholder='Email Id' className='p-2 rounded placeholder-gray-600 bg-white w-full'></input>
          </div>
          <div className='mb-5 w-full mt-8'>
            <input value={userDetails.password} onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})}  type='password' placeholder='Password' className='p-2 rounded placeholder-gray-600 bg-white w-full'></input>
          </div>
          <div className='mb-5 w-full flex justify-between'>
            <p className='text-amber-400' style={{fontSize:'14px'}}>* Never share the password with others</p>
            {!register && <p className='text-white underline' style={{fontSize:'14px'}}>Forgot Password</p>}
          </div>

         {register ?<div className='mb-2 w-full'>
            <button onClick={handleRegister} type='button'className='bg-green-800 text-white w-full p-3 rounded'>Register</button>
          </div>
             :
          <div className='mb-2 w-full'>
            <button onClick={handleLogin} type='button' className='bg-green-800 text-white w-full p-3 rounded'>Login</button>
          </div>}


          {!register &&
          <p className='text-white my-2'>----------------------or----------------------</p>

          }
          {!register &&
          <div className='mb-5 mt-3 w-full text-center'>
            {/*<button className='bg-white text-black w-full p-3 rounded'>Sign in with Google
            </button>*/}
            <GoogleLogin width={'300px'}
             onSuccess={credentialResponse => {
             console.log(credentialResponse);
             handleGoogleLogin(credentialResponse)
             }}
              onError={() => {
              toast.error('Login Failed');
              }}
/>;

            </div>

          }

            { register? <p className='text-white'>Already a User? <Link to={'/login'} className='text-blue-600 underline'>Login</Link></p>
            :
            <p className='text-white'>Are you a New user? <Link to={'/register'} className='text-blue-600 underline ms-2'>Register</Link></p>}
        
         </form>
        </div>
        <div></div>

      </div>
    
    <ToastContainer theme='colored' position='top-center' autoClose={2000}/>
    </div>
  )
}

export default Auth