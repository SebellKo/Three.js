import React, {useEffect} from 'react';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls';

function Step5() {
    useEffect(() => {
        window.addEventListener('resize', onResize, false);
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
        
        var controls = new function() { // 생성자 함수 방식 객체 생성
            this.rotationSpeed = 0.1;
            this.bouncingSpeed = 0.2;
        };
        var gui = new dat.GUI();
        gui.add(controls, 'rotationSpeed', 0, 0.5);
        gui.add(controls, 'bouncingSpeed', 0, 0.5);

        document.getElementById('three2').appendChild(renderer.domElement);
        var trackballControls = new TrackballControls(camera, renderer.domElement);
        var clock = new THREE.Clock();

        function onResize() {
            camera.aspect = window.innerWidth / window.innerHeight; // 카메라 비율
            camera.updateProjectionMatrix();  // 카메라 투영 매트릭스를 업데이트. 카메라의 속성이 변경 될때마다 메소드 호출해야한다.
            renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
        }

        var renderScene = () => {
            cube.rotation.x += controls.rotationSpeed;
            cube.rotation.y += controls.rotationSpeed;
            cube.rotation.z += controls.rotationSpeed;
            step += controls.bouncingSpeed;
            cube.position.x = 2 + (3 * (Math.cos(step)));
            cube.position.y = 3 + (20 * Math.abs(Math.sin(step)));
            requestAnimationFrame(renderScene);
            renderer.render(scene, camera);
            trackballControls.update(clock.getDelta());
        }

        renderScene();

        
    }, []);

    return (
        <div id="three">
            <div id="three2">

            </div>
        </div>
    )
};

export default Step5;