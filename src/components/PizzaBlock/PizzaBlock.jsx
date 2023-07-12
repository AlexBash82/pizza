import React, { useState } from 'react'
import styles from './PizzaBlock.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { addPizza } from '../../redux/slices/cartSlices'
import { Link } from 'react-router-dom'

export const PizzaBlock = (props) => {
  const { title, price, imageUrl, sizes, types, id } = props
  const dispatch = useDispatch()
  const cartTotalPizzas = useSelector((state) => state.cart.listCartPizzas)
  const typesMass = ['тонкое', 'традиционное']
  const [activeType, setActiveTipe] = useState(types[0])
  const [activeSize, setActiveSize] = useState(sizes[0])

  const amountPizzas = () => {
    let num = 0
    const index = cartTotalPizzas.findIndex(
      (item) =>
        item.name === title &&
        item.type === typesMass[activeType] &&
        item.size === activeSize
    )
    if (index >= 0) {
      num = cartTotalPizzas[index].items
    }
    return num
  }

  return (
    <div className={styles.root}>
      <Link to={`/profile/${id}`}>
        <img className={styles.root_image} src={imageUrl} alt="Pizza" />
        <h4 className={styles.root_title}>{title}</h4>
      </Link>
      <div className={styles.root_selector}>
        <ul>
          {types.map((type) => (
            <li
              key={type}
              className={`${activeType === type ? styles.active : ''}`}
              onClick={() => setActiveTipe(type)}
            >
              {typesMass[type]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size) => (
            <li
              key={size}
              className={`${activeSize === size ? styles.active : ''}`}
              onClick={() => setActiveSize(size)}
            >
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.root_bottom}>
        <div className={styles.root_price}>от {price} ₽</div>
        <div
          className="button button--outline button--add"
          onClick={() =>
            dispatch(
              addPizza({
                name: title,
                type: typesMass[activeType],
                size: activeSize,
                price: price,
                items: 1,
                image: imageUrl,
              })
            )
          }
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {amountPizzas() > 0 && <i>{amountPizzas()}</i>}
        </div>
      </div>
    </div>
  )
}
