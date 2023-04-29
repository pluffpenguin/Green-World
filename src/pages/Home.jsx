import * as THREE from "three";
import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Modal from "../components/Modal";
import { AnimatePresence } from "framer-motion";

function Home() {
  const [showModal, setShowModal] = useState(false); // set true for testing, false for production

  // useEffect(() => {
  //   const scene = new THREE.Scene();

  //   const camera = new THREE.PerspectiveCamera(
  //     75,
  //     window.innerWidth / window.innerHeight,
  //     0.1,
  //     1000
  //   );
  //   camera.position.z = 96;

  //   const canvas = document.getElementById("myThreeJsCanvas");
  //   const renderer = new THREE.WebGLRenderer({
  //     canvas,
  //     antialias: true,
  //   });
  //   renderer.setSize(window.innerWidth, window.innerHeight);
  //   document.body.appendChild(renderer.domElement);

  //   const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  //   ambientLight.castShadow = true;
  //   scene.add(ambientLight);

  //   const spotLight = new THREE.SpotLight(0xffffff, 1);
  //   spotLight.castShadow = true;
  //   spotLight.position.set(0, 64, 32);
  //   scene.add(spotLight);

  //   const boxGeometry = new THREE.BoxGeometry(16, 16, 16);
  //   const boxMaterial = new THREE.MeshNormalMaterial();
  //   const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
  //   scene.add(boxMesh);

  //   const animate = () => {
  //     boxMesh.rotation.x += 0.01;
  //     boxMesh.rotation.y += 0.01;
  //     renderer.render(scene, camera);
  //     window.requestAnimationFrame(animate);
  //   };
  //   animate();
  // }, []);

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
