import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';


function ActionsTab({book, detailsSection, setDashboardReload, setFavBooksReload}) {
  const { user } = useSelector((store) => store.user);
  const [arrayOfObjFavBooksId, setArrayOfObjFavBooksId] = useState([])
  const [reload, setReload] = useState(false) 
  const history = useHistory()

  useEffect(() => {
    axios.get(`http://localhost:8080/api/book/fav-books-id/${user.user_id}`) //will return all the favourite books id by user id 
    .then(res => {
        setArrayOfObjFavBooksId(res.data.map(b => b.book_id))
    })
    .catch(err => {
      console.log(err);
    })
  }, [reload, user.user_id])


  const actionHandler = (e, type, book_id) => {
    if(type==="fav") {
      axios.post(`http://localhost:8080/api/book/fav-book-toggler`, {
        user_id: user.user_id,
        book_id: book_id
      })
      .then(res => {
        alert(res.data.message)
        setReload(!reload)
        if(setFavBooksReload) {
          setFavBooksReload(prev => !prev)
        }
      })
      .catch(err => {
        console.log(err);
      })
    } else {
      if (window.confirm('Are you sure you want to delete this book?')) {
        axios.delete(`http://localhost:8080/api/book/delete-book/${book_id}`)
        .then(res => {
          alert(res.data.message)
          setReload(!reload)
          if(setDashboardReload) {
            setDashboardReload(prev => !prev)
          }
          history.push('/user/dashboard')
        })
        .catch(err => {
            console.log(err)
        //   alert(err.response.data.message)
        })
      }
    }
  }

  return (
    <div className="actions p-4">
        <button onClick={(e) => actionHandler(e, "fav", book.book_id)} type="button" className="btn btn-outline-warning btn-sm">{arrayOfObjFavBooksId.includes(book.book_id) ? <AiFillHeart /> : <AiOutlineHeart /> }</button>
        {
            detailsSection ? "" :
            <button type="button" className="btn btn-outline-info ml-1 btn-sm"><Link to={`/user/book/${book.book_id}`}>Details</Link></button>
        }
        <button type="button" className="btn btn-outline-primary mx-1 btn-sm"><Link to={`/user/edit-book/${book.book_id}`}>Edit</Link></button>
        <button onClick={(e) => actionHandler(e, "delete", book.book_id)} type="button" className="btn btn-outline-danger btn-sm">Delete</button>
    </div>     
  )
}

export default ActionsTab