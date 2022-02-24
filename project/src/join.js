import React from "react";
import { Link } from "react-router-dom";
import './join.css';

function joinPage(e){
  window.location.href ="/join"
}
function loginPage(e){
  window.location.href ="/login"
}

class Join extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId : "",
      passWord : "",
      repassWord : ""
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
    });
  };

  handleRepassWord= e => {
    this.setState({
      repassWord : e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      userId : this.state.userId,
      passWord : this.state.passWord,
      repassWord : this.state.repassWord
    });
    if (this.state.passWord === this.state.repassWord){
        alert('비밀번호 일치');  
  
        var data = {
          userId : this.state.userId,
          passWord : this.state.passWord
        }

        var userData = JSON.stringify(data);
        
        const joinInfo = {
          method : 'POST',
          body : (userData),
          headers : {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Origin" : "http://127.0.0.1:5000/"
          }
        };
        fetch("http://127.0.0.1:5000/join/register", joinInfo)
        .then(res => {
          if (res.status === 200) {
            alert("회원가입 성공")
            loginPage()
          }else if (res.status === 403) {
            alert("회원가입 실패\n이미 존재하는 아이디입니다.")
            joinPage()
          }
        })      
    }else {
        alert('비밀번호 불일치');
        this.setState({
          userId : "",
          passWord : "",
          repassWord : ""
        });
        joinPage()
    }
  }

  render() {
    return (
      <div className="login-body" width="100%" height="100%">
        <form method="post" class="loginForm">
      <h2>Join</h2>
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
      <div className="passForm">
       <input
        id="passWord"
        className="pw"
        name="password"
        type="password"
        placeholder="비밀번호를 한번 더 입력해주세요"
        onChange={this.handleRepassWord}
      />
      </div>
      <Link to="/" style={{textDecoration: 'Done'}}>
      <button className="joinBtn" onClick = {this.handleSubmit}>회원가입</button></Link>
      </form>
      </div>
    );
  };
}

export default Join;