import React from "react";
import "./App.css";
import { Home } from "./components/Home";
import GlobalFonts from "./fonts/fonts";
import styled from "styled-components";

const Container = styled.div`
  margin: 0;
`;

function App() {
  return (
    <Container>
      <GlobalFonts />
      <Home />
    </Container>
  );
}

export default App;
