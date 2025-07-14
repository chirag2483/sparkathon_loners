class FaceDetection {
  constructor(params) {
    var ref = this;
    this.selector = "tryon";
    this.object = params.object;
    this.width = params.width;
    this.height = params.height;
    this.accessoryType = params.accessoryType || 'glasses'; // 'glasses' or 'hat'

    if (params.statusHandler) {
      this.statusHandler = params.statusHandler;
    } else {
      this.statusHandler = function () {};
    }
    this.changeStatus = function (status) {
      this.status = status;
      this.statusHandler(this.status);
    };
    this.changeStatus("STATUS_READY");

    if (params.debug) {
      this.debug = true;
      this.debugMsg = this.status;
    } else {
      this.debug = false;
    }

    this.video = document.getElementById("camera");
    document.getElementById(this.selector).style.width = this.width + "px";
    this.video.setAttribute("width", this.width);
    this.video.setAttribute("height", this.height);

    this.tracker = new clm.tracker({ useWebGL: true });
    this.tracker.init();

    this.start = function () {
      var video = ref.video;

      navigator.getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;

      if (navigator.getUserMedia) {
        navigator.getUserMedia(
          {
            video: true,
          },
          function (localMediaStream) {
            video.srcObject = localMediaStream;
            video.play();
            ref.changeStatus("STATUS_CAMERA_ERROR");
          },
          function (err) {
            ref.changeStatus("STATUS_CAMERA_ERROR");
          }
        );
      } else {
        ref.changeStatus("STATUS_CAMERA_ERROR");
      }

      ref.tracker.start(video);
      ref.loop();
    };

    this.debug = function (msg) {
      if (this.debug) {
        this.debugMsg += msg + "<br>";
      }
    };

    this.loop = function () {
      requestAnimFrame(ref.loop);

      var positions = ref.tracker.getCurrentPosition();

      if (positions) {
        var distance = Math.abs(
          90 / ((positions[0][0].toFixed(0) - positions[14][0].toFixed(0)) / 2)
        );
        var hAngle =
          90 -
          (positions[14][0].toFixed(0) - positions[33][0].toFixed(0)) *
            distance;
        
        // Different positioning for glasses vs hat
        var center;
        if (ref.accessoryType === 'hat') {
          // For hat: position on top of head (use forehead position)
          center = {
            x: positions[33][0],
            y: positions[33][1] - (positions[33][1] - positions[41][1]) * 0.3, // Move up from face center
          };
        } else {
          // For glasses: position on face center
          center = {
            x: positions[33][0],
            y: (positions[33][1] + positions[41][1]) / 2,
          };
        }
        
        center = ref.correct(center.x, center.y);

        var zAngle = (positions[33][0] - positions[7][0]) * -1;

        if (distance < 1.5 && distance > 0.5) {
          ref.changeStatus("STATUS_FOUND");

          ref.position.x = center.x - hAngle / 2;
          ref.position.y = center.y;
          ref.rotation.y = hAngle / 100 / 2;
          ref.rotation.z = zAngle / 100 / 1.5;
          
          // Different sizing for glasses vs hat
          if (ref.accessoryType === 'hat') {
            // Hat should be slightly larger and positioned higher
            ref.size.x =
              (positions[14][0] - positions[0][0]) / 2 +
              0.1 * (positions[14][0] - positions[0][0]); // Slightly larger
            ref.size.y =
              (ref.size.x / ref.images["front"].width) *
              ref.images["front"].height;
            ref.size.z = ref.size.x * 2.5; // Thinner for hat
            ref.position.z = (ref.size.z / 2) * -1;
            ref.position.y += 20; // Move hat up a bit
          } else {
            // Original glasses sizing
            ref.size.x =
              (positions[14][0] - positions[0][0]) / 2 +
              0.05 * (positions[14][0] - positions[0][0]);
            ref.size.y =
              (ref.size.x / ref.images["front"].width) *
              ref.images["front"].height;
            ref.size.z = ref.size.x * 3;
            ref.position.z = (ref.size.z / 2) * -1;
          }
        } else {
          ref.changeStatus("STATUS_SEARCH");
          ref.size.x = 0;
          ref.size.y = 0;
        }

        ref.render();
        ref.debug(ref.status);
      }
    };

    /* 3D */
    const canvas = document.getElementById("overlay");
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setClearColor(0xffffff, 0);
    renderer.setSize(this.width, this.height);
    const scene = new THREE.Scene();

    //Siders
    const outside = {
      0: "left",
      1: "right",
      4: "front",
    };

    this.images = [];
    var materials = [];
    for (let i = 0; i < 6; i++) {
      if (this.object.outside[outside[i]] !== undefined) {
        var image = new Image();
        image.src = this.object.outside[outside[i]];
        this.images[outside[i]] = image;
        materials.push(
          new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture(this.object.outside[outside[i]]),
            transparent: true,
          })
        );
      } else {
        materials.push(
          new THREE.MeshLambertMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0,
          })
        );
      }
    }

    this.position = {
      x: 0,
      y: 0,
      z: 0,
    };
    this.rotation = {
      x: 0,
      y: 0,
    };
    this.size = {
      x: 1,
      y: 1,
      z: 1,
    };

    //Object
    var geometry = new THREE.CubeGeometry(1, 1, 1);
    var materials = new THREE.MeshFaceMaterial(materials);
    var cube = new THREE.Mesh(geometry, materials);
    cube.doubleSided = true;
    scene.add(cube);

    //Camera
    var camera = new THREE.PerspectiveCamera(
      45,
      this.width / this.height,
      1,
      5000
    );
    camera.lookAt(cube.position);
    camera.position.z = this.width / 2;
    scene.add(camera);

    //Lights
    var lightFront = new THREE.PointLight(0xffffff);
    lightFront.position.set(0, 0, 1000);
    lightFront.intensity = 0.6;
    scene.add(lightFront);

    var lightLeft = new THREE.PointLight(0xffffff);
    lightLeft.position.set(1000, 0, 0);
    lightLeft.intensity = 0.7;
    scene.add(lightLeft);

    var lightRight = new THREE.PointLight(0xffffff);
    lightRight.position.set(-1000, 0, 0);
    lightRight.intensity = 0.7;
    scene.add(lightRight);

    this.render = function () {
      //Cube coords
      cube.position.x = this.position.x;
      cube.position.y = this.position.y;
      cube.position.z = this.position.z;
      cube.rotation.y = this.rotation.y;
      cube.rotation.z = this.rotation.z;
      cube.scale.x = this.size.x;
      cube.scale.y = this.size.y;
      cube.scale.z = this.size.z;

      renderer.render(scene, camera);
    };

    this.correct = function (x, y) {
      return {
        x: ((this.width / 2 - x) * -1) / 2,
        y: (this.height / 2 - y) / 2,
      };
    };

    // Method to switch accessories
    this.switchAccessory = function(type, object) {
      this.accessoryType = type;
      this.object = object;
      
      // Reload textures
      this.images = [];
      var materials = [];
      for (let i = 0; i < 6; i++) {
        if (this.object.outside[outside[i]] !== undefined) {
          var image = new Image();
          image.src = this.object.outside[outside[i]];
          this.images[outside[i]] = image;
          materials.push(
            new THREE.MeshLambertMaterial({
              map: THREE.ImageUtils.loadTexture(this.object.outside[outside[i]]),
              transparent: true,
            })
          );
        } else {
          materials.push(
            new THREE.MeshLambertMaterial({
              color: 0xffffff,
              transparent: true,
              opacity: 0,
            })
          );
        }
      }
      
      // Update cube materials
      cube.material = new THREE.MeshFaceMaterial(materials);
    };
  }
}

var tryOn = null;
var currentAccessory = 'glasses';

// Accessory configurations
var accessories = {
  glasses: {
    outside: {
      left: "assets/glasses/left.png",
      right: "assets/glasses/right.png",
      front: "assets/glasses/glass1.png",
    },
  },
  hat: {
    outside: {
      left: "assets/glasses/left.png", // Using glasses images as placeholder
      right: "assets/glasses/right.png",
      front: "assets/glasses/glass1.png",
    },
  },
};

$(window).load(function () {
  $("#start").hide();

  tryOn = new FaceDetection({
    width: 640,
    height: 480,
    debug: true,
    object: accessories.glasses,
    accessoryType: 'glasses',
    statusHandler: function (status) {
      switch (status) {
        case "STATUS_READY":
          {
            $("#start").show();
          }
          break;
        case "STATUS_CAMERA_ERROR":
          {
            console.warn("Camera not available for use");
          }
          break;
        case "STATUS_SEARCH":
          {
            console.warn("User not detected");
          }
          break;
        case "STATUS_FOUND": {
        }
      }
    },
  });

  $("#start").click(function () {
    tryOn.start();
  });

  // Accessory switching functionality
  $("#glasses-btn").click(function() {
    if (currentAccessory !== 'glasses') {
      currentAccessory = 'glasses';
      tryOn.switchAccessory('glasses', accessories.glasses);
      
      // Update button states
      $("#glasses-btn").addClass('active');
      $("#hat-btn").removeClass('active');
    }
  });

  $("#hat-btn").click(function() {
    if (currentAccessory !== 'hat') {
      currentAccessory = 'hat';
      tryOn.switchAccessory('hat', accessories.hat);
      
      // Update button states
      $("#hat-btn").addClass('active');
      $("#glasses-btn").removeClass('active');
    }
  });
}); 