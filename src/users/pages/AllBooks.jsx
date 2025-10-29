import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { getAllBookApi } from '../../services/allApi'
import {searchKeyContext} from'../../context/ContextSearch'
const AllBooks = () => {
    const [status,setStatus]=useState(false)
    const [token,setToken] = useState("")
    const [allBooks,setAllBooks] = useState([])
     const [tempBooks,setTempBooks] = useState([])
     //access context
     const {searchKey,setSearchKey} = useContext(searchKeyContext)
     console.log(searchKey);
     



 

    const getAllBooks = async(searchKey,tok)=>{
      const reqHeader = {
        "Authorization":`Bearer ${tok}`
      }
      const result= await getAllBookApi(searchKey,reqHeader);
      console.log(result);
      if(result.status == 200){
        setAllBooks(result.data)
        setTempBooks(result.data)
      }
      

    }

     console.log(allBooks);

     //filter
     const filter=(data)=>{
      if(data=='no-filter'){
        setAllBooks(tempBooks)

      }else{
      setAllBooks(tempBooks.filter((item=>item.category.toLowerCase()==data.toLowerCase())))
      }
      


     }

    

      useEffect(()=>{
        if(sessionStorage.getItem("token"))
        {
          const tok = sessionStorage.getItem("token")
          setToken(tok)
          getAllBooks(searchKey,tok)
        }
   },[searchKey])

  return (
    <>
    <Header/>
    {/*when user login */}
    {token && <div className='flex justify-center items-center flex-col'>
        <h3 className='mt-4 text-3xl font-large'>Collections</h3>
        <div className='flex my-8 w-full justify-center items-center'>
            <input value={searchKey} onChange={(e)=>setSearchKey(e.target.value)} type='text' placeholder='Search by Title' className='border boreder-gray-300 placeholder-gray-300 p-2 w-1/4 shadow'></input>
            <button className='bg-blue-900  text-white py-2 px-3 shadow hover:border hover:border-blue-900 hover:text-blue-900 hover:bg-white ms-2'>Search</button>
        </div>
    </div>

    }

   {token &&  <div className='md:grid grid-cols-[1fr_4fr] md:py-10 md:px-20 p-5'>
        <div>
            <div className='flex mt-3 justify-between'><h1 className='text-2xl font-medium'>Filters</h1>
            ,<span onClick={()=>setStatus(!status)}className='md:hidden'><FontAwesomeIcon icon={faBars}/></span>
            </div>
           <div className={status ? 'md:block':'md:block justify-center hidden'}>
                <div className='mt-3' onClick={()=>filter('Literature')}>
                    <input type='radio' id='Literature' name='filter'></input>
                    <label htmlFor='Literature' className='ms-3'>Literary Fiction</label>
                </div>
    
                <div className='mt-3' onClick={()=>filter('philosophy')}>
                    <input type='radio' id='Philosophy' name='filter'></input>
                    <label htmlFor='philosophy' className='ms-3'>Philosophy</label>
                </div>
                <div className='mt-3' onClick={()=>filter('fiction')}>
                    <input type='radio' id='fiction' name='filter'></input>
                    <label htmlFor='fiction' className='ms-3'>Fiction</label>
                </div>
    
                <div className='mt-3' onClick={()=>filter('romance')}>
                    <input type='radio' id='romance' name='filter'></input>
                    <label htmlFor='romance' className='ms-3'>Romance</label>
                </div>
    
                <div className='mt-3' onClick={()=>filter('autobiography')}>
                    <input type='radio' id='autobiography' name='filter'></input>
                    <label htmlFor='autobiography' className='ms-3'>AutoBiography</label>
                </div>
    
                <div className='mt-3'  onClick={()=>filter('novel')}>
                    <input type='radio' id='novel' name='filter'></input>
                    <label htmlFor='novel' className='ms-3'>Novel</label>
                </div>
    
                <div className='mt-3' onClick={()=>filter('horror')}>
                    <input type='radio' id='horror' name='filter'></input>
                    <label htmlFor='horror' className='ms-3'>Horror</label>
                </div>
    
                <div className='mt-3' onClick={()=>filter('adventure')}>
                    <input type='radio' id='adventure' name='filter'></input>
                    <label htmlFor='adventure' className='ms-3'>Adventure</label>
                </div>
                
                <div className='mt-3' onClick={()=>filter('detective')}>
                    <input type='radio' id='detective' name='filter'></input>
                    <label htmlFor='detective' className='ms-3'>Detective</label>
                </div>

                <div className='mt-3' onClick={()=>filter('no-filter')}>
                    <input type='radio' id='no-filter' name='filter'></input>
                    <label htmlFor='no-filter' className='ms-3'>No filter</label>
                </div>
           </div>
        </div>
        <div className='md:grid grid-cols-4 w-full'>
       {allBooks ?.length>0 ?
        allBooks?.map((item)=>(          <div className='p-3 shadow' hidden={item?.status =='pending' || item?.status == 'sold'}>
         <img src={item?.imageUrl} alt='image not available' style={{width:'100%',height:'300px'}}></img>
          <div className='flex justify-center flex-col items-center mt-3'>
            <p className='text-blue-700'>{item?.author}</p>
            <h3>{item?.title}</h3>
            <Link to={`/view-book/${item?._id}`}><button className='w-full mt-3 px-3 py-2 bg-blue-900 text-white hover:border hover:border-blue-900 hover:text-blue-900 hover:bg-white rounded cursor-pointer'>View Book</button></Link>
          </div>
        </div>
        )) :
       <div className="flex flex-col justify-center items-center w-full h-[60vh]">
      <img
    src="https://cdn.dribbble.com/users/604891/screenshots/16581214/media/bb111973c18ec6b36a067efdecc9a8ff.gif"
    alt="No books available"
    className="w-64 h-64 object-contain mb-4"
     />
     <p className="text-gray-500 text-lg font-medium">
    No Books added yet....
     </p>
      </div>


       }
        
      </div>
    </div>

   }

   

  {!token &&
    <div className='grid grid-cols-3'>
        <div></div>
        <div className='flex justify-center items-center flex-col w-full'>
            <img src='https://cdn.pixabay.com/animation/2022/07/31/05/09/05-09-53-216_512.gif' alt='no image' className='w-1/2'></img>
            <p className='mt-3 text-2xl'>Please <Link to={'/login'} className='text-red-500 underline'>Login</Link>to Explore more...</p>
        </div>
        <div></div>

    </div>

  }
    <Footer/>
    </>
  )
}

export default AllBooks