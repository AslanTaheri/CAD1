let stage = new createjs.Stage("myStage");

stage.enableDOMEvents(true);
//let drawingCanvas = new createjs.Shape();
let drawingCanvas = new createjs.Container();
//stage.addChild(container);
stage.addEventListener("stagemousedown", drawStart);
stage.addEventListener("stagemouseup", drawEnd);

stage.addChild(drawingCanvas);
//stage.update();
createjs.Ticker.addEventListener("tick", tick);
let color,
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
function drawMovement() {
  let pt = createPoint();
  let radius = Math.sqrt(
    Math.pow(oldMidPt.x - pt.x, 2) + Math.pow(oldMidPt.y - pt.y, 2)
  );
  if (!newCircle) {
    circle && drawingCanvas.removeChild(circle);
    txt && drawingCanvas.removeChild(txt);
  }
  circle = new createjs.Shape();
  circle.graphics
    .setStrokeStyle(stroke, "round", "round")
    .beginStroke(color)
    .moveTo(oldMidPt.x, oldMidPt.y)
    .lineTo(pt.x, pt.y)
    .moveTo(oldMidPt.x, oldMidPt.y)
    .beginFill("rgba(255,255,255,0.6)")
    .drawCircle(oldMidPt.x, oldMidPt.y, radius);
  drawingCanvas.addChild(circle);

  //  console.log(radius);
  oldPt = pt;
  txt = new createjs.Text((radius | 0) + "", "10px Arial", "#FFF");
  txt.x = (pt.x + oldMidPt.x) >> 1;
  txt.y = (pt.y + oldMidPt.y) >> 1;
  //  console.log(txt);
  drawingCanvas.addChild(txt);
  // stage.update();
  toUpdate = true;
  newCircle = false;
}
function modifyCircleStart(ll) {
  ll.circle.on("mousedown", function () {
    this.parent.addChild(this);
    //color = "#FEDCBA";
    //stroke = 1;
    oldPt = this.oldPt;
    oldMidPt = this.oldMidPt;
  });
  ll.circle.on("pressmove", function circleMovement(e) {
    let pt = createPoint(e.stageX, e.stageY);
    let radius = Math.sqrt(
      Math.pow(oldMidPt.x - pt.x, 2) + Math.pow(oldMidPt.y - pt.y, 2)
    );
    //let parent = this.parent;
    if (!ll.circle.newCircle) {
      this.off("pressmove", circleMovement);
      drawingCanvas.removeChild(this);
      ll.circle = new createjs.Shape();
      drawingCanvas.addChild(ll.circle);

      //ll.circle.on('pressmove',circleMovement);
    }
    this.graphics
      .setStrokeStyle(stroke, "round", "round")
      .beginStroke(color)
      .moveTo(oldMidPt.x, oldMidPt.y)
      .lineTo(pt.x, pt.y)
      .moveTo(oldMidPt.x, oldMidPt.y)
      .beginFill("rgba(255,255,255,0.6)")
      .drawCircle(oldMidPt.x, oldMidPt.y, radius);
    drawingCanvas.removeChild(ll.text);
    ll.text = new createjs.Text((radius | 0) + "", "10px Arial", "#FFF");
    ll.text.x = (pt.x + oldMidPt.x) >> 1;
    ll.text.y = (pt.y + oldMidPt.y) >> 1;
    //  console.log(txt);
    // stage.update();
    toUpdate = true;
    ll.circle.newCircle = false;
  });
  ll.circle.on("pressup", function circleEnd(e) {
    ll.circle.newCirle = true;
  });
}
function modifyCircleStart(ll) {
  ll.circle.on("mousedown", function () {
    this.parent.addChild(this);
    //color = "#FEDCBA";
    //stroke = 1;
    oldPt = this.oldPt;
    oldMidPt = this.oldMidPt;
  });
  ll.circle.on("pressmove", function circleMovement(e) {
    let pt = createPoint(e.stageX, e.stageY);
    let radius = Math.sqrt(
      Math.pow(oldMidPt.x - pt.x, 2) + Math.pow(oldMidPt.y - pt.y, 2)
    );
    //let parent = this.parent;
    if (!ll.circle.newCircle) {
      this.off("pressmove", circleMovement);
      drawingCanvas.removeChild(this);
      ll.circle = new createjs.Shape();
      drawingCanvas.addChild(ll.circle);

      //ll.circle.on('pressmove',circleMovement);
    }
    this.graphics
      .setStrokeStyle(stroke, "round", "round")
      .beginStroke(color)
      .moveTo(oldMidPt.x, oldMidPt.y)
      .lineTo(pt.x, pt.y)
      .moveTo(oldMidPt.x, oldMidPt.y)
      .beginFill("rgba(255,255,255,0.6)")
      .drawCircle(oldMidPt.x, oldMidPt.y, radius);
    drawingCanvas.removeChild(ll.text);
    ll.text = new createjs.Text((radius | 0) + "", "10px Arial", "#FFF");
    ll.text.x = (pt.x + oldMidPt.x) >> 1;
    ll.text.y = (pt.y + oldMidPt.y) >> 1;
    //  console.log(txt);
    // stage.update();
    toUpdate = true;
    ll.circle.newCircle = false;
  });
  ll.circle.on("pressup", function circleEnd(e) {
    ll.circle.newCirle = true;
  });
}
function drawEnd() {
  stage.removeEventListener("stagemousemove", drawMovement);
  let ll = { circle: null, text: null };
  ll.circle = circle;
  ll.circle.oldPt = oldPt;
  ll.circle.oldMidPt = oldMidPt;
  ll.text = txt;
  ll.circle.newCircle = true;
  modifyCircleStart(ll);
  newCircle = true;
}
function tick(event) {
  // this set makes it so the stage only re-renders when an event handler indicates a change has happened.
  if (toUpdate) {
    toUpdate = false; // only update once
    stage.update(event);
  }
}
