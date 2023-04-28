import { useState } from 'react'
import * as THREE from 'three';
import './App.css'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <canvas id="myThreeJsCanvas" />
      <h1>Hello world</h1>
    </>
  )
}

export default App
