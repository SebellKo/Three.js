import React, {useEffect} from 'react';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls';

function Step15() {
    useEffect(() => {
        let scene, camera, renderer, trackballControls, clock, light1;
        let cylinder,sphere, plane;
        let ADD = 0.01, default_value = 0;
        let createGeometry = function () {
            let geometry = new THREE.CylinderGeometry(5, 5, 20, 32);
            let material = new THREE.MeshPhongMaterial({color: 0x448844, shininess: 100, side: THREE.DoubleSide});
            cylinder = new THREE.Mesh(geometry, material);
            cylinder.position.set(6, 0, -2);

            geometry = new THREE.SphereGeometry(5, 30, 30);
            material = new THREE.MeshPhongMaterial({color: 0x693421, side: THREE.DoubleSide});
            sphere = new THREE.Mesh(geometry, material);
            sphere.position.set(-5, 5 ,2);

            geometry = new THREE.BoxGeometry(2000, 1, 2000);
            material = new THREE.MeshPhongMaterial({color: 0xabcdef, side: THREE.DoubleSide});
            plane = new THREE.Mesh(geometry, material);
            plane.position.y = -1;

            scene.add(cylinder);
            scene.add(sphere);
            scene.add(plane);
        };

        let init = function() {
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0x303940);
            camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.set(0, 10, -11);
            camera.lookAt(scene.position);
            renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
            renderer.shadowMap.enabled = true;

            let pointLight = new THREE.SpotLight(0xffffff);
            pointLight.position.set(0, 10, 20);
            scene.add(pointLight);

            createGeometry();
            let gridHelper = new THREE.GridHelper(10, 10);
            scene.add(gridHelper);
            document.getElementById('three').appendChild(renderer.domElement);
            trackballControls = new TrackballControls(camera, renderer.domElement);
            clock = new THREE.Clock();
        }

        let render = function() {
            camera.lookAt(new THREE.Vector3(0, 0, 0));
            camera.position.x = 40 * Math.sin(default_value);
            // camera.position.z = 40 * Math.cos(default_value);
            default_value += ADD;
            trackballControls.update(clock.getDelta());
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

export default Step15;