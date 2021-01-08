/*
 * Functions for generating an entire person
 */
const CANVAS_WIDTH = 220;
const CANVAS_HEIGHT = 300;

/**
  * Generate a plausible birthday for a living person
  */
function generateBirthday(minAge) {
    if (minAge === undefined) {
        minAge = 0;
    }
    const age = Math.max(minAge, rollAndSum(6, 12)); // Roll 6d12 to get an approximate age

    // Compute a date that gives something close to the desired age
    const birthYear = new Date().getFullYear() - age;
    const yearOffset = roll1D(365) * 24 * 60 * 60 * 1000;
    return new Date(new Date(birthYear, 0).getTime() + yearOffset);
}

/**
  * Generate a random sex string for a driver's license
  */
function generateSex() {
    if (roll1D(2) === 1) {
        return 'F';
    } else {
        return 'M';
    }
}

/**
  * Generate a random weight (in pounds)
  */
function generateWeightLb(sex) {
    if (sex === 'M') {
        return rollAndSum(30, 12);
    } else {
        return rollAndSum(30, 10);
    }
}


/**
  * Generate a random height (in inches)
  */
function generateHeightIn(sex) {
    if (sex === 'M') {
        return rollAndSum(28, 4);
    } else {
        return rollAndSum(25, 4);
    }
}

/**
  * Generate a random eye color
  */
function generateEyeColor() {
    return choose([
        'BRN',
        'GRN',
        'BLU',
    ]);
}

/**
  * Create an HTML canvas we can draw on
  */
function createCanvas(top, left, width, height, zIndex) {
    const canvas = document.createElement('canvas');
    canvas.setAttribute('class', 'canvas-layer');
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    canvas.style.position = 'absolute';
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    canvas.style.top = top + 'px';
    canvas.style.left = left + 'px';
    canvas.style.zIndex = zIndex;
    return canvas;
}

/**
  * Add a layer to the portrait
  */
function addLayer(left, top, layerIndex) {
    const zIndex = layerIndex + 100;
    return createCanvas(top, left, CANVAS_WIDTH, CANVAS_HEIGHT, zIndex);
}

/**
  * Generate a photo to use on a driver's license
  */
function generatePhoto(containerEl) {
    // First delete all existing layers
    const existingCanvases = document.querySelectorAll('.canvas-layer');
    for (const canv of existingCanvases) {
        canv.remove();
    }
    const boundingRect = containerEl.getBoundingClientRect();
    const layerX = boundingRect.left;
    const layerY = boundingRect.top;

    const photoCanvas = addLayer(layerX, layerY, 0);
    containerEl.append(photoCanvas);
    let context = photoCanvas.getContext('2d');
    context.imageSmoothingEnabled = false;

    const baseLayer = new Image();
    baseLayer.src = choose([
        'sprites/shirt_01.png',
        'sprites/shirt_02.png',
        'sprites/shirt_03.png',
        'sprites/shirt_04.png',
        'sprites/shirt_05.png',
        'sprites/shirt_06.png',
        'sprites/shirt_07.png',
        'sprites/shirt_08.png',
        'sprites/shirt_09.png',
        'sprites/shirt_10.png',
    ]);
    baseLayer.onload = function() {
        context.drawImage(baseLayer, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    };

    if (roll1D(100) === 100) {
        // It's just a dog with glasses
        baseLayer.src = `sprites/dog_glasses.png`;
        baseLayer.onload = function() {
            context.drawImage(baseLayer, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        };
        return;
    }

    const faceLayer = addLayer(layerX, layerY, 1);
    containerEl.append(faceLayer);
    let faceColor = Math.floor(Math.random() * 4 + 1) * 8;
    context = faceLayer.getContext('2d');
    context.imageSmoothingEnabled = false;
    const faceImage = new Image();
    faceImage.src = `sprites/face_${faceColor}.png`;
    faceImage.onload = function() {
        context.drawImage(faceImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    };

    const eyesLayer = addLayer(layerX, layerY, 2);
    containerEl.append(eyesLayer);
    const eyesColor = choose(['blu', 'grn', 'brn']);
    const eyesChoice = Math.floor(Math.random() * 2 + 1);
    context = eyesLayer.getContext('2d');
    context.imageSmoothingEnabled = false;
    const eyesImage = new Image();
    eyesImage.src = `sprites/eyes_${eyesColor}_${eyesChoice}.png`;
    eyesImage.onload = function() {
        context.drawImage(eyesImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    };

    const noseLayer = addLayer(layerX, layerY, 3);
    containerEl.append(noseLayer);
    const noseChoice = Math.floor(Math.random() * 2 + 1);
    context = noseLayer.getContext('2d');
    context.imageSmoothingEnabled = false;
    const noseImage = new Image();
    noseImage.src = `sprites/nose_${noseChoice}.png`;
    noseImage.onload = function() {
        context.drawImage(noseImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    };

    const mouthLayer = addLayer(layerX, layerY, 3);
    containerEl.append(mouthLayer);
    let mouthChoice = Math.floor(Math.random() * 3 + 1);
    switch (roll1D(20)) {
    case 1:
    case 2:
        mouthChoice = 'braces';
        break;
    case 13:
        mouthChoice = 'missing_teeth';
        break;
    default:
        break;
    }
    context = mouthLayer.getContext('2d');
    context.imageSmoothingEnabled = false;
    const mouthImage = new Image();
    mouthImage.src = `sprites/mouth_${mouthChoice}.png`;
    mouthImage.onload = function() {
        context.drawImage(mouthImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    };

    const hairLayer = addLayer(layerX, layerY, 4);
    containerEl.append(hairLayer);
    let hairColor = choose(['brown', 'blond', 'black', 'red']);
    // There's a small chance of "interesting" hair
    if (roll1D(20) === 1) {
        hairColor = choose(['blue', 'green', 'purple', 'pink']);
    }
    let hairChoice = Math.floor(Math.random() * 4 + 1);
    // Some less common hairstyles
    switch(roll1D(20)) {
    case 1:
        hairChoice = 'cornrows';
        break;
    default:
        break;
    }
    context = hairLayer.getContext('2d');
    context.imageSmoothingEnabled = false;
    const hairImage = new Image();
    hairImage.src = `sprites/hair_${hairColor}_${hairChoice}.png`;
    hairImage.onload = function() {
        context.drawImage(hairImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    };
}
