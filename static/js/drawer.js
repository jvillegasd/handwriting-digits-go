let canDraw = false;
const LINE_WIDTH = 5;
const LINE_CAP = 'round';
const STROKE_STYLE = 'black';
const mouseCoords = { x: 0, y: 0 };
const drawCanvas = document.getElementById('draw_canvas');
const ctx = drawCanvas.getContext('2d');

window.addEventListener('load', () => {
  document.addEventListener('mousedown', startDrawing);
  document.addEventListener('mouseup', stopDrawing);
  document.addEventListener('mousemove', drawAtCanvas);
});

let getPosition = (event) => {
  mouseCoords.x = event.clientX - drawCanvas.offsetLeft;
  mouseCoords.y = event.clientY - drawCanvas.offsetTop;
};

let startDrawing = (event) => {
  canDraw = true;
  getPosition(event);
};

let stopDrawing = () => {
  canDraw = false;
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
