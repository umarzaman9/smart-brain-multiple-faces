import React, {Component} from 'react';
import { Dropdown, 
		DropdownToggle, 
		DropdownMenu,  
		DropdownItem } 
	from 'reactstrap';



class ProfileIcon extends Component {
constructor(props) {
	super(props);
	this.state = {
		dropdownOpen: false
	}
}

toggle = () => {
	this.setState(prevState => ({
		dropdownOpen: !prevState.dropdownOpen
	}));
}

render() {
	return ( 
		<div className="pa4 tc">
			 <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
			       <DropdownToggle
				        tag="span"
				        data-toggle="dropdown"
				        aria-expanded={this.state.dropdownOpen}
						>
						  <img 
							  src="http://tachyons.io/img/logo.jpg" 
							  className="br-100 pa1 ba b--black-10 h3 w3" alt="avatar" />
				    </DropdownToggle>
			      <DropdownMenu 
			      		right
					    className='b--transparent shadow-5' 
						stye={{marginTop: '20px' , backgroundColor: 'rgba(255,255,255,0.5'}} >
			        <DropdownItem onClick={this.props.toggleModal} >Profile</DropdownItem>
			        <DropdownItem onClick= {() => this.props.onRouteChange('signout')} >Sign Out</DropdownItem>
			      </DropdownMenu>
			    </Dropdown>
		</div>	
		);
}
}
export default ProfileIcon;