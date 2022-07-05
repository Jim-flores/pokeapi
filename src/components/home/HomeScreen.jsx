import React from 'react'
import { useNavigate } from 'react-router-dom'
import InputHome from './InputHome'

const HomeScreen = ({setIsLogged}) => {
  const navigate = useNavigate()
  const clickLogged = () => {
    setIsLogged(true)
    
  }

  return (
    <div className='home'>
      <div className='home-card'>
        <h1>Pokedex</h1>
        <h2>¡Hola Entrenador!</h2>
        <InputHome clickLogged = {clickLogged} />
      </div>
    </div>
  )
}

export default HomeScreen