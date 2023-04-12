import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addContact } from 'redux/operations';
import { selectItems } from 'redux/selectors';

import css from './addContact.module.css';

const AddContacts = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();
  const contacts = useSelector(selectItems);

  const changeInput = e => {
    if (e.target.name === 'name') {
      setName(e.target.value);
    } else if (e.target.name === 'number') setNumber(e.target.value);
  };

  const onSubmitForm = e => {
    e.preventDefault();

    if (name.trim() === '') {
      return;
    } else if (contacts.some(item => item.name === name.trim())) {
      alert(`${name.trim()} is already in contacts`);
      return;
    } else {
      dispatch(addContact([name, number]));
      resetForm();
    }
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <div>
      <form onSubmit={onSubmitForm} className={css['add-form']}>
        <label className={css['add-form__label']}>
          Name
          <input
            className={css['add-form__input']}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={changeInput}
          />
        </label>

        <label className={css['add-form__label']}>
          Number
          <input
            className={css['add-form__input']}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={changeInput}
          />
        </label>

        <button type="submit" className={css['add-form__btn']}>
          Add contact
        </button>
      </form>
    </div>
  );
};

export default AddContacts;
