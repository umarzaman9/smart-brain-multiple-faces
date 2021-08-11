import React from 'react';

const Rank = ({name,entries}) => {
	return (
		<div>
			<div className="white f3"> 
			{`${name}, your current entry count is:`}
			</div>	
				<div className="white f1"> 
					{entries}
				</div>				
			</div>
		);
	}

export default Rank;	

//AWS SECTION OF ADDING BADGES>>

// class Rank extends Reac.Component {
// 	constructor() {
// 		super();
// 		this.state = {
// 			emojis: ''
// 		}
// 	}

// 	componentDidMount() {
// 		this.generateEmoji(this.props.entries)
// 	}

// 	componentDidUpdate(prevProps, prevState) {
// 		if(prevProps.entries === this.props.entries && prevProps.name === this.props.name) {
// 			return null;
// 		} 
// 		this.generateEmoji(this.props.entries)
// 	}

// 	generateEmoji = (entries) => {
// 		fetch(`add you aws end point here?rank=${entries}`)
// 		.then(res => res.json())
// 		.then(data => this.setState({ emoji: data.input}))
// 		.catch(console.log)
// 	}

// 	render() {
// 		const {name, entries} = this.props;
// 		return (
// 			<div>
// 				<div className="white f3"> 
// 				{`${name}, your current entry count is:`}
// 				</div>	
// 				<div className="white f1"> 
// 					{entries}
// 				</div>
// 				<div className="white f3"> 
// 					{`Rank Badge: ${this.state.emoji}`}
// 				</div>

// 			</div>

// 			);
// 		}
// 	}