import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { choiseCategoryInd } from '../redux/slices/filterSlices'

export const Categories = () => {
  const dispatch = useDispatch()
  const categoryActId = useSelector((state) => state.filters.activeCategoryInd)

  const categoriesName = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ]

  return (
    <div className="categories">
      <ul>
        {categoriesName.map((item, ind) => (
          <li
            key={item}
            onClick={() => dispatch(choiseCategoryInd(ind))}
            className={categoryActId === ind ? 'active' : ''}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
