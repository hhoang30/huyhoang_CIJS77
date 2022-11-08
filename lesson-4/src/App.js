import logo from './logo.svg';
import './App.css';
import React from 'react';
import state from 'react';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

      <RegisterPage/>
    </div>
  );
}

export default App;

class RegisterPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fullname: "",
      username: "",
      password: "",
      passwordCf: "",
      errorMessage: {
        fullname: "",
        username: "",
        password: "",
        passwordCf: "",
      }
    };
  }

  onChangeInput = (nameInput,value) => {
    
    const errorMessage = {
      ...this.state.errorMessage,
    }

    this.setState({
      ...this.state,
      [nameInput]: value,
      errorMessage: errorMessage
    })

    if (nameInput === "passwordCf" && this.state.password !== value){
      errorMessage['passwordCf'] = "pass khong giong nhau";
    }else{
      errorMessage['passwordCf'] = "";
    }
  }

  handleSubmitForm = (e) => {
    e.preventDefault();
    const { errorMessage, fullname, password, username } = this.state
    if (Object.values(errorMessage).filter((value) => value !== "").length > 0) {
      return;
    }
    fetch("https://6360b4baaf66cc87dc18c2ea.mockapi.io/api/v1/users/users ", {
      method: "POST",
      body: JSON.stringify({
        user: {
          name: fullname,
          username: username,
          password: password,
        }
      })
    });
    console.log(this.state);
  }

  render(){
    const {errorMessage} = this.state;
    return<form onSubmit={this.handleSubmitForm}>
      <div>
        <label>Fullname</label>
        <input type="text" name='fullname' onChange={(e)=>{
          this.onChangeInput("fullname",e.target.value)
        }}/>
      </div>

      <div>
        <label>Username</label>
        <input type='text' name='username' onChange={(e)=>{
          this.onChangeInput("username",e.target.value)
        }}/>
      </div>

      <div>
        <label>Password</label>
        <input type='password' name='password' onChange={(e)=>{
          this.onChangeInput("password",e.target.value)
        }}/>
      </div>

      <div>
        <label>Password Confirm</label>
        <input type='password' name='passwordCf' onChange={(e)=>{
          this.onChangeInput("passwordCf",e.target.value)
        }}/>
        {errorMessage.passwordCf !== "" ?<div>{errorMessage.passwordCf}</div> : <></>}
      </div>

      <div>
        <input type='submit'/>
      </div>
    </form>
  }
}