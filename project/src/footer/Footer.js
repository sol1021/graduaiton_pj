import './Footer.css';
import { Container, Row, Col } from 'reactstrap';
import {FcAbout} from  'react-icons/fc';
/*npm install --save bootstrap
npm install --save reactstrap*/

const Footer = () => {
  return (
    <footer className="footer">
      <Container fluid>
          <Row>
              <Col className="about">
                  <h6>About us<FcAbout size="2em"/></h6>
                  <p>Scanfcode.com <i>CODE WANTS TO BE SIMPLE </i> is an initiative  to help the upcoming programmers with the code. Scanfcode focuses on providing the most efficient code or snippets as the code wants to be simple. We will help programmers build up concepts in different programming languages that include C, C++, Java, HTML, CSS, Bootstrap, JavaScript, PHP, Android, SQL and Algorithm.</p>
                  </Col>
              <Col className="link">
                  <h6>Quick Links</h6>
                  <li>main</li>
                  <li>home page</li>
                  <li>login page</li>
                  <li>join page</li>
                  </Col>
              <Col className="contact">
                  <h6>Contact us</h6>
                  </Col>
          </Row>
      </Container>
    </footer>
  )
}

export default Footer