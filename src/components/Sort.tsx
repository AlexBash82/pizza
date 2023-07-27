import React, { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hook'
import { choiseSortObj } from '../redux/filter/filterSlice'

type TSortItem = {
  name: string
  sortProp: 'rating' | '-rating' | 'price' | '-price' | 'title' | '-title'
}

export const sortList: TSortItem[] = [
  { name: 'популярности возр', sortProp: 'rating' },
  { name: 'популярности убыв', sortProp: '-rating' },
  { name: 'цене возр', sortProp: 'price' },
  { name: 'цене убыв', sortProp: '-price' },
  { name: 'алфавиту возр', sortProp: 'title' },
  { name: 'алфавиту убыв', sortProp: '-title' },
]

export const Sort: React.FC = () => {
  const dispatch = useAppDispatch()
  const sortActObj = useAppSelector((state) => state.filters.sort)
  const [isOpen, setIsOpen] = useState(false)
  const sortRef = useRef<HTMLDivElement>(null)

  const choiseActive = (obj: TSortItem) => {
    dispatch(choiseSortObj(obj))
    setIsOpen(false)
  }

  useEffect(() => {
    const clickOutside = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setIsOpen(false)
      }
    }

    document.body.addEventListener('click', clickOutside)

    return () => document.body.removeEventListener('click', clickOutside)
  }, [])

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsOpen(!isOpen)}>{sortActObj.name}</span>
      </div>
      {isOpen && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj) => (
              <li
                key={obj.name}
                className={sortActObj.name === obj.name ? 'active' : ''}
                onClick={() => choiseActive(obj)}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
