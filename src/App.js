import React, { Component } from 'react'
import ListContacts from './ListContacts'
import * as ContactsAPI from './utils/ContactsAPI'
import CreateContact from './CreateContact'
import { Route, Link } from 'react-router-dom'

class App1 extends Component {
  state = {
    contacts: []
  }
  componentDidMount() {
    ContactsAPI.getAll()
      .then((contacts) => {
        this.setState(() => ({
          contacts
        }))
      })
  }
  removeContact = (contact) => {
    this.setState((currentState) => ({
      contacts: currentState.contacts.filter((c) => {
        return c.id !== contact.id
      })
    }))

    ContactsAPI.remove(contact)
  }
  createContact = (contact) => {
    ContactsAPI.create(contact)
      .then((contact) => {
        this.setState((currentState) => ({
          contacts: currentState.contacts.concat([contact])
        }))
      })
  }
  render() {
    // return (
    //   <div>
    //     <Route exact path='/' render={() => (
    //       <ListContacts
    //         contacts={this.state.contacts}
    //         onDeleteContact={this.removeContact}
    //       />
    //     )} />
    //     <Route path='/create' render={({ history }) => (
    //       <CreateContact
    //         onCreateContact={(contact) => {
    //           this.createContact(contact)
    //           history.push('/')
    //         }}
    //       />
    //     )} />
    //   </div>
	// )
	return (
		<div>
			<Route path='/items' component={Items} />
			<Link to='/items'>TEST</Link>
		</div>
	)
  }
}


const items = [
	{
		name: 'Link Component Usage',
		id: 'link'
	},
	{
		name: 'Route Component Usage',
		id: 'route'
	},
];

function Item ({ match }) {
	console.log(match.path); // prints "/items/:itemId"
	console.log(match.url); // 	prints "/items/route"

	const itemId = match.url.substr(match.url.lastIndexOf('/')+1);
	return (
		<p>Item: {itemId}</p>
	);
}


function Items ({ match }) {
	return (
		<div>
			<Link to={`${match.url}/id`}>LINK TEXT</Link>
			<Route path={`${match.path}/:itemId`} component={Item} />
		</div>
	);
}


const items = [
	{
		name: 'Link Component Usage',
		id: 'link'
	},
	{
		name: 'Route Component Usage',
		id: 'route'
	},
];

function Items ({ match }) {
	return (
		<div>
			<ul>
				{items.map(({ name, id }) => (
					<li key={id}>
						<Link to={`${match.url}/${id}`}>{name}</Link>
					</li>
				))}
			</ul>

			<Route path={`${match.path}/:itemId`} component={Item} />
		</div>
	);
}

class Test extends React.Component {

	constructor(props) {
		super(props);
		console.log(Route);
	}

	render() {
		console.log(Route);
		return (
			<div>
				<Route path='/items' component={Items} />
				<Route exact path='/' render={() => (
					<Link to='/items'>SHOW ITEMS</Link>
				)} />
			</div>
		)
	}

}



export default Test
