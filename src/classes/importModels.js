import * as THREE from "three";
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";

export default class Model3D {
    constructor(path, scene, activationRadius) {
        this.loadedModel = new THREE.Object3D();
        this.activationRadius = activationRadius;
        const loader = new GLTFLoader();
        loader.load(path, (gltf) => {
                // add the model to the scene
                this.loadedModel = gltf.scene;
                this.loadedModel.traverse(function (child) {
                    if (child.isMesh) {
                        if (child.material.map) {
                            // This is a textured material, so we don't want to modify its color
                            return;
                        }
                        // Set the material color to the original color
                        child.material.color = child.material.color.clone();
                    }
                });
                scene.add(this.loadedModel);
            },
            // callback function called while the model is loading
            function (xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            // callback function called if an error occurs while loading the model
            function (error) {
                console.log(error);
            }
        );
    }
    rotate_y(stud){
        this.loadedModel.rotation.y += stud;
    }
    checkPosition(playerPosition){
        return this.loadedModel.position.distanceTo(playerPosition) < this.activationRadius;
    }
}


