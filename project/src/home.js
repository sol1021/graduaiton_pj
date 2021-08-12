import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import imgA from './img/ImgMain.png';
import imgB from './img/icon.png';
import {FcDoughnutChart} from 'react-icons/fc';
import {FcCollaboration} from 'react-icons/fc';
import {FcWebcam} from 'react-icons/fc';
import './home.css';
<link href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,752;0,800;1,900&display=swap" rel="stylesheet"></link>

const Home = () =>{
  <link href="https://fonts.googleapis.com/css2?family=Jua&display=swap" rel="stylesheet"></link>
  return (
    <div style={{ 
      width:"1900px",
      height:"1600px",
      backgroundImage: `url(${imgB})` }}>
    <div className="main">
      <img className="mainImg" src={imgA}/>
      </div>
    <Container className="container">
      <Row>
        <Col className="div-col">
        <div className="home_container">
        <div className="icon">
        <FcDoughnutChart size="7em"/>
        </div>
        <p className="home_text">AI모의면접의 결과를 파이 차트를 통해서 눈의 시선과 표정을 차트로 확인할 수 있습니다. 차트를 통해서 사용자의 눈의 시선과 표정의 교정을 통해서 실전 면접에서 안정적인 시선처리와 밝은 표정을 보여줄 수 있도록 도움을 줍니다.</p>
        </div>
        </Col>
        <Col className="div-col">
        <div className="home_container">
        <FcCollaboration size="7em"/>
        <p className="home_text">AI모의 면접을 통해서 다양한 면접 예상 질문으로 미리 연습할 수 있습니다. 실전 면접을 대비하여 AI면접의 실전력을 길러 실전 면접에서 좋은 결과를 기대해 볼 수 있습니다.</p>
        </div></Col>
        <Col className="div-col">
        <div className="home_container">
        <FcWebcam size="7em"/>
        <p className="home_text">AI면접의 경험이 없는 사람들을 위한 AI모의면접은 미리 컴퓨터 카메라를 통한 면접에 익숙함을 줄 수 있습니다. AI모의면접은 AI면접을 대비하여 사용자가 많은 준비를 할 수 있도록 도와줍니다.</p>
        </div>
        </Col>
      </Row>
    </Container>
    </div>
  )
}

export default Home;