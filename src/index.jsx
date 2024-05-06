import { createRoot } from "react-dom/client";
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MainView } from "./components/main-view/main-view";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";

const App = () => {
  return (
    <BrowserRouter>
      <Container style={{ textAlign: "center", padding: "20px" }}>
        <h1 style={{ marginBottom: "20px", fontSize: "4em", color: "white", textAlign: "left" }}>🄼🄾🅅🄸🄴🄵🄻🄸🅇</h1>
        <MainView />
      </Container>
    </BrowserRouter>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<App />);
