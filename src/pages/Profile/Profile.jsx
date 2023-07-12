import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styles from './Profile.module.scss'
import axios from 'axios'
import { addPizza } from '../../redux/slices/cartSlices'

export const Profile = () => {
  //const params = useParams()
  // console.log(params)
  const { id } = useParams()
  const dispatch = useDispatch()
  const initial = {
    id: '',
    imageUrl: '',
    title: '',
    types: [0],
    sizes: [26, 40],
    price: 0,
    category: 1,
    rating: 4,
  }
  const [profilePizza, setProfilePizza] = useState(initial)
  const [activeType, setActiveTipe] = useState(profilePizza.types[0])
  const [activeSize, setActiveSize] = useState(profilePizza.sizes[0])
  const cartTotalPizzas = useSelector((state) => state.cart.listCartPizzas)
  const navigate = useNavigate()
  const typesMass = ['тонкое', 'традиционное']

  useEffect(() => {
    async function fetchProfile() {
      try {
        const { data } = await axios.get(
          'https://6494bfc10da866a9536828d5.mockapi.io/pizzas/' + id
        )
        setProfilePizza(data)
      } catch (error) {
        navigate('/')
        alert('error with getting profile')
      }
    }
    fetchProfile()
  }, [])

  const amountPizzas = () => {
    let num = 0
    const index = cartTotalPizzas.findIndex(
      (item) =>
        item.name === profilePizza.title &&
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
      <img
        className={styles.root_image}
        src={profilePizza.imageUrl}
        alt="pizza"
      />
      <div className={styles.block}>
        <h1>{profilePizza.title}</h1>
        <div className={styles.block_text}>
          {profilePizza.types.length === 1 ? (
            <p>
              Для этого вида пиццы мы можем предложить только{' '}
              {typesMass[profilePizza.types[0]]} тесто.
            </p>
          ) : (
            <>
              <p>Вы можете выбрать вариант приготовления пиццы.</p>
              <p>
                Желаете{' '}
                <span
                  className={`${
                    activeType === 0 ? styles.active : styles.textBtn
                  }`}
                  onClick={() => setActiveTipe(0)}
                >
                  {typesMass[profilePizza.types[0]]}
                </span>{' '}
                тесто или{' '}
                <span
                  className={`${
                    activeType === 1 ? styles.active : styles.textBtn
                  }`}
                  onClick={() => setActiveTipe(1)}
                >
                  {typesMass[profilePizza.types[1]]}
                </span>
                ?
              </p>
            </>
          )}
          <ul>
            {profilePizza.sizes.map((size) => (
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
          <div className={styles.root_price}>от {profilePizza.price} ₽</div>
          <div
            className="button button--outline button--add"
            onClick={() =>
              dispatch(
                addPizza({
                  name: profilePizza.title,
                  type: typesMass[activeType],
                  size: activeSize,
                  price: profilePizza.price,
                  items: 1,
                  image: profilePizza.imageUrl,
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
    </div>
  )
}
