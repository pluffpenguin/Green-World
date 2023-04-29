import * as THREE from "three";

export default class CameraClass{
    constructor(){
        this.camera = new THREE.PerspectiveCamera(
            90,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.setup();
    }

    setup(){
        this.cdist = 10;
        this.camera.position.x = this.cdist;
        this.camera.position.y = this.cdist;
        this.camera.position.z = this.cdist;

        this.camera.lookAt(new THREE.Vector3(0, 0, 0) );
        // this.camera.rotation.x = -.2;
        // this.camera.rotation.y = .8;
        // this.camera.rotation.z = 0.556;
    }

    setCameraPosition(newPosition){
        this.camera.position.set(newPosition);
    }

    setCameraLookAt(lookAtPos){
        this.camera.lookAt(lookAtPos);
    }
}

// module.exports = { CameraClass };