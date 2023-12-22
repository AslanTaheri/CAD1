var stage = new createjs.Stage("myStage");

stage.enableDOMEvents(true);
//var drawingCanvas = new createjs.Shape();
var drawingCanvas = new createjs.Container();
//stage.addChild(container);
stage.addEventListener("stagemousedown", drawStart);
stage.addEventListener("stagemouseup", drawEnd);

stage.addChild(drawingCanvas);
//stage.update();
createjs.Ticker.addEventListener("tick", tick);
var color,
  stroke,
  oldPt,
  oldMidPt,
  midPt,
  txt,
  circle,
  toUpdate = true,
  newCircle = true;
function drawStart() {
  color = "#FEDCBA";
  stroke = 1;
  oldPt = createPoint();
  oldMidPt = oldPt;

  stage.addEventListener("stagemousemove", drawMovement);
  toUpdate = true;
}
function createPoint(x, y) {
  return new createjs.Point(x || stage.mouseX, y || stage.mouseY);
}
