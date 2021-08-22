import React from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export class GameWidget extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();

    console.info("canvasRef", this.canvasRef);
    console.info("canvasRef", this.canvasRef.current);
  }

  #setCanvasElement(canvasElement) {
    (async function loadScene() {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );

      const loader = new GLTFLoader();

      const gameScene = await new Promise((r) =>
        loader.load("res/Planet System3.glb", r)
      );

      scene.add(gameScene.scene);

      camera.position.z = 5;

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);

      canvasElement.appendChild(renderer.domElement);

      const controls = new OrbitControls(camera, renderer.domElement);

      renderer.physicallyCorrectLights = true;
      scene.getChildByName("SunLight_Orientation").intensity = 20;
      window.scene = gameScene.scene;

      console.info(
        gameScene.scene.children[1].children[6].children[0].children[0]
      );
      window.pl =
        gameScene.scene.children[1].children[6].children[0].children[0];

      function animate() {
        requestAnimationFrame(animate);

        controls.update();

        renderer.render(scene, camera);
      }

      animate();
    })();
  }

  render() {
    return (
      <div ref={this.#setCanvasElement} style={{ display: "inline" }}></div>
    );
  }
}
