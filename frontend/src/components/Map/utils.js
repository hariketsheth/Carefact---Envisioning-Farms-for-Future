import { MercatorCoordinate } from 'mapbox-gl';
import * as THREE from 'three';
import { TweenMax } from 'gsap';

let allLayers = [];
const height=100;

/**
 * Creates a plot at a location
**/

export const loadLocation = (map, lng, lat, id, width, length, color, minLat, maxLat, minLng, maxLng, currentPlot, day, callback) => {
  console.log(width);
  console.log(length);

  // parameters to ensure the model is georeferenced correctly on the map
  const modelOrigin = [lng, lat];
  const modelAltitude = 0;
  const modelRotate = [Math.PI / 2, 0, 0];

  const modelAsMercatorCoordinate = MercatorCoordinate.fromLngLat(
    modelOrigin,
    modelAltitude
  );

  const modelTransform = {
    translateX: modelAsMercatorCoordinate.x,
    translateY: modelAsMercatorCoordinate.y,
    translateZ: modelAsMercatorCoordinate.z,
    rotateX: modelRotate[0],
    rotateY: modelRotate[1],
    rotateZ: modelRotate[2],
    /* Since our 3D model is in real world meters, a scale transform needs to be
    * applied since the CustomLayerInterface expects units in MercatorCoordinates.
    */
   scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()
  };

  // Insert the layer beneath any symbol layer.
  const layers = map.getStyle().layers;

  let labelLayerId;
  for (let i = 0; i < layers.length; i++) {
    if (layers[i].type === 'custom') {
    labelLayerId = layers[i].id;
    break;
    }
  }

  const customLayer = {
    id: lat.toString() + lng.toString(),
    type: 'custom',
    renderingMode: '3d',
    'fill-extrusion-height': [
    'interpolate',
    ['linear'],
    ['zoom'],
    15,
    0,
    15.05,
    ['get', 'height']
    ],
    'fill-extrusion-base': [
    'interpolate',
    ['linear'],
    ['zoom'],
    15,
    0,
    15.05,
    ['get', 'min_height']
    ],
    onAdd: function(map, gl) {
    this.camera = new THREE.Camera();
    this.scene = new THREE.Scene();

    // create two three.js lights to illuminate the model
    const directionalLight = new THREE.DirectionalLight(0xeeeeee);
    directionalLight.position.set(40, -70, 100).normalize();
    this.scene.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0xeeeeee);
    directionalLight2.position.set(40, 70, 100).normalize();
    this.scene.add(directionalLight2);

    const ftHeight = (height / 3.28084) / 100;

    const geometry = new THREE.BoxGeometry( width , ftHeight, length );
    const material = new THREE.MeshPhongMaterial({
      color,
      opacity: 0.75,
      transparent: true,
    });
    const cube = new THREE.Mesh( geometry, material );
    this.scene.add( cube );
    TweenMax.to(cube.scale, .5, { x: 1, y: 100, z: 1 });
    TweenMax.to(cube.position, .5,  {y: ftHeight * 50});
    this.map = map;

    // use the Mapbox GL JS map canvas for three.js
    this.renderer = new THREE.WebGLRenderer({
    canvas: map.getCanvas(),
    context: gl,
    antialias: true
    });

    callback(id, {
      model: cube,
      minLat: minLat,
      maxLat: maxLat,
      minLng: minLng,
      maxLng: maxLng,
      centerLat: lng,
      centerLng: lat,
      currentPlot: currentPlot,
      width: width,
      length: length,
      day: day
    });

    this.renderer.autoClear = false;
    },
    render: function(gl, matrix) {
    const rotationX = new THREE.Matrix4().makeRotationAxis(
    new THREE.Vector3(1, 0, 0),
    modelTransform.rotateX
    );
    const rotationY = new THREE.Matrix4().makeRotationAxis(
    new THREE.Vector3(0, 1, 0),
    modelTransform.rotateY
    );
    const rotationZ = new THREE.Matrix4().makeRotationAxis(
    new THREE.Vector3(0, 0, 1),
    modelTransform.rotateZ
    );

    const m = new THREE.Matrix4().fromArray(matrix);
    const l = new THREE.Matrix4()
    .makeTranslation(
    modelTransform.translateX,
    modelTransform.translateY,
    modelTransform.translateZ
    )
    .scale(
    new THREE.Vector3(
    modelTransform.scale,
    -modelTransform.scale,
    modelTransform.scale
    )
    )
    .multiply(rotationX)
    .multiply(rotationY)
    .multiply(rotationZ);

    this.camera.projectionMatrix = m.multiply(l);
    this.renderer.state.reset();
    this.renderer.render(this.scene, this.camera);
    this.map.triggerRepaint();
  }
  };

  try {
    map.addLayer(customLayer, labelLayerId);
    allLayers.push(customLayer.id);
    window.map = map;
  }
  catch (error) {
    // TODO: Notify
    //notify("Can't Build", "There's already a building there!");
  }
}
  //console.log(lng);
  //console.log(lat);
  /*map.addLayer({
   id: 'plot-' + id,
   type: 'custom',
   renderingMode: '3d',
   onAdd: function (map, mbxContext) {

     window.tb = new Threebox(
       map,
       mbxContext,
       { defaultLights: true }
     );

    // initialize geometry and material of our cube object
    const geometry = new THREE.BoxGeometry(100, 100, 100);

    const redMaterial = new THREE.MeshPhongMaterial( {
      color: 0x009900, 
      side: THREE.DoubleSide
    });

    //var cube = new THREE.Mesh(geometry, redMaterial);

   var sphere = window.tb.sphere({color: 'red', material: 'MeshStandardMaterial'})
						.setCoords([lng, lat])

    window.tb.add(sphere);

    //var cube2 = new THREE.Mesh(geometry, redMaterial);

    //cube2 = window.tb.Object3D({obj: cube}).setCoords([lng + 0.01, lat + 0.01])

    //window.tb.add(cube2);
  },
  render: function(gl, matrix){
    window.tb.update();
  }
 });*/