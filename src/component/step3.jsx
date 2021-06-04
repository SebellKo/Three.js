import React, {useEffect} from 'react';
import * as THREE from 'three';

function Step3 () {
    useEffect(() => {
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        var renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(new THREE.Color(0x000000));
        renderer.setSize(window.innerWidth * 0.5, window.innerHeight * 0.5);
        renderer.shadowMap.enabled = true; // 그림자를 받을 종이 준비.

        var axes = new THREE.AxesHelper(20);
        axes.position.set(-20, 3, 0);

        var planeGeometry = new THREE.PlaneGeometry(50, 20);
        var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -0.5 * Math.PI;
        plane.position.set(10, 15, 4);
        plane.receiveShadow = true;

        var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
        var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff});
        var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.set(-5, 22, 8);
        sphere.castShadow = true;

        var spotLight = new THREE.SpotLight(0xFFFFFF);
        spotLight.position.set(10 ,40, 10);
        spotLight.castShadow = true;
        spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);

        scene.add(axes);
        scene.add(sphere);
        scene.add(plane);
        scene.add(spotLight);
        
        camera.position.set(-30, 40, 10);
        camera.lookAt(scene.position);

        document.getElementById('three').appendChild(renderer.domElement);
        renderer.render(scene, camera);
    })
    return (
        <div id='three'>

        </div>
    )
};

export default Step3;