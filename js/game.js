    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 2, 0.1, 30000);
    const renderer = new THREE.WebGLRenderer({
        alpha: true
    });
    renderer.setClearColor(0x000000, 0);
    const controlCamera = new THREE.OrbitControls(camera, renderer.domElement);
    controlCamera.update();
    controlCamera.enableDamping = true;
    controlCamera.minDistance = 700;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    scene.add(new THREE.AmbientLight(0xffffff, 1));
    scene.add(new THREE.PointLight(0xffffff, 1));
    scene.add(new THREE.HemisphereLight(0xffffff, 0.1));
    let model;
    const loader = new THREE.GLTFLoader();
    const clock = new THREE.Clock();
    let mixer;
    const geometry = new THREE.BoxGeometry(99999, 0, 99999);
    const textureLoader = new THREE.TextureLoader();
    const material = new THREE.MeshBasicMaterial({
        map: textureLoader.load('texture/carpet.jpg')
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    loader.load('models/cat/scene.gltf', function (gltf) {
        model = gltf.scene;
        model.position.y+=5;
        mixer = new THREE.AnimationMixer(model);
        mixer.clipAction(gltf.animations[0]).play();
        window.addEventListener('keypress', (event) => {
            switch (event.code) {
                case 'KeyW':
                    model.position.z += 10;
                    animate();
                    break;
                case 'KeyA':
                    model.position.x += 10;
                    animate();
                    break;
                case 'KeyS':
                    model.position.z -= 10;
                    animate();
                    break;
                case 'KeyD':
                    model.position.x -= 10;
                    animate();
                    break;
                case 'KeyQ':
                    model.position.z += 10;
                    model.position.x += 10;
                    animate();
                    break;
                case 'KeyE':
                    model.position.z += 10;
                    model.position.x -= 10;
                    animate();
                    break;
                case 'KeyZ':
                    model.position.z -= 10;
                    model.position.x += 10;
                    animate();
                    break;
                case 'KeyC':
                    model.position.z -= 10;
                    model.position.x -= 10;
                    animate();
                    break;
                case 'KeyR':
                    model.rotation.y += 0.1;
                    animate();
                    break;
                case 'KeyT':
                    model.rotation.y -= 0.1;
                    animate();
                    break;
                default:
                    break;
            }
        })
        scene.add(gltf.scene);
    }, undefined, function (error) {
        console.error(error);
    });


    function animate() {
        requestAnimationFrame(animate);
        controlCamera.update();
        mixer.update(clock.getDelta());
        renderer.render(scene, camera);
    }
    animate();