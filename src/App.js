import React from 'react'
import { Route, Link } from 'react-router-dom'

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

const strToCase = (str, textcase) => {
	switch (textcase) {
			
		case 'upper':
			return str.toUpperCase();

		case 'lower':
			return str.toLowerCase();

		default:
			console.error('unexpected textcase: ', textcase);
			break;

	}
};

const PropsRoute = ({component, path, ...otherProps}) => (
	<Route {...otherProps} path={path} render={routeProps => 
		React.createElement(component, {...otherProps, ...routeProps})
		} />
);

class AnimalCard extends React.Component {
	constructor(props) {
		super(props);
		this.print = this.print.bind(this);
	}

	print(str) {
		return strToCase(str, this.props.textcase);
	}

	render() {
		const { location } = this.props;
		const urlParams = new URLSearchParams(location.search);
		const name = urlParams.get('name');

		const animal = animalsRecord.find( entry =>
			entry.name === name
		);

		return (
			<div id="animal-card">
				<table>
					<tbody>
						<tr>
							<td>{this.print('name:')}</td>
							<td>{this.print(animal.name)}</td>
						</tr>
						<tr>
							<td>{this.print('class:')}</td>
							<td>{this.print(animal.class)}</td>
						</tr>
						<tr>
							<td>{this.print('status:')}</td>
							<td>{this.print(animal.status)}</td>
						</tr>
					</tbody>
				</table>
				<hr />
			</div>
		);
	}
}

class AnimalList extends React.Component {
	constructor(props) {
		super(props);
		this.print = this.print.bind(this);
	}

	print(str) {
		return strToCase(str, this.props.textcase);
	}

	render() {
		const { location, match, textcase } = this.props;

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
									>{this.print(animal.name)}</Link>
							</li>
						);
					})}
				</ul>
				<hr />
				<PropsRoute path={`${match.path}/name`} component={AnimalCard} textcase={textcase} />
			</div>
		);
	}
}


class AnimalGroup extends React.Component {
	constructor(props) {
		super(props);
		this.print = this.print.bind(this);
	}
	
	print(str) {
		return strToCase(str, this.props.textcase);
	}

	render() {
		const { location, match, textcase } = this.props;

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
								>{this.print(group)}</Link>
						</li>
					))}
				</ul>
				<hr />
				<PropsRoute path={`${match.path}/filter`} component={AnimalList} textcase={textcase} />
			</div>
		);
	}
}

class AnimalNav extends React.Component {
	constructor(props) {
		super(props);
		this.startOver = this.startOver.bind(this);
	}

	startOver() {
		this.props.history.push('/');
	}

	render() {
		const { match, textcase } = this.props;
		return (
			<div id="animal-nav">
				<PropsRoute path={`${match.path}/list`} component={AnimalList} textcase={textcase} />
				<PropsRoute path={`${match.path}/group`} component={AnimalGroup} textcase={textcase} />
				<br />
				<button onClick={this.startOver}>Back</button>
			</div>
		);
	}
}

class App extends React.Component {

	constructor(props) {
		super(props);
		this.setCase = this.setCase.bind(this);
		this.print = this.print.bind(this);
	}

	state = {
		textcase: 'lower'
	};

	setCase(event) {
		this.setState({
			textcase: event.target.value
		});
	}

	print(str) {
		return strToCase(str, this.state.textcase);
	}

	render() {
		const { textcase } = this.state;

		return (
			<div>
				<PropsRoute path="/nav" component={AnimalNav} textcase={this.state.textcase} />
				<Route exact path='/' render={() => (
					<div>
						<form>
							<fieldset>
								<legend>Select a case</legend>
						
								<div>
									<input type="radio" id="upper"
										name="textcase" value="upper"
										checked={textcase === 'upper'}
										onChange={this.setCase} />
									<label htmlFor="huey">UPPER</label>
								</div>
						
								<div>
									<input type="radio" id="lower"
										name="textcase" value="lower"
										checked={textcase === 'lower'}
										onChange={this.setCase} />
									<label htmlFor="dewey">lower</label>
								</div>
						
							</fieldset>
						</form>
						<ul>
							<li>
								<Link
									to={{
										pathname: '/nav/group',
										search: '?groupBy=class'
									}}
									>{this.print('show animal classes')}</Link></li>

							<li>
								<Link
									to={{
										pathname: '/nav/group',
										search: '?groupBy=status'
									}}
									>{this.print('show conservation status')}</Link></li>

							<li>
								<Link to='/nav/list'>
									{this.print('show all animals')}</Link></li>
						</ul>
					</div>
				)} />
			</div>
		)
	}

}

export default App
