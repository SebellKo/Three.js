import React, {useEffect} from 'react';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls';
import { ConeGeometry } from 'three';

function Step12() {
    useEffect(() => {
        let scene, camera, renderer, geometry, material, trackballControls, clock;
    let add = 0.02;
    let createCube = function() {
        geometry = new THREE.BoxGeometry(3, 3, 3);
        material = new THREE.MeshStandardMaterial({color: 0xababab, metalness: 2});
        let cube = new THREE.Mesh(geometry, material);
        cube.position.y = 3;
        cube.position.x = -4;
        scene.add(cube);
    }
    let createSphere = function() {
        geometry = new THREE.SphereGeometry(2, 20, 20);
        material = new THREE.MeshStandardMaterial({color: 0x000fff, emissive: 0xb26363 ,metalness: 0});
        let sphere = new THREE.Mesh(geometry, material);
        sphere.position.y = 3;
        sphere.position.x = 1;
        scene.add(sphere);
    };
    let createCone = function() {
        geometry = new THREE.ConeGeometry(2, 3, 32);
        material = new THREE.MeshStandardMaterial({color: 0xbbabab, metalness: 1});
        let cone = new THREE.Mesh(geometry, material);
        cone.position.y = 3;
        cone.position.x = 6;
        scene.add(cone);
    };
    let init = function() {
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x48535f);
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.y = 30;
        camera.position.z = 20;
        camera.position.x = 5;
        camera.lookAt(scene.position);

        let pointLight = new THREE.PointLight(0xb26363);
        pointLight.position.set(0, 5, 3);
        scene.add(pointLight);

        let axesHelper = new THREE.AxesHelper(10);
        scene.add(axesHelper);
        axesHelper.position.y = 1;

        let gridHelper = new THREE.GridHelper(30, 10);
        scene.add(gridHelper);
        createCube();
        createSphere();
        createCone();

        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
        document.getElementById('three').appendChild(renderer.domElement);
        trackballControls = new TrackballControls(camera, renderer.domElement);
        clock = new THREE.Clock();
    }

    let render = function() {
        trackballControls.update(clock.getDelta());
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
    init();
    render();
    }, [])
    
    return (
        <div id="three">

        </div>
    );
};

export default Step12;