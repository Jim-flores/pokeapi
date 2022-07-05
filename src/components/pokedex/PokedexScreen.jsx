import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Form from './Form'
import PokeCard from './PokeCard'
import Pagination from '../Pagination'

const PokedexScreen = () => {

  const nameUser = useSelector(state => state.nameUser)
  const [currentPage, setCurrentPage] = useState(1)
  const [pokemons, setPokemons] = useState()
  const [pokeSearch, setPokeSearch] = useState()
  const [filterPokemon, setFilterPokemon] = useState()
  const [typeList, setTypeList] = useState()
  const [filterType, setFilterType] = useState('All Pokemons')

  let arrayPokemons = []
  const pokemonsPerPage = 6

  if(filterPokemon){
    if(filterPokemon?.length < pokemonsPerPage){
      arrayPokemons = [...filterPokemon]
    } else {
      const lastPokemon = currentPage * pokemonsPerPage
      arrayPokemons = filterPokemon?.slice(lastPokemon - pokemonsPerPage, lastPokemon)
    }
  }else{
    if(pokemons?.length < pokemonsPerPage){
      arrayPokemons = [...pokemons]
    } else {
      const lastPokemon = currentPage * pokemonsPerPage
      arrayPokemons = pokemons?.slice(lastPokemon - pokemonsPerPage, lastPokemon)
    }
  }


  let arrayPages = []
  let quantityPages
  if(filterPokemon){
    quantityPages = Math.ceil(filterPokemon?.length / pokemonsPerPage)
  }else {
    quantityPages = Math.ceil(pokemons?.length / pokemonsPerPage)
  }

  
  const pagesPerBlock = 5
  let currentBlock = Math.ceil(currentPage / pagesPerBlock)


  if(currentBlock * pagesPerBlock >= quantityPages){
    for(let i = currentBlock * pagesPerBlock - pagesPerBlock + 1; i <= quantityPages ;i++) {
      arrayPages.push(i)
    }
  } else {
    for(let i = currentBlock * pagesPerBlock - pagesPerBlock + 1; i <= currentBlock * pagesPerBlock;i++){
      arrayPages.push(i)
    }
  }


  useEffect(() => {
    if(filterType === 'All Pokemons'){
      // Todos los pokemons
      const URL_POKEMONS = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1154'
      axios.get(URL_POKEMONS)
        .then(res => {
          console.log(res.data.results)
          setPokemons(res.data.results)
        })
        .catch(err => console.log(err))
    } else {
      // Pokemons por tipo
      const URL = `https://pokeapi.co/api/v2/type/${filterType}/`
      axios.get(URL)
        .then(res => {
          console.log(res.data.pokemon)
          const array = res.data.pokemon.map(e => e.pokemon)
          setPokemons(array)
        })
        .catch(err => console.log(err))
    }
  }, [filterType])

  useEffect(() => {
    const URL = 'https://pokeapi.co/api/v2/type/'
    axios.get(URL)
      .then(res => setTypeList(res.data.results))
      .catch(err => console.log(err))
  }, [])
  
  useEffect(() => {
    setFilterPokemon(pokemons?.filter(e => e.name.includes(pokeSearch.toLowerCase())))
  }, [pokeSearch])


  return (
    <div className='main-screen'>
      <h1>Pokedex</h1>
      <h2>Hi {nameUser}, welcome to Pokedex </h2>
      <Form 
        setPokeSearch={setPokeSearch}
        typeList={typeList}
        setFilterType={setFilterType}
      />
      <Pagination
        arrayPages={arrayPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        quantityPages={quantityPages}
      />
      <div className='card-container'>
        {
          filterPokemon ?
            arrayPokemons?.map(pokemon => (
              <PokeCard 
                key={pokemon.url}
                url={pokemon.url}
              />
            ))
          :
            arrayPokemons?.map(pokemon => (
              <PokeCard 
                key={pokemon.url}
                url={pokemon.url}
              />
            ))
        }
      </div>
    </div>
  )
}

export default PokedexScreen