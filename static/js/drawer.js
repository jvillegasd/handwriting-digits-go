let canDraw = false;
const LINE_WIDTH = 10;
const LINE_CAP = 'round';
const STROKE_STYLE = 'white';
const mouseCoords = { x: 0, y: 0 };
const drawCanvas = document.getElementById('draw_canvas');
const clearCanvasBtn = document.getElementById('clean_btn');
const predictionSpan = document.getElementById('prediction');
const ctx = drawCanvas.getContext('2d');

let getPosition = (event) => {
  mouseCoords.x = event.clientX - drawCanvas.offsetLeft;
  mouseCoords.y = event.clientY - drawCanvas.offsetTop;
};

let startDrawing = (event) => {
  canDraw = true;
  getPosition(event);
};

let stopDrawing = (event) => {
  canDraw = false;
  const prediction = predict(event.target);
  predictionSpan.innerHTML = (prediction !== undefined) ? prediction.toString() : '-';
};

let drawAtCanvas = (event) => {
  if (!canDraw) return;

  ctx.lineWidth = LINE_WIDTH;
  ctx.lineCap = LINE_CAP;
  ctx.strokeStyle = STROKE_STYLE;

  ctx.moveTo(mouseCoords.x, mouseCoords.y);
  getPosition(event);
  ctx.lineTo(mouseCoords.x, mouseCoords.y);
  ctx.stroke();
};

let cleanCanvas = () => {
  ctx.beginPath();
  ctx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
  predictionSpan.innerHTML = '-';
};

window.addEventListener('load', () => {
  drawCanvas.addEventListener('mousedown', startDrawing);
  drawCanvas.addEventListener('mouseup', stopDrawing);
  drawCanvas.addEventListener('mousemove', drawAtCanvas);
});

clearCanvasBtn.addEventListener('click', cleanCanvas);
