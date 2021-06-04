import React, {useEffect} from 'react';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls';
import { render } from 'react-dom/cjs/react-dom.development';

function Step17() {
    useEffect(() => {
        var container;
        var camera, scene, raycaster, renderer;

        var mouse = new THREE.Vector2(), SELECTED;
        var radius = 100, theta = 0;

        let init = function()
        {
            container = document.getElementById('three');
            camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
            scene = new THREE.Scene();
            var light = new THREE.DirectionalLight(0xffffff, 1);
            light.position.set(1, 1, 1).normalize();
            scene.add(light);

            var geometry = new THREE.BoxBufferGeometry(20, 20, 20);

            for (var i = 0; i < 1000; i++)
            {
                var grey = Math.random();

                var object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({color: new THREE.Color(grey, grey, grey)}));
                
                object.position.x = Math.random() * 800 - 400;
                object.position.y = Math.random() * 800 - 400;
                object.position.z = Math.random() * 800 - 400;

                object.rotation.x = Math.random() * 2 * Math.PI;
                object.rotation.y = Math.random() * 2 * Math.PI;
                object.rotation.z = Math.random() * 2 * Math.PI;

                object.scale.x = Math.random() + 0.5;
                object.scale.y = Math.random() + 0.5;
                object.scale.z = Math.random() + 0.5;

                scene.add(object);
            };

            renderer = new THREE.WebGLRenderer();
            renderer.setClearColor(0xf0f0f0);
            renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
            container.appendChild(renderer.domElement);

            raycaster = new THREE.Raycaster();

            container.addEventListener('mousemove', onDocumentMouseMove, false);
            container.addEventListener('mousedown', onDocumentMouseDown, false);
            window.addEventListener('resize', onWindowResize, false);
        }

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
        };

        function onDocumentMouseMove(event) {
            event.preventDefault();
            var gap1 = event.clientY - event.offsetY;
            var gap2 = event.clientX - event.offsetX;
            mouse.x = ((event.clientX - gap2) / (window.innerWidth * 0.8)) * 2 - 1;
            mouse.y = ((event.clientY - gap1) / (window.innerHeight * 0.8)) * 2 +  1;
        }

        function onDocumentMouseDown(event)
        {
            event.preventDefault();
            if(SELECTED)
            {
                SELECTED.currentHex = 0x00ff00 * Math.random();
                SELECTED.material.emissive.setHex(SELECTED.currentHex);
            }
        }

        function animate()
        {
            requestAnimationFrame(animate);
            render();
        }

        function render()
        {
            raycaster.setFromCamera(mouse, camera);
            var intersects = raycaster.intersectObjects(scene.children);
            if (intersects.length > 0)
            {
                if (SELECTED != intersects[0].object)
                {
                    if (SELECTED)
                    {
                        SELECTED.material.emissive.setHex(SELECTED.currentHex);
                    };
                    SELECTED = intersects[0].object;
                    SELECTED.currentHex = SELECTED.material.emissive.getHex();
                    SELECTED.material.emissive.setHex(0xff0000);
                    container.style.cursor = 'pointer';
                }
            }
            else
            {
                if (SELECTED)
                {
                    SELECTED.material.emissive.setHex(SELECTED.currentHex);
                    SELECTED = null;
                    container.style.cursor = 'auto';
                }
            }
            renderer.render(scene, camera);
        }

        init();
        animate();
    }, []);
    return (
        <div id="three">
            <div id="three2">

            </div>
        </div>
    );
};

export default Step17;
