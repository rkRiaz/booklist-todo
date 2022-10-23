import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import Navbar from '../../shared/Navbar';


function EditBook() {
  const {id} = useParams()
  const [book, setBook] = useState({
      title: "",
      author: "",
      published_year: "",
      book_summary: "",
      user_id: ""
  })  
  const [error, setError] = useState({})
 

  const changeValue = (event, type) => {
    setBook({
      ...book,
      [type]: event.target.value,
    });
  };

  useEffect(() => {
    axios.get(`http://localhost:8080/api/book/${id}`)
    .then(res => {
      setBook(res.data[0]);
    })
    .catch(err => {
      console.log(err);
    })
  }, [id])
 
  const submitHandler = (e) => {
    e.preventDefault()
    axios.put(` http://localhost:8080/api/book/edit-book/${book.book_id}`, book)
    .then(res => {
      alert(res.data.message)
    })
    .catch(err => {
        setError(err.response.data)
    })
  }


  return (
   <div className="editBook">
      <Navbar/>
      <div className='container'>
        <h4 className='my-5 text-center'>Edit book "{book.title}"</h4>
        <form className="mt-5" onSubmit={submitHandler}>
            <div className="form-group row">
                <label htmlFor="name" className="col-sm-2 col-form-label">Book Title</label>
                <div className="col-sm-10">
                    <input onChange={e => changeValue(e, "title")} value={book.title} type="text" className={`form-control ${error.title && 'is-invalid'}` } />
                    <span className="text-danger px-2 rounded">{error.title && error.title}</span>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Author Name</label>
                <div className="col-sm-10">
                    <input onChange={e => changeValue(e, "author")} value={book.author} type="text" className={`form-control ${error.author && 'is-invalid'}`} />
                    <span className="text-danger px-2 rounded">{error.author && error.author}</span>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Published Year</label>
                <div className="col-sm-10">
                    <input onChange={e => changeValue(e, "published_year")} value={book.published_year} type="number" className={`form-control ${error.published_year && 'is-invalid'}` } />
                    <span className="text-danger px-2 rounded">{error.published_year && error.published_year}</span>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Book Summary (Max value: 16777215 character)</label>
                <div className="col-sm-10">
                    <textarea onChange={e => changeValue(e, "book_summary")} value={book.book_summary} rows="6" type="text" className={`form-control ${error.book_summary && 'is-invalid'}` }/>
                    <span className="text-danger px-2 rounded">{error.book_summary && error.book_summary}</span>
                </div>
            </div>
            <button type="submit" className="w-100 btn btn-primary">Edit Book</button>           
        </form>
      </div>
   </div>
  )
}

export default EditBook