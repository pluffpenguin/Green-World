import {useEffect} from "react";
import { FBXLoader } from "three/addons/loaders/FBXLoader.js";
import {OBJLoader} from "three/addons/loaders/OBJLoader.js";
import { VOXLoader} from "three/addons/loaders/VOXLoader.js";
import { GLTFLoader} from "three/addons/loaders/GLTFLoader.js";

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
        5,
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
    const baseplateMaterial = new THREE.MeshStandardMaterial({
      color: "#055205"
        }
    );
    const baseplateMesh = new THREE.Mesh(baseplateGeometry, baseplateMaterial);

    scene.add(baseplateMesh);
    const ambientLight2 = new THREE.AmbientLight(0xffffff, 0.5);
    ambientLight2.castShadow = true;
    scene2.add(ambientLight);


    const spotLight2 = new THREE.SpotLight(0xffffff, 1);
    spotLight2.castShadow = true;
    spotLight2.position.set(0, 64, 32);
    scene2.add(spotLight2);



    let loadedModel = new THREE.Object3D();
    const loader = new GLTFLoader();
    loader.load ('src/assets/models/low_poly_earth.gltf', function ( gltf ) {
          // add the model to the scene
          loadedModel = gltf.scene;
          loadedModel.traverse( function ( child ) {
            if ( child.isMesh ) {
              if (child.material.map) {
                // This is a textured material, so we don't want to modify its color
                return;
              }
              // Set the material color to the original color
              child.material.color = child.material.color.clone();
            }
          });
          scene2.add( loadedModel );
        },
        // callback function called while the model is loading
        function ( xhr ) {
          console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // callback function called if an error occurs while loading the model
        function ( error ) {
          console.log( 'An error happened' );
        }
    );

    baseplateMesh.rotation.x = .6

    const animate = () => {
      loadedModel.rotation.y += 0.02;
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
