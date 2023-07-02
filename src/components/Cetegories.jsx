import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { choiseCategory } from '../redux/slices/filterSlices'

export const Categories = () => {
  const dispatch = useDispatch()
  const categoryActObj = useSelector((state) => state.filters.activeCategory)

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
            onClick={() => dispatch(choiseCategory({ name: item, index: ind }))}
            className={categoryActObj.index === ind ? 'active' : ''}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
