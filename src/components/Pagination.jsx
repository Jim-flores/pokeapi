import React, { useRef, useState } from 'react'

const Pagination = ({arrayPages, currentPage, setCurrentPage, quantityPages}) => {
    const listNumber = useRef()

    const prevPage = () => {
      if(currentPage - 1 === 0) {
        setCurrentPage(quantityPages)
      } else {
        setCurrentPage(currentPage - 1)
      }
    }
  
    const nextPage = () => {
      if(currentPage + 1 > quantityPages) {
        setCurrentPage(1)
      } else {
        setCurrentPage(currentPage + 1)
      }
    }
  
    const changePageTo = n => setCurrentPage(n)
  
    return (
      <div className='pagination-container'>
        
        <ul ref={listNumber} className='pagination-number-container'>
            <li onClick={prevPage} className='pagination-prev-next'>&laquo;</li>
          {
            arrayPages?.map(num => (
              <li 
                onClick={() => changePageTo(num)} 
                key={num} 
                className={currentPage === num ? `page-number page-active` : `page-number`}
              >{num}</li>
            ))
          }
          <li onClick={nextPage} className='pagination-prev-next'>&raquo;</li>
        </ul>

      </div>
    )
}

export default Pagination