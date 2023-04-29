import * as THREE from "three";

import Model3D from "./importModels.js";

export class TestBuilding{
    constructor(scene, sizeParams, hexcolor, position, activationRadius){
        this.buildGeometry = new THREE.CylinderGeometry(sizeParams.radius, sizeParams.radius, sizeParams.height, 32);
        // this.buildMaterial = new THREE.MeshStandardMaterial({color: "#ff4069"});
        this.buildMaterial = new THREE.MeshStandardMaterial({color: hexcolor});
        this.buildMesh = new THREE.Mesh(this.buildGeometry, this.buildMaterial);
        this.buildMesh.position.set(position.x, position.y, position.z);
        scene.add(this.buildMesh);
        this.activationRadius = activationRadius;
    }

    checkPosition(playerPosition){
        return this.buildMesh.position.distanceTo(playerPosition) <= this.activationRadius;
    }
}