import { useState, useEffect } from 'react';
import axios from 'axios';

const Country = ({ country }) => {
  const [weather, setWeather] = useState();
  const [unit, setUnit] = useState();

  const lat = country.latlng[0];
  const lng = country.latlng[1];

  useEffect(() => {
    axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=temperature_2m_max&timezone=GB`,
      )
      .then(res => {
        setWeather(res.data.daily.temperature_2m_max[0]);
        setUnit(res.data.daily_units.temperature_2m_max);
      });
  }, [lat, lng]);

  const languages = Object.values(country.languages);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital[0]}</div>
      <div>area {country.area}</div>
      <h4>languages</h4>
      {languages.map(l => (
        <li key={l}>{l}</li>
      ))}
      <img alt="flag" src={country.flags.png}></img>
      <h3>Weather in {country.capital[0]}</h3>
      <p>
        Temperature {weather} {unit}
      </p>
    </div>
  );
};

const Countries = ({ filtered, setFilter }) => {
  const handleShow = name => {
    setFilter(name.toLowerCase());
  };

  return (
    <div>
      {filtered.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : filtered.length === 1 ? (
        <Country country={filtered[0]} />
      ) : (
        filtered.map(c => (
          <div key={c.name.common}>
            {c.name.common}{' '}
            <button onClick={() => handleShow(c.name.common)}>show</button>
          </div>
        ))
      )}
      {filtered.length === 0 && <div>No matches</div>}
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(res => {
      setCountries(res.data);
    });
  }, []);

  if (!countries) {
    return <div></div>;
  }

  const filtered = countries.filter(c =>
    c.name.common.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div>
      find countries{' '}
      <input value={filter} onChange={e => setFilter(e.target.value)} />
      <Countries filtered={filtered} setFilter={setFilter} />
    </div>
  );
};

export default App;
