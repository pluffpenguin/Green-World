import * as THREE from "three";

import "../styles/App.css";
import { setup_renderer } from "../Classes/Settings.jsx";

import PlayerClass from "../Classes/Player.jsx";

import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Modal from "../components/Modal";
import { AnimatePresence } from "framer-motion";

// [[ MARIO 4 IMPORTS ]]
import { FBXLoader } from "three/addons/loaders/FBXLoader.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { VOXLoader } from "three/addons/loaders/VOXLoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import model3D from "../Classes/importModels.js";
import TextBox from "../components/TextBox";

const playerMovespeed = 0.5;

function getMovementDirection(keysPressed) {
  var movementDirection = new THREE.Vector3(0, 0, 0);
  if (keysPressed["w"]) {
    movementDirection.x -= playerMovespeed;
  }
  if (keysPressed["a"]) {
    movementDirection.z += playerMovespeed;
  }
  if (keysPressed["s"]) {
    movementDirection.x += playerMovespeed;
  }
  if (keysPressed["d"]) {
    movementDirection.z -= playerMovespeed;
  }
  // Rotate to compensate for the Camera's angle
  var axis = new THREE.Vector3(0, 1, 0); // Normalized Vector
  var angle = -Math.PI / 4;
  movementDirection.applyAxisAngle(axis, angle);
  movementDirection.normalize();

  return movementDirection;
}

function Home() {
  const [showModal, setShowModal] = useState(false); // set true for testing, false for production

  useEffect(() => {
    const scene = new THREE.Scene();

    let PlayerController = new PlayerClass(scene);
    // Input Controller

    // [[ MARIO 1 ]]
    const scene2 = new THREE.Scene();
    const cam2 = new THREE.PerspectiveCamera(5, 1, 0.1, 1000);
    cam2.position.z = 30;
    const canvas2 = document.getElementById("globe-3js");
    console.log(canvas2);
    const renderer2 = new THREE.WebGLRenderer({
      canvas: canvas2,
      antialias: true,
    });
    renderer2.setSize(60, 60);
    renderer2.setClearColor(0x000000, 0);
    //canvas2_container.appendChild(renderer2.domElement);

    // [[ END OF MARIO 1 ]]

    const canvas = document.getElementById("myThreeJsCanvas");
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
    });
    setup_renderer(renderer);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    ambientLight.castShadow = true;
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.castShadow = true;
    spotLight.position.set(0, 64, 32);
    scene.add(spotLight);

    // [[ MARIO 2 ]]
    //initializes into the scene
    let logoModel = new model3D(
      "src/assets/models/low_poly_earth.gltf",
      scene2
    );

    const light = new THREE.PointLight(0xffffff, 2, 200);
    light.position.set(4.5, 10, 4.5);
    scene2.add(light);
    // [[ END OF MARIO 2 ]]

    // Baseplate
    const baseplateGeometry = new THREE.BoxGeometry(100, 1, 100);
    const baseplateMaterial = new THREE.MeshStandardMaterial({
      color: "#00b84c",
    });
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
    document.addEventListener("keydown", (event) => {
      console.log("key:", event.key.toLowerCase());
      keysPressed[event.key.toLowerCase()] = true;
    });

    document.addEventListener("keyup", (event) => {
      keysPressed[event.key.toLowerCase()] = false;
    });

    // Animate
    const animate = () => {
      logoModel.rotate_y(0.02);
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
      renderer2.render(scene2, cam2);
      window.requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <>
      <Nav
        canvas={
          <div id="canvas2-container" className="logo">
            <canvas id="globe-3js" />
          </div>
        }
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <canvas id="myThreeJsCanvas" />

      <AnimatePresence>
        {showModal && <Modal setShowModal={setShowModal} />}
      </AnimatePresence>
    </>
  );
}

export default Home;
