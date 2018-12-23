import React, { Component } from 'react';
import BlockButton from './BlockButton'
import './App.css';

class Login extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
    };
  }

  handleChange = (event) => {
    this.setState({email: event.target.value})
  };

  handleLogin = () => {
    this.props.handleLogin(this.state.email)
  };
 
  render() {
    return (
      <div style={{borderStyle: 'solid', borderWidth: 1, borderColor: 'black', paddingLeft: 10, paddingTop: 10, paddingRight: 10, paddingBottom: 10, borderRadius: 5}}>
        <div style={{marginBottom: 10}}>
          <label style={{fontWeight: 'bold'}}>Login your email!</label>
        </div>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
          <label>Email:</label>
          <input style={{width: 280, marginLeft: 5}} className="custom-input" type="text" onChange={this.handleChange}></input>
          <BlockButton
            style={{marginLeft: 10}}
            label="LOGIN"
            onClick={this.handleLogin} />
        </div>
      </div>
    );
  }
}

export default Login;