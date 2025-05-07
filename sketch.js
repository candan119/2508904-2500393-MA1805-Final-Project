// Main menu
let currentScreen = 'menu';

// Player variables
let player;
let playerSprite;
let playerSpeed = 5;

// Tile variables
let tileMap = [];
let tilesX = 15;
let tilesY = 10;
let tileSize = 50;
let textures = [];

// Level variables
let currentLevel = 0;
let graphicsMap;
let tileRules;
let count;
let countMax = 30;

// Interactables
let chests = [];
let tomb;

// Enemies for level1
let enemyManager;

// Statues
let statues = []; 
let statuerSprite; 

// Global score variable
let score = 0;

// Interactables images
let chestSprite;
let tombSprite;
let enemySprite;

// Dialogue
let tombDialogue;
let level1Dialogue;

let gameWon = false; // Flag to check if the game is won

// Levels, tilemaps, graphics, collision
let openingScene = {
    name: "OpeningScene",
    graphicsMap: [
        // 0 = stonepath, 1 = bricks, 2 = void
        [2, 2, 2, 1, 1, 1, 0, 0, 0, 1, 1, 1, 2, 2, 2],
        [2, 2, 2, 1, 1, 1, 0, 0, 0, 1, 1, 1, 2, 2, 2],
        [2, 2, 2, 1, 1, 1, 0, 0, 0, 1, 1, 1, 2, 2, 2],
        [2, 2, 2, 1, 1, 1, 0, 0, 0, 1, 1, 1, 2, 2, 2],
        [2, 2, 2, 1, 1, 1, 0, 0, 0, 1, 1, 1, 2, 2, 2],
        [2, 2, 2, 1, 1, 1, 0, 0, 0, 1, 1, 1, 2, 2, 2],
        [2, 2, 2, 1, 1, 1, 0, 0, 0, 1, 1, 1, 2, 2, 2],
        [2, 2, 2, 1, 1, 1, 0, 0, 0, 1, 1, 1, 2, 2, 2],
        [2, 2, 2, 1, 1, 1, 0, 0, 0, 1, 1, 1, 2, 2, 2],
        [2, 2, 2, 1, 1, 1, 0, 0, 0, 1, 1, 1, 2, 2, 2]
    ],
    tileRules: [
        // 0 = walkable, 1 = unwalkable
        [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
        [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
        [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
        [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
        [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
        [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
        [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
        [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
        [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
        [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1]
    ],
    startTileX: 7,
    startTileY: 1
};


let level1= {
    name: "LevelOne",
    graphicsMap: [ 
    // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3], // 0
      [3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3], // 1
      [3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3], // 2
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 3], // 3
      [3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3], // 4
      [3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3], // 5
      [3, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3], // 6
      [3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3], // 7      
      [3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3], // 8
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3], // 9
    
      // 2 = void
      // 3 = bricks
    ],

    tileRules: [
    // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 0
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 1
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 2
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1], // 3
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 4
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 5
      [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 6
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 7      
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 8
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 9

      // 0 = walkable
      // 1 = unwalkable
    ],

    startTileX: 1,
    startTileY: 1
}

let level2 = {
    name: "LevelTwo",
    graphicsMap: [
    // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4
      [5, 5, 5, 4, 4, 6, 6, 6, 6, 6, 4, 4, 5, 5, 5], // 0
      [5, 5, 5, 4, 4, 7, 7, 7, 7, 7, 4, 4, 5, 5, 5], // 1
      [5, 5, 5, 4, 4, 6, 6, 6, 6, 6, 4, 4, 5, 5, 5], // 2
      [5, 5, 5, 4, 4, 7, 7, 7, 7, 7, 4, 4, 5, 5, 5], // 3
      [5, 5, 5, 4, 4, 6, 6, 6, 6, 6, 4, 4, 5, 5, 5], // 4
      [5, 5, 5, 4, 4, 7, 7, 7, 7, 7, 4, 4, 5, 5, 5], // 5
      [5, 5, 5, 4, 4, 6, 6, 6, 6, 6, 4, 4, 5, 5, 5], // 6
      [5, 5, 5, 4, 4, 7, 7, 7, 7, 7, 4, 4, 5, 5, 5], // 7      
      [5, 5, 5, 4, 4, 6, 6, 6, 6, 6, 4, 4, 5, 5, 5], // 8
      [5, 5, 5, 4, 4, 7, 7, 7, 7, 7, 4, 4, 5, 5, 5], // 9

      // 4 = brick wall
      // 5 = void
    ],

    tileRules: [
    // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1], // 0
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1], // 1
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1], // 2
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1], // 3
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1], // 4
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1], // 5
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1], // 6
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1], // 7
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1], // 8
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1], // 9

      // 0 = walkable
      // 1 = unwalkable
    ],

    startTileX: 7,
    startTileY: 0
}

let levels = [openingScene, level1, level2];

function preload() {
  // Load your custom images
  chestSprite = loadImage('IMGS/chest.png'); 
  tombSprite = loadImage('IMGS/tomb2.png');   

  // Tilemap imgs
  textures[0] = loadImage('IMGS/Tilemap/stonepathway.png'); 
  textures[1] = loadImage('IMGs/Tilemap/brickwall1.png'); 
  textures[2] = loadImage('IMGs/Tilemap/void.png'); 
  textures[3] = loadImage('IMGS/Tilemap/brickwall2.png'); 
  textures[4] = loadImage('IMGS/Tilemap/brickwall3.png'); 
  textures[5] = loadImage('IMGs/Tilemap/void.png'); 
  textures[6] = loadImage('IMGS/Tilemap/stairpathway1.png');
  textures[7] = loadImage('IMGS/Tilemap/stairpathway2.png')

  // Player sprite
  playerSprite = loadImage('IMGS/character.png'); 

  // Enemy and statue sprite
  enemySprite = loadImage('IMGS/bishop.png'); 
  statuerSprite = loadImage('IMGS/queen.png');

}

function setup() {
    createCanvas(750, 500);

    // Initialize player
    player = new Player(playerSprite, 7, 1, tileSize, openingScene.tileRules);

    // Initialize tomb dialogue
    tombDialogue = new Dialogue(
        [
            "You feel an eerie presence...",
            "The tomb whispers secrets of the past.",
            "What could be hidden inside?"
        ],
        () => {
            transitionToNextLevel(); // Transition to Level 1 when dialogue ends
        }
    );

    // Initialize LevelOne dialogue
    level1Dialogue = new Dialogue(
        [
            "Welcome to Level One.",
            "Be prepared for the challenges ahead!",
            "Good luck, adventurer!"
        ],
        () => {
            console.log("LevelOne dialogue finished.");
        }
    );

    loadLevel();
}

function loadLevel() {
    graphicsMap = levels[currentLevel].graphicsMap;
    tileRules = levels[currentLevel].tileRules;

    let tileID = 0;

    for (let tileX = 0; tileX < tilesX; tileX++) {
        tileMap[tileX] = [];
        for (let tileY = 0; tileY < tilesY; tileY++) {
            let texture = textures[graphicsMap[tileY][tileX]]; 
            tileMap[tileX][tileY] = new Tile(texture, tileX, tileY, tileSize, tileID);
            tileID++;
        }
    }

    // Trigger LevelOne dialogue when transitioning to LevelOne
    if (levels[currentLevel].name === "LevelOne") {
        level1Dialogue.start();
    }

    // Initialize objects for LevelOne
    if (levels[currentLevel].name === "LevelOne") {
        createChests();
        enemyManager = new EnemyManager(enemySprite, tileSize, tileRules, player);
        enemyManager.createEnemies([
            { x: 9, y: 1 },
            { x: 4, y: 4 },
            { x: 9, y: 7 }
        ]);
    } else {
        chests = []; // Clear chests if not in LevelOne
    }

    if (levels[currentLevel].name === "LevelTwo") {
        createStatues();
    } else {
        statues = []; // Clear statues if not in LevelTwo
    }

    if (levels[currentLevel].name === "OpeningScene") {
        createTomb();
    } else {
        tomb = null; // Clear tomb if not in OpeningScene
    }
}

function renderLevel() {
    for (let tileX = 0; tileX < tilesX; tileX++) {
        for (let tileY = 0; tileY < tilesY; tileY++) {
            tileMap[tileX][tileY].display();
        }
    }

    // Display statues
    if (levels[currentLevel].name === "LevelTwo") {
        for (let statue of statues) {
            statue.display();
            statue.update();
            statue.checkCollisionWithPlayer(player);
        }
    }
}

function transitionToNextLevel() {
    currentLevel++; // Move to the next level
    if (currentLevel >= levels.length) {
        console.log("No more levels. Game Over.");
        noLoop();
        return;
    }
    player.setPlayerPosition(); // Set the player's position for the new level
    loadLevel(); // Load the new level
    console.log(`Transitioned to Level ${currentLevel + 1}`);
}

function showMenu(){
    fill(255);
    textSize (64);
    text ("NOT Tomb Raider", width / 2, 500);

    textSize (24);
    text ("Press 'x' to Start", width / 2, 549);
    text ("Press 'I' for Instructions", width / 2, 50); 
}

function showInstructions(){
    fill(255);
    textSize(24);
    text("Controls:", width / 2, height / 2 - 60);
    text("Use ARROW KEYS to move player", width / 2, height / 2 - 20);
    text("Use SPACE BAR to interact", width / 2, height / 2 + 20);
    text("Press 'B' to go back to main menu", width / 2, 550);
}

function checkWinCondition() {
    if (levels[currentLevel].name === "LevelTwo" && player.tileY === 9) {
        gameWon = true;
        console.log("Player won the game!");
        noLoop(); // Stop the game loop
        return;
    }
}

function displayWinScreen() {
    background(0); // Black screen
    fill(255); // White text
    textSize(48);
    textAlign(CENTER, CENTER);
    text("YOU SURVIVED!", width / 2, height / 2); // Centered text
}

function draw() {
    background(0);

    if (currentScreen === 'menu') {
        showMenu();
    } else if (currentScreen === 'instructions') {
        showInstructions();
    } else if (currentScreen === 'game') {
        if (gameWon) {
            // Display winning screen
            displayWinScreen();
        } else {
            renderLevel();

            player.display();
            player.move();

            // Check if the player wins the game
            checkWinCondition();

            if (levels[currentLevel].name === "OpeningScene" && tomb) {
                tomb.display();
            }

            // Display dialogues
            if (tombDialogue.isActive) {
                tombDialogue.display();
            } else if (level1Dialogue.isActive) {
                level1Dialogue.display();
            }

            // Display statues in LevelTwo
            if (levels[currentLevel].name === "LevelTwo") {
                for (let statue of statues) {
                    statue.display();
                    statue.update();
                    statue.checkCollisionWithPlayer(player);
                }
            }
        }
    }
}

function createTomb() {
    tomb = new Tomb(tombSprite, 5, 5, 0, true);
}
function createChests(){
    // Clear existing chests before creating new ones
    chests = [];

    chest1 = new Chests(chestSprite, 13, 1, 0, true);
    chests.push(chest1);

    chest2 = new Chests(chestSprite, 2, 4, 1, true);
    chests.push(chest2);

    chest3 = new Chests(chestSprite, 10, 7, 2, true);
    chests.push(chest3);

}

function createStatues() {
    statues = []; // Clear existing statues
    statues.push(new Statue(statuerSprite, 3, 2, tileSize));
    statues.push(new Statue(statuerSprite, 11, 4, tileSize));
    statues.push(new Statue(statuerSprite, 3, 7, tileSize));
}

function keyPressed() {
    if (currentScreen === 'menu') {
        if (key === 'x' || key === 'X') {
            currentScreen = 'game';
        } else if (key === 'i' || key === 'I') {
            currentScreen = 'instructions';
        }
    } else if (currentScreen === 'instructions') {
        if (key === 'b' || key === 'B') {
            currentScreen = 'menu';
        }
    } else if (currentScreen === "game") {
        // Progress dialogues
        if (tombDialogue.isActive && key === " ") {
            tombDialogue.nextLine();
        } else if (level1Dialogue.isActive && key === " ") {
            level1Dialogue.nextLine();
        }

        // Trigger interactions
        if (key === " " && tomb && levels[currentLevel].name === "OpeningScene") {
            if (player.tileX === tomb.tileX && player.tileY === tomb.tileY) {
                tomb.interact();
                tombDialogue.start();
            }
        }

        if (key === ' ') {
            player.checkChestInteraction();
        }
    }
}

class Player {
    constructor(sprite, startX, startY, tileSize, tileRules) {
        this.sprite = sprite;

        this.tileX = startX,
        this.tileY = startY,

        this.xPos = startX * tileSize;
        this.yPos = startY * tileSize;

        this.dirX = 0;
        this.dirY = 0;

        this.tx = this.xPos;
        this.ty = this.yPos;

        this.isMoving = false;
        this.speed = 5;

        this.tileSize = tileSize;
        this.tileRules = tileRules;
        this.transition = false;
        this.lives = 3; // Initialize player lives
    }

    display() {
        image(this.sprite, this.xPos, this.yPos, this.tileSize, this.tileSize);
    }

    setDirection() {
        let up = 87;
        let down = 83;
        let left = 65;
        let right = 68;

        if (!this.isMoving) {
            if (keyIsDown(up)) {
                this.dirX = 0;
                this.dirY = -1;
            }

            if (keyIsDown(down)) {
                this.dirX = 0;
                this.dirY = 1;
            }

            if (keyIsDown(left)) {
                this.dirX = -1;
                this.dirY = 0;
            }

            if (keyIsDown(right)) {
                this.dirX = 1;
                this.dirY = 0;
            }

            this.checkTargetTile();
        }
    }

    checkTargetTile() {
        if (this.transition) {
            this.dirX = 0;
            this.dirY = 0;
        }

        this.tileX = Math.floor(this.xPos / this.tileSize);
        this.tileY = Math.floor(this.yPos / this.tileSize);

        let nextTileX = this.tileX + this.dirX;
        let nextTileY = this.tileY + this.dirY;

        if (nextTileX >= 0 &&
            nextTileX < tilesX &&
            nextTileY >= 0 &&
            nextTileY < tilesY) {

            if (tileRules[nextTileY][nextTileX] === 2) {
                if (currentLevel >= levels.length) currentLevel = 0;

                loadLevel();

                this.setPlayerPosition();
                count = 0;
                this.transition = true;
            } else if (tileRules[nextTileY][nextTileX] !== 1) {
                this.tx = nextTileX * tileSize;
                this.ty = nextTileY * tileSize;

                this.isMoving = true;
            }
        }
    }

    move() {
        if (this.isMoving) {
            this.xPos += this.speed * this.dirX;
            this.yPos += this.speed * this.dirY;

            if (this.xPos === this.tx && this.yPos === this.ty) {
                this.isMoving = false;
                this.dirX = 0;
                this.dirY = 0;

                // Check for transition to Level 2
                this.checkTransitionToLevel2();
            }
        }
    }

    setPlayerPosition() {
        this.tileX = levels[currentLevel].startTileX;
        this.tileY = levels[currentLevel].startTileY;
        this.xPos = levels[currentLevel].startTileX * tileSize;
        this.yPos = levels[currentLevel].startTileY * tileSize;
    }

    checkTransitionToLevel2() {
        if (
            this.tileX === 15 &&
            (this.tileY === 7 || this.tileY === 8)
        ) {
            currentLevel = 2; // Transition to Level 2
            this.setPlayerPosition(); // Reset player position to Level 2's start position
            loadLevel(); // Load Level 2 data
            console.log("Transitioned to Level 2");
        }
    }
}

class Tile{
    constructor (texture, tileX, tileY, tileSize, tileID){
        this.texture = texture;
        this.tileX = tileX;
        this.tileY = tileY;
        this.xPos = tileX * tileSize;
        this.yPos = tileY * tileSize;
        this.tileSize = tileSize;
        this.tileID = tileID;
    }

    display () {
        image(this.texture, this.xPos, this.yPos, this.tileSize, this.tileSize)
    }

    debugGrid(){

        let xPadding = 2;
        let xCoordinatePadding = 8;
        let yIDPadding = 18;

        strokeWeight(1)
        stroke("black")
        fill("yellow")

        textSize(8)
        text("X: " + this.tileX + ", Y: " + this.tileY, this.xPos + xPadding, this.yPos + yCoordinatePadding)

        textSize(10)
        text("ID: " + this.tileID, this.xPos + xPadding, this.yPos + yIDPadding)

        //Create rect around tile
        noFill();
        stroke('yellow');
        rect(this.xPos, this.yPos, this.tileSize, this.tileSize);
    }
}

class Chests {
    constructor(sprite, tileX, tileY, interactableID, collison) {
      this.sprite = sprite; 
      this.size = tileSize;
  
      this.tileX = tileX;
      this.tileY = tileY;
      this.xPos = tileX * tileSize;
      this.yPos = tileY * tileSize;
  
      this.interactableID = interactableID;
      this.collison = collison;
      this.isOpened = false; // Flag to track if the chest has been opened
    }
  
    display() {
      if (!this.isOpened) {
        image(this.sprite, this.xPos, this.yPos, this.size, this.size);
      }
    }
  
    interact() {
      if (!this.isOpened) {
        this.isOpened = true; // Mark the chest as opened
        score += 10000; // Add 10000 points for interacting with the chest
        console.log(`Chest ${this.interactableID} opened! Score: ${score}`);
      }
    }
  }
  
  // Tomb Class
  class Tomb {
    constructor(sprite, tileX, tileY, interactableID, collison) {
      this.sprite = sprite; // Use the tomb sprite
      this.size = tileSize;
  
      this.tileX = tileX;
      this.tileY = tileY;
      this.xPos = tileX * tileSize;
      this.yPos = tileY * tileSize;
  
      this.interactableID = interactableID;
      this.collison = collison;
      this.isInteracted = false; // Flag to track if the tomb has been interacted with
    }
  
    display() {
      if (!this.isInteracted) {
        image(this.sprite, this.xPos, this.yPos, this.size, this.size);
      }
    }
  
    interact() {
      if (!this.isInteracted) {
        this.isInteracted = true; // Mark the tomb as interacted
        score += 100000; // Add 100000 points for interacting with the tomb
        console.log(`Tomb ${this.interactableID} interacted! Score: ${score}`);
      }
    }
}

class Enemy {
    constructor(sprite, tileX, tileY, tileSize, tileRules, startX, startY, player) {
        this.sprite = sprite;
        this.tileX = tileX;
        this.tileY = tileY;
        this.tileSize = tileSize;
        this.xPos = tileX * tileSize;
        this.yPos = tileY * tileSize;
        this.player = player;
        this.speed = 2;
    }

    display() {
        image(this.sprite, this.xPos, this.yPos, this.tileSize, this.tileSize);
    }

    move() {
        // Movement logic for enemy (e.g., patrol or follow player)
    }

    checkCollisionWithPlayer() {
        if (
            this.player.xPos < this.xPos + this.tileSize &&
            this.player.xPos + this.player.tileSize > this.xPos &&
            this.player.yPos < this.yPos + this.tileSize &&
            this.player.yPos + this.player.tileSize > this.yPos
        ) {
            console.log("Player hit by enemy! Game Over...");
            noLoop(); // Stop the game loop to indicate game over
        }
    }
}

class EnemyManager {
    constructor(enemySprite, tileSize, tileRules, player) {
        this.enemySprite = enemySprite;
        this.tileSize = tileSize;
        this.tileRules = tileRules;
        this.player = player;
        this.enemies = []; // Array to store multiple enemies
    }

    createEnemies(spawnTiles) {
        // Clear any existing enemies
        this.enemies = [];

        // Loop through the spawnTiles array to create enemies
        for (let i = 0; i < spawnTiles.length; i++) {
            const { x, y } = spawnTiles[i];
            let enemy = new Enemy(this.enemySprite, x, y, this.tileSize, this.tileRules, x, y, this.player);
            this.enemies.push(enemy);
        }
    }

    displayEnemies() {
        for (let enemy of this.enemies) {
            enemy.display();
            enemy.move();
            enemy.checkCollisionWithPlayer();
        }
    }
}

class Dialogue {
    constructor(dialogueText, onDialogueEnd) {
        this.dialogueText = dialogueText; // Array of dialogue lines
        this.currentLine = 0; // Track which line is being displayed
        this.isActive = false; // Whether the dialogue is currently active
        this.onDialogueEnd = onDialogueEnd; // Callback function when dialogue ends
    }

    start() {
        this.isActive = true;
        this.currentLine = 0; // Reset to the first line
    }

    nextLine() {
        if (this.currentLine < this.dialogueText.length - 1) {
            this.currentLine++;
        } else {
            this.end(); // End dialogue if it's the last line
        }
    }

    end() {
        this.isActive = false;
        this.currentLine = 0;
        if (this.onDialogueEnd) {
            this.onDialogueEnd(); // Trigger the callback when dialogue ends
        }
    }

    display() {
        if (this.isActive) {
            fill(0, 0, 0, 200); // Semi-transparent background
            rect(50, height - 150, width - 100, 100, 10); // Dialogue box

            fill(255); // Text color
            textSize(18);
            textAlign(CENTER, CENTER);
            text(
                this.dialogueText[this.currentLine],
                width / 2,
                height - 100
            ); // Display current dialogue line
        }
    }
}

class Statue {
    constructor(sprite, tileX, tileY, tileSize) {
        this.sprite = sprite;
        this.tileX = tileX;
        this.tileY = tileY;
        this.tileSize = tileSize;

        this.xPos = tileX * tileSize;
        this.yPos = tileY * tileSize;

        this.falling = false; // Whether the statue is "falling"
        this.speed = 5; // Falling speed
    }

    display() {
        image(this.sprite, this.xPos, this.yPos, this.tileSize, this.tileSize);
    }

    update() {
        if (this.falling) {
            this.yPos += this.speed; // Statue "falls" by updating its y-position
        }
    }

    checkCollisionWithPlayer(player) {
        // Check if player is on the same X-axis as the statue
        if (player.tileX === this.tileX && !this.falling) {
            this.falling = true; // Start falling
        }

        // Check if statue collides with the player
        if (this.falling && player.xPos < this.xPos + this.tileSize &&
            player.xPos + player.tileSize > this.xPos &&
            player.yPos < this.yPos + this.tileSize &&
            player.yPos + player.tileSize > this.yPos) {
            console.log("Player hit by statue! Game Over...");
            noLoop(); // Stop the game loop to indicate game over
        }

        // Reset statue if it falls off the screen
        if (this.yPos > height) {
            this.falling = false;
            this.yPos = this.tileY * this.tileSize; // Reset to original position
        }
    }
}