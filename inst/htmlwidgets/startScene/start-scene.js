function loadPLY(paths, identifier) {
  let loader = new THREE.PLYLoader();
  loader.load(paths, function (geometry) {
    geometry.computeVertexNormals();
    
    let material = new THREE.MeshStandardMaterial({
        wireframe: false,
        opacity: 1,
        transparent: true,
        vertexColors: THREE.VertexColors
      });
    
    let mesh = new THREE.Mesh(geometry, material);
    // mesh.scale.multiplyScalar(0.035);
          
    document.getElementById(identifier).firstChild.scene.add(mesh);
  });
}

function init(paths, identifier) {
  widgetDiv = document.getElementById(identifier);
  
  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color("rgb(10%, 10%, 10%)");
  widgetDiv.firstChild.scene = scene;
  
  // renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth / 1.715, window.innerHeight / 1.715);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.shadowMap.enabled = true;
  widgetDiv.appendChild( renderer.domElement );

  widgetDiv.firstChild.scene.add(renderer); 

  // Camera
  camera = new THREE.PerspectiveCamera(
    35, window.innerWidth / window.innerHeight,
    1, 1000
  );
  camera.position.set(25, 25, 25);

  cameraTarget = new THREE.Vector3(0, 0, 0);
  camera.lookAt(cameraTarget);

  // Camera controls
  controls = new THREE.TrackballControls( camera, renderer.domElement );
  controls.update();

  // Lights
  // scene.add( new THREE.AxesHelper( 20 ) );
  scene.add(new THREE.HemisphereLight("rgb(255, 255, 255)", "rgb(255, 255, 255)"));

  // Load PLY file
  loadPLY(paths, identifier);

  // resize
  window.addEventListener("resize", onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth / 1.715, window.innerHeight / 1.715);
}

function animate() {
  requestAnimationFrame( animate );  
  controls.update();
  renderer.render(scene, camera);
}
