import { useEffect, useState } from "react";
import * as THREE from "three";
import "./App.css";

import CameraClass from "./Classes/Camera.jsx";



function App() {
  useEffect(() => {
    const scene = new THREE.Scene();

    let CameraController = new CameraClass();
    // Input Controller

    const canvas = document.getElementById("myThreeJsCanvas");
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    ambientLight.castShadow = true;
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.castShadow = true;
    spotLight.position.set(0, 64, 32);
    scene.add(spotLight);

    // Baseplate
    const baseplateGeometry = new THREE.BoxGeometry(100, 1, 100);
    const baseplateMaterial = new THREE.MeshNormalMaterial();
    const baseplateMesh = new THREE.Mesh(baseplateGeometry, baseplateMaterial);
    scene.add(baseplateMesh);

    // Input Controller
    const onKeyDown = (event) => {
      switch (event.keyCode) {
        case 87: // w
          CameraController.camera.position.z -= 1;
          break;
        case 65: // a
          CameraController.camera.position.x -= 1;
          break;
        case 83: // s
          CameraController.camera.position.z += 1;
          break;
        case 68: // d
          CameraController.camera.position.x += 1;
          break;
      }
    };

    window.addEventListener('keydown', onKeyDown);

    // Animate
    const animate = () => {
      // boxMesh.rotation.x += 0.01;
      // boxMesh.rotation.y += 0.01;
      renderer.render(scene, CameraController.camera);
      window.requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <>
      <canvas id="myThreeJsCanvas" />
    </>
  );
}

export default App;
