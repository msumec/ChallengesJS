var canvas=document.getElementById('canvas');
var ctx=canvas.getContext('2d');
var nroFlowers=20;
var flowersArray=[];
var w,h;
//setup canvas
w=canvas.width=window.innerWidth;
h=canvas.height=window.innerHeight;
function setupsize (){
w=canvas.width=window.innerWidth;
h=canvas.height=window.innerHeight;
}
function randomWH(min,max){
    var length=max-min;
    length++;
    return min+(Math.random()*length);
}
function clientResize(ev){
    setupsize();
}
window.addEventListener("resize",clientResize);

function shapeflower(){
 return {
    x: Math.random() *w,
    y: Math.random() *h,
    opacity: Math.random(),
    speedX: randomWH(-5,5),
    speedY: randomWH(-2,2),
    radius: randomWH(5,10)
   };
}
function createFlowers(){
    let i =0 ;
    for (; i < nroFlowers; i++) {
      flowersArray.push(shapeflower());
    }
}
function draw(){
    let i =0 ;
    for (; i < nroFlowers; i++) {
      var gradient=  ctx.createRadialGradient(
         flowersArray[i].x,
         flowersArray[i].y,
         0,
         flowersArray[i].x,
         flowersArray[i].y,
         flowersArray[i].radius                            
      );
      gradient.addColorStop(0,'green');
      gradient.addColorStop(.5,'yellow');
      gradient.addColorStop(1,'red');
      //Crea un nuevo trazo
      ctx.beginPath();
      ctx.arc(
        flowersArray[i].x,
        flowersArray[i].y,
        flowersArray[i].radius ,
        0,
        Math.PI*2,
        false
      );
      // rellenamos
      ctx.fillStyle=gradient;
      ctx.fill();
    }
}
function moveFalling(){
    let i =0 ;
    for (; i < nroFlowers; i++) {
      flowersArray[i].x+=flowersArray[i].speedX;
      flowersArray[i].y+=flowersArray[i].speedY;
      if(flowersArray[i].y>h){
        flowersArray[i].y=-50;
        flowersArray[i].x=Math.random()*w;
      }
    }
}
function update(){
    ctx.clearRect(0,0,w,h);
    draw();
    moveFalling();
}

setInterval(update,60);
createFlowers();
