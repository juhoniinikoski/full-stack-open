import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({country}) => {
  const languages = Object.values(country.languages);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital[0]}</div>
      <div>area {country.area}</div>
      <h4>languages</h4>
      {languages.map(l => <li>{l}</li>)}
      <img src={country.flags.png}></img>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(res => {
      setCountries(res.data)
    })
  }, [])

  if (!countries) {
    return <div></div>
  }

  const filtered = countries.filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      find countries <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      {filtered.length > 10 ?
      <div>Too many matches, specify another filter</div>
      : filtered.length === 1 ? <Country country={filtered[0]} />
      : filtered.map(c => <div key={c.name.common}>{c.name.common}</div>)}
      {filtered.length === 0 && <div>No matches</div>}
    </div>
  )
}

export default App