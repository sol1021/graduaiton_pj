import React from "react";
import { Link } from "react-router-dom";
import './login.css';


  function joinPage(e){
      window.location.href ="/join"
  }
  function homePage(e){
    window.location.href ="/"
}
  

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId : "",
      passWord : ""
    };
  }

  handleUserId = e => {
    this.setState({
      userId : e.target.value
    });
  };

  handlePassWord = e => {
    this.setState({
      passWord : e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();

    this.setState({
      userId : this.state.userId,
      passWord : this.state.passWord,
    })
    
    var data = {
      userId : this.state.userId,
      passWord : this.state.passWord
    }
    var userData = JSON.stringify(data);
 
    const loginInfo = {
      method : 'POST',
      body : (userData),
      headers : {
        "Content-Type" : "application/json",
        "Access-Control-Allow-Origin" : "http://127.0.0.1:5000/"
      }
    };
    fetch("http://127.0.0.1:5000/login/userLogin", loginInfo)
    .then(res => {
      if (res.status === 200) {
        alert("로그인 완료!")
        homePage()
      }else if (res.status === 404) {
        alert("아이디와 비밀번호를 확인해주세요.")
      }
    })
  }

  render() {
    return (
      <div className="login-body" width="100%" height="100%">
      <form method="post" class="loginForm">
      <h2>Login</h2>
      <div className="idForm">
      <input id="id" className="id" type="text" name="userId" value={this.state.userId} placeholder="아이디를 입력해주세요" onChange={this.handleUserId}/>
      </div>
      <div className="passForm">
      <input
        id="password"
        className="pw"
        type="password"
        name="passWord"
        value={this.state.passWord}
        placeholder="비밀번호를 입력해주세요"
        onChange={this.handlePassWord}
      />
      </div>
      <Link to="/" style={{ textDecoration: 'none' }}>
      <button className="btn" onClick = {this.handleSubmit}>로그인</button></Link>
      <Link to="/join" style={{ textDecoration: 'none' }}>
      <button className="btn" onClick = {joinPage}>회원가입</button></Link>
      </form>
      </div>
    );
  }
}

export default Login;