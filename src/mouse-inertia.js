let log = function (arg) { console.log(arg); }

let container;
let box;
let debug;
let innertia;

function CursorFollow() {
  log("CursorFollow()");

  let container = document.getElementById("container");
  let box = document.getElementById("box");
  let slider = document.getElementById("range");
  let sliderValue = document.getElementById("range-value");
  let debug = document.getElementById("debug");

  let containerX = 0;
  let containerY = 0;
  let limX = 0;
  let limY = 0;

  let inertia = 0.3;

  let cx = 0; // current
  let cy = 0;
  let tx = 0; // target
  let ty = 0;
  let x = 0; // working value
  let y = 0;

  let firstRun = true;

  function init() {

    inertia = parseFloat(slider.value);

    containerX = window.scrollX + container.getBoundingClientRect().left;
    containerY = window.scrollY + container.getBoundingClientRect().top;
    limX = container.getBoundingClientRect().width - box.getBoundingClientRect().width;
    limY = container.getBoundingClientRect().height - box.getBoundingClientRect().height;

    cx = parseFloat(getComputedStyle(box).left);
    cy = parseFloat(getComputedStyle(box).left);

    slider.addEventListener("change", sliderChangeHandler);
    container.addEventListener("mousemove", mouseMoveHandler);

    update();
  }
  // - - - - - -


  function sliderChangeHandler(e){
    inertia = parseFloat(slider.value);
  }
  // - - - - - -


  function mouseMoveHandler(e) {
    // log(e);
    // problem is offsetX&Y goes to zero when mouse doesnt move!
    tx = e.clientX - containerX;
    ty = e.clientY - containerY;

    if (tx > limX){
      tx = limX;
    }
    if (ty > limY){
      ty = limY;
    }

  }
  // - - - - - -


  function update() {

    // So we dont have to getComputerStlye in update loop
    if (firstRun){
      firstRun = false;
    } else {
      cx = x;
      cy = y;
    }


    // debug.innerHTML = cx;
    x = inertiaTo(cx,tx,inertia);
    y = inertiaTo(cy,ty,inertia);

    box.style.left = x + "px";
    box.style.top = y + "px";

    debug.innerHTML = x + ":" + y;

    sliderValue.innerHTML = "inertia: " + inertia;

    requestAnimationFrame(update);
  }
  // - - - - - -


  function inertiaTo(current,target,amount){
    if (amount==1){
      return target;
    }
    let distToGo = target-current;
    let delta = current + (distToGo * amount);

    if (Math.abs(distToGo) < 0.01){
      distToGo = 0;
      delta = target;
    }

    // debug.innerHTML = distToGo;
    return delta;
  }
  // - - - - - -


  // Constructor simulation
  init();
  // - - - - - -

}





new CursorFollow();
