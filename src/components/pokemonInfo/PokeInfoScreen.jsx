import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const PokeInfoScreen = () => {

  const [pokemonInfo, setPokemonInfo] = useState()

  const {id} = useParams()
  console.log(id)
  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`
    axios.get(URL)
      .then(res => setPokemonInfo(res.data))
      .catch(err => console.log(err))
  }, [])
  console.log(pokemonInfo)
  return (
    <article>
      <h1>{pokemonInfo?.name}</h1>
      <div className='content-img'>
        <img src={pokemonInfo?.sprites.other[`official-artwork`].front_default} alt="" />
      </div>
      <h2>Type</h2>
      <div className='type'>
        
        {
          pokemonInfo?.types.map(types => (
            <div className='types'>
              <label key={types.type.url}>{types.type.name}</label>
            </div>
          ))
        }
      </div>
      <h2>Abilityes</h2>
      <div className='ability'>
        {
          pokemonInfo?.abilities.map(hability => (
            <div className='abilities'>
              <label key={hability.ability.url}>{hability.ability.name}</label>
            </div>
          ))
        }
      </div>
      <div className='moves'>
        <div className='movements'>
          <h2>Movements</h2>
          <ul>
            {
              pokemonInfo?.moves.map(move => (
                <li key={move.move.url}>{move.move.name}</li>
              ))
            }
          </ul>
        </div>
      </div>
    </article>
  )
}

export default PokeInfoScreen