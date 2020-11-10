import React, { useState, useEffect, useMemo } from "react";
import Logo from "./assets/LOGO.jpeg";
import IMG from "./assets/img.svg";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useTransition, a } from "react-spring";
import shuffle from "lodash/shuffle";
import useMeasure from "./useMeasure";
import useMedia from "./useMedia";
import images from "./images";
import "./App.sass";

function App() {
  // Hook1: Tie media queries to the number of columns
  const columns = useMedia(
    ["(min-width: 1500px)", "(min-width: 1000px)", "(min-width: 600px)"],
    [5, 4, 3],
    2
  );
  // Hook2: Measure the width of the container element
  const [bind, { width }] = useMeasure();
  // Hook3: Hold items
  const [items, set] = useState(images);
  // Hook4: shuffle data every 2 seconds
  useEffect(() => void setInterval(() => set(shuffle), 3000), []);
  // Hook5: Form a grid of stacked items using width & columns we got from hooks 1 & 2
  const [heights, gridItems] = useMemo(() => {
    let heights = new Array(columns).fill(0); // Each column gets a height starting with zero
    let gridItems = items.map((child, i) => {
      const column = heights.indexOf(Math.min(...heights)); // Basic masonry-grid placing, puts tile into the smallest column using Math.min
      const xy = [
        (width / columns) * column,
        (heights[column] += child.height / 2) - child.height / 2,
      ]; // X = container width / number of columns * column index, Y = it's just the height of the current column
      return { ...child, xy, width: width / columns, height: child.height / 2 };
    });
    return [heights, gridItems];
  }, [columns, items, width]);
  // Hook6: Turn the static grid values into animated transitions, any addition, removal or change will be animated
  const transitions = useTransition(gridItems, (item) => item.css, {
    from: ({ xy, width, height }) => ({ xy, width, height, opacity: 0 }),
    enter: ({ xy, width, height }) => ({ xy, width, height, opacity: 1 }),
    update: ({ xy, width, height }) => ({ xy, width, height }),
    leave: { height: 0, opacity: 0 },
    config: { mass: 5, tension: 500, friction: 100 },
    trail: 25,
  });
  const jumbotronStyle = {
    backgroundImage: `url(${IMG})`,
    minHeight: "750px",
    // backgroundAttachment: "fixed",
    backgroundPosition: "-5rem -12rem",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
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
            <Nav.Link className="text-dark" href="#about">
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
      <div id="home" style={jumbotronStyle}>
        <Container>
          <div style={{ marginTop: "15rem", display: "inline-block" }}>
            <h1>Hello. I'm Fitriani Nasir</h1>
            <h2 style={{ fontFamily: "Caveat Brush" }}>A Web Enthusiast</h2>
            <br />
            <a href="#" class="cta">
              <span>Curriculum Vitae</span>
              <svg width="13px" height="10px" viewBox="0 0 13 10"></svg>
            </a>
          </div>
        </Container>
      </div>
      <Container id="about">
        <div {...bind} class="list" style={{ height: Math.max(...heights) }}>
          {transitions.map(({ item, props: { xy, ...rest }, key }) => (
            <a.div
              key={key}
              style={{
                transform: xy.interpolate(
                  (x, y) => `translate3d(${x}px,${y}px,0)`
                ),
                ...rest,
              }}
            >
              <div style={{ backgroundImage: item.css }} />
            </a.div>
          ))}
        </div>
        <p className="about-text">
          I am a final-year student in the Department of Informatics Engineering
          at Hasanuddin University. I am interested in Website Development, Data
          Science, and other technology areas. I am currently a lead of one of
          the global communities powered by Google Developer, namely DSC or
          Developer Student Clubs Chapter Hasanuddin University.
        </p>
      </Container>
      <Container style={{ height: "30rem" }}></Container>
    </div>
  );
}

export default App;
