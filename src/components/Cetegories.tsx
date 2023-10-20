import React from 'react'
import { useAppDispatch, useAppSelector } from '../hook'
import { choiseCategory } from '../redux/filter/filterSlice'
//import { useWhyDidYouUpdate } from 'ahooks'

export const categoriesName = [
  { name: 'Все', index: 0 },
  { name: 'Мясные', index: 1 },
  { name: 'Вегетарианская', index: 2 },
  { name: 'Гриль', index: 3 },
  { name: 'Острые', index: 4 },
  { name: 'Закрытые', index: 5 },
]

export const Categories: React.FC = () => {
  const dispatch = useAppDispatch()
  const categoryActObj = useAppSelector((state) => state.filters.activeCategory)
  //useWhyDidYouUpdate('Categories', categoryActObj)

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
