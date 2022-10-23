import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import Navbar from '../../shared/Navbar';
import ActionsTab from '../../shared/ActionsTab';

function Book() {
  const [book, setBook] = useState(null)  
  const [summary, setSummary] = useState("")
  const {id} = useParams()

  useEffect(() => {
    axios.get(`http://localhost:8080/api/book/${id}`)
    .then(res => {
      setBook(res.data[0]);
      setSummary(res.data[0].book_summary)
    })
    .catch(err => {
      console.log(err);
    })
  }, [id])


  const updateHandler = (e, bookId) => {
      axios.put(`http://localhost:8080/api/book/edit-book/${bookId}`, {...book, book_summary: summary})
      .then(res => {
        alert(res.data.message)
      })
      .catch(err => {
        alert(err.response.data.book_summary)
      })
  }

  return (
    <div className="book">
      <Navbar/>
      <div className='container'>
        <h4 className='my-5 text-center'>Details about "{book?.title}"</h4>
        <div className="bg-light">
        {
          book == null ?
          <h1>Loading</h1> :
            <div className='p-4'>
                <div className="d-flex justify-content-between bg-light">
                    <div>
                        <h5>{book.title}</h5>
                        <div className="d-flex">
                            <p>Author: {book.author}</p>
                            <p className='ml-5'>&#x2022; Year: {book.published_year}</p>
                        </div>
                    </div>
                    <ActionsTab book={book} detailsSection={true}/>
                </div>
                <div className="summary mt-2">
                    <h6>Book Summary</h6>
                    <textarea className="form-control" onChange={e => setSummary(e.target.value)} value={summary} rows="6"></textarea>  
                </div>
                <button onClick={(e) => updateHandler(e, book.book_id)} type="button" className="mt-2 btn btn-outline-primary btn-sm">Save Summary</button>
            </div>
        }
        </div>
      </div>
    </div>
  )
}

export default Book