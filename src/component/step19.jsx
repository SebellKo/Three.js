import React, {useEffect} from 'react';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls';


// 파란색 공들을 5 x 5 메트릭스 형태로 나열한다.
// 사용자가 공에 마우스를 가져간다
// 공들이 하늘로 떠오른다.

function Step19(){
    useEffect(() => {
        let scene, camera, renderer, light1, rayCast, mouse, trackballControls, clock;
        let sphere;
        let ADD = 0.5;

        let init = function()
        {
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xffffff);

            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
            camera.position.set(0, 60, 120);

            light1 = new THREE.DirectionalLight(0xffffff, 1);

            scene.add(light1);

            rayCast = new THREE.Raycaster();
            mouse = new THREE.Vector2();
            mouse.x = mouse.y = -1;

            renderer =new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);

            document.getElementById('three').appendChild(renderer.domElement);
            trackballControls = new TrackballControls(camera, renderer.domElement);
            clock = new THREE.Clock();
            createGeometry();
            console.log(renderer.domElement)
            renderer.domElement.addEventListener('click', onMouseMove, false);
        };

        function onMouseMove(event)
        {
            // event.preventDefault();
            let gap1 = event.clientX- event.offsetX;
            let gap2 = event.clientY - event.offsetY;
            console.log('click');
            mouse.x = ((event.clientX - gap1) / (window.innerWidth * 0.8)) * 2 - 1;
            mouse.y = ((event.clientY - gap2) / (window.innerHeight * 0.8)) * 2 + 1;
            rayCast.setFromCamera(mouse, camera); // 사용자의 마우스와 반응하는 화면상 객체들을 모두 반환한다.
            let intersect = rayCast.intersectObjects(Object.assign({}, scene.children),);
            console.log(intersect);
            console.log(mouse);
            intersect.forEach(obj => { obj.object.position.y += 1});
        }

        let createGeometry = function()
        {
            let k = 2;
            for (let i = 0; i < 5; i++)
            {
                for (let j = 0; j < 5; j++)
                {
                    let geometry = new THREE.SphereGeometry(4, 30, 30);
                    let material = new THREE.MeshPhongMaterial({color: 0x0000ff, shininess: 100});
                    sphere = new THREE.Mesh(geometry, material);
                    sphere.position.x = i * (k + 7) + (k + 5);
                    sphere.position.z = j * (k + 7) + (k + 5);
                    scene.add(sphere);
                };
            };
        }

        let render = function()
        {
            trackballControls.update(clock.getDelta());
            requestAnimationFrame(render);
            renderer.render(scene, camera);
        };

        init();
        render();
    }, []);
    return(
        <div id="three">

        </div>
    );
};

export default Step19;