import { useEffect, useState } from 'react'
import { Categories } from '../components/Cetagories'
import { PizzaBlock } from '../components/PizzaBlock'
import { Sort } from '../components/Sort'
import { Skeleton } from '../components/Skeleton'
//import allPizzasMas from './assets/pizzas.json'

export const Home = () => {
  const [allPizzasMas, setAllPizzasMas] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [categoryActId, setCategoryActId] = useState(0)
  const [sortActObj, setSortActObj] = useState({
    name: 'популярности',
    sortProp: 'rating',
  })

  useEffect(() => {
    setIsLoading(true)

    const category = categoryActId > 0 ? `category=${categoryActId}` : ''
    const sortBy = sortActObj.sortProp.replace('-', '')
    const order = sortActObj.sortProp.includes('-') ? 'desc' : 'asc'

    fetch(
      `https://6494bfc10da866a9536828d5.mockapi.io/pizzas?${category}&sortBy=${sortBy}&order=${order}`
    )
      .then((res) => res.json())
      .then((json) => {
        setAllPizzasMas(json)
        setIsLoading(false)
      })
    window.scrollTo(0, 0)
  }, [categoryActId, sortActObj])

  return (
    <>
      <div className="content__top">
        <Categories
          activeIndex={categoryActId}
          choiseActivIdx={(ind) => setCategoryActId(ind)}
        />
        <Sort
          activeObj={sortActObj}
          choiseActivObj={(obj) => setSortActObj(obj)}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, idx) => <Skeleton key={idx} />)
          : allPizzasMas.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </>
  )
}
