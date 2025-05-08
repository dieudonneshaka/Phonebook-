import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas', number: '040-123456' },
    { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
    { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
    { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');  
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  const changeName = (event) => {
    setNewName(event.target.value);
  };

  const changeNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const addName = (event) => {
    event.preventDefault();

    const personExists = persons.some(person => person.name === newName);
    
    // If the person already exists, alert the details with the existing number
    if (personExists) {
      const existingPerson = persons.find(person => person.name === newName);
      alert(`${newName} is already added to phonebook. Replace the old number with the new one: ${existingPerson.number}`);
      return;
    }

    // Create a new person object and add to the persons array
    const newPerson = {
      id: persons.length + 1, // Create a unique id
      name: newName,
      number: newNumber
    };

    setPersons(persons.concat(newPerson)); 
    
    // Show an alert with the name and number of the newly added person
    alert(`${newName} is already added to the phonebook ${newNumber}`);

    setNewName('');
    setNewNumber('');
  };

  // Filter persons based on the search query
  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  const deletePerson = (id) => {
    // Show a confirmation alert before deleting the person
    const confirmed = window.confirm("delete" + persons.find(person => person.id === id).name + "?");
      '';
    if (confirmed) {
      const updatedPersons = persons.filter(person => person.id !== id);
      setPersons(updatedPersons);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      

      {/* Search input field */}
      <div>
        Search: 
        <input 
          type="text" 
          value={search} 
          onChange={handleSearchChange} 
          placeholder="Search for a name..."
        />
      </div>

      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={changeName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={changeNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h3>Numbers</h3>
      <ul>
        {filteredPersons.length === 0 ? (
          <li>No matching names found</li>
        ) : (
          filteredPersons.map((person) => (
            <li key={person.id}>
              {person.name} {person.number}
              <button onClick={() => deletePerson(person.id)}>Delete</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default App;
