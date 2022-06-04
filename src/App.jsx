// src/App.js
import './App.css';
import { useState } from 'react';
import ContactsArr from './contacts.json';

function App() {
  const [contacts, setContacts] = useState(ContactsArr.slice(0, 5));

  const addContact = () => {
    if (contacts.length !== ContactsArr.length) {
      const randomContact =
        ContactsArr[Math.floor(Math.random() * ContactsArr.length)];
      contacts.includes(randomContact)
        ? addContact()
        : setContacts([randomContact, ...contacts]);
    }
  };

  const sortByName = () => {
    const contactsCopy = [...contacts];
    setContacts(contactsCopy.sort((a, b) => (a.name > b.name ? 1 : -1)));
  };

  const sortByPopularity = () => {
    const contactsCopy = [...contacts];
    setContacts(
      contactsCopy.sort((a, b) => (a.popularity > b.popularity ? 1 : -1))
    );
  };

  const deleteContact = (id) => {
    const contactsCopy = [...contacts];
    setContacts(
      contactsCopy.filter((contact) => {
        return contact.id !== id;
      })
    );
  };

  // Personal bonus

  const wonAnOscar = (id) => {
    const contactsCopy = [...contacts];
    setContacts(
      contactsCopy.filter((a) => {
        return a.wonOscar ? a.id !== id : a.id === id;
      })
    );
  };

  return (
    <div className='App'>
      <div>
        <button onClick={addContact}>Add random contact</button>
      </div>

      <div>
        <button onClick={() => sortByName('name')}>Sort by Name</button>
        <button onClick={() => sortByPopularity('popularity')}>
          Sort by Popularity
        </button>
        <button onClick={() => wonAnOscar('wonOscar')}>Oscar Winners</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => {
            return (
              <tr key={contact.id}>
                <td>
                  <img
                    src={contact.pictureUrl}
                    alt='profile pic'
                    width='75px'
                  />
                </td>
                <td>{contact.name}</td>
                <td>{contact.popularity.toFixed(2)}</td>
                <td>{contact.wonOscar ? 'Yes' : 'No'}</td>
                <td>{contact.wonEmmy ? 'Yes' : 'No'}</td>
                <td>
                  <button onClick={() => deleteContact(contact.id)}>
                    Delete contact
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default App;
