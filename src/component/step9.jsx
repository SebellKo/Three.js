import React, {useEffect} from 'react';
import * as THREE from 'three';
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls';
import * as dat from 'dat.gui';

function Step9() {
    useEffect(() => {
        let scene, camera, renderer, planet, trackballControls, clock;
        let planet_wings = [];
        var controls = new function() {
            this.rotationX = 0;
            this.rotationY = 0;
        }
        let gui = new dat.GUI();
        gui.add(controls, 'rotationX', 0, 10);
        gui.add(controls, 'rotationY', 0, 10);

        let createPlanet = function(){
            let geometry = new THREE.SphereGeometry(4, 30, 30);
            let material = new THREE.MeshBasicMaterial({color: 0x8ddd24});
            planet = new THREE.Mesh(geometry, material);
            scene.add(planet);

            geometry = new THREE.TorusGeometry(5, 0.7, 2, 50);
            material = new THREE.MeshBasicMaterial({color: 0xffe39f});
            let wing = new THREE.Mesh(geometry, material);
            planet_wings.push(wing);

            geometry = new THREE.TorusGeometry(8, 0.7, 2, 50);
            material = new THREE.MeshBasicMaterial({color: 0xffad60});
            wing = new THREE.Mesh(geometry, material);
            planet_wings.push(wing);

            planet_wings.forEach(w => {
                w.rotation.x = 5;
                w.rotation.y = 2;
                scene.add(w);
            });
        };
        let init = function() {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.set(-30, 40, 30);
            camera.lookAt(scene.position);

            createPlanet();
            renderer = new THREE.WebGLRenderer();
            renderer.setClearColor(new THREE.Color(0x000000));
            renderer.setSize(window.innerWidth, window.innerHeight);

            document.getElementById('three').appendChild(renderer.domElement);
            trackballControls = new TrackballControls(camera, renderer.domElement);
            clock = new THREE.Clock();
        };
        let render = function(){
            planet_wings.forEach(w => {
                w.rotation.x = controls.rotationX;
                w.rotation.y = controls.rotationY;
                scene.add(w);
            })
            requestAnimationFrame(render);
            trackballControls.update(clock.getDelta());
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

export default Step9;