import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.scss'
import { switchOpenedPage } from '../../redux/filter/filterSlice'
import { RootState } from '../../redux/store'

export const Pagination: React.FC = () => {
  const openedPage = useSelector((state: RootState) => state.filters.openedPage)
  const dispatch = useDispatch()

  return (
    <div className={styles.root}>
      <ReactPaginate
        className={styles.component}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => dispatch(switchOpenedPage(++event.selected))}
        pageCount={3}
        previousLabel="<"
        forcePage={openedPage - 1}
        renderOnZeroPageCount={null}
      />
    </div>
  )
}
