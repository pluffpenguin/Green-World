import { useEffect, useState } from "react";
import * as THREE from "three";
import "./App.css";

import { setup_renderer } from "./Classes/Settings.jsx"

// import CameraClass from "./Classes/Camera.jsx";
import PlayerClass from "./Classes/Player.jsx";

const playerMovespeed = 0.5;

function getMovementDirection(keysPressed) {
  var movementDirection = new THREE.Vector3(0, 0, 0);
  if (keysPressed['w']){
    movementDirection.x -= playerMovespeed;
  }
  if (keysPressed['a']){
    movementDirection.z += playerMovespeed;
  }
  if (keysPressed['s']){
    movementDirection.x += playerMovespeed;
  }
  if (keysPressed['d']){
    movementDirection.z -= playerMovespeed;
  }
  // Rotate to compensate for the Camera's angle
  var axis = new THREE.Vector3(0, 1, 0); // Normalized Vector
  var angle = -Math.PI/4;
  movementDirection.applyAxisAngle(axis, angle);
  movementDirection.normalize();

  return movementDirection;
}

function App() {
  useEffect(() => {
    const scene = new THREE.Scene();

    let PlayerController = new PlayerClass(scene);
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
    // const playerGeometry = new THREE.CapsuleGeometry(2, 4, 10, 20);
    // const playerMaterial = new THREE.MeshStandardMaterial({color: "#ffffff"});
    // const playerMesh = new THREE.Mesh(playerGeometry, playerMaterial);
    // playerMesh.position.set(0, 3, 0);
    // scene.add(PlayerController.getPlayerMesh());

    // Input Event Listener

    let keysPressed = {};
    document.addEventListener('keydown', (event) => {
      console.log('key:', event.key.toLowerCase());
      keysPressed[event.key.toLowerCase()] = true;
    });

    document.addEventListener('keyup', (event) => {
      keysPressed[event.key.toLowerCase()] = false;
    });

    // Animate
    const animate = () => {
      // boxMesh.rotation.x += 0.01;
      // boxMesh.rotation.y += 0.01;
      let movementDirection = getMovementDirection(keysPressed);
      PlayerController.updateMovement(movementDirection);
      PlayerController.updateCamera();
      // Update function
      
      
      // PlayerController.setLookAt(playerMesh.position);
        
      // update_movement(playerMesh, keysPressed);
      // console.log('cam pos:', PlayerController.getCameraPosition());
      // console.log('keys:', 'w: ', keysPressed['w'], 'a: ', keysPressed['a'], 's: ', keysPressed['s'], 'd: ', keysPressed['d']);
      
      renderer.render(scene, PlayerController.camera);
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
