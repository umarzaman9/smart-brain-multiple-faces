import React, {Component} from 'react';
import Nav from './components/navigation/Navigation.js'
import Logo from './components/logo/Logo';
import Rank from './components/rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import Modal from './components/Modal/Modal';
import Profile from './components/profile/Profile';
import './App.css';

const particleOptions = {
              particles: {
                number: {
                  value: 60,
                  density: {
                    enable: true,
                    value_area: 800
                  }
                
                }
              }
              }

const initialState = {

      input: '',
      imageUrl: '',
      boxes: [],
      route: 'signin',
      isSignedIn: false,
      isProfileOpen: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',
        pet: '',
        age: ''
      }
}

class  App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }
    loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }
  
 componentDidMount() {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      fetch('http://localhost:3000/signin' , {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data && data.id) {
          fetch(`http://localhost:3000/profile/${data.id}`, {
            method: 'get',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
        }
          })
          .then(resp => resp.json())
          .then(user => {
            if (user && user.email) {
              this.loadUser(user)
              this.onRouteChange('home');
            }
          })
        }
      }).catch(console.log)
    }
  }

  calculateFaceLocations = (data) => {
    if (data && data.outputs) {
      return data.outputs[0].data.regions.map(face => {
      const clarifaiFace =  face.region_info.bounding_box;
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
      });
    }
    return;
  }

  displayFaceBoxes = (boxes) => {
    if (boxes) {
    this.setState({boxes: boxes});
    }
  }
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});

    fetch('http://localhost:3000/imageurl', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': window.sessionStorage.getItem('token')

      },
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response=>response.json())
    .then(response => {
   if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': window.sessionStorage.getItem('token')

            },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
        .then(response=> response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        }) 
        .catch(console.log) 
      }
      this.displayFaceBoxes(this.calculateFaceLocations(response))
      })
    .catch (err=> console.log(err));
  }

  onRouteChange = (route) => {
    if(route ==='signout') {
      return this.setState(initialState)
    } else if (route==='home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  toggleModal = () => {
    this.setState(prevState => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen
    }))
  }

  render() {

    const {isSignedIn, user, imageUrl, route, boxes, isProfileOpen} = this.state;

    return (
      <div className="App"> 
      <Particles className="particles"
                params={particleOptions} />

        
        <Nav isSignedIn= {isSignedIn} onRouteChange = {this.onRouteChange}
              toggleModal={this.toggleModal}
              />

        { isProfileOpen && 
          <Modal> 
            <Profile 
              isProfileOpen={isProfileOpen} 
              toggleModal= {this.toggleModal} 
              loadUser = {this.loadUser}
              user = {user} 
              /> 
          </Modal> 
        }

        {route ==='home'
        ?  <div> <Logo/>
        
        <Rank
        name={this.state.user.name}
        entries={this.state.user.entries} 
        />
        <ImageLinkForm 
        onInputChange= {this.onInputChange}
        onButtonSubmit = {this.onButtonSubmit}  
        />
        <FaceRecognition boxes={boxes} imageUrl = {imageUrl}/>
        </div>
        : (
          this.state.route === 'signin'
          ? <SignIn loadUser = {this.loadUser} onRouteChange= {this.onRouteChange} /> 
          : <Register loadUser = {this.loadUser} onRouteChange= {this.onRouteChange} />
          )
         
      }
      </div>
      );
  }
}

export default App;  