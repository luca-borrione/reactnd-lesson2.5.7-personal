import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route, NavLink } from 'react-router-dom'
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import BrowserUtils from './utils/BrowserUtils';

const PropsRoute = ({component, path, ...otherProps}) => (
	<Route {...otherProps} path={path} render={routeProps => 
		React.createElement(component, {...otherProps, ...routeProps})
	  } />
  ) 

const animalsRecord = [
	{
		name: 'tiger',
		class: 'mammal',
		status: 'endangered'
	},
	{
		name: 'mule',
		class: 'mammal',
		status: 'least concern'
	},
	{
		name: 'dingo',
		class: 'mammal',
		status: 'threatened'
	},
	{
		name: 'linx',
		class: 'mammal',
		status: 'least concern'
	},
	{
		name: 'dolphin',
		class: 'mammal',
		status: 'threatened'
	},
	{
		name: 'whale shark',
		class: 'fish',
		status: 'threatened'
	},
	{
		name: 'cathfish',
		class: 'fish',
		status: 'threatened'
	},
	{
		name: 'iguana',
		class: 'reptile',
		status: 'threatened'
	},
	{
		name: 'sea turtle',
		class: 'reptile',
		status: 'endangered'
	},
	{
		name: 'caiman',
		class: 'reptile',
		status: 'least concern'
	}
];


// class Item extends React.Component {

// 	// shouldComponentUpdate() {
// 	// 	// const toggle = !!this.props.toggle;
// 	// 	// console.log('item should update: '+toggle);
// 	// 	// console.log('-------');
// 	// 	// return toggle;
// 	// 	console.log('------->');
// 	// 	const toggle = this.props.shouldComponentUpdate();
// 	// 	console.log('<-------');
// 	// 	console.log(toggle);
// 	// 	console.log('--------');
// 	// 	return toggle;
// 	// }

// 	render() {
// 		const { match } = this.props;
// 		// debugger;
// 		// console.log(match.path); // prints "/items/:itemId"
// 		// console.log(match.url); // 	prints "/items/route"
	
// 		// const itemId = match.url.substr(match.url.lastIndexOf('/')+1);		
// 		const itemId = 'babyK'
// 		return (
// 			<p>
// 				Item: {new Date().getSeconds().toString()}
// 			</p>
// 		)
// 	}

// }

// function Item (obj) {
// 	console.log(obj);
// 	debugger;
// 	// console.log(match.path); // prints "/items/:itemId"
// 	// console.log(match.url); // 	prints "/items/route"

// 	// const itemId = match.url.substr(match.url.lastIndexOf('/')+1);
// 	return (
// 		<p>
// 		Item: {new Date().getSeconds().toString()}
// 	</p>
// 	);
// }

// // function Items ({ match, toggle }) {
// // 	return (
// // 		<div>
// // 			{new Date().getSeconds().toString()}
// // 			<ul>
// // 				{items.map(({ name, id }) => (
// // 					<li key={id}>
// // 						<Link to={`${match.url}/${id}`}>{name}</Link>
// // 					</li>
// // 				))}
// // 			</ul>

// // 			<Route path={`${match.path}/:itemId`} component={Item} test="succeeded"/>
// // 		</div>
// // 	);
// // }

// const items = {};

// class Items extends React.Component {

// 	state = {
// 		colour: null
// 	};

// 	static getDerivedStateFromProps(nextProps, prevStatee) {
// 		if (nextProps.colour !== prevStatee.colour) {
// 			return {
// 				colour: nextProps.colour
// 			};
// 		}
// 	}

// 	render() {	
// 		const { colour } = this.state;
// 		const { match } = this.props;
		
// 		return (
// 			<div>
// 				Items: {new Date().getSeconds().toString()}
// 				<ul>
// 					{items[colour].map(({ name, id }) => (
// 						<li key={id}>
// 							<Link to={`${match.url}/${id}`}>{name}</Link>
// 						</li>
// 					))}
// 				</ul>
// 				<PropsRoute
// 					path={`${match.path}/:itemId`}
// 					component={Item}
// 					colour={this.state.colour}
// 				/>
// 			</div>
// 		)
// 	}

// }

// function Animal ({ match }) {
// 	return (
// 		'TEST'
// 	);
// }

// class AnimalList1 extends React.Component {

// 	constructor(props) {
// 		super(props)
// 		this.startOver = this.startOver.bind(this);
// 	}

// 	startOver() {
// 		this.props.history.push('/');
// 	}

// 	render() {
// 		const { history, match, recursive } = this.props;

// 		const items = (match.params.filter)
// 			? animals.filter( animal => animal[match.params.key] === match.params.filter )
// 			: [...new Set(animals.map( animal => animal[match.params.key]))];

// 		return (
// 			<div>
// 				<ul>
// 					{items.map((item, index) => {
// 						if (typeof item === "string") {
// 							return(
// 								<li key={index}>
// 									{match.params.key === 'name'
// 										? (
// 											<Link to={`${match.url}/animal/${item}`}>{item}</Link>
// 										) : (
// 											<Link to={`${match.url}/${item}`}>{item}</Link>
// 										)}
// 								</li>
// 							);
// 						} else {
// 							return(
// 								<li key={index}>
// 									<Link to={`${match.url}/animal/${item.name}`}>{item.name}</Link>
// 								</li>
// 							);
// 						}
// 					})}
// 				</ul>
				
// 				{!match.params.filter && (
// 					<div>
// 						<hr />
// 						<PropsRoute path={`${match.path}/:filter`} component={AnimalList} recursive="true" />
// 					</div>
// 				) || (
// 					<div>
// 						<hr />
// 						<Route path={`${match.path}/animal/:name`} component={Animal} />
// 					</div>
// 				)}
				
// 				{!recursive && (
// 					<div>
// 						<br />
// 						<button onClick={this.startOver}>&lt;&lt;</button>
// 						<button onClick={history.goBack}>&lt;</button>
// 					</div>
// 				)}
// 			</div>
// 		);
// 	}
// }

function AnimalCard (props) {
	const { history, location, match, recursive } = props;
	const urlParams = new URLSearchParams(location.search);
	const name = urlParams.get('name');

	const animal = animalsRecord.find( entry =>
		entry.name === name
	);

	return (
		<div>
			<table style={{position:'relative',left:20}}>
				<tbody>
					<tr>
						<td>name:</td>
						<td>{animal.name}</td>
					</tr>
					<tr>
						<td>class:</td>
						<td>{animal.class}</td>
					</tr>
					<tr>
						<td>conservation status:</td>
						<td>{animal.status}</td>
					</tr>
				</tbody>
			</table>
			<hr />
		</div>
	);
}

class AnimalList extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const { history, location, match, recursive } = this.props;

		const urlParams = new URLSearchParams(location.search);
		const groupBy	= urlParams.get('groupBy');
		const filterBy	= urlParams.get('filterBy');

		let animals;
		if (filterBy) {
			animals = animalsRecord.filter( animal =>
				animal[groupBy] === filterBy
			);
		} else {
			animals = animalsRecord.slice(0);
		}

		urlParams.delete('name');
		return (
			<div>
				<ul>
					{animals.map((animal, index) => {
						urlParams.append('name', animal.name);
						const search = urlParams.toString();
						urlParams.delete('name');
						return (
							<li key={index}>
								<Link
									to={{
										pathname: match.url+'/name',
										search: search
									}}
									>{animal.name}</Link>
							</li>
						);
					})}
				</ul>
				<hr />
				<Route path={`${match.path}/name`} component={AnimalCard} />
			</div>
		);
	}
}


class AnimalGroup extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { history, location, match, recursive } = this.props;
		const urlParams = new URLSearchParams(location.search);
		const groupBy = urlParams.get('groupBy');

		const groups = [
			...new Set(animalsRecord.map( animal => animal[groupBy] ))
		];

		urlParams.delete('filterBy');
		return (
			<div>
				<ul>
					{groups.map((group, index) => (
						<li key={index}>
							<Link
								to={{
									pathname: match.url+'/filter',
									search: urlParams.toString()+'&filterBy='+group
								}}
								>{group}</Link>
						</li>
					))}
				</ul>
				<hr />
				<Route path={`${match.path}/filter`} component={AnimalList} />
			</div>
		);
	}
}

// <PropsRoute path="/items/red" component={Items} colour='red' />
// <PropsRoute path="/items/blue" component={Items} colour='blue' />


class AnimalNav extends React.Component {
	constructor(props) {
		super(props);
		this.startOver = this.startOver.bind(this);
	}

	startOver() {
		this.props.history.push('/');
	}

	render() {
		const { history, location, match, recursive } = this.props;

		return (
			<div>
				<Route path="/animal/list" component={AnimalList} />
				<Route path="/animal/group" component={AnimalGroup} />
				<br />
				<button onClick={this.startOver}>Back</button>
			</div>
		);
	}
}

class App extends React.Component {
	render() {
		return (
			<div>
				<Route path="/animal" component={AnimalNav} />
				<Route exact path='/' render={() => (
					<ul>
						<li>
							<Link
								to={{
									pathname: '/animal/group',
									search: '?groupBy=class'
								}}
								>Show Animal Classes</Link></li>

						<li>
							<Link
								to={{
									pathname: '/animal/group',
									search: '?groupBy=status'
								}}
								>Show Conservation Status</Link></li>

						<li>
							<Link to='/animal/list'>Show All Animals</Link></li>
					</ul>
				)} />
			</div>
		)
	}

}

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>, document.getElementById('root'));

registerServiceWorker();

