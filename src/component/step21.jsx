import React, {useEffect} from 'react';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls';
import { Raycaster, Scene, Sphere, WebGL1Renderer } from 'three';

function Step21(){
    useEffect(() => {
        let scene, camera, renderer, mouse, rayCast;
        
        let randomRange = function (from, to)
        {
            let x = Math.random() * (to - from);
            return x + from
        }

        class Balloon
        {
            constructor()
            {
                let x = randomRange(-20, 20);
                let z = randomRange(-30, 30);
                let geometry = new THREE.SphereGeometry(3, 20, 20);
                let material = new THREE.MeshPhongMaterial({color: 0xffffff * Math.random()});
                let b = new THREE.Mesh(geometry, material);
                b.position.set(x, 0, z);
                this.object = b;
                scene.add(b);

                this.ADD = randomRange(0.05, 0.15);
                this.over = false;
                this.TOP = 50;
            }

            advance()
            {
                this.object.position.y += this.ADD;
                if(this.object.position.y > this.TOP)
                {
                    this.over = true;
                }
            }
        }

        let init = function()
        {
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xffffff);

            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.lookAt(scene.position);
            renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            
            mouse = new THREE.Vector2();
            mouse.x = mouse.y = -1;
            rayCast = new THREE.Raycaster();
            rayCast.setFromCamera(mouse, camera);

            document.getElementById('three').appendChild(renderer.domElement);
            renderer.domElement.addEventListener('click', onMouseClick, false);
        }

        let onMouseClick = function(e)
        {
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;

            rayCast.setFromCamera(mouse, camera);
            let intersects = rayCast.intersectObjects(scene.children);
            console.log(intersects);
            console.log(intersects[0].object);
            if (intersects.lenght == 0)
            {
                return;
            }
            let hit = intersects[0].object;
            balloons.forEach((obj, index) => {
                if(hit == obj.object)
                {
                    balloons.splice(index, 1);
                    scene.remove(obj.object);
                }
            });
        }

        let balloons = [];
        let render = function()
        {
            let rand = Math.random();
            if(rand < 0.5)
            {
                balloons.push(new Balloon());
            }
            balloons.forEach((b, index) => {
                b.advance();
                if (b.over)
                {
                    balloons.splice(b, 1);
                    scene.remove(b.object);
                };
            });
            requestAnimationFrame(render);
            renderer.render(scene, camera);
        }

        init();
        render();
    }, []);
    return (
        <div id="three">

        </div>
    );
};

export default Step21;