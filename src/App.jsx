import { useEffect, useState } from "react";
import * as THREE from "three";
import "./App.css";

function App() {
  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      90,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    // Initial Camera positioning
    const cdist = 20;
    camera.position.x = cdist;
    camera.position.y = cdist;
    camera.position.z = cdist;
    
    camera.lookAt(new THREE.Vector3(0, 0, 0) );
    camera.rotation.x = -.2;
    camera.rotation.y = .8;
    camera.rotation.z = 0.556;
    

    const canvas = document.getElementById("myThreeJsCanvas");
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    ambientLight.castShadow = true;
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.castShadow = true;
    spotLight.position.set(0, 64, 32);
    scene.add(spotLight);

    const baseplateGeometry = new THREE.baseplateGeometry(100, 1, 100);
    const baseplateMaterial = new THREE.MeshNormalMaterial();
    const baseplateMesh = new THREE.Mesh(baseplateGeometry, baseplateMaterial);
    scene.add(baseplateMesh);

    baseplateMesh.rotation.x = .6

    const animate = () => {
      // baseplateMesh.rotation.x += 0.01;
      // baseplateMesh.rotation.y += 0.01;
      renderer.render(scene, camera);
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
