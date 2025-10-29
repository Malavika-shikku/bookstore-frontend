import React from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faPhone, faEnvelope,faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const Contacts = () => {
  return (
    <>
    <Header/>

      <section className="py-12 px-6 text-center bg-white text-gray-800">
      {/* Title */}
      <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
      <p className="max-w-2xl mx-auto text-gray-600 mb-10">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse ratione,
        officia delectus consequuntur dicta libero magni omnis architecto
        voluptas culpa praesentium ipsum assumenda.
      </p>

      {/* Contact Info */}
      <div className="flex justify-center gap-10 mb-12 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 text-black">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
          </div>
          <p>123 Main Street, Apt 4B, AnyTown, CA 91234</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 text-black">
            <FontAwesomeIcon icon={faPhone} />
          </div>
          <p>+91 9876543220</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 text-black">
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          <p>Bookstore@gmail.com</p>
        </div>
      </div>

      {/* Form + Map */}
      <div className="container mx-auto grid md:grid-cols-2 gap-8 items-start">
        {/* Form */}
        <div className="bg-gray-100 shadow-md p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Send me Message</h3>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 rounded bg-white"
            />
            <input
              type="email"
              placeholder="Email Id"
              className="w-full bg-white p-2 rounded"
            />
            <textarea
              rows="4"
              placeholder="Message"
              className="w-full bg-white p-2 rounded"
            />
            <button className="w-full bg-[#1B2430] text-white py-2 rounded hover:bg-gray-700 flex justify-center items-center gap-2">
              Send
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </form>
        </div>

        {/* Map */}
        <div className="rounded-lg overflow-hidden shadow-md">
  <iframe
    title="Google Map"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.027314716769!2d76.34076341424456!3d10.01586077533142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d6c56a8e3b5%3A0x4e3cf74b3e5a1bbf!2sKakkanad%2C%20Kerala!5e0!3m2!1sen!2sin!4v1694432000000!5m2!1sen!2sin"
    width="100%"
    height="350"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    className="w-full h-[350px]"
  ></iframe>
</div>

      </div>
    </section>

    <Footer/>

    </>
  )
}

export default Contacts