
const canvas = document.getElementById('canvas');
const colorPicker = document.getElementById('colorPicker');
const widthPicker = document.getElementById('widthPicker');
const clearCanvas = document.getElementById('clearCanvas');
const undoStroke = document.getElementById('undoStroke');
const brush = document.getElementById('brush');
const eraser = document.getElementById('eraser');
const red = document.getElementById('red');
const blue = document.getElementById('blue');
const yellow = document.getElementById('yellow');
const green = document.getElementById('green');
const purple = document.getElementById('purple');
const baseColor = document.getElementById('baseColor');


let context = canvas.getContext('2d');

let drawColor = '#000000';
let drawWidth = '2';
let isDrawing = false;
let drawingPosArr = [];
let drawingPosArrIndex = -1;

const eraserStyle = 'white';

canvas.addEventListener('mousedown', start, false);
canvas.addEventListener('mousemove', draw, false);
canvas.addEventListener('mouseup', stop, false);
canvas.addEventListener('mouseout', stop, false);

canvas.addEventListener('touchstart', start, false);
canvas.addEventListener('touchmove', draw, false);
canvas.addEventListener('touchend', stop, false);

function start(event) {
  isDrawing = true;
  context.beginPath();
  context.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
  event.preventDefault();
}

function draw(event) {
  if (isDrawing) {
    context.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    context.strokeStyle = drawColor;
    context.lineWidth = drawWidth;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.stroke();
  }
  event.preventDefault();
}

function stop(event) {
  if (isDrawing) {
    context.stroke();
    context.closePath();
    isDrawing = false;
  }
  event.preventDefault();

  if (event.type != 'mouseout'){
    drawingPosArr.push(context.getImageData(0, 0, canvas.width, canvas.height));
    drawingPosArrIndex += 1;
  }
}

colorPicker.addEventListener('change', function(event){
  drawColor = colorPicker.value;
});

widthPicker.addEventListener('change', function(event){
  drawWidth = widthPicker.value;
});

clearCanvas.addEventListener('click', function(event){
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawingPosArr = [];
  drawingPosArrIndex = -1;
});

undoStroke.addEventListener('click', function(event) {
  if (drawingPosArrIndex <= 0) {
    context.clearRect(0, 0, canvas.width, canvas.height);
  } else {
    drawingPosArrIndex -= 1;
    drawingPosArr.pop();
    context.putImageData(drawingPosArr[drawingPosArrIndex], 0, 0);
  }
});

brush.addEventListener('click', function(event) {
  drawColor = colorPicker.value;
});

eraser.addEventListener('click', function(event) {
  drawColor = 'white';
});

baseColor.addEventListener('click', function(event) {
  drawColor = event.target.value;
});
