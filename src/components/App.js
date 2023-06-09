import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectItems,
  selectFilter,
  selectError,
  selectIsLoading,
} from 'redux/selectors';
import { fetchContacts } from 'redux/operations';

import AddContacts from './addContact/AddContact';
import Contacts from './contacts/Contacts';
import Filter from './filter/Filter';

export const App = () => {
  const filter = useSelector(selectFilter);
  const contacts = useSelector(selectItems);
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const setFilteredArr = () => {
    if (filter.length > 0) {
      const newArr = contacts.filter(item =>
        item.name.toLowerCase().includes(filter.toLowerCase())
      );

      return newArr;
    }
  };

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <h3>error</h3>;
  }

  return (
    <div style={{ marginLeft: '20px' }}>
      <h2>Phonebook</h2>
      <AddContacts />

      <h2>Contacts</h2>
      <Filter setFilteredArr={setFilteredArr} />
      <Contacts setFilteredArr={setFilteredArr} />
    </div>
  );
};
