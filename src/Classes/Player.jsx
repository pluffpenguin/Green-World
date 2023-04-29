import * as THREE from "three";

export default class PlayerClass{
    constructor(scene){
        this.camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.cdist = 20;
        this.setup();

        // Movement Configurations
        this.movementSpeed = 0.5;

        // Player Configurations
        this.playerHeight = 4;
        this.playerRadius = 2;
        this.playerGeometry = new THREE.CapsuleGeometry(this.playerRadius, this.playerHeight, 10, 20);
        this.playerMaterial = new THREE.MeshStandardMaterial({color: "#ffffff"});
        this.playerMesh = new THREE.Mesh(this.playerGeometry, this.playerMaterial);
        this.playerMesh.position.set(0, this.playerHeight/2, 0);
        scene.add(this.playerMesh)
    }

    setup(){
        // Requires: this.cdist;
        this.camera.position.x = this.cdist;
        this.camera.position.y = this.cdist;
        this.camera.position.z = this.cdist;

        this.camera.lookAt(new THREE.Vector3(0, 0, 0) );
    }

    setCameraPosition(newPosition){
        this.camera.position.set(newPosition.x, newPosition.y, newPosition.z);
    }

    setCameraLookAt(lookAtPos){
        this.camera.lookAt(lookAtPos);
    }

    getCameraPosition(){
        return this.camera.position;
    }

    getPlayerMesh(){
        return this.playerMesh;
    }

    updateMovement(movementDirection){
        console.log("playerPosition before:", this.playerMesh.position);
        // console.log('received MD: ', movementDirection);
        this.playerMesh.position.x += movementDirection.x * this.movementSpeed;
        this.playerMesh.position.z += movementDirection.z * this.movementSpeed;
        console.log("playerPosition AFTRER:", this.playerMesh.position);
    }

    updateCamera(){
        this.setCameraPosition(new THREE.Vector3(
            this.playerMesh.position.x + this.cdist, 
            this.playerMesh.position.y + this.cdist, 
            this.playerMesh.position.z + this.cdist));
    }
}

// module.exports = { CameraClass };