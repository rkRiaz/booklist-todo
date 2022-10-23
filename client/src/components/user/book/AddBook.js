import React, { useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import Navbar from '../../shared/Navbar';
import { useHistory } from 'react-router-dom';


function AddBook() {
  const { user } = useSelector((store) => store.user);
  const [book, setBook] = useState({
      title: "",
      author: "",
      published_year: "",
      book_summary: "",
      user_id: ""
  })  
  const history = useHistory()
  const [error, setError] = useState({})

  const changeValue = (event, type) => {
    setBook({
      ...book,
      [type]: event.target.value,
      user_id: user.user_id
    });
  };
 
  const submitHandler = (e) => {
    e.preventDefault()
    axios.post(`http://localhost:8080/api/book/add-book`, book)
    .then(res => {
      alert(res.data.message)
      history.push("/user/dashboard")
    })
    .catch(err => {
        setError(err.response.data)
    })
  }

  return (
   <div className="addBook">
        <Navbar/>
        <div className='container'>
            <h4 className='my-5 text-center'>Add a book</h4>
            <form className="mt-5" onSubmit={submitHandler}>
                <div className="form-group row">
                    <label htmlFor="name" className="col-sm-2 col-form-label">Book Title</label>
                    <div className="col-sm-10">
                        <input onChange={e => changeValue(e, "title")} type="text" className={`form-control ${error.title && 'is-invalid'}` } />
                        <span className="text-danger px-2 rounded">{error.title && error.title}</span>
                    </div>
                    
                </div>
                <div className="form-group row">
                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Author Name</label>
                    <div className="col-sm-10">
                        <input onChange={e => changeValue(e, "author")} type="text" className={`form-control ${error.author && 'is-invalid'}`} />
                        <span className="text-danger px-2 rounded">{error.author && error.author}</span>
                    </div>
                    
                </div>
                <div className="form-group row">
                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Published Year</label>
                    <div className="col-sm-10">
                        <input onChange={e => changeValue(e, "published_year")} type="number" className={`form-control ${error.published_year && 'is-invalid'}` } />
                        <span className="text-danger px-2 rounded">{error.published_year && error.published_year}</span>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Book Summary (Max value: 16777215 character)</label>
                    <div className="col-sm-10">
                        <textarea onChange={e => changeValue(e, "book_summary")} rows="6" type="text" className={`form-control ${error.book_summary && 'is-invalid'}` }/>
                        <span className="text-danger px-2 rounded">{error.book_summary && error.book_summary}</span>
                    </div>
                </div>
                <button type="submit" className="w-100 btn btn-primary">Add Book</button>        
            </form>
        </div>
   </div>
  )
}

export default AddBook