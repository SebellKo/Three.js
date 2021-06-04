import React, {useEffect} from 'react';
import * as THREE from 'three';

function Step2() {
  useEffect(() => {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth * 0.375, window.innerHeight * 0.375);

    var planeGeometry = new THREE.PlaneGeometry(60, 20);
    var planeMaterial = new THREE.MeshBasicMaterial({color: 0xAAAAAA});
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.set(15, 0, 0);
    plane.rotation.x = -0.4 * Math.PI;
    scene.add(plane);

    scene.add(camera);
    camera.position.set(-30, 40, 30);
    camera.lookAt(scene.position); // camera 가 scene의 중앙을 위치하게 함

    var boxGeometry = new THREE.BoxGeometry(10, 10, 10);
    var boxMaterial = new THREE.MeshBasicMaterial({
      color: 0xFFFFFF,
      wireframe: true,
    });
    var box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.position.set(-5, 10, 2);
    scene.add(box);

    var sphereGeometry = new THREE.SphereGeometry(8, 20, 20);
    var sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0xACCBCA,
      wireframe: true,
    });
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(3, 2, 1);
    scene.add(sphere);

    renderer.render(scene, camera);
    document.getElementById('App').appendChild(renderer.domElement);
    
  })
  return (
    <div id="App">
      
    </div>
  );
}

export default Step2;
