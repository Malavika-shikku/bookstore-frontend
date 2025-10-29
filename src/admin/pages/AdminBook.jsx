import React, { useEffect, useState } from "react";
import { approveBookApi, getAllAdminBookApi, getAllUserApi } from "../../services/allApi";
import AdminHeader from "../components/AdminHeader";
import Footer from "../../components/Footer";
import AdminSidebar from "../components/AdminSidebar";

const AdminBook = () => {
  const [bookListStatus, setBookListStatus] = useState(true);
  const [usersStatus, setUsersStatus] = useState(false);
  const [bookDetails, setBookDetails] = useState([]);
  const [token, setToken] = useState("");
  const [approveStatus, setApproveStatus] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  // Fetch all books
  const getAllBooks = async (token) => {
    const reqHeader = { Authorization: `Bearer ${token}` };
    const result = await getAllAdminBookApi(reqHeader);
    if (result.status === 200) {
      setBookDetails(result.data);
    }
  };

  // Approve a book
  const approveBook = async (data) => {
    const reqHeader = { Authorization: `Bearer ${token}` };
    const result = await approveBookApi(data, reqHeader);
    if (result.status === 200) {
      setApproveStatus(!approveStatus);
    }
  };

  // Fetch all users
  const getAllUsers = async (token) => {
    const reqHeader = { Authorization: `Bearer ${token}` };
    const result = await getAllUserApi(reqHeader);
    if (result.status === 200) {
      setAllUsers(result.data);
    }
  };

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (!storedToken) return;
    setToken(storedToken);

    if (bookListStatus) {
      getAllBooks(storedToken);
    } else if (usersStatus) {
      getAllUsers(storedToken);
    }
  }, [approveStatus, usersStatus, bookListStatus]);

  return (
    <>
      <AdminHeader />
      <div className="grid grid-cols-[1fr_4fr] min-h-screen">
        {/* Sidebar */}
        <div className="bg-blue-100 flex flex-col items-center">
          <AdminSidebar />
        </div>

        {/* Main content */}
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Admin Panel</h1>

          {/* Toggle Tabs */}
          <div className="flex justify-center gap-4 mb-10">
            <button
              onClick={() => {
                setBookListStatus(true);
                setUsersStatus(false);
              }}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                bookListStatus
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Books
            </button>
            <button
              onClick={() => {
                setBookListStatus(false);
                setUsersStatus(true);
              }}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                usersStatus
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Users
            </button>
          </div>

          {/* ================= BOOKS LIST ================= */}
          {bookListStatus && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {bookDetails?.length > 0 ? (
                bookDetails.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-2xl shadow-lg p-4 transition-transform transform hover:-translate-y-1 hover:shadow-2xl"
                  >
                    <img
                      src={item?.imageUrl}
                      alt={item?.title}
                      className="w-full h-60 object-cover rounded-xl"
                    />
                    <div className="mt-4 text-center">
                      <p className="text-blue-700 font-medium">{item?.author}</p>
                      <h3 className="text-xl text-yellow-600 font-semibold">{item?.title}</h3>
                      <p className="text-red-600 font-bold mt-1">₹{item?.dprice}</p>

                      {item?.status === "pending" ? (
                        <button
                          onClick={() => approveBook(item)}
                          className="w-full mt-3 px-3 py-2 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-all"
                        >
                          Approve
                        </button>
                      ) : (
                        <div className="mt-3 flex justify-center">
                          <img
                            src="https://static.vecteezy.com/system/resources/previews/017/350/123/original/green-check-mark-icon-in-round-shape-design-png.png"
                            alt="approved"
                            className="w-10 h-10"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500">No books found...</p>
              )}
            </div>
          )}

          {/* ================= USERS LIST ================= */}
          {usersStatus && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {allUsers && allUsers.length > 0 ? (
                allUsers.map((user) => (
                  <div
                    key={user._id}
                    className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center transition-transform transform hover:-translate-y-1 hover:shadow-xl"
                  >
                    <p className="text-xs text-gray-500 mb-2">ID: {user._id}</p>
                    <img
                      src={
                        user?.profile
                          ? user.profile
                          : "https://cdn-icons-png.freepik.com/512/8742/8742495.png"
                      }
                      alt="profile"
                      className="w-20 h-20 rounded-full mb-3 object-cover"
                    />
                    <p className="font-semibold text-blue-600 text-lg">{user?.username}</p>
                    <p className="text-gray-700 text-sm">{user?.email}</p>
                  </div>
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500">No users found...</p>
              )}
            </div>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default AdminBook;
