import React, {useEffect} from 'react';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls';

// 사용자가 3D뷰어 화면을 클릭한다.
// sphere가 화면에 생성된다. 생성된 sphere는 카메라와 거리가 50이다

function Step20() {
    useEffect(() => {
        let scene, sphere, camera, renderer, light1, rayCast, controls, clock, mouse;
        let createSphere = function(pos)
        {
            let geometry = new THREE.SphereGeometry(4, 30, 30);
            let material = new THREE.MeshPhongMaterial({color: 0xffffff * Math.random(), shininess: 100});
            sphere = new THREE.Mesh(geometry, material);
            sphere.position.set(pos.x, pos.y, pos.z);
            scene.add(sphere);
            console.log(pos.x, pos.y, pos.z);
        };

        let init = function()
        {
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xffffff);

            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.set(0, 30, 55);
            light1 = new THREE.DirectionalLight(0xffffff, 1);
            scene.add(light1);

            let grid = new THREE.GridHelper(100, 20);
            scene.add(grid);

            rayCast = new THREE.Raycaster();
            mouse = new THREE.Vector2();
            mouse.x = mouse.y = -1;

            renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.getElementById('three').appendChild(renderer.domElement);
            renderer.domElement.addEventListener('click', onMouseClick, false);

            controls = new TrackballControls(camera, renderer.domElement);
            clock = new THREE.Clock();
        };

        let onMouseClick = function(e)
        {
            let gap1 = e.clientX - e.offsetX;
            let gap2 = e.clientY - e.offsetY;
            mouse.x = ((e.clientX) / (window.innerWidth)) * 2 - 1;
            mouse.y = - ((e.clientY) / (window.innerHeight)) * 2 + 1;
            rayCast.setFromCamera(mouse, camera);
            createSphere(rayCast.ray.at(100));
        }
        
        let render = function()
        {
            controls.update(clock.getDelta());
            requestAnimationFrame(render);
            renderer.render(scene, camera);
        };

        init();
        render();

    }, []);
    return (
        <div id="three">

        </div>
    );
};

export default Step20;