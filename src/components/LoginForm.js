import React from "react";

class LoginForm extends React.Component{   
    
  state = {
    username: '',
    password: '',
    isFailedLogIn: false
}
handleLoginClick = async (e) => {
  e.preventDefault();

  const username = this.state.username;
  const password = this.state.password;

  const requestUrl = `https://jsonplaceholder.typicode.com/users?username=${username}&website=${password}`;

  const responseResult = await fetch(requestUrl);
  const userJson = await responseResult.json();

  const {handleLoginClick} = this.props;
  const {setUserId} = this.props;
  if(userJson[0] !== undefined) {
      setUserId(userJson[0].id);
      handleLoginClick(true);
  }
  else {
      this.setState({ isFailedLogIn: true })
  }
}

handleUsernameChange = event => {
  this.setState({username: event.target.value});
}
handlePasswordChange = event => {
  this.setState({password: event.target.value});
}

  render(){
              return <div className="loginBlock">
        {this.state.isFailedLogIn? <div id="errorAuth">Вы ввели неправильный логин или пароль</div> : null}
        <h1>Авторизация</h1>
        <input name="username" id="username" type="text" placeholder="Введите логин" onChange={this.handleUsernameChange}/><br/><br/>
        <input name="website" id="website" type="password" placeholder="Введите пароль" onChange={this.handlePasswordChange}/><br/><br/>
        <button onClick={this.handleLoginClick}>Войти</button>

      </div>;
    }
  }
  
  export default LoginForm;
  