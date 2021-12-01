import React, { useState, useEffect } from 'react';
import './App.css';
import FriendForm from './components/Form';

import schema from './validation/formSchema';
import axios from 'axios';
import * as yup from 'yup';

const initialFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  termsOfService: false,
}

const initialFormErrors ={
  firstName: '',
  lastName: '',
  email: '',
  password: '',
}
const initialFriends = []
const initialDisabled = true

export default function App() {

  const [friends, setFriends] = useState(initialFriends)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

const getBuddies = () => {
  axios.get('https://reqres.in/api/users')
  .then(res => {
    setFriends(res.data);
  }).catch (err => console.error(err))
}
  const postNewBuddy = newPal => {
    axios.post('https://reqres.in/api/users', newPal)
    .then(res => {
      setFriends([res.data, ...friends])
      setFormValues(initialFormValues);
    }).catch(err => {
      console.error(err);
      setFormValues(initialFormValues)
    })
  }

  const validate = (name, value) => {
    yup.reach(schema, name)
    .validate(value)
    .then(() => setFormErrors({ ...formErrors, [name]: ''}))
    .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0] }))
  }

const inputChange = (name, value) => {
  validate(name, value);
  setFormValues({ ...formValues, [name]: value }) 
}

const formSubmit =() => {
  const newFriend = {
    firstName: formValues.firstName.trim(),
    lastName: formValues.lastName.trim(),
    email: formValues.email.trim(),
    password: formValues.password.trim()
  }
  postNewBuddy(newFriend);
}

useEffect (() => {
  getBuddies()
}, [])

useEffect (() => {
  schema.isValid(formValues).then(valid => setDisabled(!valid))
}, [formValues])

  return (
    <div className="App">
      <header className="App-header">
        <h1>User Onboarding App</h1>
      </header>

      <FriendForm
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />


      {/*
        friends.map(friend => {
          return (
            <Friend key={friend.id} details={friend} />
          )
        })
      */}
    </div>
  );
}

