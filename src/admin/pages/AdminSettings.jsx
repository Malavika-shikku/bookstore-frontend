import React, { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import AdminHeader from "../components/AdminHeader";
import Footer from "../../components/Footer";
import AdminSidebar from "../components/AdminSidebar";
import { updateProfileApi } from "../../services/allApi";
import { toast, ToastContainer } from "react-toastify";
import { serverUrl } from "../../services/serverUrl";
import { adminProfileUpdateContext } from "../../context/ContextSearch";

const AdminSettings = () => {
  const [adminDetails, setAdminDetails] = useState({
    username: "",
    password: "",
    cPassword: "",
    profile: "",
  });
  const [preview, setPreview] = useState("");
  const [token, setToken] = useState("");
  const [existingProfileImg, setExistingProfileImg] = useState("");

  const { setAdminProfileUpdateStatus } = useContext(adminProfileUpdateContext);

  // Handle file upload
  const handleFileAdd = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAdminDetails({ ...adminDetails, profile: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // Reset form
  const handleReset = () => {
    const user = JSON.parse(sessionStorage.getItem("existingUser"));
    setAdminDetails({
      username: user.username,
      password: user.password,
      cPassword: user.password,
      profile: "",
    });
    setExistingProfileImg(user.profile);
    setPreview(user.profile ? `${serverUrl}/uploads/${user.profile}` : "");
  };

  // Update profile
  const handleUpdate = async () => {
    const { username, password, cPassword, profile } = adminDetails;

    if (!username || !password || !cPassword)
      return toast.info("Please fill all fields!");
    if (password !== cPassword) return toast.warning("Passwords must match!");

    const reqBody = profile ? new FormData() : { username, password, profile: existingProfileImg };
    if (profile) {
      reqBody.append("username", username);
      reqBody.append("password", password);
      reqBody.append("profile", profile);
    }

    const reqHeader = { Authorization: `Bearer ${token}` };
    const result = await updateProfileApi(reqBody, reqHeader);

    if (result.status === 200) {
      toast.success("Profile updated successfully!");

      sessionStorage.setItem("existingUser", JSON.stringify(result.data));
      setAdminDetails({
        username: result.data.username,
        password: result.data.password,
        cPassword: result.data.password,
        profile: "",
      });
      setExistingProfileImg(result.data.profile);
      setPreview(result.data.profile ? `${serverUrl}/uploads/${result.data.profile}` : "");
      setAdminProfileUpdateStatus(result.data); // update context for sidebar
    } else {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      setToken(token);

      const user = JSON.parse(sessionStorage.getItem("existingUser"));
      setAdminDetails({
        username: user.username,
        password: user.password,
        cPassword: user.password,
        profile: "",
      });
      setExistingProfileImg(user.profile);
      setPreview(user.profile ? `${serverUrl}/uploads/${user.profile}` : "");
    }
  }, []);

  return (
    <>
      <AdminHeader />
      <div className="grid grid-cols-[1fr_4fr] min-h-screen">
        <div className="bg-blue-100 flex flex-col items-center">
          <AdminSidebar />
        </div>

        <div className="flex-1 p-10">
          <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Admin Settings
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="text-gray-700 leading-relaxed space-y-4">
              <p>
                Manage your account settings, update your profile picture, and
                change your password securely from this panel.
              </p>
              <p>
                Keeping your information up to date ensures that your admin
                account stays secure and personalized.
              </p>
            </div>

            {/* Profile Form */}
            <div className="bg-blue-50 p-8 rounded-xl shadow-lg flex flex-col items-center">
              {/* Profile Image */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative w-32 h-32 rounded-full border-4 border-blue-300 shadow-md overflow-hidden bg-white flex items-center justify-center">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : existingProfileImg ? (
                    <img
                      src={`${serverUrl}/uploads/${existingProfileImg}`}
                      alt="Existing Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faUserCircle}
                      className="text-gray-300 text-[130px]"
                    />
                  )}

                  {/* Edit Icon */}
                  <label
                    htmlFor="profile-upload"
                    className="absolute bottom-2 right-2 bg-white border border-gray-300 w-8 h-8 rounded-full flex items-center justify-center shadow-md cursor-pointer hover:bg-gray-100 transition"
                  >
                    <FontAwesomeIcon
                      icon={faPen}
                      className="text-yellow-500 text-sm"
                    />
                  </label>

                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileAdd}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Input Fields */}
              <form className="w-full space-y-4">
                <input
                  type="text"
                  placeholder="Username"
                  value={adminDetails.username}
                  onChange={(e) =>
                    setAdminDetails({ ...adminDetails, username: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                />
                <input
                  type="text"
                  placeholder="Password"
                  value={adminDetails.password}
                  onChange={(e) =>
                    setAdminDetails({ ...adminDetails, password: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                />
                <input
                  type="text"
                  placeholder="Confirm Password"
                  value={adminDetails.cPassword}
                  onChange={(e) =>
                    setAdminDetails({ ...adminDetails, cPassword: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                />

                {/* Buttons */}
                <div className="flex justify-between mt-6 gap-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded w-1/2"
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleUpdate}
                    type="button"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded w-1/2"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer theme="colored" position="top-center" autoClose={2000} />
      <Footer />
    </>
  );
};

export default AdminSettings;
