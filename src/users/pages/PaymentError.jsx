import React from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward } from '@fortawesome/free-solid-svg-icons'

const PaymentError = () => {
  return (
    <div>
         <Header/>
    <div className='container my-10'>
        <div className='md:grid grid-cols-2 px-20 justify-center items-center flex-col'>
            <div>
                <h1 className='md:text-4xl text-red-600'>Sorry !!! something went wrong.......</h1>
                <p className='my-4 text-2xl'>Sorry for the inconvinience occured...</p>
                <Link to={'/all-books'}><button className='bg-blue-800 px--4 py-3 text-white my-5 hover:bg-white hover:border hover:border-blue-800 hover:text-blue-800 rounded'><FontAwesomeIcon icon={faBackward} className='me-2'></FontAwesomeIcon>Explore more Books</button></Link>
            </div>
            <div className='flex justify-center items-center'>
                <img className='w-full' src='https://img.freepik.com/premium-vector/payment-failed-flat-style-design-vector-illustration-stock-illustration_357500-2811.jpg?semt=ais_hybrid'
                alt='no image'></img>

            </div>

        </div>

    </div>
    <Footer/>
    </div>
  )
}

export default PaymentError