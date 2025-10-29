

import './App.css'
import { Route,Routes } from 'react-router-dom'
import Header from './users/components/Header'
import Home from './users/pages/Home'
import Footer from './components/Footer'
import Auth from './pages/Auth'
import PagenotFound from './pages/PagenotFound'
import { useEffect, useState } from 'react'
import Preloader from './components/Preloader'
import AllBooks from './users/pages/AllBooks'
import Careers from './users/pages/Careers'
import Contacts from './users/pages/Contacts'
import Profile from './users/pages/Profile'
import AdminHome from './admin/pages/AdminHome'
import AdminBook from './admin/pages/AdminBook'
import AdminCareer from './admin/pages/AdminCareer'
import AdminSettings from './admin/pages/AdminSettings'
import ViewBook from './users/pages/ViewBook'
import PaymentSuccess from './users/pages/PaymentSuccess'
import PaymentError from './users/pages/PaymentError'

function App() {
  const [isHomeLoading,setIsHomeLoading] = useState(true)

  useEffect(()=>{
    setTimeout(()=>{
      setIsHomeLoading(false)
    },5000)

  },[])
  
  return (
    <>
   
      <Routes>
        <Route path='/' element={isHomeLoading ? <Preloader/>:<Home/>}></Route>
        <Route path='/login' element={<Auth/>}></Route>
        <Route path='/register' element={<Auth register/>}></Route>
        <Route path='/all-Books' element={<AllBooks/>}></Route>
        <Route path='/*' element={<PagenotFound/>}></Route>
        <Route path='/careers' element={<Careers/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/contacts' element={<Contacts/>}></Route>
        <Route path='/admin-home' element={isHomeLoading ? <Preloader/>:<AdminHome/>}></Route>
        <Route path='/admin-book' element={<AdminBook/>}></Route>
        <Route path='/admin-career' element={<AdminCareer/>}></Route>
        <Route path='/admin-settings' element={<AdminSettings/>}></Route>
        <Route path='/view-book/:id' element={<ViewBook/>}></Route>
        
        <Route path='/payment-success' element={<PaymentSuccess/>}></Route>
          <Route path='/payment-error' element={<PaymentError/>}></Route>
      </Routes>
      
  
    </>
  )
}

export default App;
