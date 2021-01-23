import React, { useState } from 'react'
import { Icon, Menu, Table, Form, } from 'semantic-ui-react'
import './contactTable.css';


const iconStyle = {
    fontSize: '1.1rem'
}


 const row = (x, i, tableHeader, handleRemove,
  startEditing,
  editIdx,
  handleChange,
   stopEditing,
   clickFav,
   isFavorite,
 ) => {
   const currentlyEditing = editIdx === i;
  
    return (
   
      <Table.Row key={`tr-${i}`} >
        {tableHeader.map((head, k) =>
          <Table.Cell
            
            key={`trc-${k}`}>
            {currentlyEditing ? (
            <Form.Input
              name={head.call}
              onChange={e => handleChange(e, head.call, i)}
              value={x[head.call]}
            />
          ) : (
            x[head.call]
          )} </Table.Cell>
            )}
        <Table.Cell
        >
          {currentlyEditing ? (
            <Table.Cell
            className='icon-container'>
            <Icon style={iconStyle} className='star' name={isFavorite[i]
                  ? "star"
                : "star outline"}
                
              />
              <Icon
                onClick={() => clickFav(i)}
                style={iconStyle} name='check' onClick={() => stopEditing()} />
              <Icon
                style={iconStyle}
            onClick={() => handleRemove(i)}
            name='trash alternate outline'
         /></Table.Cell>
          ) : (
              <Table.Cell
               className='icon-container'
              >
                <Icon
                  onClick={() => clickFav(i)}
                  className='star'                
                  style={iconStyle}
                  name={isFavorite[i]
                  ? "star"
                  : "star outline"}
                   />
                <Icon
                  style={iconStyle}
                  name='edit' onClick={() => startEditing(i)} />
                <Icon
                  style={iconStyle}
            onClick={() => handleRemove(i)}
            name='trash alternate outline'
         /></Table.Cell>
          )}
        </Table.Cell>
        </Table.Row>
      
    )
  }



const ContactTable = ({ data, tableHeader, handleRemove,
    startEditing,
    editIdx,
  stopEditing,
    handleChange,
    handleSort,
    sortDirection,
  columnToSort,
  clickFav,
showFavorite,
  isFavorite }) => { 
  const [rowNr, setRowNr] = useState(15)
  const [pageNr, setPageNr] = useState(1);
 const pagination = (data, rowNr, pageNr) => {
    return data.slice((pageNr - 1) * rowNr, pageNr * rowNr);
  }
  const pageRows = pagination(data, rowNr, pageNr)

  return (
    <Table stackable>
      <Table.Header>
        <Table.Row>
          {
            tableHeader.map((x, i) => <Table.HeaderCell key={`th-${i}`}><div onClick={() => handleSort(x.call = "lastName")}>
              <span>{x.name}</span>{
                columnToSort === x.call ? (
                  sortDirection === 'asc' ? <Icon name='long arrow alternate down' /> : <Icon name='long arrow alternate up' />
                ) : null
              }
            </div></Table.HeaderCell>)

          }
          <Table.HeaderCell>Opcije</Table.HeaderCell>

        </Table.Row>
      </Table.Header>

      <Table.Body>
        {pageRows.map((x, i) => row(x, i, tableHeader, handleRemove,
          startEditing,
          editIdx,
          handleChange,
          stopEditing,
          showFavorite,
  isFavorite))}
  
        
      </Table.Body>
      <Table.Footer>
        <Table.Row>
           
          <Table.HeaderCell colSpan='6'>
            <Menu floated='right' pagination>
              <Form.Field  control='select'
                className='link item '
                value={rowNr} onChange={(e) => setRowNr(Number(e.target.value))}>
                {
                  [15, 30, 45].map(rowNr => (
                    <option key={rowNr} value={rowNr}>
                      {rowNr}
                    </option>
                  ))
                    }
                </Form.Field>
              <Menu.Item
                disabled={pageNr === 1}
                onClick={() => setPageNr(pageNr - 1)}
                icon>
                <Icon name='chevron left' />
                  </Menu.Item>
                  <Menu.Item onClick={() => setPageNr(1)}>1</Menu.Item>
                  <Menu.Item onClick={() => setPageNr(2)} >2</Menu.Item>
                  <Menu.Item onClick={() => setPageNr(3)} >3</Menu.Item>
                  <Menu.Item onClick={() => setPageNr(4)} >4</Menu.Item>
                  <Menu.Item onClick={() => setPageNr(pageNr + 1)}  icon>
                <Icon name='chevron right' />
              </Menu.Item>
            </Menu>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  )
}

export default ContactTable;


