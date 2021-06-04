import React, {useEffect} from 'react';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls';

function Step16() {
    useEffect(() => {
        let scene, camera, renderer, light1;
        let cubes = [];
        let add = 0.2;
        const LEFT = 37, RIGHT = 39, UP = 38, DOWN = 40;
        let randomRange = function(from, to) {
            let x = Math.random() * (to - from);
            return x +from;
        };

        let createGeometry = function() {
            let geometry = new THREE.BoxGeometry(3, 3, 3);
            for (let i = 1; i <= 10; i++)
            {
                let material = new THREE.MeshPhongMaterial({color: 0xffffff * Math.random(), shininess: 100, side: THREE.DoubleSide}); // DoubleSide => 정육면체의 양면이 전부 보이게 설정.
                let cube = new THREE.Mesh(geometry, material);
                cube.position.x = randomRange(-10, 10);
                cube.position.z = randomRange(-10, 10);
                cube.castShadow = true;
                cubes.push(cube);
                scene.add(cube);
            }
        };

        let keyCodeOn = function(e) {
            if(e.keyCode == LEFT)
            {
                add = - 0.2;
            }
            else if(e.keyCode == RIGHT)
            {
                add = 0.2;
            }
            else if (e.keyCode == DOWN)
            {
                scene.rotation.x += add;
            }
            else if (e.keyCode == UP)
            {
                scene.rotation.x -= add;
            }
            else
            {
                return;
            };
            console.log(e);
            cubes.forEach(cube => cube.position.x += add);
        };

        let init = function() 
        {
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xffffff);

            // let planeGeometry = new THREE.PlaneGeometry(100, 100);
            // let planeMaterial = new THREE.MeshLambertMaterial({color: 0x000000});
            // let plane = new THREE.Mesh(planeGeometry, planeMaterial);
            // plane.position.set(0, 0, 0);
            // scene.add(plane);
            // plane.receiveShadow = true;

            camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.set(-10, 30, -20);
            camera.lookAt(scene.position);

            renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
            renderer.shadowMap.enabled = true;

            light1 = new THREE.DirectionalLight(0xffffff, 1); // (color: , intensity : float)
            light1.shadow.mapSize = new THREE.Vector2(1024, 1024);
            light1.castShadow = true;
            scene.add(light1);

            createGeometry();
            
            document.getElementById('three').appendChild(renderer.domElement);
            document.addEventListener('keydown', keyCodeOn, false); // 세번째 매개변수는 태그들이 중복되어 있을 경우 child부터 실행될지 parent부터 실행될지 결정, true일시 parent -> child, false일시 child -> parent 순서 실행
        }

        let render = function() {
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

export default Step16;