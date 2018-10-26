import React from 'react'
import { Route, Link } from 'react-router-dom'

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
	console.log(match.url); // 	prints "/items/route" or "/items/link"

	const itemId = match.url.substr(match.url.lastIndexOf('/')+1);
	return (
		<p>Item: {itemId}</p>
	);
}

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

	render() {
		return (
			<div>
				<Route path='/items' component={Items} />
				<Link to='/items'>TEST</Link>
			</div>
		)
	}

}

export default Test
