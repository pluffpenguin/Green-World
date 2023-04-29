import * as THREE from "three";
import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Modal from "../components/Modal";
import { AnimatePresence } from "framer-motion";

function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* <canvas id="myThreeJsCanvas" /> */}
      <Nav showModal={showModal} setShowModal={setShowModal} />

      <AnimatePresence>
        {showModal && <Modal setShowModal={setShowModal} />}
      </AnimatePresence>
    </>
  );
}

export default Home;
