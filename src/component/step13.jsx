// import React, {useEffect} from 'react';
// import * as THREE from 'three';
// import * as dat from 'dat.gui';
// import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls';

// function Step13() {
//     useEffect(() => {
//         let scene, camera, renderer;
//         let fragments = [];
//         let dt = 0.02;
//         let ADD = 0.05;


//         class Fragment {
//             constructor(position, velocity, geometry) {
//                 this.velocity = velocity;
//                 this.velocity.multplyScalar(dt);

//                 let material = new THREE.MeshPhongMaterial({
//                     side: THREE.DoubleSide,
//                     color: 0xababab,
//                     emissive: 0xfafafa,
//                     emissiveIntensity: 0.4,
//                     shininess: 100,
//                     specular: 0x9d0a00,
//                     vertexColors: ture
//                 });
//                 this.shape = new THREE.Mesh(geometry, material);
//                 this.shape.position.copy(position);
//             }
//             move() {
//                 this.shape.position.add(this.velocity);
//                 this.shape.rotation.x += ADD;
//             }
//         }
//         let createTriangle = function(p1, p2, p3) {
//                 let geometry = new THREE.BufferGeometry();
//                 geometry.vertices.push(p1, p2, p3);
//                 geometry.faces.push(new TH)
//         }

//         let createGeometry = function() {

//         };

//         let init = function() {
//             scene = new THREE.Scene();
//             scene.background = new THREE.Color(0x000000);
//             camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1 , 1000);
//             camera.position.set(10, 10, 10);
//             camera.lookAt(scene.position);
//             renderer = new THREE.WebGLRenderer();
//             renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
//             document.getElementById('three').appendChild(renderer.domElement);
//             createGeometry();
//         };

//         let render = function() {

//             fragments.forEach(f => f.move());
//             requestAnimationFrame(render);
//             renderer.render(scene, camera);
//         };

//         init();
//         render();
//     }, []);
//     return (
//         <div id="three">

//         </div>
//     );
// };

// export default Step13;