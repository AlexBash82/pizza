import React, { useEffect, useState, useContext, useRef } from 'react'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { MyContext } from '../App'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setParam } from '../redux/slices/filterSlices'
import { Categories, categoriesName } from '../components/Cetegories'
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock'
import { Sort, sortList } from '../components/Sort'
import { Skeleton } from '../components/Skeleton'
import { Pagination } from '../components/Pagination/Pagination'
//import allPizzasMas from './assets/pizzas.json'

export const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { searchValue } = useContext(MyContext)
  const [allPizzasMas, setAllPizzasMas] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const currentPage = useSelector((state) => state.filters.openedPage)
  const categoryActId = useSelector(
    (state) => state.filters.activeCategory.index
  )
  const categoryActName = useSelector(
    (state) => state.filters.activeCategory.name
  )
  const sortActStr = useSelector((state) => state.filters.sort.sortProp)
  const firstMount = useRef(true)

  const fetchPizzas = () => {
    setIsLoading(true)
    const category = categoryActId > 0 ? `category=${categoryActId}` : ''
    const sortBy = sortActStr.replace('-', '')
    const order = sortActStr.includes('-') ? 'desc' : 'asc'
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
  }

  //****************если в поисковой строке что то есть - диспатчим это в стэйт
  useEffect(() => {
    if (window.location.search) {
      //console.log('dispatching from search line')
      const params = qs.parse(window.location.search.substring(1))
      const sort = sortList.find((obj) => obj.sortProp === params.sortActStr)
      const activeCategory = categoriesName.find(
        (obj) => obj.index === Number(params.categoryActId)
      )

      dispatch(setParam({ ...params, sort, activeCategory }))
    }
  }, [])

  useEffect(() => {
    //console.log('i am going to back-end')
    fetchPizzas()
    window.scrollTo(0, 0)
  }, [categoryActId, sortActStr, currentPage, searchValue])

  //******************преобразуем данные из стейта в строку и вбиваем в поисовую строку
  useEffect(() => {
    if (!firstMount.current) {
      //console.log('put state in search line')
      const queryString = qs.stringify({
        categoryActId,
        sortActStr,
        currentPage,
      })
      navigate(`?${queryString}`)
    }
    firstMount.current = false
  }, [categoryActId, sortActStr, currentPage])

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
