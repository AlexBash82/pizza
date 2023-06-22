import { Categories } from './components/Cetagories'
import { Header } from './components/Header'
import { PizzaBlock } from './components/PizzaBlock'
import { Sort } from './components/Sort'
import './scss/app.scss'
import allPizzasMas from './assets/pizzas.json'

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {allPizzasMas.map((obj) => (
              <PizzaBlock {...obj} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
