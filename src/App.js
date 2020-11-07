import React from "react";
import Logo from "./assets/LOGO.jpeg";
import IMG from "./assets/img.svg";
import { Navbar, Nav, Container, Image, Jumbotron } from "react-bootstrap";

function App() {
  const jumbotronStyle = {
    backgroundImage: `url(${IMG})`,
    minHeight: "750px",
    // backgroundAttachment: "fixed",
    backgroundPosition: "-5rem -12rem",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  const aboutStyle = {
    height: "50em ",
    width: "100%",
    backgroundColor: "#0F222D",
  };

  const aboutText = {
    width: "25rem",
    height: "25rem",
    backgroundColor: "white",
    display: "flex",
  };
  return (
    <div className="App">
      <Navbar>
        <Container>
          <Navbar.Brand href="#home">
            <img src={Logo} alt="" width="100" />
          </Navbar.Brand>
          <Nav inline>
            <Nav.Link className="text-dark" href="#home">
              Home
            </Nav.Link>
            <Nav.Link className="text-dark" href="#features">
              About
            </Nav.Link>
            <Nav.Link className="text-dark" href="#pricing">
              Projects
            </Nav.Link>
            <Nav.Link className="text-dark" href="#pricing">
              Contact
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div style={jumbotronStyle}>
        <Container >
          <div style={{marginTop:'15rem', display:'inline-block'}}>
            <h1>Hello. I'm Fitriani Nasir</h1>
            <h3>A Web Enthusiast</h3>
            <div style={{}}>CONTACT ME</div>
          </div>
        </Container>
      </div>
      <div style={aboutStyle}>{/* <div style={aboutText}></div> */}</div>
    </div>
  );
}

export default App;
