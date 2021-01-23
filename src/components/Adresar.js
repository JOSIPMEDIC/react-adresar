import React, { Component } from 'react';
import ContactForm from './ContactForm';
import ContactTable from './ContactTable';
import orderBy from "lodash/orderBy"
import { Form, FormGroup, Icon } from 'semantic-ui-react'


const invertDirect = {
  asc: 'desc',
  desc: 'asc'
}

class Adresar extends Component {

  state = {
    data: [
       {
        firstName: "Tann",
        lastName: "Gounin",
        birthDate: "10.3.1991",
        contactType: "Email",
        contactInfo: "yJG2MuL5piY"
      },
      {
        firstName: "Elana",
        lastName: "Ricioppo",
        birthDate: "10.3.1991",
        contactType: "Email.uk",
        contactInfo: "S7p9ReUoQe"
      },
      {
        firstName: "Bentlee",
        lastName: "Decourt",
        birthDate: "10.3.1991",
        contactType: "Email",
        contactInfo: "MWU9hc"
      },
      {
        firstName: "Hyacintha",
        lastName: "Choudhury",
        birthDate: "10.3.1991",
        contactType: "Email",
        contactInfo: "kRtWP1"
      },
      {
        firstName: "Ari",
        lastName: "Spedroni",
        birthDate: "10.3.19911",
        contactType: "Email",
        contactInfo: "o78ibUPPmDlZ"
      },
      
    ],
    editIdx: -1,
    columnToSort: '',
    sortDirection: 'desc',
    query: '',
    columnToQuery: 'firstName',
    isFavorite: {},
    showFavorite: false

  };

  onChange = (updatedValue) => {
    this.setState({
      fields:{ 
      ...this.state.fields,
      ...updatedValue}
    })
  }

  handleSort = (columnName) => {
    this.setState(state => ({
      columnToSort: columnName,
      sortDirection: state.columnToSort === columnName ? invertDirect[state.sortDirection] : 'asc'

    }))
  }

  handleRemove = (i) => {
    this.setState(state => ({
      data: state.data.filter((tableRow, idx) => idx !== i)
    }))
  }

  startEditing = (i) => {
    this.setState({ editIdx: i })
  }

  stopEditing = () => {
    console.log(this.state.data.isFavorite)
    this.setState({editIdx: -1})
  }

  clickFav = (i) => {    
   this.setState(state => ({
    isFavorite: { ...state.isFavorite, [i]: !state.isFavorite[i] }
  }));
  }

  handleChange = (e, name, i) => {
    const {value} = e.target
    this.setState(state => ({
        data: state.data.map((tableRow, idx) => idx === i ? ({...tableRow, [name]: value}) : tableRow)
    }))
  }

  render()
  {
    const lowerCaseQuery = this.state.query.toLowerCase();
    return(
      <div>
        <ContactForm
          
          onSubmit={submiting => this.setState({
          data: [...this.state.data, submiting]
        })} />
        <Form className='search-form' >
          <FormGroup
            style={{marginLeft: '5rem'}}
            >
            <Form.Field
              width={2} 
          placeholder='Odaberi'
          control='select'
          value={this.state.value}
          onChange={(e, index, value) => this.setState({columnToQuery: value})}
        >
        <option value='' >Odaberi</option>
        <option value='firstName' >Ime</option>
        <option value='lastName' >Prezime</option>
        <option value='contactInfo' >Kontakt</option>
          </Form.Field>
            <Form.Input
              width={2} 
          placeholder='Traži'
          value={this.state.query}
          onChange={e => this.setState({query: e.target.value})}
            />
            <Form.Button
              positive
              style={{
                width: "8rem"
              }}
              >
              <Icon name='star' /> Favorit
              </Form.Button>
            </FormGroup>
          </Form>
        <ContactTable
          clickFav={this.clickFav}
          addFavorite={this.state.addFavorite}
          isFavorite={this.state.isFavorite}
            handleRemove={this.handleRemove}
            startEditing={this.startEditing}
            editIdx={this.state.editIdx}
            stopEditing={this.stopEditing}
            handleChange={this.handleChange}
            handleSort={this.handleSort}
            columnToSort={this.state.columnToSort}
            sortDirection={this.state.sortDirection}
            data={orderBy(this.state.query
                ? this.state.data.filter(x =>
                    x[this.state.columnToQuery]
                      .toLowerCase()
                      .includes(lowerCaseQuery)
                  )
                : this.state.data,
              this.state.columnToSort,
              this.state.sortDirection
            )
                
          }
          tableHeader={[
            {
              name: "Ime",
              call: "firstName"
            },
            {
              name: "Prezime",
              call: "lastName"
            },
            {
              name: "Datum rođenja",
              call: "birthDate"
            },
            {
              name: "Vrsta kontakta",
              call: "contactType"
            },
            {
              name: "Kontakt",
              call: "contactInfo"
            }
        ]}
          
          />
      </div>
      
    )
  }
}

export default Adresar; 


