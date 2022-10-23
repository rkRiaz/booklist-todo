import React, {useState} from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom'

function Pagination({ booksPerPage, totalBooks, paginate, currentPage }) {

  

    let pageNumbers = []

    for(let i=1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
        pageNumbers.push(i)
    }


  return (
    <nav aria-label="..." className="mt-3">
        <ul className="pagination justify-content-end">
            <li onClick={() => paginate(currentPage === 1 ? 1 : currentPage - 1)} className="page-item"><Link to="#" className="page-link">Previous</Link></li>
        
            {
                pageNumbers.map(pn => (
                    <li onClick={() => paginate(pn)} key={pn} className={`page-item ${currentPage === pn ? "active" : ""}`}><Link to="#" className="page-link">{pn}</Link></li>
                ))
            }
           
            <li onClick={() => paginate(currentPage === pageNumbers.length ? pageNumbers.length : currentPage + 1)} className="page-item"><Link to="#" className="page-link">Next</Link></li>
        </ul>
    </nav>
  )
}

export default Pagination