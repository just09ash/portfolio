import './style.css';
import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as TWEEN from "@tweenjs/tween.js";

import {
  earthTexture,
  jupiterTexture,
  marsTexture,
  mercuryTexture,
  neptuneTexture,
  plutoTexture,
  saturnRingTexture,
  saturnTexture,
  starsTexture,
  sunTexture,
  uranusRingTexture,
  uranusTexture,
  venusTexture,
  personImage
} from './src/img'; // Adjust the path as needed

const introduction =
{
  infoTitle: "Arpit Katiyar",
  infoSubTitle: "Aspiring Software Developer",
  infoDetail: `I am Arpit Katiyar in the third year of BCA at Tilak Maharashtra Vidyapeeth.
      
        Proficient in C# Winform, C, C++, C#, Frontend - HTML CSS JavaScript, REACT, Tailwind, and more.
      
        Eight months of experience as a Professional IT Lecturer at Aptech Computer Education.
      
        Instructed BCA students in various IT Software Technology courses.
      
        Strong foundation in Object-Oriented Programming (OOP) concepts.
      
        Experienced in development environments like Visual Studio Code and Visual Studio.
      
        Demonstrated exceptional attention to detail in teaching and collaborated effectively in a team environment.`
};
const workExperience =
{
  infoTitle: "Professional IT Lecturer (BCA)",
  infoSubTitle: `March 2023 - November 2023 - (9 Months)`,
  infoDetail: `Proficient IT Trainer and Lecturer, instructing BCA
    students in IT Software Technology courses.
     
      Taught a range of programming languages, such as C,
      C++, C#, PHP, jQuery, HTML, CSS, JavaScript,
      Bootstrap, OOP concepts, and more.
      
      Showed exceptional attention to detail in teaching.
      
      Instructed BCA students in various IT Software Technology courses.
      
      Collaborated effectively within a team environment.`
};
const skills =
{
  infoTitle: "Skills Acquired",
  infoSubTitle: `As an Software Developer Aspirant`,
  infoDetail: `Programming Languages: C, C++, C#
      
      Frontend:  HTML, CSS, JavaScript
      
      CSS Library:  Bootstrap, Tailwind
      
      JavaScript Library: JQuery, THREE.js (for 3D Web Development)
      
      Proficient in C# Winform
      
      Object-Oriented Programming (OOP): concepts are
      well-understood and effectively applied.
      
      Development Environments: Visual Studio Code, Visual Studio`
};
const qualification =
{
  infoTitle: "Qualification Acquired",
  infoSubTitle: `BCA Graduate`,
  infoDetail: `BCA
(Bachelor of Computer Applications)
Tilak Maharashtra Vidyapeeth
Third Year (Currently Pursuing)
  
      HSC - Science Stream
(Higher Secondary Certificate)
Maharashtra Board
2019 - 62%
      
      SSC - Little Flower High School
      (Secondary School Certificate)
      Maharashtra Board
      2017 - 60%`
};
const personalDetails =
{
  infoTitle: "Personal Details",
  infoSubTitle: `Arpit Katiyar`,
  infoDetail: `Nationality: Bharatiya

      Date of Birth: 15 August 2000
      
      Gender: Male
     
      Marital Status: Unmarried
      
      Languages Known:
English (Fluent)
Hindi (Fluent)`
};
const contactDetails =
{
  infoTitle: "Contact Details",
  infoSubTitle: `Arpit Katiyar`,
  infoDetail: `Mobile No.: +91 9372556822

      E-Mail: arpitkatiyar108@gmail.com
      
      Address: Vishwanath Bunglow,
 Plot No. 42, RSC 11,
 Sawarkar Nagar, Thane (W), 
 Maharashtra 400606.`
};


const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById('bg').parentNode.insertBefore(renderer.domElement, document.getElementById('bg'));


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// const orbit = new OrbitControls(camera, renderer.domElement);
// camera.position.set(-90, 140, 140);
// orbit.update();

// camera.position.set(-569.4668683153066, 22.563694915220054, -1174.0644901281335);
// camera.rotation.set(-3.122376573243678, -0.4515347003027919, -3.1332069401291682);

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);


const textureLoader = new THREE.TextureLoader();

const sunGeo = new THREE.SphereGeometry(16, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
  map: textureLoader.load(sunTexture)
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

const createPlanete = (size, texture, position, ring) => {
  const geo = new THREE.SphereGeometry(size, 30, 30);
  const mat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(texture)
  });
  const mesh = new THREE.Mesh(geo, mat);
  const obj = new THREE.Object3D();
  obj.add(mesh);
  if (ring) {
    const ringGeo = new THREE.RingGeometry(
      ring.innerRadius,
      ring.outerRadius,
      32);
    const ringMat = new THREE.MeshBasicMaterial({
      map: textureLoader.load(ring.texture),
      side: THREE.DoubleSide
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    obj.add(ringMesh);
    ringMesh.position.x = position;
    ringMesh.rotation.x = -0.5 * Math.PI;
  }
  scene.add(obj);
  mesh.position.x = position;
  return { mesh, obj }
};

const mercury = createPlanete(3.2, mercuryTexture, 28);
const venus = createPlanete(5.8, venusTexture, 44);
const earth = createPlanete(6, earthTexture, 62);
const mars = createPlanete(4, marsTexture, 78);
const jupiter = createPlanete(12, jupiterTexture, 100);
const saturn = createPlanete(10, saturnTexture, 138, {
  innerRadius: 10,
  outerRadius: 20,
  texture: saturnRingTexture
});
const uranus = createPlanete(7, uranusTexture, 176, {
  innerRadius: 7,
  outerRadius: 12,
  texture: uranusRingTexture
});
const neptune = createPlanete(7, neptuneTexture, 200);
const pluto = createPlanete(2.8, plutoTexture, 216);

const pointLight = new THREE.PointLight(0xFFFFFF, 7000, 30000);
scene.add(pointLight);

const pointLightCamera = new THREE.PointLight(0xFFFFFF, 500, 300);
scene.add(pointLightCamera);


const stars = [];

const addStar = () => {
  const geometry = new THREE.SphereGeometry(0.2, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(10000000));
  star.position.set(x, y, z);
  scene.add(star);
  stars.push(star);
};

Array(700).fill().forEach(addStar);

function animateStars() {
  for (const star of stars) {
    star.scale.x = star.scale.y = star.scale.z = Math.sin(Date.now() * 0.003 + stars.indexOf(star)) * 0.35 + 1;

    const maxPosition = 250;
    if (Math.abs(star.position.x) > maxPosition || Math.abs(star.position.z) > maxPosition || Math.abs(star.position.z) > maxPosition) {
      star.position.set(THREE.MathUtils.randFloatSpread(maxPosition), THREE.MathUtils.randFloatSpread(maxPosition), THREE.MathUtils.randFloatSpread(maxPosition));
    }
  }
}

let current = 0;
let selfRotationSpeed = 1;
let aroundSunRotationSpeed = 0.4;

const tweenAnimate = (toPosX, toPosY, toPosZ, toRotX, toRotY, toRotZ, time = 300) => {
  const tween = new TWEEN.Tween({ posX: camera.position.x, posY: camera.position.y, posZ: camera.position.z, rotX: camera.rotation.x, rotY: camera.rotation.y, rotZ: camera.rotation.z })
    .to({ posX: toPosX, posY: toPosY, posZ: toPosZ, rotX: toRotX, rotY: toRotY, rotZ: toRotZ }, time)
    .onUpdate((obj) => {
      // Update camera position and rotation during the tween
      camera.position.set(obj.posX, obj.posY, obj.posZ);
      camera.rotation.set(obj.rotX, obj.rotY, obj.rotZ);
    })

  tween.start();
  return tween;
}



const texture1 = textureLoader.load(personImage);
const cubeMaterials = [
  new THREE.MeshStandardMaterial({ map: texture1 }),
  new THREE.MeshStandardMaterial({ map: texture1 }),
  new THREE.MeshStandardMaterial({ map: texture1 }),
  new THREE.MeshStandardMaterial({ map: texture1 }),
  new THREE.MeshStandardMaterial({ map: texture1 }),
  new THREE.MeshStandardMaterial({ map: texture1 })
];
const cubeGeometry = new THREE.BoxGeometry(7.5, 7.5, 7.5);
const cube = new THREE.Mesh(cubeGeometry, cubeMaterials);
cube.position.set(-504.1526130620916, 19.975781533168185, -1039.4067039450292);
cube.rotation.set(-3.122376573243678, -0.45153470030279186, -3.1332069401291682);
scene.add(cube);

const torusGeometry = new THREE.TorusGeometry(8.79, 2.35, 16, 100);
let torusHue = 1; // Initial hue value
const torusMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color().setHSL(torusHue, 1, 0.5),
});
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.position.set(-504.1526130620916, 19.975781533168185, -1039.4067039450292);
torus.rotation.set(-3.122376573243678, 1.1, -3.1332069401291682);
scene.add(torus);
pointLightCamera.intensity = 2250;

let Hue = 6;
const navbar = document.getElementById("navy");
const info = document.getElementById("infy");

const sidesOn = (side = 'left') => {

  if (side === 'left') {
    if (!info.classList.contains('info-left-on'))
      info.classList.add("info-left-on");
    if (info.classList.contains('info-right-on'))
      info.classList.remove("info-right-on");
  }
  else if (side === 'right') {
    if (info.classList.contains('info-left-on'))
      info.classList.remove("info-left-on");
    if (!info.classList.contains('info-right-on'))
      info.classList.add("info-right-on");
  }
}
const sidesOnRemove = () => {
  if (info.classList.contains('info-right-on'))
    info.classList.remove("info-right-on");
  if (info.classList.contains('info-left-on'))
    info.classList.remove("info-left-on");
}
const navOnOff = (state = 'on') => {
  if (state === 'on') {
    if (!navbar.classList.contains('navbar-on'))
      navbar.classList.add("navbar-on");
    if (navbar.classList.contains('navbar-off'))
      navbar.classList.remove("navbar-off");
  }
  if (state === 'off') {
    if (!navbar.classList.contains('navbar-off'))
      navbar.classList.add("navbar-off");
    if (navbar.classList.contains('navbar-on'))
      navbar.classList.remove("navbar-on");
  }


}
const animate = (t) => {

  TWEEN.update(t);

  pointLightCamera.position.set(camera.position.x, camera.position.y, camera.position.z);

  animateStars();



  // Self-rotation
  sun.rotateY(selfRotationSpeed * 0.001);

  mercury.mesh.rotateY(selfRotationSpeed * 0.004);
  venus.mesh.rotateY(selfRotationSpeed * 0.002);
  earth.mesh.rotateY(selfRotationSpeed * 0.02);
  mars.mesh.rotateY(selfRotationSpeed * 0.018);
  jupiter.mesh.rotateY(selfRotationSpeed * 0.04);
  saturn.mesh.rotateY(selfRotationSpeed * 0.038);
  uranus.mesh.rotateY(selfRotationSpeed * 0.03);
  neptune.mesh.rotateY(selfRotationSpeed * 0.032);
  pluto.mesh.rotateY(selfRotationSpeed * 0.008);

  // Around-sun-rotation
  mercury.obj.rotateY(aroundSunRotationSpeed * 0.03);
  venus.obj.rotateY(aroundSunRotationSpeed * 0.015);
  earth.obj.rotateY(aroundSunRotationSpeed * 0.01);
  mars.obj.rotateY(aroundSunRotationSpeed * 0.008);
  jupiter.obj.rotateY(aroundSunRotationSpeed * 0.002);
  saturn.obj.rotateY(aroundSunRotationSpeed * 0.0009);
  uranus.obj.rotateY(aroundSunRotationSpeed * 0.0004);
  neptune.obj.rotateY(aroundSunRotationSpeed * 0.0001);
  pluto.obj.rotateY(aroundSunRotationSpeed * 0.00007);

  // Hue += 0.001;
  // Hue = (Hue + 1) % 1;
  // pointLight.color.setHSL(Hue, 1, 0.5);

  // sunMat.color.setHSL(Hue, 1, 0.5);


  switch (current) {

    case 0:
      torus.rotation.y += 0.01;
      cube.rotation.y -= 0.003;
      torusHue += 0.001;
      torusHue = (torusHue + 1) % 1;
      torus.material.color.setHSL(torusHue, 1, 0.5);
      tweenAnimate(-569.4668683153066, 22.563694915220054, -1174.0644901281335, -3.122376573243678, -0.4515347003027919, -3.1332069401291682);
      break;
    case 1:

      torus.rotation.y += 0.01;
      cube.rotation.y -= 0.003;
      torusHue += 0.001;
      torusHue = (torusHue + 1) % 1;
      torus.material.color.setHSL(torusHue, 1, 0.5);
      tweenAnimate(-517.2496701139933, 20.494719536498554, -1066.4087833729516, -3.122376573243678, -0.4515347003027918, -3.1332069401291682);
      break;
    case 2:

      // Torus Animations
      torus.rotation.y += 0.01;
      cube.rotation.y = -0.6553470030279186;
      torusHue += 0.001;
      torusHue = (torusHue + 1) % 1;
      torus.material.color.setHSL(torusHue, 1, 0.5);
      tweenAnimate(-530.2496701139933, 21.8, -1064.8, -3.122376573243678, -0.4515347003027918, -3.1332069401291682, 200);
      break;

    case 3:
      tweenAnimate(-58.24139886997644, 2.875586138084126, -34.243313161518664, -3.05781410070787, -1.0377442004865245, -3.0693939490520172, 400);
      break;
    case 4:

      tweenAnimate(-409.0108195602929, 20.19432681690466, -240.47989664397596, -3.0578141007078696, -1.0377442004865243, -3.0693939490520172);

      break;

    case 5:

      tweenAnimate(-0.02400458869863442, -56.59860781300542, -28.62484159728269, 1.6701083149188845, -0.19738271545085728, 2.0409011882302535);

      break;

    case 6:


      tweenAnimate(16.475657848670124, 25.114682669645752, 54.77317221956686, -0.4407603242588318, -0.11467680866013255, -0.05392335175378135);
      break;

    case 7:
      tweenAnimate(-27.60641544167389, 1.6835178531660033, -61.676450174650796, -3.0578141007078696, -1.0377442004865245, -3.0693939490520172);
      break;
    case 8:
      tweenAnimate(-89.2434878991418, -68.4755443177369, -70.42994976412581, 2.5110901037801403, -0.3273864917960371, 2.9110568442534364);
      break;
    case 9:
      tweenAnimate(-20, 0, 50, 0, 0, 0);
      break;
    case 10:
      tweenAnimate(-409.0108195602929, 20.19432681690466, -240.47989664397596, -3.0578141007078696, -1.0377442004865243, -3.0693939490520172);

      break;
    case 11:
      tweenAnimate(-569.4668683153066, 22.563694915220054, -1174.0644901281335, -3.122376573243678, -0.4515347003027919, -3.1332069401291682);

      break;
    default:

      break;
  }



  // console.log("tweenAnimate(" + camera.position.x + ", " + camera.position.y + ", " + camera.position.z + "," + camera.rotation.x + ", " + camera.rotation.y + ", " + camera.rotation.z + ");");

  renderer.render(scene, camera);
};
renderer.setAnimationLoop(animate);

// Function to prevent the default context menu
function disableContextMenu(event) {
  event.preventDefault();
}

// Adding event listener to the document for the contextmenu event
document.addEventListener('contextmenu', disableContextMenu);

const element_infoTitle = document.getElementById('info-title');
const element_infoSubTitle = document.getElementById('info-sub-title');
const element_infoDetail = document.getElementById('info-detail');

function sanitizeInput(input) {
  // Replace < and > characters with their HTML entity equivalents
  return input.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function replaceNewlinesWithBr(input) {
  // Replace newline characters with <br> tags
  return input.replace(/\n/g, '<br>');
}
const writeInformation = (section) => {
  element_infoTitle.innerHTML = replaceNewlinesWithBr(sanitizeInput(section.infoTitle));
  element_infoSubTitle.innerHTML = replaceNewlinesWithBr(sanitizeInput(section.infoSubTitle));
  element_infoDetail.innerHTML = replaceNewlinesWithBr(sanitizeInput(section.infoDetail));
}
const navigateNoticeOnOff = (action) => {
  if (action === 'on') {
    document.getElementById('navyInfy').style.display = 'flex';
  } else if (action === 'off') {
    document.getElementById('navyInfy').style.display = 'none';
  }

}
const changePage = () => {
  switch (current) {

    case 0:
      navigateNoticeOnOff('on');
      sidesOnRemove();
      break;
    case 1:
      navigateNoticeOnOff('off');
      sidesOnRemove();
      navOnOff('off');
      break;
    case 2:
      writeInformation(introduction);

      navOnOff('on');

      sidesOn("right");

      cubeGeometry.innerRadius = 2.5;
      break;

    case 3:

      sidesOnRemove();
      navOnOff('off');
      break;
    case 4:
      sidesOnRemove();
      navOnOff('off');
      break;

    case 5:

      sidesOn('left');
      navOnOff('on');

      writeInformation(workExperience);
      break;

    case 6:

      sidesOn('right');
      writeInformation(skills);
      break;

    case 7:
      sidesOn('left');
      writeInformation(qualification);
      break;
    case 8:
      sidesOn('right');
      writeInformation(personalDetails);
      break;
    case 9:
      sidesOn('left');
      writeInformation(contactDetails);
      break;
    case 10:
      sidesOnRemove();
      navOnOff('off');
      break;
    case 11:
      document.getElementById('splashy-outro').classList.remove('no');
      document.getElementById('splashy-outro').classList.add('splash-screen-outro-container');
      document.removeEventListener('keydown', keyDownHandler);
      document.removeEventListener('mousedown', mouseDownHandler);
      current = 1;
      setTimeout(() => {
        document.getElementById('splashy-outro').classList.add('no');
        document.getElementById('splashy-outro').classList.remove('splash-screen-outro-container');
        document.addEventListener('keydown', keyDownHandler);
        document.addEventListener('mousedown', mouseDownHandler);
      }, 6000);

      break;
    default:
      break;
  }

}
// Define the event handler functions
function keyDownHandler(event) {
  if (event.key === 'ArrowUp') {
    if (current >= 0 && current < 11)
      current++;
    changePage();
  } else if (event.key === 'ArrowDown') {
    if (current > 0 && current <= 11)
      current--;
    changePage();
  }
  // console.log(current);
}

function mouseDownHandler(event) {
  if (event.button === 0) { // Left click
    if (current >= 0 && current < 11)
      current++;
    changePage();
  } else if (event.button === 2) { // Right click
    if (current > 0 && current <= 11)
      current--;
    changePage();
  }
  // console.log(current);

}

setTimeout(() => {
  document.addEventListener('keydown', keyDownHandler);
  document.addEventListener('mousedown', mouseDownHandler);
  document.getElementById("splashy").style.display = "none";
}, 6000);

const openMenu = () => {
  // off -> on
  current--;
  navOnOff('on');
  document.getElementById('menny').classList.remove('menu-off');
  document.getElementById('menny').classList.remove('menu-display');
  document.getElementById('menny').classList.add('menu-display');
  document.removeEventListener('keydown', keyDownHandler);
  document.removeEventListener('mousedown', mouseDownHandler);
}

const closeMenu = () => {
  document.addEventListener('keydown', keyDownHandler);
  document.addEventListener('mousedown', mouseDownHandler);
  document.getElementById('menny').classList.add('menu-off');
  changePage();
}

const hamButton = document.getElementById('hammy');

const hamButtonClickHandler = (event) => {

  if (document.getElementById('menny').classList.contains('menu-off')) {
    openMenu();
  } else {
    closeMenu();
  }


}

hamButton.addEventListener('click', hamButtonClickHandler);

// Get all the <li> elements by their IDs
const introOption = document.getElementById('introOption');
const workExperienceOption = document.getElementById('workExperienceOption');
const skillsOption = document.getElementById('skillsOption');
const qualificationOption = document.getElementById('qualificationOption');
const personalDetailsOption = document.getElementById('personalDetails');
const contactDetailsOption = document.getElementById('contactDetails');

// Define click event handler functions
function introOptionClickHandler() {

  current = 2;
  closeMenu();
}

function workExperienceOptionClickHandler() {

  current = 5;
  closeMenu();
}

function skillsOptionClickHandler() {

  current = 6;
  closeMenu();
}

function qualificationOptionClickHandler() {


  current = 7;
  closeMenu();
}

function personalDetailsClickHandler() {

  current = 8;
  closeMenu();
}

function contactDetailsClickHandler() {

  current = 9;
  closeMenu();
}

// Add event listeners to each <li> element
introOption.addEventListener('click', introOptionClickHandler);
workExperienceOption.addEventListener('click', workExperienceOptionClickHandler);
skillsOption.addEventListener('click', skillsOptionClickHandler);
qualificationOption.addEventListener('click', qualificationOptionClickHandler);
personalDetailsOption.addEventListener('click', personalDetailsClickHandler);
contactDetailsOption.addEventListener('click', contactDetailsClickHandler);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
