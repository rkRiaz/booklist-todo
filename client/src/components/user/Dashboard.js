import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import ActionsTab from '../shared/ActionsTab';
import Emptylist from '../shared/Emptylist';
import Loading from '../shared/Loading'
import Pagination from '../shared/Pagination';

function Dashboard() {
  const { user } = useSelector((store) => store.user);
  const [books, setBooks] = useState(null) 
  const [dashBoardReload, setDashboardReload] = useState(false)
 
 
  // ---pagination task start--- //
  const [currentPage, setCurrentPage] = useState(1)
  const [booksPerPage] = useState(5)
  // get current books 
  const indexOfLastBook = currentPage * booksPerPage
  const indexOfFirstBook = indexOfLastBook - booksPerPage
  const currentBooks = books?.slice(indexOfFirstBook, indexOfLastBook)
  const paginate = (pn) => setCurrentPage(pn)
  // ---pagination task ends--- //


  useEffect(() => {
    axios.get(`http://localhost:8080/api/book/books-by-user-id/${user.user_id}`)
    .then(res => {
      setBooks(res.data)
    })
    .catch(err => {
      console.log(err);
    })
  }, [user.user_id, dashBoardReload])


  return (
    <div className="dashboard">
      <Navbar/>
      <div className='container'>
        <div className="d-md-flex justify-content-between my-5 ">
          <h5>Hello {user.name}! Here is your book list</h5>
          <button type="button" className="btn btn-outline-primary"><Link to="/user/add-book">Add New Book</Link></button>
        </div>
        <div className="books">
        {
          books === null ?
          <Loading/> :
          books.length === 0 ?
          <Emptylist message="Empty list! Please add some books."/> 
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
              <ActionsTab book={book} setDashboardReload={setDashboardReload}/>
            </div>
          ))
        }
        </div>
        {books !== null && books.length > 0 ? <Pagination booksPerPage={booksPerPage} totalBooks={books.length} paginate={paginate} currentPage={currentPage}/> : ""}
      </div>
    </div>
  )
}

export default Dashboard