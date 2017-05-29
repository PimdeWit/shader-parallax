'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Experiment = function () {
  function Experiment() {
    _classCallCheck(this, Experiment);

    this.container = null;
    this.renderer = null;
    this.camera = null;
    this.scene = null;
    this.uniforms = {};
  }

  Experiment.prototype.init = function init() {
    this.container = document.getElementById('container');
    this.camera = new THREE.Camera();
    this.camera.position.z = 1;
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.container.appendChild(this.renderer.domElement);

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.uniforms = {
      time: {
        value: 1.0
      },
      resolution: {
        value: new THREE.Vector2()
      },
      pointer: {
        value: new THREE.Vector2()
      },
      texture: {
        value: null
      }
    };

    this.addEventListeners();
    this.onResize();
    this.animate();

    this.getImage();
  };

  Experiment.prototype.getImage = function getImage() {
    var img = new Image();
    img.onload = function(event) {
      console.log('test');
      this.uniforms.texture.value = event.target;
      this.createShaderViewport();
    }.bind(this);
    img.src = '/img/test.jpg';
  };

  Experiment.prototype.createShaderViewport = function createShaderViewport() {
    var geometry = new THREE.PlaneBufferGeometry(2, 2);
    var material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: document.getElementById('vertexShader').textContent,
      fragmentShader: document.getElementById('fragmentShader').textContent
    });
    var mesh = new THREE.Mesh(geometry, material);
    this.scene.add(mesh);
  };

  Experiment.prototype.addEventListeners = function addEventListeners() {
    window.addEventListener('resize', this.onResize.bind(this), false);
    window.addEventListener('pointermove', this.onPointerMove.bind(this), false);
  };

  Experiment.prototype.onResize = function onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.renderer.setSize(this.width, this.height);
    this.uniforms.resolution.value.x = this.renderer.domElement.width;
    this.uniforms.resolution.value.y = this.renderer.domElement.height;
  };

  Experiment.prototype.onPointerMove = function onPointerMove(event) {
    this.uniforms.pointer.value.x = event.y / this.height;
    this.uniforms.pointer.value.y = event.x / this.width;
  };

  Experiment.prototype.animate = function animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.render();
  };

  Experiment.prototype.render = function render() {
    this.uniforms.time.value += 0.01;
    this.renderer.render(this.scene, this.camera);
  };

  return Experiment;
}();

var experiment = new Experiment();
experiment.init();
