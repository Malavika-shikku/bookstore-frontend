import { faBackward } from '@fortawesome/free-solid-svg-icons'
import { height, width } from '@fortawesome/free-solid-svg-icons/faCircleCheck'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../../components/Footer'

const PaymentSuccess = () => {
  return (
    <>
    <Header/>
    <div className='container my-10'>
        <div className='md:grid grid-cols-2 px-20 justify-center items-center flex-col'>
            <div>
                <h1 className='md:text-4xl text-blue-800'>Congratulations.......</h1>
                <p className='my-4 text-2xl'>Thank you for shopping with bookstore....</p>
                <Link to={'/all-books'}><button className='bg-blue-800 px--4 py-3 text-white my-5 hover:bg-white hover:border hover:border-blue-800 hover:text-blue-800 rounded'><FontAwesomeIcon icon={faBackward} className='me-2'></FontAwesomeIcon>Explore more Books</button></Link>
            </div>
            <div className='flex justify-center items-center'>
                <img className='w-full' src='https://64.media.tumblr.com/07d6e02ab5aa81b9d146180f89ada842/tumblr_inline_oxi72kWSXL1ujnf2s_1280.gifv'
                alt='no image'></img>

            </div>

        </div>

    </div>
    <Footer/>
    </>
  )
}

export default PaymentSuccess