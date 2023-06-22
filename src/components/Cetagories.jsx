import React, { useState } from 'react'

export const Categories = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const categoriesName = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ]

  const choiseActivIdx = (index) => {
    setActiveIndex(index)
  }

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
