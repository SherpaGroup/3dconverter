import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let originalScene, originalCamera, originalRenderer, originalControls;
let convertedScene, convertedCamera, convertedRenderer, convertedControls;

const originalPreviewDiv = document.getElementById('preview');
const convertedPreviewDiv = document.getElementById('convertedPreview');

function initPreview(container, scene, camera, renderer, controls) {
    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe9ecef);

    // Camera
    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(2, 2, 5);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    }, false);

    return { scene, camera, renderer, controls };
}

function loadModel(file, scene, onLoaded) {
    const loader = new GLTFLoader();
    const url = URL.createObjectURL(file);
    loader.load(url, (gltf) => {
        // Clear previous model
        while(scene.children.length > 2){ // Keep lights
            scene.remove(scene.children[2]);
        }

        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        scene.add(model);
        URL.revokeObjectURL(url);
        if(onLoaded) onLoaded(model);
    }, undefined, (error) => {
        console.error(error);
        alert('An error happened while loading the model.');
    });
}


function loadConvertedModel(url, format, scene) {
    let loader;
    if (format === 'obj') {
        loader = new OBJLoader();
    } else if (format === 'stl') {
        loader = new STLLoader();
    } else {
        console.error("Unsupported format for preview:", format);
        alert(`Preview for .${format} is not supported. You can still download the file.`);
        return;
    }

    loader.load(url, (object) => {
        while(scene.children.length > 2){
            scene.remove(scene.children[2]);
        }

        const model = (format === 'stl') ? new THREE.Mesh(object, new THREE.MeshStandardMaterial({color: 0x0055ff})) : object;

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center); // center model
        scene.add(model);

    }, undefined, (error) => {
        console.error('An error happened while loading the converted model.', error);
        alert('An error happened while loading the converted model.');
    });
}

document.getElementById('fileInput').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        if (!originalScene) {
            const original = initPreview(originalPreviewDiv);
            originalScene = original.scene;
        }
        loadModel(file, originalScene);
    }
});

document.getElementById('convertBtn').addEventListener('click', async () => {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (!file) {
        alert('Please upload a file first.');
        return;
    }

    const format = document.getElementById('formatSelect').value;
    const convertBtn = document.getElementById('convertBtn');
    const spinner = convertBtn.querySelector('.spinner-border');
    const downloadLink = document.getElementById('downloadLink');

    // Show spinner and disable button
    spinner.classList.remove('d-none');
    convertBtn.disabled = true;
    downloadLink.classList.add('d-none');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('format', format);

    try {
        const response = await fetch('http://localhost:3000/convert', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Conversion failed');
        }

        const result = await response.json();

        downloadLink.href = result.downloadUrl;
        downloadLink.download = `converted_model.${format}`;
        downloadLink.classList.remove('d-none');

        if (!convertedScene) {
            const converted = initPreview(convertedPreviewDiv);
            convertedScene = converted.scene;
        }
        loadConvertedModel(result.downloadUrl, format, convertedScene);

    } catch (error) {
        console.error('Error:', error);
        alert(`Error: ${error.message}`);
    } finally {
        // Hide spinner and re-enable button
        spinner.classList.add('d-none');
        convertBtn.disabled = false;
    }
});

// Initial setup
const original = initPreview(originalPreviewDiv);
originalScene = original.scene;
const converted = initPreview(convertedPreviewDiv);
convertedScene = converted.scene;
