const canvas = document.getElementById("canvas");
const faceColor = document.getElementById("face-color");
const borderColor = document.getElementById("border-color");
const lineColor = document.getElementById("line-color");
const largeHandColor = document.getElementById("large-hand-color");
const secondHandColor = document.getElementById("second-hand-color");

// Getting data from local storage
if (getItemsFromStorage("faceColor")) {
  faceColor.value = getItemsFromStorage("faceColor");
}
if (getItemsFromStorage("borderColor")) {
  borderColor.value = getItemsFromStorage("borderColor");
}
if (getItemsFromStorage("lineColor")) {
  lineColor.value = getItemsFromStorage("lineColor");
}
if (getItemsFromStorage("largeHandColor")) {
  largeHandColor.value = getItemsFromStorage("largeHandColor");
}
if (getItemsFromStorage("secondHandColor")) {
  secondHandColor.value = getItemsFromStorage("secondHandColor");
}

function clock() {
  const now = new Date();
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  //Setup canvas
  ctx.save(); // save the default state
  ctx.clearRect(0, 0, 500, 500); // clear rectangle
  ctx.translate(250, 250); // put 0,0 in the middle
  ctx.rotate(-Math.PI / 2); // rotate clock -90deg

  //Set default styles
  ctx.strokeStyle = "#000000";
  ctx.fillStyle = "#f4f4f4";
  ctx.lineWidth = 5;
  ctx.lineCap = "round";

  //Draw clock face/border
  ctx.save();
  ctx.beginPath();
  ctx.lineWidth = 14;
  ctx.strokeStyle = borderColor.value;
  ctx.fillStyle = faceColor.value;

  ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.fill();
  ctx.restore();

  //Draw hour lines
  ctx.save();
  ctx.strokeStyle = lineColor.value;
  for (let i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.rotate(Math.PI / 6);
    ctx.moveTo(100, 0);
    ctx.lineTo(120, 0);
    ctx.stroke();
  }
  ctx.restore();

  //Draw minute lines
  ctx.save();
  ctx.strokeStyle = lineColor.value;
  ctx.lineWidth = 4;
  for (let i = 0; i < 60; i++) {
    if (i % 5 !== 0) {
      ctx.beginPath();
      ctx.moveTo(117, 0);
      ctx.lineTo(120, 0);
      ctx.stroke();
    }
    ctx.rotate(Math.PI / 30);
  }
  ctx.restore();

  //Get current time
  const hr = now.getHours() % 12;
  const min = now.getMinutes();
  const sec = now.getSeconds();

  // console.log(`${hr}:${min}:${sec}`);

  //Draw hour hand
  ctx.save();
  ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
  ctx.strokeStyle = largeHandColor.value;
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(-20, 0);
  ctx.lineTo(80, 0);
  ctx.stroke();
  ctx.restore();

  //Draw min hand
  ctx.save();
  ctx.rotate(
    (Math.PI / 6) * hr + (Math.PI / 360) * min + (Math.PI / 21600) * sec
  );
  ctx.strokeStyle = largeHandColor.value;
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(-28, 0);
  ctx.lineTo(112, 0);
  ctx.stroke();
  ctx.restore();

  //Draw sec hand
  ctx.save();
  ctx.rotate((Math.PI / 30) * sec);
  ctx.strokeStyle = secondHandColor.value;
  ctx.fillStyle = secondHandColor.value;
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(-30, 0);
  ctx.lineTo(100, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.restore();

  ctx.restore(); // restore the default state

  requestAnimationFrame(clock);
}

requestAnimationFrame(clock);

// clock();

function getItemsFromStorage(item) {
  let itemsFromStorage;

  if (localStorage.getItem(item) === null) {
    itemsFromStorage = "";
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem(item));
  }

  return itemsFromStorage;
}

function addItemToStorage(item, value) {
  let itemsFromStorage = getItemsFromStorage(item);

  // itemsFromStorage.push(item);
  itemsFromStorage = value;

  //Convert to JSON and set to local storage
  localStorage.setItem(item, JSON.stringify(itemsFromStorage));
}

// Save as image
document.getElementById("save-btn").addEventListener("click", () => {
  const dataURL = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.download = "clock.png";
  link.href = dataURL;
  link.click();
});

// Reset colors
document.getElementById("reset-btn").addEventListener("click", () => {
  localStorage.clear();
});

// Event listeners to save to local storage
faceColor.addEventListener("input", (e) => {
  addItemToStorage("faceColor", e.target.value);
});
borderColor.addEventListener("input", (e) => {
  addItemToStorage("borderColor", e.target.value);
});
lineColor.addEventListener("input", (e) => {
  addItemToStorage("lineColor", e.target.value);
});
largeHandColor.addEventListener("input", (e) => {
  addItemToStorage("largeHandColor", e.target.value);
});
secondHandColor.addEventListener("input", (e) => {
  addItemToStorage("secondHandColor", e.target.value);
});
