import React, {useEffect} from 'react';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls';



// 구와 정사면체를 생성
// 마우스를 클릭했을 때 '구' 와 '정사면체'의 색상이 녹색으로 변한다.
// 정사면체오 구의 색상은 각각 파란색고 빨간색.
function Step18()
{
    useEffect(() => {
        let scene, camera, renderer, clock, light1, light2, rayCast, mouse, trackballControls;
        let sphere, cube;

        let createGeometry = function()
            {
                let geometry = new THREE.BoxGeometry(4, 4, 4);
                let material = new THREE.MeshLambertMaterial({color: 0xabcdef});
                cube = new THREE.Mesh(geometry, material);
                cube.position.set(0, 2, 3);
                scene.add(cube);

                geometry = new THREE.SphereGeometry(4, 30, 30);
                material = new THREE.MeshLambertMaterial({color: 0xabcdef});
                sphere = new THREE.Mesh(geometry, material);
                sphere.position.set(5, 2, 3);
                scene.add(sphere);
            };

            let init = function()
            {
                scene = new THREE.Scene();
                scene.background = new THREE.Color(0x000000);
                
                camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 10000);
                camera.position.set(0, 10, 40);
                camera.lookAt(scene.position);

                light1 = new THREE.DirectionalLight(0xffffff, 1);
                light2 = new THREE.DirectionalLight(0xffffff, 1);
                light2.position.set(0, -5, 2);

                scene.add(light1);
                scene.add(light2);

                createGeometry();

                rayCast = new THREE.Raycaster();
                mouse = new THREE.Vector2(); // 매개변수 미설정시 (0, 0)
                mouse.x = mouse.y = -1; // 마우스의 시작점은 (-1, -1)

                renderer = new THREE.WebGLRenderer();
                renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);

                
                document.getElementById('three').appendChild(renderer.domElement);
                renderer.domElement.addEventListener('mosemove', onMouseMove, false);
                renderer.domElement.addEventListener('mosedown', onMouseClick, false);
                trackballControls = new TrackballControls(camera, renderer.domElement);
                clock = new THREE.Clock();
            }

            let onMouseMove = function(e)
            {
                let gap1 = e.clientX - e.offsetX;
                let gap2 = e.clientY - e.offsetY;

                mouse.x = ((e.clientX - gap1) / (window.innerWidth * 0.8)) * 2 - 1;
                mouse.y = ((e.clientY - gap2) / (window.innerHeight * 0.8)) * 2 + 1;

                rayCast.setFromCamera(mouse, camera);
        
                console.log('click');
            }

            let onMouseClick = function()
            {
                let intersects = rayCast.intersectObjects(scene.children);
                intersects.forEach(obj => obj.material.color.set(0x00ff00));
            }

            let mainLoop = function()
            {
                sphere.material.color.set(0x0450fb);
                cube.material.color.set(0xff4500);

                

                trackballControls.update(clock.getDelta());
                
                requestAnimationFrame(mainLoop);
                renderer.render(scene, camera);
            }

            init();
            mainLoop();
    }, []);
    return (
        <div id="three">

        </div>
    );
};

export default Step18;