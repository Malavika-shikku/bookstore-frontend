import React, { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Header";
import Footer from "../../components/Footer";
import EditProfile from "../components/EditProfile";
import { ToastContainer, toast } from "react-toastify";
import { deleteUserBookApi, getAllUserBookApi, getAllUserBroughtBookApi, uploadBookApi } from "../../services/allApi";
import { userProfileUpdateContext } from "../../context/ContextSearch";
import { serverUrl } from "../../services/serverUrl";

const Profile = () => {
  const { userProfileUpdateStatus } = useContext(userProfileUpdateContext);

  const [activeTab, setActiveTab] = useState("sell"); // "sell" | "sold" | "purchase"
  const [bookDetails, setBookDetails] = useState({
    title: "",
    author: "",
    noOfPages: "",
    imageUrl: "",
    price: "",
    dprice: "",
    abstract: "",
    publisher: "",
    language: "",
    isbn: "",
    category: "",
    uploadedimages: [],
  });
  const [previewList, setPreviewList] = useState([]);
  const [token, setToken] = useState("");
  const[userBooks,setUserBooks] = useState([])
  const [userBroughtBooks,setUserBroughtBooks]=useState([])
  const [deleteUserBookStatus,setDeleteUserBookStatus] = useState([]);
  

  // Load token from session storage
  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, [deleteUserBookStatus]);

  // Load user data
  const userData =
    userProfileUpdateStatus && Object.keys(userProfileUpdateStatus).length > 0
      ? userProfileUpdateStatus
      : JSON.parse(sessionStorage.getItem("existingUser")) || {};

  const username = userData.username || "User";
  const bio = userData.bio || "No bio available.";
  const profileImg = userData.profile
    ? `${serverUrl}/uploads/${userData.profile}`
    : "https://static.vecteezy.com/system/resources/previews/008/302/462/original/eps10-grey-user-icon-or-logo-in-simple-flat-trendy-modern-style-isolated-on-white-background-free-vector.jpg";

  // Handle image upload
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setBookDetails((prev) => ({
      ...prev,
      uploadedimages: [...prev.uploadedimages, file],
    }));
    setPreviewList((prev) => [...prev, URL.createObjectURL(file)]);
  };

  // Reset form
  const handleReset = () => {
    setBookDetails({
      title: "",
      author: "",
      noOfPages: "",
      imageUrl: "",
      price: "",
      dprice: "",
      abstract: "",
      publisher: "",
      language: "",
      isbn: "",
      category: "",
      uploadedimages: [],
    });
    setPreviewList([]);
  };

  // Submit book form
  const handleSubmit = async () => {
    const { uploadedimages, ...rest } = bookDetails;

    if (Object.values(rest).some((v) => !v) || uploadedimages.length === 0) {
      return toast.info("Please fill all fields and upload at least one image!");
    }

    const formData = new FormData();
    Object.entries(rest).forEach(([key, value]) => formData.append(key, value));
    uploadedimages.forEach((img) => formData.append("uploadedimages", img));

    try {
      const result = await uploadBookApi(formData, { Authorization: `Bearer ${token}` });
      if (result.status === 200) toast.success("Book added successfully!");
      else toast.error("Something went wrong!");
      handleReset();
    } catch (err) {
      toast.error("Upload failed!");
      handleReset();
    }
  };

  //get all user books
  const getAllUserBooks= async()=>{
    const reqHeader ={
      "Authorization": `Bearer ${token}`
    }
    const result = await getAllUserBookApi(reqHeader)
    console.log(result);

    if(result.status == 200){
      setUserBooks(result.data)

    }
    
  }
  console.log(userBooks);
  

  //get all user brought books
  const getAllUserBroughtBooks= async()=>{
    const reqHeader ={
      "Authorization": `Bearer ${token}`
    }
    const result = await getAllUserBroughtBookApi(reqHeader)
    console.log(result);
    if(result.status == 200){
      setUserBroughtBooks(result.data)
     }
    
  }
  console.log(userBroughtBooks);


  //delete user books
  const handleDeleteBook = async(id)=>{
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    
      try{
        const result = await deleteUserBookApi(id,reqHeader)

        if(result.status == 200){
          setDeleteUserBookStatus(id)
          toast.success("Book deleted successfully")
          
        }else{
          toast.error("failed to delete book")
        }

      }catch(err){
        toast.error(" something went wrong")
      }

    }
  
  

  useEffect(()=>{
    if(activeTab === "sold"){
      getAllUserBooks()
    }else if(activeTab === "purchase"){

    getAllUserBroughtBooks()
    }else{
      console.log("default page");
      
    }
    if(deleteUserBookStatus){
      setUserBooks(prevBooks=>prevBooks.filter(book=>book._id !==deleteUserBookStatus))
    }

  },[activeTab,deleteUserBookStatus])

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100">
        {/* Profile Header */}
        <div className="h-56 bg-gray-900 relative flex items-center px-10">
          <img
            src={profileImg}
            alt="user icon"
            className="w-40 h-40 rounded-full border-4 border-white shadow-lg absolute left-20 bottom-[-70px] object-cover"
          />
        </div>

        {/* Profile Info */}
        <div className="flex justify-between mt-24 px-20">
          <h1 className="text-3xl font-semibold flex items-center gap-2">
            {username}
            <FontAwesomeIcon icon={faCircleCheck} className="text-blue-500 text-xl" />
          </h1>
          <EditProfile />
        </div>

        <p className="md:px-20 px-5 my-5 text-justify">{bio}</p>

        {/* Tabs */}
        <div className="md:px-40 flex justify-center items-center my-5 space-x-4">
          <p
            onClick={() => setActiveTab("sell")}
            className={activeTab === "sell" ? "p-4 text-blue-600 border-b-2 border-blue-600 cursor-pointer" : "p-4 text-gray-600 cursor-pointer"}
          >
            Sell Book
          </p>
          <p
            onClick={() => setActiveTab("sold")}
            className={activeTab === "sold" ? "p-4 text-blue-600 border-b-2 border-blue-600 cursor-pointer" : "p-4 text-gray-600 cursor-pointer"}
          >
            User Book
          </p>
          <p
            onClick={() => setActiveTab("purchase")}
            className={activeTab === "purchase" ? "p-4 text-blue-600 border-b-2 border-blue-600 cursor-pointer" : "p-4 text-gray-600 cursor-pointer"}
          >
            Purchase History
          </p>
        </div>

        {/* Sell Book Section */}
        {activeTab === "sell" && (
          <div className="bg-gray-200 p-10 mt-10">
            <h1 className="text-center text-3xl font-medium">Book Details</h1>
            <div className="md:grid grid-cols-2 mt-5 w-full gap-4">
              {/* Left Form */}
              <div className="px-3 space-y-3">
                <input type="text" placeholder="Title" className="p-2 bg-white rounded w-full" value={bookDetails.title} onChange={(e) => setBookDetails({ ...bookDetails, title: e.target.value })} />
                <input type="text" placeholder="Author" className="p-2 bg-white rounded w-full" value={bookDetails.author} onChange={(e) => setBookDetails({ ...bookDetails, author: e.target.value })} />
                <input type="text" placeholder="No. of pages" className="p-2 bg-white rounded w-full" value={bookDetails.noOfPages} onChange={(e) => setBookDetails({ ...bookDetails, noOfPages: e.target.value })} />
                <input type="text" placeholder="Image URL" className="p-2 bg-white rounded w-full" value={bookDetails.imageUrl} onChange={(e) => setBookDetails({ ...bookDetails, imageUrl: e.target.value })} />
                <input type="text" placeholder="Price" className="p-2 bg-white rounded w-full" value={bookDetails.price} onChange={(e) => setBookDetails({ ...bookDetails, price: e.target.value })} />
                <input type="text" placeholder="Discount Price" className="p-2 bg-white rounded w-full" value={bookDetails.dprice} onChange={(e) => setBookDetails({ ...bookDetails, dprice: e.target.value })} />
                <textarea rows={5} placeholder="Abstract" className="p-2 bg-white rounded w-full" value={bookDetails.abstract} onChange={(e) => setBookDetails({ ...bookDetails, abstract: e.target.value })}></textarea>
              </div>

              {/* Right Form */}
              <div className="px-3 space-y-3">
                <input type="text" placeholder="Publisher" className="p-2 bg-white rounded w-full" value={bookDetails.publisher} onChange={(e) => setBookDetails({ ...bookDetails, publisher: e.target.value })} />
                <input type="text" placeholder="Language" className="p-2 bg-white rounded w-full" value={bookDetails.language} onChange={(e) => setBookDetails({ ...bookDetails, language: e.target.value })} />
                <input type="text" placeholder="ISBN" className="p-2 bg-white rounded w-full" value={bookDetails.isbn} onChange={(e) => setBookDetails({ ...bookDetails, isbn: e.target.value })} />
                <input type="text" placeholder="Category" className="p-2 bg-white rounded w-full" value={bookDetails.category} onChange={(e) => setBookDetails({ ...bookDetails, category: e.target.value })} />

                {/* Main preview */}
                <div className="flex justify-center items-center w-full mt-4">
                  {previewList.length === 0 ? (
                    <label htmlFor="imageFile">
                      <input type="file" id="imageFile" style={{ display: "none" }} onChange={handleUpload} />
                      <img src="https://s3.amazonaws.com/ionic-marketplace/image-upload/icon.png" alt="no image" style={{ width: "200px", height: "200px" }} />
                    </label>
                  ) : (
                    <img src={previewList[0]} alt="preview" style={{ width: "200px", height: "200px" }} />
                  )}
                </div>

                {/* Thumbnails */}
                {previewList.length > 0 && (
                  <div className="flex justify-center items-center mt-4 gap-2">
                    {previewList.map((item, index) => (
                      <img key={index} src={item} alt="preview" style={{ width: "70px", height: "70px" }} className="rounded shadow" />
                    ))}
                    <label htmlFor="imageFile">
                      <input type="file" id="imageFile" style={{ display: "none" }} onChange={handleUpload} />
                      <FontAwesomeIcon icon={faSquarePlus} className="fa-2x shadow cursor-pointer" />
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end mt-6 gap-4">
              <button className="bg-amber-600 text-black px-4 py-2 rounded hover:bg-white hover:border hover:border-amber-600 hover:text-amber-600" onClick={handleReset}>
                Reset
              </button>
              <button className="bg-green-600 text-black px-4 py-2 rounded hover:bg-white hover:border hover:border-green-600 hover:text-green-600" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        )}

        {/* Sold History Section */}
        {activeTab === "sold" && (
          
          <div className="p-10 my-20 shadow rounded ">
           {userBooks.length>0 ? (
            userBooks.map((book)=>(
               <div className="bg-gray-200 p-4 rounded">
                <div className="md:grid grid-cols-[3fr_1fr]">
                    <div>
                        <h1 className="text-xl font-bold">{book.title}</h1>
                        <h2 className="text-lg text-orange-800">{book.author}</h2>
                        <h3 className="text-blue-600">₹{book.dprice}</h3>
                        <p className="text-justify">{book.abstract} </p>
                        <div className="flex">
                           {book.status == "pending" && (
                            <img src="https://psdstamps.com/wp-content/uploads/2022/04/round-pending-stamp-png.png" alt="no image"  style={{height:'100px',width:'100px'}}></img> 
                           )} 

                            {book.status == "approved" && (
                              <img src="https://www.pngall.com/wp-content/uploads/2/Approved-Stamp.png" alt="no image"  style={{height:'100px',width:'100px'}}></img> 
                            )} 

                             {book.brought.length > 1 && (
                              <img src="https://www.psdstamps.com/wp-content/uploads/2019/12/round-sold-out-stamp-png.png" alt="no image"  style={{height:'100px',width:'100px'}}></img>  
                             )}
                        </div>
                        
                    </div>
                    <div>
                        <img src={`${serverUrl}/uploads/${book.uploading[0]}`} alt="no image" className="w-full" style={{height:'300px'}}></img>
                        <div className="flex justify-end mt-4">
                            <button  onClick={()=>handleDeleteBook(book?._id)} className="p-2 rounded bg-red-600 text-white hover:bg-gray-200 hover:text-red-600 hover:border hover:border-red-600">Delete</button>
                        </div>
                    </div>

                </div>
                <hr></hr>
                
            </div>
            
            ))
           ):(
            <div className="flex justify-center items-center flex-col">
                <img src="https://clipart-library.com/images/di9rnepxT.gif" alt="no image" style={{width:'200px', height:'200px'}}></img>
                <p className="text-red-600 text-2xl">No Book Added Yet </p>
            </div>

           )}

            

            
          </div>
        )}

        {/* Purchase History Section */}
        
{activeTab === "purchase" && (
  <div className="p-10 my-20 shadow rounded">
    {userBroughtBooks.length > 0 ? (
      userBroughtBooks.map((book) => (
        <div key={book._id} className="bg-gray-200 p-4 rounded mb-6 hover:shadow-lg">
          <div className="md:grid grid-cols-[3fr_1fr] gap-6">
            <div>
              <h1 className="text-xl font-bold">{book.title}</h1>
              <h2 className="text-lg text-orange-800">{book.author}</h2>
              <h3 className="text-blue-600">₹{book.dprice}</h3>
              <p className="text-justify mt-2">{book.abstract}</p>
              <div className="flex gap-3 mt-4">
                <img src="https://www.pngall.com/wp-content/uploads/2/Approved-Stamp.png" alt="Approved" style={{ height: "80px", width: "80px" }} />
                <img src="https://www.psdstamps.com/wp-content/uploads/2019/12/round-sold-out-stamp-png.png" alt="Sold" style={{ height: "80px", width: "80px" }} />
              </div>
            </div>

            <div>
              <img src={`${serverUrl}/uploads/${book.uploading[0]}`} alt={book.title} className="w-full rounded shadow-lg" style={{ height: "300px", objectFit: "cover" }} />
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="flex justify-center items-center flex-col">
        <img src="https://clipart-library.com/images/di9rnepxT.gif" alt="no image" style={{ width: "200px", height: "200px" }} />
        <p className="text-red-600 text-2xl mt-2">No Purchases Yet</p>
      </div>
    )}
  </div>
)}

      </div>

      <ToastContainer theme="colored" position="top-center" autoClose={2000} />
      <Footer />
    </>
  );
};

export default Profile;
