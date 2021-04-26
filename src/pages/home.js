import { useState, useEffect } from 'react'
import axios from 'axios'

const Home = () => {
  const [generationList, setGenerationList] = useState(undefined)
  const [pokemonListInfo, setPokemonListInfo] = useState([])
  const [loadedPokemonList, setLoadedPokemonList] = useState(false)
  const [generation, setGeneration] = useState(1)

  useEffect(() => {
    setGenerationList(undefined)
    setPokemonListInfo(undefined)
    setLoadedPokemonList(false)
    axios.get(`${process.env.REACT_APP_POKEMON_API}generation/${generation}`).then(res => setGenerationList(res.data.pokemon_species))
  }, [generation])

  useEffect(() => {
    setLoadedPokemonList(false)
    setPokemonListInfo([])
    if (generationList === undefined) return

    generationList.forEach(pokemon =>
      axios.get(pokemon.url).then(res => setPokemonListInfo(pokemonListInfo => [...pokemonListInfo, res.data])
      )
    )

  }, [generationList])

  useEffect(() => {
    setLoadedPokemonList(false)
    if (pokemonListInfo === undefined || generationList === undefined) return

    if (pokemonListInfo.length !== generationList.length) return

    const orderedPokemons = pokemonListInfo.sort((a, b) => {
      if (a.id > b.id) return 1

      return -1
    })

    setLoadedPokemonList(true)
    setPokemonListInfo(orderedPokemons)
    console.log(pokemonListInfo);
  }, [pokemonListInfo, generationList])

  const changeGeneration = (e) => {
    let { value } = e.target;
    setGeneration(value)
  }

  return (
    <div>
      <select value={generation} onChange={changeGeneration}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
        <option value={7}>7</option>
        <option value={8}>8</option>
      </select>
      {!loadedPokemonList && <h1>Loading</h1>}

      {loadedPokemonList && pokemonListInfo.map((pokemon) => (<p key={pokemon.name}>{pokemon.name}</p>))}

    </div>
  )
}

export default Home
