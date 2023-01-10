import { useState } from 'react'

const Filter = ({filter, setFilter}) => <div>filter shown with <input value={filter} onChange={(e) => setFilter(e.target.value)} /></div>

const Persons = ({persons, filter}) => {
  if (filter.length) {
    return (
      persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase())).map((p, i) => <div key={i}>{p.name} {p.phone && p.phone}</div>)
    )
  }

  return persons.map((p, i) => <div key={i}>{p.name} {p.phone && p.phone}</div>)
}

const PersonForm = (props) => (
  <form>
    <div>
      <div>name: <input value={props.newName} onChange={(e) => props.setNewName(e.target.value)} /></div>
      <div>number: <input value={props.newNumber} onChange={(e) => props.setNewNumber(e.target.value)} /></div>
    </div>
    <div>
      <button onClick={props.handleSubmit} type="submit">add</button>
    </div>
  </form>
)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (persons.map(p => p.name).filter(p => p === newName).length !== 0) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    } else {
      setPersons([...persons, {name: newName, phone: newNumber, id: persons[persons.length - 1].id + 1}])
      setNewName('')
      setNewNumber('')
    }
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter}/>
      <h2>Add a new</h2>
      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} handleSubmit={handleSubmit}/>
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons}/>
    </div>
  )
}

export default App