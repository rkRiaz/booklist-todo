import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from '../../shared/Navbar';
import ActionsTab from '../../shared/ActionsTab';
import Emptylist from '../../shared/Emptylist';
import Loading from '../../shared/Loading'
import Pagination from '../../shared/Pagination';

function FavBooks() {
  const { user } = useSelector((store) => store.user);
  const [favBooks, setFavBooks] = useState(null)
  const [arrayOfObjFavBooksId, setArrayOfObjFavBooksId] = useState([])
  const [favBooksReload, setFavBooksReload] = useState(true)

    // ---pagination task start--- //
    const [currentPage, setCurrentPage] = useState(1)
    const [booksPerPage] = useState(5)
    // get current books 
    const indexOfLastBook = currentPage * booksPerPage
    const indexOfFirstBook = indexOfLastBook - booksPerPage
    const currentBooks = favBooks?.slice(indexOfFirstBook, indexOfLastBook)
    const paginate = (pn) => setCurrentPage(pn)
    // ---pagination task ends--- //


  // get books by book_id and gather books in an Array by pushing one by one
  const fetchData = async () => {
      let favProducts = []
      for(let i=0; i<arrayOfObjFavBooksId.length; i++ ) {
          let { data } = await axios.get(`http://localhost:8080/api/book/${arrayOfObjFavBooksId[i].book_id}`)
          favProducts.push(data[0])
      }
      setFavBooks(favProducts)
  }

  useEffect(() => {
    axios.get(`http://localhost:8080/api/book/fav-books-id/${user.user_id}`) //will return all the favourite books id by user id 
    .then(res => {
        setArrayOfObjFavBooksId(res.data)
        fetchData()
    })
    .catch(err => {
      console.log(err);
    })
  }, [arrayOfObjFavBooksId.length, user.user_id, favBooksReload])


  return (
    <div className="dashboard">
      <Navbar/>
      <div className='container'>
        <div className="d-md-flex justify-content-between my-5 ">
          <h5>Fevourite book list</h5>
          <button type="button" className="btn btn-outline-primary"><Link to="/user/add-book">Add New Book</Link></button>
        </div>
        <div className="books">
        {
          favBooks === null ?
          <Loading /> :
          favBooks.length === 0 ?
          <Emptylist message="Sorry! you don't add any favourite book yet"/>
           :
           currentBooks.map((book) => (
            <div key={book.book_id} className="book d-md-flex justify-content-between bg-light mt-2">
              <div className="info p-4">
                  <h5>{book.title}</h5>
                  <div className="d-flex">
                    <p>{book.author}</p>
                    <p className='ml-5'>&#x2022; {book.published_year}</p>
                  </div>
              </div>
              <ActionsTab book={book} setFavBooksReload={setFavBooksReload}/>
            </div>
          ))
        }
        </div>
        {favBooks !== null && favBooks.length > 0 ? <Pagination booksPerPage={booksPerPage} totalBooks={favBooks.length} paginate={paginate} currentPage={currentPage}/> : ""}
      </div>
    </div>
  )
}

export default FavBooks