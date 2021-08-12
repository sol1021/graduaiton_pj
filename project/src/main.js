import React, { Component,useState } from 'react';
import './main.css';
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300&display=swap" rel="stylesheet"></link>
//<input id="record" type="submit" value="Start/Stop Recording" name="rec" />

const Main=()=>{
  
  let [num,num1] = useState(0);

  let [Q,Q1] = useState(['1분 자기소개','입사 후 포부가 무엇입니까?','본인의 직업관은 무엇이니까?','당신에게 일이 왜 중요합니까?','일하는 목적이 무엇입니까?','인생의 목표는 무엇입니까?','기업의 사회적인 책임은 무엇이라고 생각합니까?','본인 만의 커뮤니케이션 방법은','입사 후 회사와 맞지 않는다면 어떻게 하시겠습니까?','본인만의 스트레스 해소법에 대해 이야기해주세요.','공익과 사익 중 무엇을 더 추구해야 한다고 생각합니까?','당신이 면접관이라면 어떤 것을 중심으로 평가하겠습니까?','다른 회사에도 합격하면 어느 회사에 입사할 것입니까?','우리 회사에 떨어진다면 어떻게 할 생각입니까?','입사 후 희망 부서에 배치가 되지 않는다면?','우리 회사의 장단점에 대해 설명해주세요.','우리 회사에 궁금한 점이나 질문이 있나요?','입사를 위해 어떤 노력을 했습니까?','우리 회사를 알게 된 경로는 무엇인가요?','우리 회사의 이미지에 대해 이야기해주세요.','본인의 차별화된 강점이 있나요?','본인의 장단점에 대해 말해주세요.','본인의 약점은 무엇이고 이를 극복한 경험은 있나요?','본인의 성격을 한 단어로 표현하여 이를 역량과 연관 지어 말해보세요.','학업 이외에 시간이나 노력을 열정적으로 투자해 본 경험은 무엇입니까?','전공을 어떻게 직무에서 활용할 수 있습니까?','기억에 남는 대학생활 경험에 대해 말해보세요.','본인의 갈등이나 좌절한 경험에 대해 말해주세요.','조직 문화란 무엇이라고 생각하시나요?','입사하면 어떤 사람이 되고 싶나요?','당신이 매일 아침 일어나 직장을 오게 되는 동기는 무엇인가요?','당신의 커리어와 관련하여 최근의 읽은 책은 무엇인가요?','최근에 읽은 신문기사에 대해 소개해 주세요.','팀워크를 발휘했던 경험에 대해 이야기해 주십시오.','최근 관심있는 사회 문제는 무엇입니까?','대외 활동(공모전, 봉사, 인턴 등) 경험을 소개해 주세요','본인은 리더형입니까, 팔로워형입니까?','야근과 주말 근무에 대해 어떻게 생각하십니까?','본인은 창의적인 사람입니까?','워라밸에 대해 어떻게 생각하십니까?','회사의 사회적 책임은 무엇이라고 생각하십니까?']);

  function change(){
    var n;
    for(var i =0; i<39;i++){
      n = parseInt(Math.floor(Math.random() * 39));
      if(n == num || n==0) continue;
      else break;
    }
    num1(n);
  }
  
  return (
    <div className ="center">
       <div className="question-box">
         <p id="question">{Q[num]}</p>
      </div>
      <div className="btn-0">
      <button onClick ={change} className="question-button">질문 change</button>
      <form method="post" action="/main">
        <input className="start" type="submit" value="Stop/Start" name="stop" />
			  </form>
        </div>
        
      <img className="video" src="http://localhost:5000/video_feed" alt="Video"/>
    </div>
  );
};

export default Main;