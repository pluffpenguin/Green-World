
import * as THREE from "three";

import { TestBuilding } from "./testBuilding";

export class InteractionSystem{
    constructor(scene){
        this.buildings = [];
        this.scene = scene;
    }

    setup_buildings(){
        let b1p = new THREE.Vector3(-30, 10, -30);
        let b1 = new TestBuilding(
            this.scene, "Wind Turbine", 
            {radius:5, height:20}, 
            "#ff1fa9", 
            b1p, 20);
        b1.buildMesh.visible = true;
        

        let b2p = new THREE.Vector3(60, 10, -40);
        let b2 = new TestBuilding(
            this.scene, "Geothermal Power Plant", 
            {radius:5, height:20}, 
            "#9c4a2f", 
            b2p, 20);
        
        let b3p = new THREE.Vector3(-20, 10, 50);
        let b3 = new TestBuilding(
            this.scene, "Nuclear Power Plant", 
            {radius:5, height:20}, 
            "#03fc1c", 
            b3p, 20);

        let b4p = new THREE.Vector3(-20, 10, -80);
        let b4 = new TestBuilding(
            this.scene, "Solar Panels", 
            {radius:5, height:20}, 
            "#ffee00", 
        b4p, 20);
        
        this.buildings.push(b1);
        this.buildings.push(b2);
        this.buildings.push(b3);
        this.buildings.push(b4);

        for (let i = 0; i < this.buildings.length; i++){
            this.buildings[i].info = "";
        }
    }

    checkBuildingProximity(playerPosition){
        for (let i = 0; i < this.buildings.length; i++){
            if (this.buildings[i].checkPosition(playerPosition)){
                console.log("PROXIMITY: ", this.buildings[i].buildingName);
                let info_text = this.buildings[i].info.pros;
                break;
            }
        }
    }
}