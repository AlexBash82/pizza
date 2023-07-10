import React, { useCallback, useRef, useState, useContext } from 'react'
import debounce from 'lodash.debounce'
import styles from './Search.module.scss'
import { useDispatch } from 'react-redux'
import { setSearchValue } from '../../redux/slices/filterSlices'

export const Search = () => {
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef()

  const clearInput = () => {
    setInputValue('')
    dispatch(setSearchValue(''))
    inputRef.current.focus()
  }

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str))
    }, 1000),
    []
  )

  const changeInputValue = (value) => {
    setInputValue(value)
    updateSearchValue(value)
  }

  return (
    <div className={styles.root}>
      <svg
        className={styles.iconFind}
        enableBackground="new 0 0 32 32"
        id="Filled_Line"
        version="1.1"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="14" cy="14" fill="#F9ED69" id="XMLID_904_" r="9" />
        <path
          d="M16,22c-4.971,0-9-4.029-9-9c0-3.111,1.578-5.852,3.977-7.469C7.496,6.774,5,10.091,5,14  c0,4.971,4.029,9,9,9c1.86,0,3.588-0.565,5.023-1.531C18.077,21.806,17.062,22,16,22z"
          fill="#BBB24F"
          id="XMLID_410_"
        />
        <path
          d="M14,5c-2.996,0-5.643,1.47-7.279,3.721C8.205,7.643,10.025,7,12,7c4.971,0,9,4.029,9,9  c0,1.975-0.643,3.795-1.721,5.279C21.53,19.643,23,16.996,23,14C23,9.029,18.971,5,14,5z"
          fill="#FBF4A5"
          id="XMLID_411_"
        />
        <circle
          cx="14"
          cy="14"
          fill="none"
          id="XMLID_899_"
          r="9"
          stroke="#200F60"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <path
          d="  M15.996,8.341c1.702,0.602,3.054,1.952,3.659,3.653"
          fill="none"
          id="XMLID_417_"
          stroke="#FFFFFF"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <line
          fill="none"
          id="XMLID_898_"
          stroke="#200F60"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          x1="27"
          x2="20.366"
          y1="27"
          y2="20.366"
        />
      </svg>
      <input
        ref={inputRef}
        value={inputValue}
        onChange={(event) => changeInputValue(event.target.value)}
        className={styles.input}
        placeholder="Search pizza..."
      />
      {inputValue && (
        <svg
          className={styles.iconClose}
          onClick={() => clearInput()}
          data-name="Livello 1"
          id="Livello_1"
          viewBox="0 0 128 128"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title />
          <path d="M64,0a64,64,0,1,0,64,64A64.07,64.07,0,0,0,64,0Zm0,122a58,58,0,1,1,58-58A58.07,58.07,0,0,1,64,122Z" />
          <path d="M92.12,35.79a3,3,0,0,0-4.24,0L64,59.75l-23.87-24A3,3,0,0,0,35.88,40L59.76,64,35.88,88a3,3,0,0,0,4.25,4.24L64,68.25l23.88,24A3,3,0,0,0,92.13,88L68.24,64,92.13,40A3,3,0,0,0,92.12,35.79Z" />
        </svg>
      )}
    </div>
  )
}
