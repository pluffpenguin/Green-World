import * as THREE from "three";

import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";

import { setup_renderer } from "./Classes/Settings.jsx"

// import CameraClass from "./Classes/Camera.jsx";
import PlayerClass from "./Classes/Player.jsx";

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
