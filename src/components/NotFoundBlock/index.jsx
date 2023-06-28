import React from 'react'
import styles from './NotFoundBlock.module.scss'

export const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Упс... ничего не найдено
      </h1>
      <p className={styles.description}>error 404</p>
    </div>
  )
}
