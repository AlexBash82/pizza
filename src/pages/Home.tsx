import React, { useEffect, useRef } from 'react'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hook'
import { setParam } from '../redux/filter/filterSlice'
import { fetchPizzas } from '../redux/pizza/asyncActions'

import {
  PizzaBlock,
  Categories,
  categoriesName,
  Sort,
  sortList,
  Skeleton,
  Pagination,
} from '../components'

export const Home: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const allPizzasMas = useAppSelector((state) => state.pizza.items)
  const fetchStatus = useAppSelector((state) => state.pizza.status)
  const openedPage = useAppSelector((state) => state.filters.openedPage)
  const categoryActId = useAppSelector(
    (state) => state.filters.activeCategory.index
  )
  const categoryActName = useAppSelector(
    (state) => state.filters.activeCategory.name
  )
  const sortActStr = useAppSelector((state) => state.filters.sort.sortProp)
  const searchValue = useAppSelector((state) => state.filters.searchValue)
  const firstMount = useRef(true)

  const getPizzas = () => {
    const category = categoryActId > 0 ? `category=${categoryActId}` : ''
    const sortBy = sortActStr.replace('-', '')
    const order = sortActStr.includes('-') ? 'desc' : 'asc'
    const search = searchValue ? `&search=${searchValue}` : ''

    // *****вариант с fetch
    //
    // fetch(
    //   `https://6494bfc10da866a9536828d5.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    // )
    //   .then((res) => res.json())
    //   .then((json) => {
    //     setAllPizzasMas(json)
    //     setIsLoading(false)
    //   })

    // *****вариант с axios
    //
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

    // *****вариант с axios ant try-catch
    //
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

    // *****вариант с выносом функции в redux: fetchPizzas()
    //
    dispatch(fetchPizzas({ category, sortBy, order, search, openedPage }))
  }

  //****************если в поисковой строке что то есть - диспатчим это в стэйт
  useEffect(() => {
    if (window.location.search) {
      //console.log('dispatching from search line')
      const sortDefault = {
        name: 'популярности возр',
        sortProp: 'rating',
      }
      const activeCategoryDefault = {
        name: 'Все',
        index: 0,
      }

      const params = qs.parse(window.location.search.substring(1))
      const sort =
        sortList.find((obj) => obj.sortProp === params.sortActStr) ||
        sortDefault
      const activeCategory =
        categoriesName.find(
          (obj) => obj.index === Number(params.categoryActId)
        ) || activeCategoryDefault
      const openedPage = Number(params.openedPage) || 1
      const searchValue = params.searchValue?.toString() || ''
      dispatch(setParam({ openedPage, sort, activeCategory, searchValue }))
    }
  }, [])

  useEffect(() => {
    //console.log('i am going to back-end')
    getPizzas()
    window.scrollTo(0, 0)
  }, [categoryActId, sortActStr, openedPage, searchValue])

  //******************преобразуем данные из стейта в строку и вбиваем в поисовую строку
  useEffect(() => {
    if (!firstMount.current) {
      //console.log('put state in search line')
      const queryString = qs.stringify({
        categoryActId,
        sortActStr,
        openedPage,
      })
      navigate(`?${queryString}`)
    }
    firstMount.current = false
  }, [categoryActId, sortActStr, openedPage])

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
