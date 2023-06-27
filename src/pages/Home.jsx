import { useEffect, useState } from 'react'
import { Categories } from '../components/Cetagories'
import { PizzaBlock } from '../components/PizzaBlock'
import { Sort } from '../components/Sort'
import { Skeleton } from '../components/Skeleton'
//import allPizzasMas from './assets/pizzas.json'

export const Home = () => {
  const [allPizzasMas, setAllPizzasMas] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('https://6494bfc10da866a9536828d5.mockapi.io/pizzas')
      .then((res) => res.json())
      .then((json) => {
        setAllPizzasMas(json)
        setIsLoading(false)
      })
  }, [])

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
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
