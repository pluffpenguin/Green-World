import {useEffect} from "react";
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

    const scene2 = new THREE.Scene();
    const cam2 = new THREE.PerspectiveCamera(
        90,
        1,
        0.1,
        1000
    )
    cam2.position.z = 30;
    const canvas2 = document.getElementById("myThreeJsCanvas2")
    const canvas2_container = document.getElementById("canvas2-container")
    const renderer2 = new THREE.WebGLRenderer({
      canvas2,
      antialias: true,
    });
    renderer2.setSize(250, 250);
    canvas2_container.appendChild(renderer2.domElement)



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

    const baseplateGeometry = new THREE.BoxGeometry(100, 1, 100);
    const baseplateMaterial = new THREE.MeshNormalMaterial();
    const baseplateMesh = new THREE.Mesh(baseplateGeometry, baseplateMaterial);
    scene.add(baseplateMesh);

    const sphere = new THREE.SphereGeometry(16,16,16);
    const sphereMat = new THREE.MeshNormalMaterial();
    const sphereMesh = new THREE.Mesh(sphere, sphereMat);
    scene2.add(sphereMesh);

    baseplateMesh.rotation.x = .6

    const animate = () => {
      // baseplateMesh.rotation.x += 0.01;
      // baseplateMesh.rotation.y += 0.01;
      renderer.render(scene, camera);
      renderer2.render(scene2,cam2)
      window.requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <>
      <div id="canvas2-container"></div>
      <canvas id="myThreeJsCanvas" />
    </>
  );
}

export default App;
