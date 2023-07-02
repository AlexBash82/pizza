import React, { useEffect, useState, useContext } from 'react'
import { useSelector } from 'react-redux'
import { MyContext } from '../App'
import axios from 'axios'
import { Categories } from '../components/Cetegories'
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock'
import { Sort } from '../components/Sort'
import { Skeleton } from '../components/Skeleton'
import { Pagination } from '../components/Pagination/Pagination'
//import allPizzasMas from './assets/pizzas.json'

export const Home = () => {
  const { searchValue } = useContext(MyContext)
  const [allPizzasMas, setAllPizzasMas] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  //const [currentPage, setCurrentPage] = useState(1)
  const currentPage = useSelector((state) => state.filters.openedPage)
  const categoryActId = useSelector(
    (state) => state.filters.activeCategory.index
  )
  const categoryActName = useSelector(
    (state) => state.filters.activeCategory.name
  )
  const sortActObj = useSelector((state) => state.filters.sort)

  useEffect(() => {
    setIsLoading(true)
    const category = categoryActId > 0 ? `category=${categoryActId}` : ''
    const sortBy = sortActObj.sortProp.replace('-', '')
    const order = sortActObj.sortProp.includes('-') ? 'desc' : 'asc'
    const search = searchValue ? `&search=${searchValue}` : ''

    // fetch(
    //   `https://6494bfc10da866a9536828d5.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    // )
    //   .then((res) => res.json())
    //   .then((json) => {
    //     //console.log('resieved json', json)
    //     setAllPizzasMas(json)
    //     setIsLoading(false)
    //   })

    axios
      .get(
        `https://6494bfc10da866a9536828d5.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((res) => {
        setAllPizzasMas(res.data)
        setIsLoading(false)
      })

    window.scrollTo(0, 0)
  }, [categoryActId, sortActObj, searchValue, currentPage])

  const skeletons = [...new Array(4)].map((_, idx) => <Skeleton key={idx} />)
  const pizzas = allPizzasMas.map((obj) => <PizzaBlock key={obj.id} {...obj} />)

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">{categoryActName}</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination />
    </>
  )
}
