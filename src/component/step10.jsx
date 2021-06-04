import React, {useEffect} from 'react';
import * as THREE from 'three';
import {Face3} from 'three';
import * as dat from 'dat.gui';
import {Trackballcontrols} from 'three/examples/jsm/controls/TrackballControls';

function Step10() {
    // let scene, camera, renderer, navi, trackballControls;
    // let add = 0.7; // vertices 움직이는 속도.
    // let createNavi = function(){
    //     // let geometry = new THREE.Geometry();
    //     let material = new THREE.MeshBasicMaterial({color: 0xabcdff});
    //     navi = new THREE.Mesh(geometry, material);

    //     geometry.vertices.push(new THREE.Vector3(0, 0, 0)); //index0
    //     geometry.vertices.push(new THREE.Vector3(5, 0, 0));
    //     geometry.vertices.push(new THREE.Vector3(2, 4, 3));
    //     geometry.vertices.push(new THREE.Vector3(2, 4, -3));

    //     // let wing = [new THREE.Face3(0, 1, 2)];
    //     geometry.faes.push(wing);
    //     // wing = new THREE.Face(1, 3, 0);
    //     geometry.faces.push(wing);

    //     navi.rotation.x  = 0.4;
    //     navi.rotation.y = 0.6;

    //     scene.add(navi);
    // };
    // let init = function() {};
    // let render = function() {};

    // init();
    // render();
    return (
        <div id="three">

        </div>
    ); 
};

export default Step10;