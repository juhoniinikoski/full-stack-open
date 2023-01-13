import { useState, useEffect } from 'react'
import personService from './services/persons'

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  if (type === 'error') {
    return (
      <div style={{padding: 16, backgroundColor: 'red'}}>
        {message}
      </div>
    )
  }

  return (
    <div style={{padding: 16, backgroundColor: 'green'}}>
      {message}
    </div>
  )
}

const Filter = ({filter, setFilter}) => <div>filter shown with <input value={filter} onChange={(e) => setFilter(e.target.value)} /></div>

const Persons = ({persons, filter, deletePerson}) => {
  if (filter.length) {
    return (
      persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase())).map((p, i) => <div key={i}>{p.name} {p.number && p.number} <button onClick={() => deletePerson(p.id)}>delete</button></div>)
    )
  }

  return persons.map((p, i) => <div key={i}>{p.name} {p.number && p.number} <button onClick={() => deletePerson(p.id)}>delete</button></div>)
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
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [alertMessage, setAlertMessage] = useState({message: null, type: 'error'})

  useEffect(() => {
    personService
      .getAll()
      .then((res) => {
        setPersons(res.data)
      })
  }, [])

  const addPerson = () => {
    const personObject = {
      name: newName,
      number: newNumber
    }
  
    personService
      .create(personObject)
      .then(res => {
        setPersons([...persons, personObject])
        setNewName('')
        setNewNumber('')
        personService
          .getAll()
          .then((res) => {
            setPersons(res.data)
          })
        setAlertMessage({
          message: `${newName} added to phonebook succesfully`,
          type: 'success'
        })
        setTimeout(() => {
          setAlertMessage({message: null, type: 'error'})
        }, 3000)
      })
  }

  const updatePerson = () => {
    const personObject = {
      name: newName,
      number: newNumber
    }

    const id = persons.find(p => p.name === personObject.name).id
    const index = persons.map(p => p.name).indexOf(personObject.name)
  
    personService
      .update(id, personObject)
      .then(res => {
        const newData = [...persons]
        newData[index].number = personObject.number
        setPersons(newData)
        setNewName('')
        setNewNumber('')
        setAlertMessage({
          message: `${newName} updated succesfully`,
          type: 'success'
        })
        setTimeout(() => {
          setAlertMessage({message: null, type: 'error'})
        }, 3000)
      })
  }

  const deletePerson = (id) => {
    const name = persons.find(p => p.id === id).name
    if (window.confirm(`Do you really want to delete user ${name}?`)) {
      personService
        .delete(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          setAlertMessage({
            message: `${name} deleted succesfully`,
            type: 'success'
          })
          setTimeout(() => {
            setAlertMessage({message: null, type: 'error'})
          }, 3000)
        })
        .catch(() => {
          setPersons(persons.filter(p => p.id !== id))
          setAlertMessage({
            message: `${name} was already deleted`,
            type: 'error'
          })
          setTimeout(() => {
            setAlertMessage({message: null, type: 'error'})
          }, 3000)
        })
      }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (persons.map(p => p.name).filter(p => p === newName).length !== 0) {
      if (newNumber.length) {
        if ((window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))) {
          updatePerson()
        }
      } else {
        setAlertMessage({
          message: `${newName} is already added to phonebook`,
          type: 'error'
        })
        setTimeout(() => {
          setAlertMessage({message: null, type: 'error'})
        }, 3000)
        setNewName('')
        setNewNumber('')
      }
    } else {
      addPerson()
    }
    
  }

  return (
    <div>
      <Notification message={alertMessage.message} type={alertMessage.type}/>
      <h2>numberbook</h2>
      <Filter filter={filter} setFilter={setFilter}/>
      <h2>Add a new</h2>
      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} handleSubmit={handleSubmit}/>
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App