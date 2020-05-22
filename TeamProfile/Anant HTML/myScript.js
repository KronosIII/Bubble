var items = Array("red", "blue", "yellow", "green", "orange");

function changeBackgroundColor(){
  var item = items[Math.floor(Math.random()*items.length)];
  document.body.style.backgroundColor = item;
}
