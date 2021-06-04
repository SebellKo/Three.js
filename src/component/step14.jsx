import React, {useEffect} from 'react';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls';
import { Box2 } from 'three';

function Step14() {
    useEffect(() => {
        let scene, geometry, material, camera, renderer, trackballControls, clock;
        let geo = [];
        let createPlane = function () {
            geometry = new THREE.PlaneGeometry(10, 5);
            material = new THREE.MeshLambertMaterial({color: 0xababab});
            let plane = new THREE.Mesh(geometry, material);
            plane.position.set(0, 0, 0);
            plane.rotation.x = -0.5 * Math.PI;
            plane.receiveShadow = true;
            plane.castShadow = true;
            scene.add(plane);
        };

        let createSphere = function() {
            geometry = new THREE.SphereGeometry(1, 30, 30);
            material = new THREE.MeshLambertMaterial({color: 0xababab});
            let sphere = new THREE.Mesh(geometry, material);
            sphere.position.set(0, 1, 0);
            sphere.castShadow = true;
            scene.add(sphere);
        };

        let createCone = function() {
            geometry = new THREE.ConeGeometry(1, 2, 32);
            material = new THREE.MeshLambertMaterial({color: 0xababab});
            let cone = new THREE.Mesh(geometry, material);
            cone.position.set(3, 1, 0);
            cone.castShadow = true;
            scene.add(cone);
        };

        let createBox = function() {
            geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
            material = new THREE.MeshLambertMaterial({color: 0xababab});
            let box = new THREE.Mesh(geometry, material);
            box.position.set(-3, 1, 0);
            box.castShadow = true;
            scene.add(box);
        }

        let ambienLight = new THREE.AmbientLight(0xffffff);
        ambienLight.castShadow = true;

        let init = function() {
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0x303940);
            camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.set(0, 10, -11);
            camera.lookAt(scene.position);
            renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
            renderer.shadowMap.enabled = true;

            let gridHelper = new THREE.GridHelper(10, 10);
            scene.add(gridHelper);
            scene.add(ambienLight);
            createCone();
            createSphere();
            createPlane();
            createBox();

            document.getElementById('three').appendChild(renderer.domElement);
            trackballControls = new TrackballControls(camera, renderer.domElement);
            clock = new THREE.Clock();
        }

        let add = 0.05;

        let render = function() {
            ambienLight.intensity += add;
            if (ambienLight.intensity > 6 || ambienLight.intensity < 1)
            {
                add *= -1;
            }
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

export default Step14;