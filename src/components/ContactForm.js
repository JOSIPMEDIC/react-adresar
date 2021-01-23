import React, { Component } from 'react';
import { Form, Icon, FormGroup } from 'semantic-ui-react';
import './contactForm.css';

const errorStyle = {
      color: 'red',
      fontSize: 12
    };


class ContactForm extends Component {
  state = { 
    firstName: '',
    firstNameError: '',
    lastName: '',
    lastNameError: '',
    birthDate: '',
    contactType: '',
    contactTypeError: '',
    contactInfo:'',
    contactInfoError:''
   }

  handleChange = e => {
    this.setState({
       [e.target.name]: e.target.value
     })
  }

  handleValidation = () => {
    let err = false;
    const errors = {};

    if (this.state.firstName.length < 1) {
      err = true
      this.state.firstNameError = 'Upišite ime.'
    } else if (this.state.firstName.length > 100) {
      err = true
      this.state.firstNameError = 'Ime ne smije imati više od 100 znakova.'
    }
    if (this.state.lastName.length < 1) {
      err = true
      this.state.lastNameError = 'Upišite prezime.'
    } else if (this.state.lastName.length > 300) {
      err = true
      this.state.lastNameError = 'Prezime ne smije imati više od 100 znakova.'
    }
    if (this.state.contactType.length < 1) {
      err = true;
      this.state.contactTypeError = 'Odaberite vrstu kontakta.'
    }
    if (this.state.contactType.length < 1) {
      err = true;
      this.state.contactInfoError = 'Upišite kontakt.'
    }
    if (err) {
      this.setState({
        ...this.state,
        ...errors
      })
    }
    
    return err;
  }
  
  handleSubmit = e => {
    e.preventDefault();
    
    const errorCheck = this.handleValidation();
    if (!errorCheck) {
      this.setState({
        firstName: '',
        firstNameError: '',
        lastName: '',
        lastNameError: '',
        birthDate: '',
        contactType: "",
        contactTypeError: '',
        contactInfo:'',
        contactInfoError:''
      });
      this.props.onSubmit(this.state);
    }
  }




  
  render() { 
    return ( 
      <Form className='contact-form'>
        <FormGroup  className='form-group' widths='equal'>
          
            <Form.Input
              className='input'
         name='firstName'
          value={this.state.firstName}
          placeholder='Ime'
          onChange={e => this.handleChange(e)}
          />
            
          
          
            <Form.Input
              className='input'
             name='lastName'
          value={this.state.lastName}
          placeholder='Prezime'
          onChange={e => this.handleChange(e)}
          />
           
            
          <Form.Input
            className='input'
         
          type='date'
          name='birthDate'
          value={this.state.birthDate}
          placeholder='Datum rođenja'
          onChange={e => this.handleChange(e)}
        />
        
        
        <Form.Field className='input' control='select' name='contactType' placeholder='Vrsta kontakta' value={this.state.value} onChange={this.handleChange}>
            <option value="">Odaberi</option>
            <option value="Mobitel">Mobitel</option>
            <option value="Fiskni telefon">Fiskni telefon</option>
            <option value="Email">Email</option>
            <option value="Pager">Pager</option>
          </Form.Field>

          
        
        
            <Form.Input
              className='input'
           name='contactInfo'
          value={this.state.contactInfo}
          placeholder='Kontakt'
          onChange={e => this.handleChange(e)}
        />
        
        
        <Form.Button positive onClick={e => this.handleSubmit(e)}><Icon name='add'/> Dodaj</Form.Button>   
        </FormGroup>
        <FormGroup className='err-container'>
          {<p style={errorStyle}>
            {this.state.firstNameError}
          </p>}
          {<p style={errorStyle}>
            {this.state.lastNameError}
          </p>}
          <br/>
          {<p style={errorStyle}>
            {this.state.contactTypeError}
          </p>}
                  {<p style={errorStyle}>
                    {this.state.contactInfoError}
              </p>}
        </FormGroup>
      </Form>
     );
  }
}
 
export default ContactForm;