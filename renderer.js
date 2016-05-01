"use strict";

function Renderer() {
  this.camera;
  this.scene;
  this.renderer;

  this.moveForward;

  this.maze;
  this.walls;
  this.controls;
}

Renderer.prototype.init = function () {
  var _this = this;

  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera(95, window.innerWidth / window.innerHeight, 0.1, 1000);
  this.renderer = new THREE.WebGLRenderer({ alpha: true });
  this.maze = new Maze();
  this.walls = [];

  this.clock = new THREE.Clock();

  this.renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(this.renderer.domElement);

  // Camera adjusting
  this.camera.position.x = this.maze.width / 2;
  this.camera.position.y = 0.8;
  this.camera.position.z = 3;

  this.controls = new THREE.FirstPersonControls(this.camera);
  this.controls.movementSpeed = 10;
  this.controls.lookSpeed = 0.05;
  this.controls.lookVertical = false;
  this.controls.noFly = true;

  // Lights
  var light = new THREE.DirectionalLight(0xffffff);
  light.position.set(0, 1, 1).normalize();
  this.scene.add(light);
  this.scene.fog = new THREE.Fog(0xffffff, 0, 30);

  // Creating scene
  this.createFloor();
  this.createWalls();

  this.walls.map(function (wall) {
    return _this.scene.add(wall);
  });
};

Renderer.prototype.render = function () {
  requestAnimationFrame(this.render.bind(this));

  this.controls.update(this.clock.getDelta());

  this.renderer.render(this.scene, this.camera);
};

Renderer.prototype.createWalls = function () {
  var walls = [];

  for (var i = 0; i < this.maze.height; i++) {
    for (var j = 0; j < this.maze.width; j++) {
      if (this.maze.loadedMap[i][j] == 1) {
        this.walls.push(this.createWall(i, j));
      }
    }
  }
};

Renderer.prototype.createWall = function (x, z) {
  var geometry = new THREE.BoxGeometry(1, 2, 1);
  var material = new THREE.MeshPhongMaterial({ color: 0x0033ff, specular: 0x555555, shininess: 30 });

  var wall = new THREE.Mesh(geometry, material);
  wall.position.z = -z;
  wall.position.y = 1.05;
  wall.position.x = x;

  return wall;
};

Renderer.prototype.createFloor = function () {
  for (var i = 0; i < this.maze.width; i++) {
    for (var j = 0; j < this.maze.height; j++) {
      this.scene.add(this.createFloorTile(j, -i));
    }
  }
};

Renderer.prototype.createFloorTile = function (x, z) {
  var geometry = new THREE.BoxGeometry(1, 0.1, 1);
  var material = new THREE.MeshBasicMaterial({ color: 0x990033 });
  var tile = new THREE.Mesh(geometry, material);
  tile.position.x = x;
  tile.position.z = z;
  tile.position.y = 0;

  return tile;
};

/**
* Map Prototype
*/

function Maze() {
  this.loadedMap;
  this.height;
  this.width;

  this.init();
}

Maze.prototype.init = function () {
  this.loadedMap = this.getMap();
  this.height = this.loadedMap.length;
  this.width = this.loadedMap[0].length;
};

Maze.prototype.getMap = function () {
  this.loadedMap = [];
  return [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1], [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1], [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1], [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1]];
};

/**
* Start app
*/

var startMaze = function () {
  var renderer = Object.create(Renderer.prototype);
  renderer.init();
  renderer.render();
}();