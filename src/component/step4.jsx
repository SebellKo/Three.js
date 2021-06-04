import React, {useEffect} from 'react';
import * as THREE from 'three';

function Step4 () {
    useEffect(() => {
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        var renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(new THREE.Color(0x000000));
        renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
        renderer.shadowMap.enabled = true

        var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(-5, 30, 15);
        spotLight.castShadow = true;

        var planeGeometry = new THREE.PlaneGeometry(40, 60);
        var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.position.set(0, 0, 10);
        plane.rotation.x = -0.4 * Math.PI;
        plane.receiveShadow = true;

        var cubeGeometry = new THREE.BoxGeometry(5, 5, 5);
        var cubeMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff});
        var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.position.y = 6;
        cube.position.x = 4;
        cube.position.z = -5;
        cube.rotation.x = 60;
        cube.castShadow = true;

        var axes = new THREE.AxesHelper(20);
        axes.position.set(5, 0, 10);

        scene.add(cube);
        scene.add(axes);
        scene.add(plane);
        scene.add(spotLight);

        camera.position.set(10, 50, -15);
        camera.lookAt(scene.position);

        var step = 0;
        document.getElementById('three').appendChild(renderer.domElement);
        

        var renderScene = () => {
            cube.rotation.x += 0.02;
            cube.rotation.y += 0.02;
            cube.rotation.z += 0.02;
            step += 0.02;
            cube.position.x = 2 + (3 * (Math.cos(step)));
            cube.position.y = 3 + (20 * Math.abs(Math.sin(step)));
            requestAnimationFrame(renderScene);
            renderer.render(scene, camera);
        }

        renderScene();
    })

    return (
        <div id="three">

        </div>
    )
};

export default Step4;