// document.addEventListener('DOMContentLoaded', () => {
//     // Typewriter Effect
//     function typewriterEffect(elementId, text, speed) {
//         let i = 0;
//         function typeWriter() {
//             if (i < text.length) {
//                 document.getElementById(elementId).innerHTML += text.charAt(i);
//                 i++;
//                 setTimeout(typeWriter, speed);
//             }
//         }
//         typeWriter();
//     }

//     typewriterEffect('typewriter', 'I\'m just a lonely boy...', 100);

//     document.addEventListener('DOMContentLoaded', () => {
//         // Initialize effects
//         typewriterEffect('typewriter', 'Your introduction goes here...', 100);
//     });
// });





// // Matrix Effect
// document.addEventListener('DOMContentLoaded', () => {
//     const kanaChars = 'アカサタナハマヤラワガザダバパイキシチニヒミリヰギジヂビピウクスツヌフムユルグズヅブプエケセテネヘメレヱゲゼデベペオコソトノホモヨロヲゴゾドボポン';
//     const asciiChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     const allChars = kanaChars + asciiChars;
//     const container = document.getElementById('matrix');
//     let mouseX = 0;
//     let mouseY = 0;

//     container.addEventListener('mousemove', (e) => {
//         mouseX = e.pageX - container.offsetLeft;
//         mouseY = e.pageY - container.offsetTop;
//     });

//     const numberOfColumns = Math.floor(container.offsetWidth / 10);
//     const columnHeight = container.offsetHeight;

//     for (let i = 0; i < numberOfColumns; i++) {
//         createColumn(i);
//     }

//     function createColumn(columnIndex) {
//         let letters = []; // Track letters in the column
//         let posY = -20; // Initial position of the first letter, start above the container
//         let timeout = Math.floor(Math.random() * 100) + 30; // Randomize initial start

//         function generateLetter() {
//             posY += 20; // Move down for each new letter

//             if (posY > columnHeight) posY = -20; // Reset if the column end is reached

//             // Check if the cursor is near the letter's next position within a radius
//             const radius = 70; // Adjust the radius as needed
//             const distanceX = mouseX - (columnIndex * 10);
//             const distanceY = mouseY - posY;

//             if (Math.sqrt(distanceX * distanceX + distanceY * distanceY) < radius) {
//                 posY = -20; // Reset letter position if interrupted by cursor
//             }

//             // const letter = String.fromCharCode(33 + Math.random() * 94);
//             const letter = allChars[Math.floor(Math.random() * allChars.length)];
//             const span = document.createElement('span');
//             span.style.position = 'absolute';
//             span.style.left = `${columnIndex * 10}px`;
//             span.style.top = `${posY}px`;
//             span.textContent = letter;

//             if (letters.length > 0) {
//                 let prevSpan = letters[letters.length - 1];
//                 prevSpan.style.color = 'green'; // Previous bottom letter turns green
//             }

//             span.style.color = 'white'; // New letter is white
//             container.appendChild(span);
//             letters.push(span);

//             // Remove letter after a short period
//             setTimeout(() => {
//                 container.removeChild(span);
//             }, 600);

//             setTimeout(generateLetter, timeout);
//         }

//         setTimeout(generateLetter, timeout);
//     }
// });























// // from Daniel Shiffman

// const density = '       .:-i|=+%O#@'

// let video;
// let asciiDiv;

// function setup() {
//   noCanvas();
//   video = createCapture(VIDEO);
//   video.size(64, 48);
//   asciiDiv = createDiv();
// }

// function draw() {
//   video.loadPixels();
//   let asciiImage = "";
//   for (let j = 0; j < video.height; j++) {
//     for (let i = 0; i < video.width; i++) {
//       const pixelIndex = (i + j * video.width) * 4;
//       const r = video.pixels[pixelIndex + 0];
//       const g = video.pixels[pixelIndex + 1];
//       const b = video.pixels[pixelIndex + 2];
//       const avg = (r + g + b) / 3;
//       const len = density.length;
//       const charIndex = floor(map(avg, 0, 255, 0, len));
//       const c = density.charAt(charIndex);
//       if (c == " ") asciiImage += "&nbsp;";
//       else asciiImage += c;
//     }
//     asciiImage += '<br/>';
//   }
//   asciiDiv.html(asciiImage);
// }





let video;
var streams = [];
var fadeInterval = 1.6;
var symbolSize = 14;

function setup() {
  createCanvas(
    window.innerWidth,
    window.innerHeight
  );
  video = createCapture(VIDEO);
  video.size(width / symbolSize, height / symbolSize);
  video.hide(); // Hide the actual video element
  background(0);

  var x = 0;
  for (var i = 0; i <= width / symbolSize; i++) {
    var stream = new Stream();
    stream.generateSymbols(x, random(-2000, 0));
    streams.push(stream);
    x += symbolSize
  }

  textFont('Consolas');
  textSize(symbolSize);
}

function draw() {
  background(0, 150);
  streams.forEach(function(stream) {
    stream.render();
  });
}

function SymbolM(x, y, speed, first, opacity) {
  this.x = x;
  this.y = y;
  this.value;

  this.speed = speed;
  this.first = first;
  this.opacity = opacity;

  this.switchInterval = round(random(2, 25));

  this.setToRandomSymbol = function() {
    var charType = round(random(0, 5));
    if (frameCount % this.switchInterval == 0) {
      if (charType > 1) {
        // set it to Katakana
        this.value = String.fromCharCode(
          0x30A0 + floor(random(0, 97))
        );
      } else {
        // set it to numeric
        this.value = floor(random(0,10));
      }
    }
  }

  this.rain = function() {
    this.y = (this.y >= height) ? 0 : this.y += this.speed;
  }

}

function Stream() {
  this.symbols = [];
  this.totalSymbols = round(random(5, 35));
  this.speed = random(1, 10);

  this.generateSymbols = function(x, y) {
    var opacity = 255;
    var first = round(random(0, 2)) == 1;
    for (var i = 0; i <= this.totalSymbols; i++) {
      symbol = new SymbolM(x, y, this.speed, first, opacity);
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      opacity -= (255 / this.totalSymbols) / fadeInterval;
      y -= symbolSize;
      first = false;
    }
  }

  this.render = function() {
    this.symbols.forEach(function(symbol) {
    let index = (floor(symbol.x / symbolSize) + floor(video.height - symbol.y / symbolSize) * video.width) * 4;
    let brightness = (video.pixels[index] + video.pixels[index + 1] + video.pixels[index + 2]) / 3;
    console.log(video.pixels[index]);
      if (symbol.first) {
        fill(255, 255, 255, symbol.opacity);
      } else {
        fill(0, 255, 70, symbol.opacity);
      }
      text(symbol.value, symbol.x, symbol.y);
      symbol.rain();
      symbol.setToRandomSymbol();
    });
  }
}
