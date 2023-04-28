import * as THREE from 'three';
import "./style.css"
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
//scene
const scene = new THREE.Scene();


//Create our sphere
const geometry = new THREE.SphereGeometry( 15, 32, 16 );
const material = new THREE.MeshBasicMaterial( { color: "#FF0000" } );
const sphere = new THREE.Mesh( geometry, material ); scene.add( sphere );
material.wireframe = true


//sizes
const sizes = {
    width: 800,
    height: 600,

}

//light
const light = new THREE.PointLight(0xffffff, 1 , 100)
light.position.set(0,10,10)
scene.add(light)

//Cam
const camera = new THREE.PerspectiveCamera(90,sizes.width/sizes.height, 0.1, 100)
camera.position.z = 50
scene.add(camera)



//renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(sizes.width,sizes.height)
renderer.render(scene,camera)

//controls
const controls = new OrbitControls(camera, canvas)


//Resize
window.addEventListener('resize', () => {
    sizes.width = 800
    sizes.height = 600
    //update camera
    camera.aspect = sizes.width/sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
})

const loop = () => {
    renderer.render(scene, camera)
    window.requestAnimationFrame((loop))
}
loop()