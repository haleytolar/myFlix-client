import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import Container from 'react-bootstrap/Container';
import "./index.scss";

const App = () => {
  return (
    <Container style={{ textAlign: "center", padding: "20px" }}>
      <h1 style={{ marginBottom: "20px", fontSize: "4em", color: "white" }}>🄼🄾🅅🄸🄴🄵🄻🄸🅇</h1>
      <MainView />
    </Container>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<App />);
