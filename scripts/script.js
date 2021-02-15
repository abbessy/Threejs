import {GLTFLoader} from "../import/GLTFLoader.js" ;

//variables        
let scene = new THREE.Scene() ;
const fov = 40 ; 
const aspect = window.innerWidth / window.innerHeight ; 
const near = 0.01 ; 
const far = 1000 ; 

//camera
let camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
camera.position.set(500,100,50);

//renderer
let renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize (window.innerWidth/2, window.innerHeight-100) ;
document.body.appendChild(renderer.domElement) ;

//loader 
var obj;
let loader = new GLTFLoader() ;
loader.load("fridge/scene.gltf", function(gltf) {
    obj = gltf.scene;
    scene.add(gltf.scene);
}) ; 

//change scene background
//scene.background = new THREE.Color(0xffffff) ;

//light
let light = new THREE.HemisphereLight(0xffffff,0x000000,2) ; 
scene.add(light);


//fix the window resize problem 
window.addEventListener('resize', function(){
    renderer.setSize(window.innerWidth/2,window.innerHeight-100) ; 
    camera.aspect = window.innerWidth / window.innerHeight ; 
    camera.updateProjectionMatrix();
}) ;

//add a control method : exp orbit controls  
const controls = new THREE.OrbitControls( camera, document.body );

//animation
function animate () {
    requestAnimationFrame(animate);
    renderer.render(scene,camera); 
    //obj.rotation.y += 0.005 ;
}
animate();