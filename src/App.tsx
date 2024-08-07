import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { Landing } from "./pages/Landing";
// import { About } from "./pages/About"; // Uncomment if you have an About page
import "./index.css";
import { useState } from "react";

function App() {
  const [connectedAccount, setConnectedAccount] = useState("");

  return (
    <Router>
      <Navbar
        connectedAccount={connectedAccount}
        setConnectedAccount={setConnectedAccount}
      />
      <Routes>
        <Route
          path="/"
          element={<Landing connectedAccount={connectedAccount} />}
        />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
