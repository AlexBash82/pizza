import React from 'react'
import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.scss'

export const Pagination = (props) => {
  const { setCurrentPage } = props
  return (
    <div className={styles.root}>
      <ReactPaginate
        className={styles.component}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => setCurrentPage(++event.selected)}
        //pageRangeDisplayed={15}
        pageCount={3}
        //pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  )
}
