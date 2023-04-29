import { useEffect, useState } from "react";
import * as THREE from "three";
import "./App.css";

import { setup_renderer } from "./Classes/Settings.jsx"

import CameraClass from "./Classes/Camera.jsx";

const playerMovespeed = 0.5;
let keyPressed = {};

function update_movement(playerMesh) {
  if (keyPressed['w']){
    playerMesh.position.x += playerMovespeed;
  }
  if (keyPressed['a']){
    playerMesh.position.z += playerMovespeed;
  }
  if (keyPressed['s']){
    playerMesh.position.x -= playerMovespeed;
  }
  if (keyPressed['d']){
    playerMesh.position.z -= playerMovespeed;
  }
}

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
    setup_renderer(renderer);
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
    const baseplateMaterial = new THREE.MeshStandardMaterial({color: "#00b84c"});
    const baseplateMesh = new THREE.Mesh(baseplateGeometry, baseplateMaterial);
    baseplateMesh.position.set(0, -1, 0);
    scene.add(baseplateMesh);
    
    
    // Player Block
    const playerGeometry = new THREE.CapsuleGeometry(2, 4, 10, 20);
    const playerMaterial = new THREE.MeshStandardMaterial({color: "#ffffff"});
    const playerMesh = new THREE.Mesh(playerGeometry, playerMaterial);
    playerMesh.position.set(0, 3, 0);
    scene.add(playerMesh);

    // Input Event Listener

    document.addEventListener('keydown', (event) => {
      console.log('key:', event.key.toLowerCase());
      keyPressed[event.key.toLowerCase()] = true;
      update_movement(playerMesh);
    });

    document.addEventListener('keyUp', (event) => {
      keyPressed[event.key.toLowerCase()] = false;
      update_movement(playerMesh);
    });

    // Animate
    const animate = () => {
      // boxMesh.rotation.x += 0.01;
      // boxMesh.rotation.y += 0.01;

      // Update Player Movement
      // update_movement(playerMesh);

      // Update function
      // CameraController.setCameraPosition(new THREE.Vector3(
        // playerMesh.position.x + CameraController.cdist, 
        // playerMesh.position.y + CameraController.cdist, 
        // playerMesh.position.z + CameraController.cdist));
        // 10, 10, 10));
      update_movement(playerMesh);
      CameraController.setCameraLookAt(playerMesh.position);
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
