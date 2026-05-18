import { useState } from "react";
import { Home } from "./pages/Home";
import { Upload } from "./pages/Upload";
import "../app.css"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <nav className="mainNav">
        <Link to="/">Home</Link>
        <Link to="/upload">Upload</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Upload" element={<Upload />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
