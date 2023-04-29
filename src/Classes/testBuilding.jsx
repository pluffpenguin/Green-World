import * as THREE from "three";

export class TestBuilding{
    constructor(scene, buildingName, sizeParams, hexcolor, position, activationRadius){
        this.buildGeometry = new THREE.CylinderGeometry(sizeParams.radius, sizeParams.radius, sizeParams.height, 32);
        this.buildingName = buildingName;
        this.buildMaterial = new THREE.MeshStandardMaterial({color: hexcolor});
        this.buildMesh = new THREE.Mesh(this.buildGeometry, this.buildMaterial);
        this.buildMesh.position.set(position.x, position.y, position.z);
        scene.add(this.buildMesh);
        // console.log('testBuilding.jsx: added BUILD MESH to scene: ', scene);
        this.activationRadius = activationRadius;
    }

    checkPosition(playerPosition){
        return this.buildMesh.position.distanceTo(playerPosition) <= this.activationRadius;
    }
}