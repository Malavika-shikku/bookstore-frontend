import {
  faFacebook,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faUser,
  faBars,
  faAddressCard,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { serverUrl } from "../../services/serverUrl"; // ✅ make sure this file exports your backend URL (e.g. http://localhost:4000)
import { userProfileUpdateContext } from "../../context/ContextSearch";

const Header = () => {
  const [status, setStatus] = useState(false);
  const [dropDownStatus, setDropDownStatus] = useState(false);
  const [token, setToken] = useState("");
  const [userDetail, setUserDetail] = useState({ username: "", profile: "" });
  const { userProfileUpdateStatus } = useContext(userProfileUpdateContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("existingUser");
    sessionStorage.removeItem("token");
    setUserDetail({ username: "", profile: "" });
    setToken("");
    setDropDownStatus(false);
    navigate("/");
    setTimeout(() => window.location.reload(), 300);
  };

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    const storedUser = sessionStorage.getItem("existingUser");

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserDetail(parsedUser);
      } catch (error) {
        console.error("Error parsing user details:", error);
      }
    }
  }, [userProfileUpdateStatus]);

  const profileImage = userDetail?.profile
    ? `${serverUrl}/uploads/${userDetail.profile}`
    : "https://static.vecteezy.com/system/resources/previews/000/550/731/original/user-icon-vector.jpg";

  return (
    <>
      <div className="md:grid grid-cols-3 p-3">
        {/* Left section */}
        <div className="flex items-center">
          <img
            src="https://openclipart.org/download/275692/1489798288.svg"
            alt="Bookstore"
            style={{ width: "50px", height: "50px" }}
          />
          <h1 className="text-2xl md:hidden ms-2">BOOK STORE</h1>
        </div>

        {/* Center section */}
        <div className="md:flex justify-center items-center hidden">
          <h1 className="text-3xl">BOOK STORE</h1>
        </div>

        {/* Right section */}
        <div className="md:flex justify-end items-center hidden">
          <FontAwesomeIcon icon={faInstagram} className="me-3" />
          <FontAwesomeIcon icon={faXTwitter} className="me-3" />
          <FontAwesomeIcon icon={faFacebook} className="me-3" />

          {!token ? (
            <Link to={"/login"}>
              <button className="border border-black rounded px-3 py-2 ms-3">
                <FontAwesomeIcon icon={faUser} className="me-2" />
                Login
              </button>
            </Link>
          ) : (
            <div className="relative inline-block text-left">
              <button
                type="button"
                className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-50"
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
                onClick={() => setDropDownStatus(!dropDownStatus)}
              >
                <img
                  src={profileImage}
                  alt="Profile"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </button>

              {dropDownStatus && (
                <div
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden"
                  role="menu"
                >
                  <div className="py-1" role="none">
                    <Link to={"/profile"}>
                      <p
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                      >
                        <FontAwesomeIcon
                          icon={faAddressCard}
                          className="me-2"
                        />{" "}
                        Profile
                      </p>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                    >
                      <FontAwesomeIcon
                        icon={faPowerOff}
                        className="me-2"
                      />{" "}
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navbar */}
      <nav className="p-3 w-full bg-gray-900 text-white justify-center">
        <div className="flex justify-between px-3 md:hidden">
          <span onClick={() => setStatus(!status)} className="text-2xl">
            <FontAwesomeIcon icon={faBars} />
          </span>

          {!token ? (
            <Link to={"/login"}>
              <button className="border border-white rounded px-3 py-2 ms-3">
                <FontAwesomeIcon icon={faUser} className="me-2" /> Login
              </button>
            </Link>
          ) : (
            <div className="relative inline-block text-left">
              <button
                type="button"
                className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white hover:bg-gray-800"
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
                onClick={() => setDropDownStatus(!dropDownStatus)}
              >
                <img
                  src={profileImage}
                  alt="Profile"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </button>

              {dropDownStatus && (
                <div
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5"
                  role="menu"
                >
                  <div className="py-1" role="none">
                    <Link to={"/profile"}>
                      <p
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                      >
                        <FontAwesomeIcon
                          icon={faAddressCard}
                          className="me-2"
                        />{" "}
                        Profile
                      </p>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                    >
                      <FontAwesomeIcon
                        icon={faPowerOff}
                        className="me-2"
                      />{" "}
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <ul className={status ? "md:flex" : "md:flex justify-center hidden"}>
          <Link to={"/"}>
            <li className="mx-4">Home</li>
          </Link>
          <Link to={"/all-Books"}>
            <li className="mx-4">Books</li>
          </Link>
          <Link to={"/careers"}>
            <li className="mx-4">Career</li>
          </Link>
          <Link to={"/contacts"}>
            <li className="mx-4">Contact</li>
          </Link>
        </ul>
      </nav>
    </>
  );
};

export default Header;
