import React, {useEffect} from 'react';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls';

//안개 추가
function Step7() {
    useEffect(() => {
        window.addEventListener('resize', onResize, false);
        var scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0xffffff, 10, 100);
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

        var controls = new function() {
            this.rotationSpeed = 0.02;
            this.numberOfObjects = scene.children.length; // scene의 모든 요소들의 갯수를 기록하는 변수.
            this.removeCube = function() {
                var allChildren = scene.children; // 배열 할당.
                var lastObject = allChildren[allChildren.length - 1]; // 마지막에 생성된 오브젝트 할당.
                if (lastObject instanceof THREE.Mesh) // 마지막으로 생성된 오브젝트가 THREE.MESH생성자의 객체인지 확인.
                {
                    scene.remove(lastObject); // 마지막 오브젝트 제거
                    this.numberOfObjects = scene.children.length; // scene의 요소 갯수 리로드.
                }
            }
            this.addCube = function() {
                var cubeSize = Math.ceil((Math.random() * 3));
                var cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
                var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff * Math.random()});
                var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
                cube.castShadow = true;
                cube.name = 'cube-' + scene.children.length;
                cube.position.x = -10 + Math.round((Math.random() * planeGeometry.parameters.width));
                cube.position.y = Math.round((Math.random() * 5));
                cube.position.z = -20 + Math.round((Math.random() * planeGeometry.parameters.height));
                scene.add(cube);
                this.numberOfObjects = scene.children.length;
            }
            this.outputObjects = function() {
                console.log('scene.childeren');
            }
        }

        var gui = new dat.GUI();
        gui.add(controls, 'rotationSpeed', 0, 0.5);
        gui.add(controls, 'addCube');
        gui.add(controls, 'removeCube');
        gui.add(controls, 'outputObjects');
        gui.add(controls, 'numberOfObjects').listen(); // listen 이벤트를 통해 numberOfObjects데이터가 변경 될때마다 자동으로 체크.

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
            trackballControls.update(clock.getDelta());

            scene.traverse(function(e){
                if( e instanceof THREE.Mesh && e != plane)
                {
                    e.rotation.x += controls.rotationSpeed;
                    e.rotation.y += controls.rotationSpeed;
                    e.rotation.z += controls.rotationSpeed;
                }
            });
            requestAnimationFrame(renderScene);
            renderer.render(scene, camera);
        }

        renderScene();
    }, []);

    return (
        <div id="three">
            <div id="three2">

            </div>
        </div>
    );
};

export default Step7;

// scene.add() => 3D 오브젝트를 해당 씬에 삽입.
// scene.children => 해당 씬의 하위구조에 해당하는 요소들을 지칭
// scene.getObjectByName(name, recursive) => 해당 씬의 하위구조에 해당하는 특정 요소를 선택.
// scene.remove(object) => 해당 object를 삭제
// scene.traverse(function) => 해당 씬의 하위구조를 모두 선택하고, 함수를 실행, forEach()함수와 같은 역할을한다.
// scene.fog = new THREE.Fog(색상, start, end) => 매개변수는 색상, 가시거리의 시작과 끝
// scene.overrideMaterial => 해당 씬의 모든 오브젝트들에 같은 재질을 적용
// scene.background = new THREE.Color(색상) => 해당 씬의 배경 색상을 지정