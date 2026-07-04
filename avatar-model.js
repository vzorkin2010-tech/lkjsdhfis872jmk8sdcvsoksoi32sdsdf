import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const stage = document.getElementById("avatar-orbit-stage");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (stage) {
  window.__vzAvatarDebug = {
    loaded: false,
    meshCount: 0,
    error: null
  };

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
    preserveDrawingBuffer: true
  });

  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.92;
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.55));
  stage.append(renderer.domElement);

  camera.position.set(0, 0.35, 6.4);
  camera.lookAt(0, 0, 0);

  const rigRoot = new THREE.Group();
  rigRoot.position.set(0, 0, 0);
  scene.add(rigRoot);

  const ambientLight = new THREE.HemisphereLight(0xffffff, 0x081014, 1.55);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.85);
  keyLight.position.set(-2.4, 3.2, 3.8);
  scene.add(keyLight);

  const cursorLight = new THREE.PointLight(0xbfefff, 1.3, 5.6, 2.1);
  cursorLight.position.set(-1.2, 1.1, 2.6);
  scene.add(cursorLight);

  const rimLight = new THREE.DirectionalLight(0xbfefff, 1.1);
  rimLight.position.set(2.2, 1.4, -2.3);
  scene.add(rimLight);

  const pointer = {
    x: -0.35,
    y: 0.16,
    targetX: -0.35,
    targetY: 0.16,
    active: false
  };

  let avatar = null;
  let framedDistance = 6.4;
  let frameId = 0;
  const clock = new THREE.Clock();

  function resizeRenderer() {
    const rect = stage.getBoundingClientRect();
    const width = Math.max(1, Math.floor(rect.width));
    const height = Math.max(1, Math.floor(rect.height));

    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    if (avatar) {
      camera.position.z = framedDistance;
      camera.lookAt(0, 0, 0);
    }
  }

  function frameAvatar(model) {
    const box = new THREE.Box3().setFromObject(model);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();

    box.getSize(size);
    box.getCenter(center);

    const maxAxis = Math.max(size.x, size.y, size.z, 1);
    const scale = 2.45 / maxAxis;

    model.position.sub(center);
    model.scale.setScalar(scale);
    model.position.y -= size.y * scale * 0.015;

    const framedSize = new THREE.Vector3();
    new THREE.Box3().setFromObject(model).getSize(framedSize);

    const stageAspect = Math.max(0.45, stage.getBoundingClientRect().width / Math.max(stage.getBoundingClientRect().height, 1));
    const verticalFit = framedSize.y / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.5)));
    const horizontalFit = framedSize.x / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.5)) * stageAspect);
    framedDistance = Math.max(verticalFit, horizontalFit, 4.8) * 1.72;
    camera.position.set(0, 0.15, framedDistance);
    camera.lookAt(0, 0, 0);
  }

  function softenMaterials(model) {
    let meshCount = 0;

    model.traverse((node) => {
      if (!node.isMesh) return;
      meshCount += 1;

      node.frustumCulled = false;

      if (node.material) {
        const materials = Array.isArray(node.material) ? node.material : [node.material];

        materials.forEach((material) => {
          material.transparent = true;
          material.opacity = Math.min(material.opacity ?? 1, 0.9);
          material.depthWrite = true;

          if ("roughness" in material) material.roughness = Math.max(material.roughness, 0.72);
          if ("metalness" in material) material.metalness = Math.min(material.metalness, 0.08);
        });
      }
    });

    window.__vzAvatarDebug.meshCount = meshCount;
  }

  function updatePointer(event) {
    const x = event.clientX / window.innerWidth;
    const y = event.clientY / window.innerHeight;

    pointer.targetX = (x - 0.5) * 2;
    pointer.targetY = (0.5 - y) * 2;
    pointer.active = true;

    stage.style.setProperty("--avatar-light-x", `${Math.round(x * 100)}%`);
    stage.style.setProperty("--avatar-light-y", `${Math.round(y * 100)}%`);
  }

  function animate() {
    const elapsed = clock.getElapsedTime();

    pointer.x = THREE.MathUtils.lerp(pointer.x, pointer.targetX, 0.045);
    pointer.y = THREE.MathUtils.lerp(pointer.y, pointer.targetY, 0.045);

    cursorLight.position.x = THREE.MathUtils.lerp(cursorLight.position.x, pointer.x * 2.25, 0.055);
    cursorLight.position.y = THREE.MathUtils.lerp(cursorLight.position.y, 1.05 + pointer.y * 1.15, 0.055);
    cursorLight.intensity = THREE.MathUtils.lerp(cursorLight.intensity, pointer.active ? 1.65 : 1.05, 0.04);

    if (avatar) {
      const swayY = Math.sin(elapsed * 0.86) * 0.82 + Math.sin(elapsed * 0.29) * 0.28;
      const swayX = Math.sin(elapsed * 0.62 + 0.8) * 0.16;
      const swayZ = Math.sin(elapsed * 0.48) * 0.1;

      avatar.rotation.y = THREE.MathUtils.lerp(avatar.rotation.y, swayY + pointer.x * 0.36, 0.055);
      avatar.rotation.x = THREE.MathUtils.lerp(avatar.rotation.x, swayX - pointer.y * 0.11, 0.05);
      avatar.rotation.z = THREE.MathUtils.lerp(avatar.rotation.z, swayZ - pointer.x * 0.06, 0.05);
      avatar.position.x = THREE.MathUtils.lerp(avatar.position.x, pointer.x * 0.1, 0.045);
      avatar.position.y = THREE.MathUtils.lerp(avatar.position.y, pointer.y * 0.04, 0.045);
    }

    renderer.render(scene, camera);

    if (!reduceMotion) {
      frameId = requestAnimationFrame(animate);
    }
  }

  const loader = new GLTFLoader();
  loader.load(
    "./assets/roblox_r6_ik_rig.glb",
    (gltf) => {
      avatar = gltf.scene;
      softenMaterials(avatar);
      frameAvatar(avatar);
      rigRoot.add(avatar);

      stage.classList.add("is-loaded");
      window.__vzAvatarDebug.loaded = true;
      resizeRenderer();
      animate();
    },
    undefined,
    (error) => {
      window.__vzAvatarDebug.error = error?.message || "Avatar model failed to load";
      stage.remove();
    }
  );

  window.addEventListener("pointermove", updatePointer, { passive: true });
  window.addEventListener("pointerdown", updatePointer, { passive: true });
  window.addEventListener("resize", resizeRenderer);

  if ("ResizeObserver" in window) {
    new ResizeObserver(resizeRenderer).observe(stage);
  }

  resizeRenderer();

  window.addEventListener("pagehide", () => {
    if (frameId) cancelAnimationFrame(frameId);
    renderer.dispose();
  });
}
