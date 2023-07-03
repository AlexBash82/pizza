import React from 'react'
import { useDispatch } from 'react-redux'
import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.scss'
import { switchOpenedPage } from '../../redux/slices/filterSlices'

export const Pagination = () => {
  const dispatch = useDispatch()

  return (
    <div className={styles.root}>
      <ReactPaginate
        className={styles.component}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => dispatch(switchOpenedPage(++event.selected))}
        //pageRangeDisplayed={15}
        pageCount={3}
        //pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  )
}