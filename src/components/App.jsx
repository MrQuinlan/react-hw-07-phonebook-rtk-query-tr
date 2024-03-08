import Section from './Section';
import ContactForm from './ContactForm';
import Contacts from './Contacts';
import Filter from './Filter';
import {
  useGetContactsQuery,
  useAddContactMutation,
  useRemoveContactMutation,
} from 'Service/ContactsAPI';
import { useSelector, useDispatch } from 'react-redux';
import { setFilterValue } from '../redux/slices/filterSlice';

const App = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector(state => state.filter);
  const [addContact] = useAddContactMutation();
  const [removeContact] = useRemoveContactMutation();

  const { data: contacts = [] } = useGetContactsQuery('contacts');

  const onAddContact = ({ name, number, e }) => {
    e.preventDefault();

    const newContact = onCheckContact(name.toLowerCase());

    if (newContact) {
      return alert(`${name} is already in contacts`);
    }

    const contact = { name: name, phone: number };

    addContact(contact);
  };

  const onCheckContact = value => {
    return contacts.some(({ name }) => name.toLocaleLowerCase() === value);
  };

  const onFilterContacts = () => {
    if (!contacts) {
      return;
    }

    return contacts.filter(({ name }) =>
      name.toLocaleLowerCase().includes(filterValue)
    );
  };

  const onRemoveContact = contactId => {
    removeContact(contactId);
  };

  return (
    <Section>
      <ContactForm onAddContact={onAddContact} />

      {contacts.length > 0 && (
        <Filter
          label="Find contacts by name"
          value={filterValue}
          onSearchContacts={e =>
            dispatch(setFilterValue(e.currentTarget.value.toLowerCase()))
          }
        />
      )}

      {contacts.length > 0 && (
        <Contacts
          contacts={onFilterContacts()}
          onRemoveContact={onRemoveContact}
        />
      )}
    </Section>
  );
};

export default App;
