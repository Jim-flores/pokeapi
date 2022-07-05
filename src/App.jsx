import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomeScreen from './components/home/HomeScreen'
import PokedexScreen from './components/pokedex/PokedexScreen'
import PokeInfoScreen from './components/pokemonInfo/PokeInfoScreen'
import ProtectedRoutes from './components/ProtectedRoutes'

function App() {
  const [isLogged, setIsLogged] = useState(false)

  return (
    <div className="App">
      <Routes>
        <Route path='/home' element={<HomeScreen setIsLogged = {setIsLogged}/>} />
        <Route element={<ProtectedRoutes isLogged = {isLogged}/>}>
          <Route path='/pokedex' element={<PokedexScreen />} />
          <Route path='/pokedex/:id' element={<PokeInfoScreen />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App