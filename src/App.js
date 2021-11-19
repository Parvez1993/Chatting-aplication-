import "semantic-ui-css/semantic.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./components/Signin";
import Signup from "./components/Signup";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
