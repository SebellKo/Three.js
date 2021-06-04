import React, {useEffect} from 'react';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls';

function Step8() {
    useEffect(() => {
        let scene, camera, renderer, trackballControls, clock;
        let donuts = [];
        let add = 0.1; // 도넛이 내려가는 속도
        let randomRange = function(from, to) {
            let x = Math.random() * (to - from);
            return x + from;
        }; // from 으로 지정한 값부터 랜덤값으로 변화 된다.


        let createDonut = function() {
            var geometry = new THREE.TorusGeometry(1, 0.5, 5, 30);
            var material = new THREE.MeshBasicMaterial({color: 0xffff23});
            var donut = new THREE.Mesh(geometry, material);
            donut.position.x = randomRange(-15, 15);
            donut.position.y = 15;
            donut.position.z = randomRange(-15, 15);
            donuts.push(donut);
            scene.add(donut);
        }; // 도넛을 만드는 함수 , 프로그램의 성격에 따라 변하는 내용

        let init = function(){
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
            renderer = new THREE.WebGLRenderer();
            renderer.setClearColor(new THREE.Color(0x000000));
            renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);

            camera.position.set(0, -10, 30);
            camera.lookAt(scene.position);

            document.getElementById('three').appendChild(renderer.domElement);
            trackballControls = new TrackballControls(camera, renderer.domElement);
            clock = new THREE.Clock();
        }; // 공통적으로 반드시 들어가야 하는 내용

        let render = function() {
            let x = Math.random();
            if (x < 0.1)
            {
                createDonut();
            };
            donuts.forEach(donut => donut.position.y -= add);
            trackballControls.update(clock.getDelta());
            renderer.render(scene, camera);
            requestAnimationFrame(render);
        }
        
        init();
        render();
    }, []);
    return (
        <div id="three">
            <div id="three2">

            </div>
        </div>
    );
};

export default Step8;