import React from "react";
import { Button, Form, Segment } from 'semantic-ui-react'
import { Redirect } from "react-router-dom";
import './formValid.css'


const initialState = {
  email: "",
  password: "",
  emailError: "",
  passwordError: ""
};

const toAdresar = false;

export default class FormValid extends React.Component {
  state = { initialState, toAdresar };
  //history = this.props;

  handleChange = e => {
    this.setState({
       [e.target.name]: e.target.value
     })
  };

  validate = () => {
    let emailError = "";
    let passwordError = "";

    if (!this.state.password) {
     passwordError = "Upišite lozinku";
    }
    
    if (!/(?=.*[0-9])/.test(this.state.password)) {
      passwordError = "Nesipravna lozinka"
    }
    if (!/(?=.*[+!#$\-])/.test(this.state.password)) {
      passwordError = "Nesipravna lozinka"
    }

    if (!/\S+@\S+\.\S+/.test(this.state.email)) {
      emailError = "Nepravilan email";
    }

    if (emailError || passwordError) {
      this.setState({ emailError, passwordError });
      return false;
    }

    return true;
  };

  handleSubmit = event => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      this.setState(initialState);
      this.setState(() => ({
        toAdresar: true
      }))
      
    } else {
      this.setState({
        email: "",
        password: "",
  
      })
    }
  };
  

  render() {
  

    if (this.state.toAdresar === true) {
      return <Redirect to='/Adresar' />
    }

    return (
      
      <Form className='login-form' onSubmit={this.handleSubmit}>
        <Segment
          className='login-container'
        >
          <h2>Prijavite se</h2>
          <Form.Input
            label='Email' 
            className='login-input'
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <div style={{ fontSize: '1rem', color: "red" }}>
            {this.state.emailError}
          </div>
          <Form.Input
            label='Lozinka'
            className='login-input'
            type="password"
            name="password"
            placeholder="Lozinka"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <div style={{ fontSize: '1rem', color: "red" }}>
            {this.state.passwordError}
          </div>
        
          <Button
            className='login-button'
            positive
            type="submit">
            Prijava
            </Button>
          </Segment>
      </Form>
    );
  }
}