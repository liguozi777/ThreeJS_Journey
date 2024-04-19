import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// 导入动画库
import gsap from "gsap";
// 导入dat.gui
import * as dat from "dat.gui";

// console.log(THREE);

// 目标：打造酷炫的三角形

// 1.创建场景
const scene = new THREE.Scene();
// 2.创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// 设置相机位置
camera.position.set(0, 0, 10);
scene.add(camera);
// 添加物体
// 创建几何体
for (let i = 0; i < 50; i++) {
  // 每一个三角形，需要3个顶点，每个顶点需要3个值
  const geometry = new THREE.BufferGeometry();
  const positionArray = new Float32Array(9);
  for (let j = 0; j < 9; j++) {
    positionArray[j] = Math.random() * 10-5;
  }
  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positionArray, 3)
  );
  let color = new THREE.Color(Math.random(), Math.random(), Math.random());
  const material = new THREE.MeshBasicMaterial({ color: color,transparent:true,opacity:0.5 });
  // 根据几何体和材质创建物体
  const mesh = new THREE.Mesh(geometry, material);
  console.log(mesh);
  scene.add(mesh);
}
// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
// console.log(renderer);
// 将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer.domElement);
// 使用渲染器，通过相机将场景渲染进来
// renderer.render(scene, camera);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()
controls.enableDamping = true;

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
// 设置时钟
const clock = new THREE.Clock();
// 设置动画
// var animate1 = gsap.to(cube.position, {
//   x: 5,
//   duration: 5,
//   ease: "power1.inOut",
//   // 设置重复的次数，无限次循环-1
//   repeat: -1,
//   // 往返运动,
//   yoyo: true,
//   // 延迟2秒运动
//   delay: 2,
//   onComplete: () => {
//     console.log("动画完成");
//   },
//   onStart: () => {
//     console.log("动画开始");
//   },
// });
// gsap.to(cube.rotation, { x: Math.PI, duration: 5, ease: "power1.inOut" });
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
  controls.update();
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
