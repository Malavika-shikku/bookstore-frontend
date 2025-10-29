import React, { useContext, useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import Header from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { homeBookApi } from '../../services/allApi'
import { searchKeyContext } from '../../context/ContextSearch'
import { toast, ToastContainer } from 'react-toastify'

const Home = () => {
 const [homeBooks,setHomeBooks]= useState([])
 const [token,setToken] = useState("")
 const navigate = useNavigate()

 //access context
  const {searchKey,setSearchKey} = useContext(searchKeyContext)

 const getAllHomeBooks = async()=>{
  const result = await homeBookApi()
  console.log(result);
  if(result.status == 200)
  {
    setHomeBooks(result.data)
  }
  
 }


 useEffect(()=>{
  setSearchKey("")
  getAllHomeBooks()
 },[])

 //search book 
 /*const searchBook=()=>{
  console.log('inside search book');
  setToken(sessionStorage.getItem('token'))

  if(searchKey == ""){
    toast.info("Please Enter a title")
  }
  else if(!token){
    toast.info("please login!!!")
    setTimeout(()=>{
      navigate('/login')
    },2500)
    
  }
  else if(searchKey && token){
    navigate('/all-books')

  }
  else{
    toast.error("something went wrong...")
  }
  
  
 }*/
const searchBook = () => {
  console.log('inside search book');
  const token = sessionStorage.getItem('token');

  if (searchKey.trim() === "") {
    toast.info("Please Enter a title");
  } else if (!token) {
    toast.info("Please login!!!");
    setTimeout(() => { navigate('/login'); }, 2500);
  } else {
    navigate('/all-books');
  }
};



 console.log(homeBooks);
 


  return (
    <>
    <Header/>
    <header className='flex justify-center items-center'>
     <div id='main' className='flex justify-center items-center w-full'>
      <div className='md:grid grid-cols-3'>
        <div></div>
      <div className='flex text-white justify-center items-center flex-col'>
        <h1 className='text-5xl'>Wonderful Gifts</h1>
        <p>Give your family and friends a book</p>
        
        
        <div className='flex mt-10 w-full'>
          <input onChange={(e)=>setSearchKey(e.target.value)} 
          type='text' placeholder='search books' className='p-2 bg-white rounded-3xl placeholder-gray-300 w-full text-black'></input>
          <FontAwesomeIcon icon={faMagnifyingGlass}
          className='text-blue-800' style={{marginTop:'11px',marginLeft:'-30px'}} onClick={searchBook}></FontAwesomeIcon>
        </div>
        </div>
        <div></div>
      
      </div>
      
     
     </div>
     
    </header>

    <section className='flex justify-center items-center flex-col md:p-10 md:px-40 p-5'>
      <h2>NEW ARRIVALS</h2>
      <h4>Explore Our Latest Collection</h4>

      <div className='md:grid grid-cols-4 w-full'>
       {homeBooks?.length > 0 ? (
  homeBooks.map((item) => (
    <div className='p-3' key={item._id}>
      <div className='p-3 shadow'>
        <img
          src={item?.imageUrl}
          alt='image not available'
          style={{ width: '100%', height: '300px' }}
        />
        <div className='flex justify-center flex-col items-center mt-3'>
          <p className='text-blue-700'>{item?.author}</p>
          <h3>{item?.title}</h3>
          <p>₹ {item?.dprice}</p>
        </div>
      </div>
    </div>
  ))
) : (
  <p>Loading......</p>
)}

        
      </div>

      <div className='flex justify-center items-center my-5'>
       <Link to={'/all-Books'}> <button className='px-3 py-2 bg-blue-900 text-white hover:border hover:border-blue-900 hover:text-blue-900 hover:bg-white'> Explore More</button></Link>
      </div>
    </section>

    <section className='flex justify-center items-center flex-col md:p-10 md:px-40 p-5'>
    <div className='md:grid grid-cols-2 w-full'>
      <div>
        <div className='flex justify-center items-center flex-col'>
          <h4>FEATURED AUTHORS</h4>
          <h3 className='text-2xl'>Captivates with every world</h3>
        </div>
        <p className='mt-6 text-justify'>Authors in a bookstore application are the visionaries behind the books that fill the shelves, each contributing their own unique voice, creativity, and perspective to the world of literature. Whether writing fiction, non-fiction, poetry, or educational works, authors bring stories, ideas, and knowledge to life in ways that resonate with readers of all backgrounds.</p>
        <p className='mt-6 text-justify'>Their work spans a wide array of genres, from thrilling mysteries and heartwarming romances to thought-provoking memoirs and insightful self-help books. Through their words, authors not only entertain and inform but also inspire and challenge readers to think deeply, reflect, and grow. In a bookstore application, authors' works become accessible to readers everywhere, offering a diverse and rich tapestry of voices and experiences, all of which contribute to the evolving landscape of modern literature.</p>
      </div>
      <div className='px-20 pt-8'>
        <img src='https://www.clevergirlauthor.com/wp-content/uploads/2022/07/First-time-author.jpg' alt='no image' style={{width:'150%',height:'400px'}}></img>
      </div>

    </div>

    </section>


    <div className='flex justify-center items-center flex-col md:py-10 md:px-40 p-6'>
      <h3>TESTIMONIALS</h3>
      <h3 className='text-2xl'>See what Others Are Saying</h3>
      <img src='https://tse3.mm.bing.net/th/id/OIP.7VThHu2VS76jFvN5_5gnlgHaEW?pid=Api&P=0&h=180' style={{width:'150px',height:'150px', borderRadius:'50%'}} className='mt-5'></img>
      <h6 className='mt-3'>Mariya Thomas
      </h6>
      <p className='mt-3'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores iure dolorum corrupti officiis cum quas odio ex sint ab, reiciendis tempore perferendis laborum est debitis reprehenderit maiores tenetur nobis suscipit?

      </p>


    </div>
    <ToastContainer position='top-center' theme='colored' autoClose={2000}></ToastContainer>


    <Footer/>
    
    
    </>
  )
}

export default Home