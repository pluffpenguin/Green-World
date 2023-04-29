import * as THREE from "three";

export class InteractionSystem{
    constructor(scene){
        this.buildings = [];
    }

    setup_buildings(){
        let building1Position = new THREE.Vector3(-40, 10, -40);
        let building1 = new TestBuilding(scene, "Wind Turbine", {radius:5, height:20}, building1Position, 10);
        this.buildings.push(building1);


    }

    checkBuildingProximity(){
        for (let i = 0; i < this.buildings.length; i++){
            if (this.buildings[i].checkPosition()){
                
                break;
            }
        }
    }
}