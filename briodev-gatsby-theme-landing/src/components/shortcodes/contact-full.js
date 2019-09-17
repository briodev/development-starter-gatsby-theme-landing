import React, { useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled'

export default () => {

  const [formValid, setFormValid] = useState(false)

  const [firstName, setFirstName] = useState({
    value: '',
    touched: false,
    pristine: true,
    error: ''
  })
  const [lastName, setLastName] = useState({
    value: '',
    touched: false,
    pristine: true,
    error: ''
  })

  const validate = () => {

    if( firstName.pristine || firstName.touched) {
      if(!firstName.value) {
        setFirstName(
          {
            ...firstName,
            error: "First name is required."
          }
        )
        setFormValid(false)
      }
    };

    if( lastName.pristine || lastName.touched) {
      if(!lastName.value) {
        setLastName(
          {
            ...lastName,
            error: "Last name is required."
          }
        )
        setFormValid(false)
      }
    };

  }

  const handleSubmit = (event) => {
    event.preventDefault();
    validate();
    console.log(firstName, lastName)

    const postData = JSON.stringify({
      firstName: firstName.value,
      lastName: lastName.value,
      phone: "123 123 1234",
      email: "test@test.com"
    })

    const axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
      }
    }

    axios.post('https://8oqtsuqbo7.execute-api.us-east-1.amazonaws.com/v1/interactions', postData, axiosConfig)
      .then((res) => {
        console.log("RESPONSE RECEIVED: ", res, res.data);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }

  const handleBlur = (event) => {
    const field = event.target.id
    const value = event.target.value
    if(field === 'firstName') {
      setFirstName({
        ...firstName,
        touched: true,
        pristine: false
      })

      if(!value) {
        setFirstName({
          ...firstName,
          error: 'First Name is required'
        })
      }
    }

    if(field === 'lastName') {
      setLastName({
        ...lastName,
        touched: true,
        pristine: false
      })

      if(!value) {
        setLastName({
          ...lastName,
          error: 'Last Name is required'
        })
      }
    }
  }


  return (
    <div>

      <Form onSubmit={event => handleSubmit(event)}>
        <label htmlFor="firstName">
          First Name
          {firstName.error ? <Error>{firstName.error}</Error> : null}
        </label>
        <Input 
          id="firstName"
          type="text"
          placeholder="First Name"
          value={firstName.value}
          error = {firstName.error}
          onChange={event => setFirstName(
            {
              ...firstName,
              value: event.target.value,
              touched: true,
              pristine: false,
              error: ''
            }
          )}
          onBlur = {event => handleBlur(event)}    
        />

        <label htmlFor="lastName">
          Last Name
          {lastName.error ? <Error>{lastName.error}</Error> : null}
        </label>
        <Input 
          id="lastName"
          type="text"
          placeholder="Last Name"
          value={lastName.value}
          error = {lastName.error}
          onChange={e => setLastName(
            {
              ...lastName,
              value: e.target.value,
              touched: true,
              pristine: false,
              error: ''
            }
          )}
          onBlur = {event => handleBlur(event)} 
        />
        <Input type="submit" value="Submit"/>
      </Form>
    </div>
  )
}


const Input = styled.input`
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    margin-top: 6px;
    margin-bottom: 1em;
    resize: vertical;
    border-color: ${props => props.error ? "#FE8B7D" : "#aaa"};
`

const Form = styled.form`
  min-width: 400px;
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
`

const Error = styled.span`
  color: red;
  margin-left: 1em;
`
