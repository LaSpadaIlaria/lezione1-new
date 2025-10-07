// ===============================================
// 🚀 ANIMAZIONE RAZZO CHE SALE NEL CIELO CON STELLE
// ===============================================

// --- VARIABILI PRINCIPALI ---
// Queste due variabili servono a definire la dimensione della tela.
let xMax = 400;  // larghezza
let yMax = 600;  // altezza


let xRocket = xMax / 4;   // posizione orizzontale del razzo (al centro)
let yRocket = yMax * 0.6; // posizione verticale iniziale (un po’ più in basso)

let table;
let star_img;
let rocket_img

// Velocità di movimento del razzo verso l’alto
let step = 1;

function preload(){
  table = loadTable("stars.csv", "csv", "header")
  star_img = loadImage("star.png")
  rocket_img = loadImage("rocket.png");
}

// ===============================================
// ⚙️ SETUP – viene eseguito una sola volta all’inizio
// ===============================================
function setup() {
  createCanvas(xMax, yMax); // crea la tela
  frameRate(24);            // imposta 24 fotogrammi al secondo (come un film)
}

function drawStarFromFile(index, poseX, poseY) {
  let starSize = table.getNum(index, "starSize"); //mi permette di andare a prendere un valore specficio nella tabella di riferimento
  image(star_img, poseX, poseY, starSize, starSize);
}

function drawStarsFromFile() {
  for(let k = 0; k < table.getRowCount(); k++){
    let starX = (k*37) % width + (k%3) * 5;
    let starY = (k*73) % height + (k%7);
            //stiamo costruendo un ciclo che funzioni per il numero delle righe presenti nel file. Non posso contare ma uso GetRowCount mi prende il numero di righe che ha effettivamente dei dati. k sarà il numero della riga corrente che stiamo analizzando fino alla fine.
  drawStarFromFile(k, starX, starY);
  }
}

function drawRocketFromFile (xRocket, yRocket){
  image(rocket_img, xRocket, yRocket, 200, 200);
}

// ===============================================
// 🌟 FUNZIONI PER DISEGNARE LE STELLE
// ===============================================

// Disegna una singola stella
// Riceve come argomenti: posizione, trasparenza e grandezza
function drawSingleStar(i, random_x, random_y, random_transparency, random_size) {
  
  
  // Con i % 2 == 0 e i % 3 == 0 scegliamo tipi diversi di stelle
  if (i % 2 == 0) {
    // stella tipo A: gialla chiara
    fill(255, 255, 150, random_transparency);
  } else if (i % 3 == 0) {
    // stella tipo B: rosa
    fill(200, 100, 155, random_transparency);
  } else {
    // stella tipo C: gialla
    fill(255, 255, 100, random_transparency);
  }

  // Disegno effettivo della stella
  noStroke();
  ellipse(random_x, random_y, random_size);
}


// Funzione che disegna tutte le stelle nel cielo
function drawStars(num_star = 120) {
  
  // ⚠️ ERRORE ORIGINALE: avevi scritto “for (let 1 = 0; … )” — l’1 non è una variabile!
  // Qui deve essere sempre “let i = 0”.
  for (let i = 0; i < num_star; i++) {
    
    // Calcolo posizione delle stelle (distribuite sulla tela)
    let starX = (i * 37) % width + (i % 3) * 5;
    let starY = (i * 73) % height + (i % 7);
    
    // Parametri casuali per dare più varietà visiva
    let random_transparency = random(150, 255);
    let random_size = random(2.8, 5.0);

    // Disegno la singola stella
    drawSingleStar(i, starX, starY, random_transparency, random_size);
  }
}


// ===============================================
// 🚀 FUNZIONI PER IL RAZZO
// ===============================================
/*
// Disegna il razzo con i vari pezzi geometrici
function drawRocket() {
  push(); // salva lo stile grafico corrente

  // Corpo principale del razzo
  fill(200);
  noStroke();
  rectMode(CENTER);
  rect(xRocket, yRocket, 80, 200, 20);

  // Finestra rotonda
  fill(40, 150, 220);
  stroke(255);
  strokeWeight(3);
  ellipse(xRocket, yRocket, 50, 50);

  // Punte e alette
  fill(200, 40, 40);
  strokeWeight(3);
  triangle(xRocket - 40, yRocket - 100, xRocket + 40, yRocket - 100, xRocket, yRocket - 150); // punta
  triangle(xRocket - 60, yRocket + 80, xRocket - 20, yRocket + 50, xRocket - 40, yRocket + 150); // aletta sinistra
  triangle(xRocket + 60, yRocket + 80, xRocket + 20, yRocket + 50, xRocket + 40, yRocket + 150); // aletta destra

  pop(); // ripristina lo stile grafico precedente
}
*/

// Funzione per muovere il razzo verso l’alto
function moveRocket(yRocket, step = 1) {
  
 
  
  yRocket -= step; // il razzo sale (diminuisce la y)
  
  // Se il razzo esce dallo schermo in alto, ricomincia da sotto
  if (yRocket < -150) {
    yRocket = yMax + 150;
  }
  
  return yRocket; // restituisco la nuova posizione verticale
}


// ===============================================
// 🎬 DRAW – viene eseguita 24 volte al secondo
// ===============================================
function draw() {
  background(0, 127, 255); // sfondo blu notte

  // Mostra coordinate del mouse
  fill(255);
  textSize(20);
  text("mouseX: " + mouseX + "   mouseY: " + mouseY, 20, 20);
push()
  // Disegno stelle e razzo
  //drawStars();
  //drawRocket();//
  drawRocketFromFile(xRocket, yRocket);
  drawStarsFromFile();


  // Aggiorno la posizione verticale del razzo (si muove)
  yRocket = moveRocket(yRocket, step);
pop()
}
