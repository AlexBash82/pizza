import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { choiseCategory } from '../redux/slices/filterSlices'

export const categoriesName = [
  { name: 'Все', index: 0 },
  { name: 'Мясные', index: 1 },
  { name: 'Вегетарианская', index: 2 },
  { name: 'Гриль', index: 3 },
  { name: 'Острые', index: 4 },
  { name: 'Закрытые', index: 5 },
]

export const Categories = () => {
  const dispatch = useDispatch()
  const categoryActObj = useSelector((state) => state.filters.activeCategory)

  return (
    <div className="categories">
      <ul>
        {categoriesName.map((obj) => (
          <li
            key={obj.index}
            onClick={() => dispatch(choiseCategory(obj))}
            className={categoryActObj.index === obj.index ? 'active' : ''}
          >
            {obj.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
