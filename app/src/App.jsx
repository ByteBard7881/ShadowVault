import { Routes, Route } from "react-router-dom";
import Packet from "./Packet";
import Malicious from "./Malicious";
import Home from "./Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/packet" element={<Packet />} />
      <Route path="/malicious" element={<Malicious />} />
    </Routes>
  );
}

export default App;
