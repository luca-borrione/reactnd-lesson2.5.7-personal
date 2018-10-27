import React from 'react'
import { Route, Link } from 'react-router-dom'

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

export default App
