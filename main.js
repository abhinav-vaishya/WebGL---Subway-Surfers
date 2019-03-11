var cubeRotation = 0.0;



main();

//
// Start here
//

var c;
var c1;
var policeman;
var policedog;
var texturedog;
var texturepolice;
var wall_left;
var wall_right;
var jetpacks;
var obstacles1;
var track0;
var track1;
var track2;
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var spacePressed = false;
var camx = 2, camy = 15, camz = 0;
var targetx, targety, targetz;
var texturetrack;
var textureplayer;
var texturewall;
var textureshoe;
var texturemagnet;
var texturejetpack;
var textureobstacle1;
var texturetrain1, texturetrain2, texturetrain3;
var trains;
var traintype;
var movement;
var shoes;
var playerjump;
var playerup;
var coins;
var shoe_taken;
var magnets;
var magnet_taken;
var magnetstart;
var magnetcoins;
var jetpack_taken;
var jumpingshoe;
var shoestart;
var jetpackstart;
var trainup;
var jetpackfly;
var coinstaken;
var jetpackcoins;
var obstaclescollide;
var score;
var distance;
var ded;
var end;
var grayscale;
var coinsound;
var collidesound;
var dogsound;
var trainsound;
var shoesound;
var jumpsound;
var themesong;
var collidestart;
var speed;




function main() {


  const canvas = document.querySelector('#glcanvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  document.addEventListener('keydown', keyDownHandler, false);
  document.addEventListener('keyup', keyUpHandler, false);
  track0 = new Array(100);
  track1 = new Array(100);
  track2 = new Array(100);
  wall_left = new Array(300);
  wall_right = new Array(300);
  trains = new Array(100);
  coins = new Array(501);
  jetpackcoins = new Array(240);
  coinstaken = new Array(501);
  jetpackcoinstaken = new Array(240);
  shoes = new Array(2);
  magnets = new Array(2);
  shoe_taken = new Array(2);
  magnet_taken = new Array(2);
  jetpacks = new Array(2);
  jetpack_taken = new Array(2);
  obstacles1 = new Array(100);
  obstaclescollide = new Array(100);
  traintype = new Array(100);
  playerjump = false;
  playerup = false;
  trainup = false;
  score = 0;
  distance = 0;
  ded = false;
  speed = 0.4;
  jumpsound = new sound('jump.wav');
  collidesound = new sound('traincollide.wav');
  coinsound = new sound('coin.wav');
  themesong = new sound('theme.mp3');
  trainsound = new sound('trainpass.wav');
  dogsound = new sound('dogcaught.wav');
  shoesound = new sound('jumpingshoes.wav');


  themesong.play();

  for (var i = 0; i < 100; i++) {
    var r = Math.floor((Math.random() * 2) + 1);
    traintype[i] = r;
  }
  c = new cube(gl, [2, 5.0, 3.0]);
  policeman = new police(gl, [2, 5.0, 0.5]);
  policedog = new dog(gl, [0.3, 4.5, 1.5]);
  var pos = -20.0;
  for (var i = 0; i < 100; i++) {
    track0[i] = new railtrack(gl, [2.0, 3.0, pos]);
    track1[i] = new railtrack(gl, [-6.0, 3.0, pos]);
    track2[i] = new railtrack(gl, [10.0, 3.0, pos]);
    pos += 40.0;
  }
  pos = -20.0;
  for (var i = 0; i < 300; i += 2) {
    wall_left[i] = new wall(gl, [-10.0, 8.0, pos]);
    wall_left[i + 1] = new wall(gl, [-10.0, 16.0, pos]);
    wall_right[i] = new wall(gl, [14.0, 8.0, pos]);
    wall_right[i + 1] = new wall(gl, [14.0, 16.0, pos]);
    pos += 40.0;
  }
  var posx;
  var posz;
  for (var i = 0; i < 100; i++) {
    posx = Math.floor((Math.random() * 3) + 1);
    if (posx == 1) posx = 10.0;
    else if (posx == 2) posx = 2.0;
    else if (posx == 3) posx = -6.0;
    posz = Math.floor((Math.random() * 15) + 1);
    posz += 18.0;
    if (i == 0) trains[i] = new train(gl, [posx, 7.0, posz]);
    else trains[i] = new train(gl, [posx, 7.0, trains[i - 1].pos[2] + posz]);
  }
  end = trains[99].pos[2];
  posz = 800.0;
  for (var i = 0; i < 2; i++) {
    posx = Math.floor((Math.random() * 3) + 1);
    if (posx == 1) posx = 10.0;
    else if (posx == 2) posx = 2.0;
    else if (posx == 3) posx = -6.0;
    shoes[i] = new shoe(gl, [posx, 5.0, posz]);
    posz += 750.0;
  }
  posz = 400.0;
  for (var i = 0; i < 2; i++) {
    shoe_taken[i] = 0;
    jetpack_taken[i] = 0;
    posx = Math.floor((Math.random() * 3) + 1);
    if (posx == 1) posx = 10.0;
    else if (posx == 2) posx = 2.0;
    else if (posx == 3) posx = -6.0;
    jetpacks[i] = new jetpack(gl, [posx, 5.0, posz]);
    posz += 750.0;
  }
  posz = 40.0;
  for (var i = 0; i < 100; i++) {
    obstaclescollide[i] = 0;
    posx = Math.floor((Math.random() * 3) + 1);
    if (posx == 1) posx = 10.0;
    else if (posx == 2) posx = 2.0;
    else if (posx == 3) posx = -6.0;
    obstacles1[i] = new obstacle1(gl, [posx, 6.0, posz]);
    posz += 50.0;
  }
  posz = 40.0;
  for (var i = 0; i < 501; i += 3) {
    posx = Math.floor((Math.random() * 3) + 1);
    if (posx == 1) posx = 10.0;
    else if (posx == 2) posx = 2.0;
    else if (posx == 3) posx = -6.0;
    coinstaken[i] = 0;
    coinstaken[i + 1] = 0;
    coinstaken[i + 2] = 0;
    coins[i] = new coin(gl, [posx, 6.0, posz]);
    coins[i + 1] = new coin(gl, [posx, 6.0, posz + 5.0]);
    coins[i + 2] = new coin(gl, [posx, 6.0, posz + 10.0]);
    posz += 40.0;
  }
  posz = 10.0;
  for (var i = 0; i < 120; i += 3) {
    jetpackcoins[i] = new coin(gl, [10, 20, jetpacks[0].pos[2] + posz]);
    jetpackcoins[i + 1] = new coin(gl, [2, 20, jetpacks[0].pos[2] + posz]);
    jetpackcoins[i + 2] = new coin(gl, [-6, 20, jetpacks[0].pos[2] + posz]);
    posz += 10.0;
  }
  posz = 10.0;
  for (var i = 120; i < 240; i += 3) {
    jetpackcoins[i] = new coin(gl, [10, 20, jetpacks[1].pos[2] + posz]);
    jetpackcoins[i + 1] = new coin(gl, [2, 20, jetpacks[1].pos[2] + posz]);
    jetpackcoins[i + 2] = new coin(gl, [-6, 20, jetpacks[1].pos[2] + posz]);
    posz += 10.0;
  }
  for (var i = 0; i < 240; i++) {
    jetpackcoinstaken[i] = 0;
  }

  posz = 200.0;
  for (var i = 0; i < 2; i++) {
    magnet_taken[i] = 0;
    posx = Math.floor((Math.random() * 3) + 1);
    if (posx == 1) posx = 10.0;
    else if (posx == 2) posx = 2.0;
    else if (posx == 3) posx = -6.0;
    magnets[i] = new magnet(gl, [posx, 5.0, posz]);
    posz += 850.0;
  }

  jumpingshoe = false;
  shoestart = -1.0;
  jetpackstart = -1.0;
  jetpackfly = false;
  collidestart = -1.0;
  magnetstart = -1.0;
  magnetcoins = false;







  // If we don't have a GL context, give up now

  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }



  // Vertex shader program

  const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec3 aVertexNormal;
    attribute vec2 aTextureCoord;

    uniform mat4 uNormalMatrix;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;

    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vTextureCoord = aTextureCoord;

      // Apply lighting effect

      highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);
      highp vec3 directionalLightColor = vec3(1, 1, 1);
      highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));

      highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);

      highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
      vLighting = ambientLight + (directionalLightColor * directional);
    }
  `;

  // Fragment shader program

  //   const fsSource = `
  //   varying highp vec2 vTextureCoord;
  //   varying highp vec3 vLighting;

  //   uniform sampler2D uSampler;

  //   void main(void) {
  //     highp vec4 texelColor = texture2D(uSampler, vTextureCoord);
  //     // precision highp float;
  //     // vec4 color = texture2D(uSampler, vTextureCoord);
  //     // float gray = dot(color.rgb,vec3(0.299,0.587,0.114));
  //     // gl_FragColor = vec4(vec3(gray),1.0);
  //     gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
  //   }
  // `;

  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  // const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  textureplayer = loadTexture(gl, 'player.jpg');
  texturepolice = loadTexture(gl, 'police.jpg');
  texturewall = loadTexture(gl, 'wall.jpg');
  texturedog = loadTexture(gl, 'policedog.jpg');
  texturetrack = loadTexture(gl, 'track.jpeg');
  texturetrain1 = loadTexture(gl, 'train1.jpg');
  texturetrain2 = loadTexture(gl, 'train2.jpg');
  texturetrain3 = loadTexture(gl, 'train3.jpg');
  textureshoe = loadTexture(gl, 'shoe.jpg');
  texturejetpack = loadTexture(gl, 'jetpack.jpg')
  texturecoin = loadTexture(gl, 'coin.jpg');
  texturemagnet = loadTexture(gl, 'magnet.jpg');
  textureobstacle1 = loadTexture(gl, 'obstacle1.jpeg')


  // Collect all the info needed to use the shader program.
  // Look up which attributes our shader program is using
  // for aVertexPosition, aVevrtexColor and also
  // look up uniform locations.
  // const programInfo = {
  //   program: shaderProgram,
  //   attribLocations: {
  //     vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
  //     vertexNormal: gl.getAttribLocation(shaderProgram, 'aVertexNormal'),
  //     textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
  //   },
  //   uniformLocations: {
  //     projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
  //     modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
  //     normalMatrix: gl.getUniformLocation(shaderProgram, 'uNormalMatrix'),
  //     uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
  //   },
  // };

  // Here's where we call the routine that builds all the
  // objects we'll be drawing.
  //const buffers

  var then = 0;
  var timer = 0.0;

  // Draw the scene repeatedly
  function render(now) {
    now *= 0.001;  // convert to seconds
    const deltaTime = now - then;
    if (now * 1000 - then * 1000 >= 5.0) {
      trainsound.play();
    }
    then = now;

    var fsSource;

    if (grayscale) {
      fsSource = `
    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;
  
    uniform sampler2D uSampler;
  
    void main(void) {
      highp vec4 texelColor = texture2D(uSampler, vTextureCoord);
      precision highp float;
      vec4 color = texture2D(uSampler, vTextureCoord);
      float gray = dot(color.rgb,vec3(0.299,0.587,0.114));
      gl_FragColor = vec4(vec3(gray),1.0);
    }
  `;
    }
    else {
      fsSource = `
    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;
  
    uniform sampler2D uSampler;
  
    void main(void) {
      highp vec4 texelColor = texture2D(uSampler, vTextureCoord);
      gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
    }
  `;

    }
    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

    const programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
        vertexNormal: gl.getAttribLocation(shaderProgram, 'aVertexNormal'),
        textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
      },
      uniformLocations: {
        projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
        modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
        normalMatrix: gl.getUniformLocation(shaderProgram, 'uNormalMatrix'),
        uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
      },
    };

    if (c.pos[2] >= trains[99].pos[2]) {
      window.alert('You have reached the target.')
    }

    if (Math.abs(c.pos[2] - policedog.pos[2]) < 0.5) {
      dogsound.play();
      window.alert('You were caught by the police dog. Game over.\nScore: ' + score + '\nDistance: ' + distance);
    }

    if (c.pos[2] - collidestart <= 25.0 && collidestart != -1.0) {
      speed = 0.16;
    }
    else if (c.pos[2] - collidestart > 25.0 && collidestart != -1.0) {
      if (speed < 0.4) {
        speed = 0.4 + (distance >= 200) * 0.1 + (distance >= 400) * 0.1;
      }
    }

    c.pos[2] += speed + (distance >= 200) * 0.1 + (distance >= 400) * 0.1;
    policeman.pos[2] += 0.375 + (distance >= 200) * 0.1 + (distance >= 400) * 0.1;
    policedog.pos[2] += 0.375 + (distance >= 200) * 0.1 + (distance >= 400) * 0.1;
    distance += speed + (distance >= 200) * 0.1 + (distance >= 400) * 0.1;


    camz = c.pos[2] - 25.0;
    targetx = 2;
    targetz = c.pos[2];

    if (jetpackfly) {
      speed = 0.6;
      c.pos[1] = 20;
      targety = 20;
      camy = 25;
    }
    else {
      camy = 15;
      targety = 5;
    }
    for (var i = 0; i < 100; i++) {
      trains[i].pos[2] -= 0.6;
    }
    if (magnetcoins) {
      for (var i = 0; i < 501; i++) {
        if (coinstaken[i] == 0) {
          if (Math.abs(c.pos[2] - coins[i].pos[2]) <= 5.0) {
            score++;
            coinsound.play();
            coinstaken[i] = 1;
          }
        }
      }
      for (var i = 0; i < 240; i++) {
        if (jetpackcoinstaken[i] == 0) {
          if (Math.abs(c.pos[2] - jetpackcoins[i].pos[2]) <= 5.0) {
            score++;
            coinsound.play();
            jetpackcoinstaken[i] = 1;
          }
        }
      }
    }
    if (playerjump) {
      if (!jumpingshoe) {
        if (c.pos[1] <= 12.5 && playerup) {
          c.pos[1] += 0.5;
        }
        if (c.pos[1] >= 5.0 && !playerup) {
          c.pos[1] -= 0.5;
        }
      }
      else {
        if (c.pos[1] <= 16.0 && playerup) {
          c.pos[1] += 0.5;
          c.pos[2] += 0.5;
        }
        if (c.pos[1] >= 5.0 && !playerup) {
          c.pos[1] -= 0.5;
          c.pos[2] += 0.5;
        }
      }
    }
    if (!jumpingshoe && c.pos[1] >= 12.5) {
      playerup = false;
    }
    if (jumpingshoe && c.pos[1] >= 16.0) {
      playerup = false;
    }
    if (c.pos[1] <= 5.0) {
      c.pos[1] = 5.0;
      playerjump = false;
    }


    if (c.pos[2] - shoestart >= 200.0 && shoestart != -1.0) {
      jumpingshoe = false;
      shoestart = -1.0;
    }
    if (c.pos[2] - magnetstart >= 300.0 && magnetstart != -1.0) {
      magnetcoins = false;
      magnetstart = -1.0;
    }
    if (c.pos[2] - jetpackstart >= 250.0 && jetpackstart != -1.0) {
      jetpackfly = false;
      speed = 0.4;
      jetpackstart = -1.0;
      c.pos[1] = 5;
    }

    for (var i = 0; i < 100; i++) {
      if (c.pos[0] == trains[i].pos[0]) {
        if (c.pos[1] > trains[i].pos[1]) {
          if (c.pos[1] - trains[i].pos[1] <= 4.1) {
            if (c.pos[2] >= trains[i].pos[2] - 8.0 && c.pos[2] <= trains[i].pos[2] + 8.0) {
              c.pos[1] = trains[i].pos[1] + 4.0;
            }
          }
        }
      }
    }
    for (var i = 0; i < 100; i++) {
      if (c.pos[0] == trains[i].pos[0]) {
        if (c.pos[1] >= 5 && c.pos[1] <= 10) {
          if (Math.abs(trains[i].pos[2] - c.pos[2]) <= 9.0) {
            collidesound.play();
            window.alert('Game over\nScore: ' + score + '\nDistance: ' + distance);
          }
        }
      }
    }
    for (var i = 0; i < 100; i++) {
      if (obstaclescollide[i] == 0) {
        if (c.pos[0] == obstacles1[i].pos[0]) {
          if (c.pos[1] - obstacles1[i].pos[1] >= 3.1) {
          }
          else {
            if (Math.abs(obstacles1[i].pos[2] - c.pos[2]) <= 1.2) {
              obstaclescollide[i] = 1;
              collidesound.play();
              collidestart = c.pos[2];
            }
          }
        }
      }
    }
    for (var i = 0; i < 501; i++) {
      if (coinstaken[i] == 0) {
        if (c.pos[0] == coins[i].pos[0]) {
          if (c.pos[1] - coins[i].pos[1] >= 3.1) {
          }
          else {
            if (coins[i].pos[2] - c.pos[2] <= 1.2) {
              score++;
              coinsound.play();
              coinstaken[i] = 1;
            }
          }
        }
      }
    }
    for (var i = 0; i < 240; i++) {
      if (jetpackcoinstaken[i] == 0) {
        if (c.pos[0] == jetpackcoins[i].pos[0] && c.pos[1] == jetpackcoins[i].pos[1]) {
          if (jetpackcoins[i].pos[2] - c.pos[2] <= 1.2) {
            score++;
            coinsound.play();
            jetpackcoinstaken[i] = 1;
          }
        }
      }
    }
    for (var i = 0; i < 2; i++) {
      if (c.pos[0] == jetpacks[i].pos[0]) {
        if (c.pos[1] > jetpacks[i].pos[1] && c.pos[1] - jetpacks[i].pos[1] >= 2.1) {
        }
        else {
          if (Math.abs(jetpacks[i].pos[2] - c.pos[2]) <= 1.15) {
            jetpackfly = true;
            jetpack_taken[i] = 1;
            jetpackstart = c.pos[2];
          }
        }
      }
    }

    for (var i = 0; i < 2; i++) {
      if (c.pos[0] == shoes[i].pos[0]) {
        if (c.pos[1] > shoes[i].pos[1] && c.pos[1] - shoes[i].pos[1] >= 2.1) {
        }
        else {
          if (Math.abs(shoes[i].pos[2] - c.pos[2]) <= 1.15) {
            jumpingshoe = true;
            shoe_taken[i] = 1;
            shoestart = c.pos[2];
          }
        }
      }
    }

    for (var i = 0; i < 2; i++) {
      if (c.pos[0] == magnets[i].pos[0]) {
        if (c.pos[1] > magnets[i].pos[1] && c.pos[1] - magnets[i].pos[1] >= 2.1) {
        }
        else {
          if (Math.abs(magnets[i].pos[2] - c.pos[2]) <= 1.15) {
            magnetcoins = true;
            magnet_taken[i] = 1;
            magnetstart = c.pos[2];
          }
        }
      }
    }

    drawScene(gl, programInfo, deltaTime);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

}

function loadTexture(gl, url) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Because images have to be download over the internet
  // they might take a moment until they are ready.
  // Until then put a single pixel in the texture so we can
  // use it immediately. When the image has finished downloading
  // we'll update the texture with the contents of the image.
  const level = 0;
  const internalFormat = gl.RGBA;
  const width = 1;
  const height = 1;
  const border = 0;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  const pixel = new Uint8Array([0, 0, 255, 255]);  // opaque blue
  gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
    width, height, border, srcFormat, srcType,
    pixel);

  const image = new Image();
  image.onload = function () {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
      srcFormat, srcType, image);

    // WebGL1 has different requirements for power of 2 images
    // vs non power of 2 images so check if the image is a
    // power of 2 in both dimensions.
    if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
      // Yes, it's a power of 2. Generate mips.
      gl.generateMipmap(gl.TEXTURE_2D);
    } else {
      // No, it's not a power of 2. Turn off mips and set
      // wrapping to clamp to edge
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
  };
  image.src = url;

  return texture;
}

function isPowerOf2(value) {
  return (value & (value - 1)) == 0;
}


function keyDownHandler(event) {
  if (event.keyCode == 39) {
    rightPressed = true;
    movement = 1;
  }
  else if (event.keyCode == 37) {
    leftPressed = true;
    movement = -1;
  }
  if (event.keyCode == 40) {
    downPressed = true;
    grayscale = false;
  }
  else if (event.keyCode == 38) {
    upPressed = true;
    grayscale = true;
  }
  if (event.keyCode == 32 && !playerjump && !playerup) {
    spacePressed = true;
    playerjump = true;
    playerup = true;
    if (jumpingshoe) {
      shoesound.play();
    }
    else jumpsound.play();
  }
  if (event.keyCode == 71) {
    gPressed = true;
  }
}

function keyUpHandler(event) {
  if (event.keyCode == 39) {
    rightPressed = false;
  }
  else if (event.keyCode == 37) {
    leftPressed = false;
  }
  if (event.keyCode == 40) {
    downPressed = false;
  }
  else if (event.keyCode == 38) {
    upPressed = false;
  }
  if (event.keyCode == 32) {
    spacePressed = false;
  }
  if (event.keyCode == 71) {
    gPressed = false;
  }
}




//
// Draw the scene.
//
function drawScene(gl, programInfo, deltaTime) {
  gl.clearColor(127.0 / 256.0, 218.0 / 256.0, 255.0 / 256.0, 1.0);  // Clear to black, fully opaque
  gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

  // Clear the canvas before we start drawing on it.

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  if (rightPressed && c.pos[0] != -6.0 && movement == 1) {
    c.pos[0] -= 8.0;
    movement = 0;
  }
  if (leftPressed && c.pos[0] != 10.0 && movement == -1) {
    c.pos[0] += 8.0;
    movement = 0;
  }


  // Create a perspective matrix, a special matrix that is
  // used to simulate the distortion of perspective in a camera.
  // Our field of view is 45 degrees, with a width/height
  // ratio that matches the display size of the canvas
  // and we only want to see objects between 0.1 units
  // and 100 units away from the camera.

  const fieldOfView = 45 * Math.PI / 180;   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix,
    fieldOfView,
    aspect,
    zNear,
    zFar);

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  var cameraMatrix = mat4.create();
  mat4.translate(cameraMatrix, cameraMatrix, [camx, camy, camz]);
  var cameraPosition = [
    cameraMatrix[12],
    cameraMatrix[13],
    cameraMatrix[14],
  ];

  var up = [0, 1, 0];

  mat4.lookAt(cameraMatrix, cameraPosition, [targetx, targety, targetz], up);

  var viewMatrix = cameraMatrix;//mat4.create();

  //mat4.invert(viewMatrix, cameraMatrix);

  var viewProjectionMatrix = mat4.create();

  mat4.multiply(viewProjectionMatrix, projectionMatrix, viewMatrix);

  c.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime);
  policeman.drawPolice(gl, viewProjectionMatrix, programInfo, deltaTime);
  policedog.drawDog(gl, viewProjectionMatrix, programInfo, deltaTime);
  for (var i = 0; i < 100; i++) {
    track0[i].drawTrack(gl, viewProjectionMatrix, programInfo, deltaTime);
    track1[i].drawTrack(gl, viewProjectionMatrix, programInfo, deltaTime);
    track2[i].drawTrack(gl, viewProjectionMatrix, programInfo, deltaTime);
  }
  for (var i = 0; i < 100; i++) {
    if (traintype[i] == 1) {
      trains[i].drawTrain(gl, viewProjectionMatrix, programInfo, texturetrain1, deltaTime);
    }
    else if (traintype[i] == 2) {
      trains[i].drawTrain(gl, viewProjectionMatrix, programInfo, texturetrain2, deltaTime);
    }
  }
  for (var i = 0; i < 2; i++) {
    if (shoe_taken[i] == 0) shoes[i].drawShoe(gl, viewProjectionMatrix, programInfo, deltaTime);
  }
  for (var i = 0; i < 2; i++) {
    if (jetpack_taken[i] == 0) jetpacks[i].drawJetpack(gl, viewProjectionMatrix, programInfo, deltaTime);
  }
  for (var i = 0; i < 2; i++) {
    if (magnet_taken[i] == 0) magnets[i].drawMagnet(gl, viewProjectionMatrix, programInfo, deltaTime);
  }
  for (var i = 0; i < 100; i++) {
    obstacles1[i].drawObstacle1(gl, viewProjectionMatrix, programInfo, deltaTime);
  }
  for (var i = 0; i < 501; i++) {
    if (coinstaken[i] == 0) coins[i].drawCoin(gl, viewProjectionMatrix, programInfo, deltaTime);
  }
  for (var i = 0; i < 240; i++) {
    if (jetpackcoinstaken[i] == 0) jetpackcoins[i].drawCoin(gl, viewProjectionMatrix, programInfo, deltaTime);
  }

  for (var i = 0; i < 300; i++) {
    wall_left[i].drawWall(gl, viewProjectionMatrix, programInfo, deltaTime);
    wall_right[i].drawWall(gl, viewProjectionMatrix, programInfo, deltaTime);
  }
}

//
// Initialize a shader program, so WebGL knows how to draw our data
//
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  }
  this.stop = function () {
    this.sound.pause();
  }
}


