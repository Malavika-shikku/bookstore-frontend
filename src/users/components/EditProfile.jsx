import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { updateUserProfileApi } from "../../services/allApi";
import { toast } from "react-toastify";
import { serverUrl } from "../../services/serverUrl";
import { userProfileUpdateContext } from "../../context/ContextSearch";

const EditProfile = ({ onProfileUpdate }) => {
  const { setUserProfileUpdateStatus } = useContext(userProfileUpdateContext);

  const [offCanvasStatus, setOffCanvasStatus] = useState(false);
  const [preview, setPreview] = useState("");
  const [token, setToken] = useState("");
  const [existingProfileImg, setExistingProfileImg] = useState("");
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    cPassword: "",
    bio: "",
    profile: ""
  });

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("existingUser"));
    const storedToken = sessionStorage.getItem("token");

    if (storedUser) {
      setUserDetails({
        username: storedUser.username || "",
        password: storedUser.password || "",
        cPassword: storedUser.password || "",
        bio: storedUser.bio || "",
        profile: ""
      });
      setExistingProfileImg(storedUser.profile || "");
    }
    if (storedToken) setToken(storedToken);
  }, []);

  const handleFileAdd = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserDetails({ ...userDetails, profile: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleReset = () => {
    const user = JSON.parse(sessionStorage.getItem("existingUser"));
    setUserDetails({
      username: user.username,
      password: user.password,
      cPassword: user.password,
      bio: user.bio || "",
      profile: ""
    });
    setExistingProfileImg(user.profile);
    setPreview("");
  };

  const handleSubmit = async () => {
    const { username, password, cPassword, profile, bio } = userDetails;

    if (!username || !password || !cPassword) {
      return toast.info("Please fill all required fields!");
    }
    if (password !== cPassword) {
      return toast.warning("Passwords must match!");
    }

    const reqBody = new FormData();
    reqBody.append("username", username);
    reqBody.append("password", password);
    reqBody.append("bio", bio);
    if (profile) reqBody.append("profile", profile);
    else reqBody.append("existingProfile", existingProfileImg);

    const reqHeader = { Authorization: `Bearer ${token}` };

    try {
      const result = await updateUserProfileApi(reqBody, reqHeader);
      if (result.status === 200) {
        toast.success("Profile updated successfully!");
        sessionStorage.setItem("existingUser", JSON.stringify(result.data));
        setExistingProfileImg(result.data.profile);
        setPreview("");
        setOffCanvasStatus(false);

        // Update header/profile in all components
        setUserProfileUpdateStatus(result.data);
        if (onProfileUpdate) onProfileUpdate(result.data);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err) {
      toast.error("Update failed!");
    }
  };

  return (
    <div className="flex justify-end mt-5 md:mt-0">
      <button
        onClick={() => setOffCanvasStatus(true)}
        className="text-blue-600 border border-blue-600 rounded p-3 hover:bg-blue-600 hover:text-white"
      >
        <FontAwesomeIcon icon={faPen} /> Edit
      </button>

      {offCanvasStatus && (
        <div>
          <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
          <div className="bg-white h-full w-96 fixed z-50 top-0 left-0 shadow-xl overflow-y-auto">
            <div className="bg-gray-900 px-3 py-4 flex justify-between text-white text-2xl">
              <h1>Edit User Profile</h1>
              <FontAwesomeIcon
                onClick={() => setOffCanvasStatus(false)}
                icon={faXmark}
                className="cursor-pointer"
              />
            </div>

            <div className="flex flex-col items-center mt-5 mb-10 px-4">
              <div className="relative w-[200px] h-[200px] mt-5">
                <label htmlFor="profileFile" className="cursor-pointer">
                  <input
                    type="file"
                    id="profileFile"
                    style={{ display: "none" }}
                    onChange={handleFileAdd}
                  />
                  {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-full border" />
                  ) : existingProfileImg ? (
                    <img
                      src={`${serverUrl}/uploads/${existingProfileImg}`}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-full border"
                    />
                  ) : (
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/018/742/015/original/minimal-profile-account-symbol-user-interface-theme-3d-icon-rendering-illustration-isolated-in-transparent-background-png.png"
                      alt="Default"
                      className="w-full h-full object-cover rounded-full border"
                    />
                  )}
                </label>

                <div
                  className="absolute bottom-3 right-3 bg-yellow-500 text-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-yellow-600 transition"
                  onClick={() => document.getElementById("profileFile").click()}
                >
                  <FontAwesomeIcon icon={faPen} />
                </div>
              </div>

              <div className="w-full mt-8 space-y-4">
                <input
                  type="text"
                  placeholder="Username"
                  value={userDetails.username}
                  onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={userDetails.password}
                  onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded"
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={userDetails.cPassword}
                  onChange={(e) => setUserDetails({ ...userDetails, cPassword: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded"
                />
                <textarea
                  placeholder="Bio"
                  rows={4}
                  value={userDetails.bio}
                  onChange={(e) => setUserDetails({ ...userDetails, bio: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded"
                ></textarea>
              </div>

              <div className="flex mt-6 gap-4">
                <button
                  className="bg-amber-600 text-black p-3 rounded hover:bg-white hover:border hover:border-amber-600 hover:text-amber-600"
                  onClick={handleReset}
                >
                  Reset
                </button>
                <button
                  className="bg-green-600 text-white p-3 rounded hover:bg-white hover:border hover:border-green-600 hover:text-green-600"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
