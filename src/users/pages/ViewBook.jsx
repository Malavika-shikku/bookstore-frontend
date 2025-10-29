import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faArrowLeft, faCamera } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Header";
import Footer from "../../components/Footer";
import { Link, useParams } from "react-router-dom";
import { getABookApi, makePaymentApi } from "../../services/allApi";
import { serverUrl } from "../../services/serverUrl";
import { loadStripe } from "@stripe/stripe-js";
import { toast, ToastContainer } from "react-toastify";

const ViewBook = () => {
  const [showModal, setShowModal] = useState(false);
  const [viewBookDetails,setViewBookDetails] = useState({})
  const [token,setToken] = useState('')

  const handleModal = () => setShowModal(!showModal);
  const {id} = useParams()
  console.log(id);
  

    const viewABook = async(id)=>{
    const result = await getABookApi(id)
    console.log(result);
    if(result.status == 200){
        setViewBookDetails(result.data)
    }
    }
    console.log(viewBookDetails);
   
   
    const makePayment = async () => {
  try {
    const headers = { Authorization: `Bearer ${token}` };
    const response = await makePaymentApi(
      { bookDetails: viewBookDetails },
      headers
    );

    if (response.status === 200 && response.data.url) {
      window.location.href = response.data.url;
    } else {
      toast.error("Payment session not created. Please try again.");
    }
  } catch (err) {
    console.error("Payment failed:", err);
    toast.error("Payment failed. Please try again.");
  }
    };



    

    useEffect(()=>{
     viewABook(id)
     if(sessionStorage.getItem("token")){
      const token=sessionStorage.getItem("token")
      setToken(token)
     }
    },[])

  return (

    <>
    <Header/>
        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      {/* Main Card */}
      <div className="relative bg-white shadow-2xl rounded-2xl p-10 max-w-7xl w-full flex flex-col md:flex-row gap-10 transition-all duration-300 hover:shadow-3xl">
        
        {/* Eye Icon (Top Right Corner) */}
        <button
          onClick={handleModal}
          className="absolute top-5 right-6 text-gray-600 hover:text-indigo-500 transition"
          title="View Photos"
        >
          <FontAwesomeIcon icon={faEye} size="lg" />
        </button>

        {/* Left Section - Book Image */}
        <div className="flex-shrink-0 flex justify-center items-center w-full md:w-1/3">
          <img
            src={viewBookDetails?.imageUrl}
            alt="Ikigai Book"
            className="rounded-lg shadow-md w-72 md:w-80 h-auto"
          />
        </div>

        {/* Right Section - Details */}
        <div className="flex flex-col justify-between flex-grow space-y-6">
          <div>
            {/* Title */}
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              {viewBookDetails?.title}
            </h2>

            {/* Authors centered */}
            <p className="text-base text-blue-500 mb-6 text-center">
              - {viewBookDetails?.author} -
            </p>

            {/* Book Details in 3 Columns */}
            <div className="grid grid-cols-3 gap-4 text-sm text-gray-700 mb-6">
              <p><span className="font-semibold">Publisher:</span> {viewBookDetails?.publisher}</p>
              <p><span className="font-semibold">Language:</span> {viewBookDetails?.language}</p>
              <p><span className="font-semibold">No. of pages:</span> 208</p>
              <p><span className="font-semibold">Seller Mail:</span> {viewBookDetails.userEmail}</p>
              <p><span className="font-semibold">Real Price:</span> ${viewBookDetails?.price}</p>
              <p><span className="font-semibold">ISBN:</span> {viewBookDetails?.isbn}</p>
            </div>

            {/* Description */}
            <p className="text-gray-700 text-sm leading-relaxed">
              {viewBookDetails?.abstract}
            </p>
          </div>

          {/* Buttons - Bottom Right */}
          <div className="flex justify-end gap-4 mt-6">
           <Link to={'/all-books'}>
                <button className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-lg shadow-md transition">
                  <FontAwesomeIcon icon={faArrowLeft} />
                  Back
                </button>
           </Link>
            <button onClick={makePayment}type="button" className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg shadow-md transition">
              Buy ₹{viewBookDetails?.dprice}
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
  {showModal && (
  <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 backdrop-blur-sm">
    <div className="bg-white/90 backdrop-blur-md text-gray-800 rounded-2xl shadow-2xl p-8 w-[850px] relative transition-all duration-300 scale-100 border border-gray-200">
      {/* Close Button */}
      <button
        onClick={handleModal}
        className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-lg font-bold"
      >
        ✕
      </button>

      {/* Title */}
      <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">
        Book Photos
      </h3>

      {/* Subtitle */}
      <p className="text-sm text-blue-600 flex items-center justify-center gap-2 text-center mb-6">
        <FontAwesomeIcon icon={faCamera} className="text-indigo-500" />
        Camera clicks of the book in the hand of seller
      </p>

      {/* 3 Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        {viewBookDetails?.uploading && viewBookDetails.uploading.length > 0 ? (
          viewBookDetails.uploading.map((item, index) => (
            <img
              key={index}
              src={`${serverUrl}/uploads/${item}`}
              alt={`Book Preview ${index + 1}`}
              className=" shadow-lg w-56 h-auto border border-gray-300 hover:scale-105 transition-transform"
              style={{width:'300px',height:'300px'}}
            />
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">
            No book photos available.
          </p>
        )}
      </div>
            </div>
          </div>
        
      )}
        </div>
        <ToastContainer ></ToastContainer>
    <Footer/>
    </>
  );
};

export default ViewBook;
