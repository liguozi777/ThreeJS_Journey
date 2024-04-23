import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// 导入动画库
import gsap from "gsap";
// 导入dat.gui
import * as dat from "dat.gui";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

// 目标：运用数学知识设计特定形状的星系

const gui = new dat.GUI();
// 1.创建场景
const scene = new THREE.Scene();
// 2.创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  300
);
const texttureLoader = new THREE.TextureLoader();
const particlesTexture = texttureLoader.load("./textures/particles/1.png");

// 设置相机位置
camera.position.set(0, 0, 18);
scene.add(camera);

const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({
  wireframe: true,
});
const redMaterial = new THREE.MeshBasicMaterial({
  color: "#ff0000",
});
// 1000立方体
let cuberArr = [];
let cubeGroup = new THREE.Group();
for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) {
    for (let z = 0; z < 5; z++) {
      const cube = new THREE.Mesh(cubeGeometry, material);
      cube.position.set(i * 2 - 5, j * 2 - 5, z * 2 - 5);
      scene.add(cube);
      cubeGroup.add(cube);
      cuberArr.push(cube);
    }
  }
}
scene.add(cubeGroup)

// 创建投射光线对象
const raycaster = new THREE.Raycaster();
// 鼠标的位置对象
const mouse = new THREE.Vector2();
// 监听鼠标位置
window.addEventListener("click", (event) => {
  // console.log(event);
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -((event.clientY / window.innerHeight) * 2 - 1);
  raycaster.setFromCamera(mouse, camera);
  let result = raycaster.intersectObjects(cuberArr);
  console.log(result);
  if(result.length>0){
    result[0].object.material = redMaterial;
  }
  // result.forEach(item=>{
  //   item.object.material = redMaterial
  // })
});

// 初始化渲染器
const renderer = new THREE.WebGLRenderer({ alpha: true });
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
// 渲染器透明

// 将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer.domElement);
// 使用渲染器，通过相机将场景渲染进来
// renderer.render(scene, camera);

// 创建轨道控制器
// const controls = new OrbitControls(camera, renderer.domElement);
// 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()
// controls.enableDamping = true;

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
// 设置时钟
const clock = new THREE.Clock();
window.addEventListener("dblclick", () => {
  // 双击控制屏幕进入全屏，退出全屏
  const fullScreenElement = document.fullscreenElement;
  if (!fullScreenElement) {
    // 让画布对象全屏
    renderer.domElement.requestFullscreen();
  } else {
    // 退出全屏
    document.exitFullscreen();
  }
  // console.log(animate1)
  // if (animate1.isActive()) {
  //   // 暂停
  //   animate1.pause();
  // } else {
  //   // 恢复
  //   animate1.resume();
  // }
});
function render() {
  let time = clock.getElapsedTime();
  cubeGroup.rotation.x = time*0.5;
  cubeGroup.rotation.y = time*0.5;
  // controls.update();
  renderer.render(scene, camera);
  // 渲染下一帧的时候就会调用render函数
  requestAnimationFrame(render);
}
render();

// 监听画面变化，更新渲染画面
window.addEventListener("resize", () => {
  // console.log("画面变化了")
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight;
  // 更新摄像机的投影矩阵
  camera.updateProjectionMatrix();
  // 更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio);
});
