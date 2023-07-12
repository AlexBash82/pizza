import React, { useEffect, useRef } from 'react'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setParam } from '../redux/slices/filterSlices'
import { fetchPizzas } from '../redux/slices/pizzaSlice'
import { Categories, categoriesName } from '../components/Cetegories'
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock'
import { Sort, sortList } from '../components/Sort'
import { Skeleton } from '../components/Skeleton'
import { Pagination } from '../components/Pagination/Pagination'

export const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const allPizzasMas = useSelector((state) => state.pizza.items)
  const fetchStatus = useSelector((state) => state.pizza.status)
  const currentPage = useSelector((state) => state.filters.openedPage)
  const categoryActId = useSelector(
    (state) => state.filters.activeCategory.index
  )
  const categoryActName = useSelector(
    (state) => state.filters.activeCategory.name
  )
  const sortActStr = useSelector((state) => state.filters.sort.sortProp)
  const searchValue = useSelector((state) => state.filters.searchValue)
  const firstMount = useRef(true)

  const getPizzas = () => {
    const category = categoryActId > 0 ? `category=${categoryActId}` : ''
    const sortBy = sortActStr.replace('-', '')
    const order = sortActStr.includes('-') ? 'desc' : 'asc'
    const search = searchValue ? `&search=${searchValue}` : ''

    // fetch(
    //   `https://6494bfc10da866a9536828d5.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    // )
    //   .then((res) => res.json())
    //   .then((json) => {
    //     setAllPizzasMas(json)
    //     setIsLoading(false)
    //   })

    // axios
    //   .get(
    //     `https://6494bfc10da866a9536828d5.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    //   )
    //   .then((res) => {
    //     setAllPizzasMas(res.data)
    //     setIsLoading(false)
    //   })
    //   .catch((err) => {
    //     setIsLoading(false)
    //     console.log(err.message)
    //   })

    // try {
    //   const { data } = await axios.get(
    //     `https://6494bfc10da866a9536828d5.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    //   )
    //   dispatch(getPizzas(data))
    // } catch (err) {
    //   console.log(err.message)
    // } finally {
    //   setIsLoading(false)
    // }

    dispatch(fetchPizzas({ category, sortBy, order, search, currentPage }))
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
    getPizzas()
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
  const errorBlock = (
    <div className="content__error-info">
      <h1>You have error with getting pizzas</h1>
    </div>
  )

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">{categoryActName}</h2>
      {fetchStatus === 'error' ? (
        errorBlock
      ) : (
        <div className="content__items">
          {fetchStatus === 'loading' ? skeletons : pizzas}
        </div>
      )}
      <Pagination />
    </>
  )
}
