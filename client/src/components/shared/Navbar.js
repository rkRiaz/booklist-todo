import React from 'react'
import {Link, useHistory} from 'react-router-dom'
import { userLogout } from '../../store/actions/userAction'
import { useDispatch } from 'react-redux';

function Navbar() {
  const history = useHistory()
  const dispatch = useDispatch()

  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "#e3f2fd"}}>
        <div className="container">
          <Link to="/user/dashboard" className="navbar-brand" href="#"><h3>BOOKRDR</h3></Link>
          <div className="ml-auto d-flex">
              <Link to="/user/dashboard" className="nav-link" ><h6>Dashboard</h6></Link>
              <Link to="/user/favourite-books" className="nav-link" ><h6>Favourite-Books</h6></Link>
              <button onClick={() => dispatch(userLogout(history))} className="btn btn-outline-success my-2 my-sm-0">Logout</button>
          </div>
        </div>
    </nav>
  )
}

export default Navbar