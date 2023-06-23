import './App.css'
import {useEffect, useState} from "react";

function useAnimals() {

  const [animals, setAnimals] = useState([])

  useEffect(() => {
    const lastQuery = localStorage.getItem('lastQuery')
    search(lastQuery).then(() => console.log('searched'))
  }, [])

  const search = async (q) => {
    const response = await fetch(
      'http://localhost:8080?' + new URLSearchParams({ q })
    )
    const data = await response.json()
    setAnimals(data)

    localStorage.setItem('lastQuery', q)
  }

  return {search, animals}
}

function App() {

  const { search, animals } = useAnimals()

  return (
    <main>
      <h1>Animal Farm</h1>

      <input
        type={"text"}
        placeholder={"Search"}
        onChange={(e) => search(e.target.value)}
      />

      <ul>
        {animals.map((animal) => (
          <Animal key={animal.id} {...animal} />
        ))}
      </ul>

      {animals.length === 0 && 'No animals Found'}

    </main>
  )
}

// eslint-disable-next-line react/prop-types
function Animal({type, name, age}) {
  return (
    <li>
      <strong>{type}</strong> {name} | {age}
    </li>
  )
}

export default App
