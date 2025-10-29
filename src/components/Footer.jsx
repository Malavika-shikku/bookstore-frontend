
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faLinkedin, faXTwitter } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <>
      <div className="md:grid grid-cols-3 bg-gray-900 md:p-10 p-5 text-white">
        <div>
          <h4>ABOUT US</h4>
          <p className="mt-4 text-justify">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae odio voluptas quod soluta iure aliquid sint autem debitis accusamus eligendi quae repellat, eveniet suscipit praesentium quaerat excepturi ex modi alias!</p>
        </div>
        <div className="md:flex justify-center">
          <div className="mt-4 md:mt-5">
            <h4>NEWSLETTER</h4>
            <p className="mt-4 text-justify"> stay updated with our latest trends</p>
            <div className="flex mt-3">
              <input type="text" placeholder="Email ID" className="bg-white placeholder-gray-600 p-2"></input>
              <button className="bg-yellow-300 py-2 px-3">
                <FontAwesomeIcon icon={faArrowRight} className="text-black"></FontAwesomeIcon>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-5 md:mt-0">
          <h4>FOLLOW US</h4>
          <p className="mt-4">Let us be social</p>
          <div className="flex mt-3">
            <FontAwesomeIcon icon={faInstagram}/>
            <FontAwesomeIcon icon={faXTwitter} className="ms-3"/>
            <FontAwesomeIcon icon={faFacebook} className="ms-3"/>
            <FontAwesomeIcon icon={faLinkedin} className="ms-3"/>

          </div>
          
        </div>
        
      </div>
      <div className="border-t border-gray-700 bg-black py-4 text-center text-sm text-gray-300">
        © {new Date().getFullYear()} All rights reserved | This website is made with{" "}
        <FontAwesomeIcon icon={faHeart} className="text-yellow-500 px-1" /> 
        by <b>Malavika K</b>
      </div>
    </>
  );
};

export default Footer;
