import React from 'react'

export const Categories = (props) => {
  const { activeIndex, choiseActivIdx } = props

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
        {categoriesName.map((item, idx) => (
          <li
            key={item}
            onClick={() => choiseActivIdx(idx)}
            className={activeIndex === idx ? 'active' : ''}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
