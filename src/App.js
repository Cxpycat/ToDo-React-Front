import React from "react";
import './index.css';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';


class App extends React.Component{
  state = {
    isLoggedIn: false,
    userId: null,
  };

  handleLoginClick = param => {
    this.setState({isLoggedIn: param});
  }
  setUserId = userId => {
  this.setState({userId})
  }

  
  render(){
    
    return (
      <div className="App">
        {this.state.isLoggedIn? <div className="MainScreen">
          <Dashboard handleLoginClick={this.handleLoginClick} userId={this.state.userId} />
        </div>: <LoginForm handleLoginClick={this.handleLoginClick} userId={this.state.userId} setUserId={this.setUserId} />}
      </div>
    )
  }
}

export default App;
